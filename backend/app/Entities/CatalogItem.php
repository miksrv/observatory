<?php namespace App\Entities;

interface ICatalogItem
{
    const name     = '';
    const title    = '';
    const text     = '';
    const category = '';
    const ra       = 0;
    const dec      = 0;

    function __construct(
        string $name,
        string $title,
        string $text,
        string $category,
        float $ra,
        float $dec
    );
}

class CatalogItem implements ICatalogItem
{
    public string $name     = '';
    public string $title    = '';
    public string $text     = '';
    public string $category = '';
    public float $ra        = 0;
    public float $dec       = 0;

    /**
     * @param string $name
     * @param string $title
     * @param string $text
     * @param string $category
     * @param float $ra
     * @param float $dec
     */
    function __construct(
        string $name,
        string $title,
        string $text,
        string $category,
        float $ra,
        float $dec
    )
    {
        $this->name     = $name;
        $this->title    = $title;
        $this->text     = $text;
        $this->category = $category;
        $this->ra       = $ra;
        $this->dec      = $dec;
    }
}