<?php namespace App\Libraries;

use App\Entities\ObjectList;
use App\Entities\ObjectItem;

class Objects
{
    protected Files $Files;

    function __construct()
    {
        $this->Files = new Files();
    }

    function list(): array
    {
        $ObjectList = new ObjectList();

        foreach ($this->Files->list() as $file) {
            $ObjectList->add(
                $file->item_object,
                $file->item_filter,
                $file->item_date_obs,
                $file->item_exptime,
            );
        }

        return $ObjectList->get();
    }

    function names(): array
    {
        return $this->Files->names();
    }

    function item(string $object): ?ObjectItem
    {
        $files = $this->Files->list_by_object($object);

        if (empty($files)) {
            return null;
        }

        $ObjectItem = new ObjectItem();

        foreach ($files as $item)
        {
            $ObjectItem = $this->add_object_file($ObjectItem, $item);
        }

        $ObjectItem->filesizes = round($ObjectItem->frames * FITS_FILE_SIZE);
        return $ObjectItem;
    }

    function add_object_file(ObjectItem $ObjectItem, object $file): ObjectItem
    {
        $date = (empty($ObjectItem->date) || $ObjectItem->date < $file->date ? $file->date : $ObjectItem->date);

        $ObjectItem->date      = $date;
        $ObjectItem->exposure += $file->exposure;
        $ObjectItem->frames   += 1;

        $ObjectItem->filters->{$file->filter}->exposure += $file->exposure;
        $ObjectItem->filters->{$file->filter}->frames   += 1;

        return $ObjectItem;
    }
}