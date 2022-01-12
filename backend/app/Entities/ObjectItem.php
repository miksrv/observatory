<?php namespace App\Entities;

interface IObjectItem
{
    const date      = '';
    const exposure  = 0;
    const frames    = 0;
    const filesizes = 0;
    const filters   = [];

    function __construct();
}

class ObjectItem implements IObjectItem
{
    public string $date   = '';
    public int $exposure  = 0;
    public int $frames    = 0;
    public int $filesizes = 0;
    public $filters       = [];

    function __construct()
    {
        $this->filters = (object) [
            'Luminance' => new Filter(),
            'Red'       => new Filter(),
            'Green'     => new Filter(),
            'Blue'      => new Filter(),
            'Ha'        => new Filter(),
            'OIII'      => new Filter(),
            'SII'       => new Filter(),
        ];
    }
}