<?php namespace App\Entities;

interface IPhotoListItem
{
    const object = '';
    const date   = '';
    const file   = '';
    const ext    = '';
    const author = [];

    function __construct(string $object, string $date, string $file, string $ext, $author);
}

class PhotoListItem implements IPhotoListItem {
    public string $object = '';
    public string $date   = '';
    public string $file   = '';
    public string $ext    = '';
    public ?array $author = [];

    /**
     * @param string $object
     * @param string $date
     * @param string $file
     * @param string $ext
     * @param array | null $author
     */
    function __construct(string $object, string $date, string $file, string $ext, $author)
    {
        $this->object = $object;
        $this->date   = $date;
        $this->file   = $file;
        $this->ext    = $ext;
        $this->author = $author;
    }
}