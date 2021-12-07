<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Catalog extends Model
{
    protected $table = '';

    protected $keyName     = 'object_name';
    protected $keyTitle    = 'object_title';
    protected $keyText     = 'object_text';
    protected $keyCategory = 'object_category';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_catalog');
    }

    /**
     * Return full list astronomy objects catalog
     * @return mixed
     */
    function get_list()
    {
        return $this->db
            ->table($this->table)
            ->get()
            ->getResult();
    }

    /**
     * Return catalog object item by name
     * @param string $name
     * @return mixed
     */
    function get_by_name(string $name)
    {
        return $this->db
            ->table($this->table)
            ->getWhere([$this->keyName => $name])
            ->getRow();
    }
}