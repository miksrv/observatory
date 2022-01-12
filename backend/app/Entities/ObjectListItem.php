<?php namespace App\Entities;

interface IObjectListItem
{
    const name      = '';
    const date      = '';
    const exposure  = 0;
    const frames    = 0;
    const Luminance = 0;
    const Red       = 0;
    const Green     = 0;
    const Blue      = 0;
    const Ha        = 0;
    const OIII      = 0;
    const SII       = 0;
}

class ObjectListItem implements IObjectListItem
{
    public string $name   = '';
    public string $date   = '';
    public int $exposure  = 0;
    public int $frames    = 0;
    public int $Luminance = 0;
    public int $Red       = 0;
    public int $Green     = 0;
    public int $Blue      = 0;
    public int $Ha        = 0;
    public int $OIII      = 0;
    public int $SII       = 0;
}