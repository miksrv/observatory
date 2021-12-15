<?php namespace App\Entities;

interface IObjectList
{
    const list = [];

    function add($name, $filter, $date, $exposure);
    function get();
}

class ObjectList implements IObjectList
{
    public array $list = [];

    function add($name, $filter, $date, $exposure)
    {
        if (! isset($this->list[$name]))
        {
            $this->list[$name] = new ObjectListItem();
        }

        $this->list[$name]->name       = $name;
        $this->list[$name]->frames    += 1;
        $this->list[$name]->{$filter} += $exposure;
        $this->list[$name]->date       = (empty($this->list[$name]->date) || $this->list[$name]->date < $date ? $date : $this->list[$name]->date);
        $this->list[$name]->exposure  += $exposure;
    }

    function get(): array
    {
        $return = [];

        foreach ($this->list as $item)
        {
            $return[] = $item;
        }

        return $return;
    }
}