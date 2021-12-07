<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Photo extends Model
{
    protected $table   = '';

    protected $keyID   = 'photo_id';
    protected $keyName = 'photo_obj';
    protected $keyDate = 'photo_date';
    protected $keyFile = 'photo_file';
    protected $keyExt  = 'photo_file_ext';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_photos');
    }

    /**
     * Get all photos array
     * @return mixed
     */
    function get_list()
    {
        return $this->db
            ->table($this->table)
            ->orderBy($this->keyDate, 'DESC')
            ->get()
            ->getResult();
    }

    /**
     * Get photos array by astronomy object name
     * @param string $name
     * @return mixed
     */
    function get_by_name(string $name)
    {
        return $this->db
            ->table($this->table)
            ->orderBy($this->keyDate, 'DESC')
            ->getWhere([$this->keyName => $name])
            ->getResult();
    }
}