<?php namespace App\Libraries;

use App\Models\Files as Model;
use App\Entities\FileList;

class Files
{
    protected Model $_model;

    function __construct()
    {
        $this->_model = new Model();
    }

    function list(): array
    {
        return $this->_model->get_list();
    }

    function list_by_object(string $object): array
    {
        return $this->_make_list($this->_model->get_by_object($object));
    }

    protected function _make_list($files): array
    {
        $FileList   = new FileList();

        foreach ($files as $file) {
            $FileList->add(
                $file->file_id,
                $file->item_file_name,
                $file->item_date_obs, // #TODO Add GMT+5
                $file->item_filter,
                $file->item_exptime,
                $file->item_ccd_temp,
                $file->item_offset,
                $file->item_gain,
                $file->item_dec,
                $file->item_ra,
            );
        }

        return $FileList->list;
    }
}