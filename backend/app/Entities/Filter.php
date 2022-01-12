<?php namespace App\Entities;

interface IFilter
{
    const exposure = '';
    const frames   = 0;
}

class Filter implements IFilter {
    public int $exposure = 0;
    public int $frames   = 0;
}