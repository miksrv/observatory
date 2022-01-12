<?php namespace App\Entities;

interface IPhotoListItem
{
    const object = '';
    const date   = '';
    const file   = '';
    const ext    = '';

    function __construct(string $object, string $date, string $file, string $ext);
}

class PhotoListItem implements IPhotoListItem {
    public string $object = '';
    public string $date   = '';
    public string $file   = '';
    public string $ext    = '';

    /**
     * @param string $object
     * @param string $date
     * @param string $file
     * @param string $ext
     */
    function __construct(string $object, string $date, string $file, string $ext)
    {
        $this->object = $object;
        $this->date   = $date;
        $this->file   = $file;
        $this->ext    = $ext;
    }
}