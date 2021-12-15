<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Photos extends Model
{
    protected $table = '';

    protected string $key_id     = 'photo_id';
    protected string $key_object = 'photo_obj';
    protected string $key_date   = 'photo_date';
    protected string $key_file   = 'photo_file';
    protected string $key_ext    = 'photo_file_ext';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_photos');
    }

    /**
     * Return array of all photos objects
     * @return mixed
     */
    function get_list()
    {
        return $this->db
            ->table($this->table)
            ->orderBy($this->key_date, 'DESC')
            ->get()
            ->getResult();
    }

    /**
     * Return photos array by astronomy object name
     * @param string $name
     * @return mixed
     */
    function get_by_object(string $name)
    {
        return $this->db
            ->table($this->table)
            ->orderBy($this->key_date, 'DESC')
            ->getWhere([$this->key_object => $name])
            ->getResult();
    }
}