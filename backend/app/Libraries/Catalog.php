<?php namespace App\Libraries;

use App\Models\Objects as modelObjects;
use App\Models\Files as modelFiles;

use App\Entities\CatalogItem;

class Catalog
{
    protected modelObjects $_model;
    protected array $catalog = [];
    protected array $categories = [];

    function __construct()
    {
        $this->_model = new modelObjects();
    }

    function list(): array
    {
        $this->_fetchList();
        return $this->catalog;
    }

    function item(string $object): ?CatalogItem
    {
        $data = $this->_model->get_by_name($object);

        if (empty($data)) {
            return $this->_createObject($object);
        }

        if (empty($data->object_ra) || empty($data->object_dec))
        {
            $File = new modelFiles();
            $file = $File->get_coord_by_object($object);

            if (empty($file)) return null;

            return $this->_updateCoordinates(
                $object,
                (float) $file->item_ra,
                (float) $file->item_dec,
            );
        }

        return new CatalogItem(
            $data->object_name,
            $data->object_title,
            $data->object_text,
            $data->object_category,
            $data->object_ra,
            $data->object_dec
        );
    }

    function categories(): array
    {
        $this->_fetchList();
        return $this->categories;
    }

    protected function _fetchList(): array
    {
        if ( ! empty($this->catalog)) {
            return $this->catalog;
        }

        foreach ($this->_model->get_list() as $item) {
            if (!in_array($item->object_category, $this->categories)) {
                $this->categories[] = $item->object_category;
            }

            $this->catalog[] = new CatalogItem(
                $item->object_name,
                $item->object_title,
                $item->object_text,
                $item->object_category,
                $item->object_ra,
                $item->object_dec
            );
        }

        return $this->catalog;
    }

    protected function _createObject(string $object): ?CatalogItem
    {
        $this->_model->add($object);

        return $this->item($object);
    }

    protected function _updateCoordinates(string $object, float $ra, float $dec): ?CatalogItem
    {
        $this->_model->update_data($object, ['object_ra' => $ra, 'object_dec' => $dec]);

        return $this->item($object);
    }
}