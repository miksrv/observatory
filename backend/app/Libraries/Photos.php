<?php namespace App\Libraries;

use App\Models\Photos as modelPhoto;

use App\Entities\ObjectItem;
use App\Entities\PhotoListItem;

class Photos
{
    protected modelPhoto $_model;

    function __construct()
    {
        $this->_model = new modelPhoto();
    }

    /**
     * @return array
     */
    function list(): array
    {
        return $this->_make_list($this->_model->get_list());
    }

    function list_by_object(string $object): ?array
    {
        $Files   = new Files();
        $Objects = new Objects();

        $photos = $this->_make_list($this->_model->get_by_object($object));
        $files  = $Files->list_by_object($object);

        if (empty($photos))
        {
            return null;
        }

        if (empty($files))
        {
            return $photos;
        }

        foreach ($photos as $photo)
        {
            $ObjectItem = new ObjectItem();

            foreach ($files as $file)
            {
                if (strtotime($file->date . ' +5 hours') > strtotime($photo->date . ' 23:59:59')) {
                    continue;
                }

                $ObjectItem = $Objects->add_object_file($ObjectItem, $file);
            }

            $ObjectItem->filesizes = round($ObjectItem->frames * FITS_FILE_SIZE);

            $photo->parameters = $ObjectItem;
        }

        return $photos;
    }

    protected function _make_list($data): array
    {
        $photos = [];

        foreach ($data as $item)
        {
            $author = isset($item->author_name) ?
                [
                    'name' => $item->author_name,
                    'link' => $item->author_link,
                ] : null;

            $photos[] = new PhotoListItem(
                $item->photo_obj,
                $item->photo_date,
                $item->photo_file,
                $item->photo_file_ext,
                $author,
            );
        }

        return $photos;
    }
}