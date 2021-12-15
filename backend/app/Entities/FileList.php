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
        float $ra
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
        float $ra
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

        $this->list[] = $file;
    }
}