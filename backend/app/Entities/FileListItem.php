<?php namespace App\Entities;

interface IFileListItem
{
    const id       = '';
    const name     = '';
    const date     = '';
    const filter   = '';
    const exposure = 0;
    const temp     = 0;
    const offset   = 0;
    const gain     = 0;
    const dec      = 0;
    const ra       = 0;
    const stars    = 0;
    const hfr      = 0;
    const sky      = 0;
    const image    = false;
}

class FileListItem implements IFileListItem
{
    public string $id     = '';
    public string $name   = '';
    public string $date   = '';
    public string $filter = '';
    public int $exposure  = 0;
    public int $temp      = 0;
    public int $offset    = 0;
    public int $gain      = 0;
    public float $dec     = 0;
    public float $ra      = 0;
    public int $stars     = 0;
    public float $hfr     = 0;
    public float $sky     = 0;
    public bool $image    = false;
}