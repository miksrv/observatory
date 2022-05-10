<?php namespace App\Entities;

interface IFileList
{
    const list = [];

    function add(
        string $id,
        string $name,
        string $date,
        string $filter,
        int $exposure,
        int $temp,
        int $offset,
        int $gain,
        float $dec,
        float $ra,
        int $stars,
        float $hfr,
        float $sky,
        bool $image
    );
}

class FileList implements IFileList
{
    public array $list = [];

    function add(
        string $id,
        string $name,
        string $date,
        string $filter,
        int $exposure,
        int $temp,
        int $offset,
        int $gain,
        float $dec,
        float $ra,
        int $stars = 0,
        float $hfr = 0,
        float $sky = 0,
        bool $image = false
    )
    {
        $file =  new FileListItem();

        $file->id       = $id;
        $file->name     = $name;
        $file->date     = $date;
        $file->filter   = $filter;
        $file->exposure = $exposure;
        $file->temp     = $temp;
        $file->offset   = $offset;
        $file->gain     = $gain;
        $file->dec      = $dec;
        $file->ra       = $ra;

        $file->stars    = $stars;
        $file->hfr      = $hfr;
        $file->sky      = $sky;

        $file->image    = $image;

        $this->list[] = $file;
    }
}