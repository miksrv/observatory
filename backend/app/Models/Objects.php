<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Objects extends Model
{
    protected $table = '';

    protected string $key_id    = 'object_name';
    protected string $key_title = 'object_title';
    protected string $key_text  = 'object_text';
    protected string $key_cat   = 'object_category';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_objects');
    }

    /**
     * Return array of all photos objects
     * @return mixed
     */
    function get_list()
    {
        return $this->db
            ->table($this->table)
            ->orderBy($this->key_id, 'DESC')
            ->get()
            ->getResult();
    }

    /**
     * Return object by astronomy name
     * @param string $name
     * @return mixed
     */
    function get_by_name(string $name)
    {
        return $this->db
            ->table($this->table)
            ->getWhere([$this->key_id => $name])
            ->getRow();
    }

    function update_data(string $name, array $data)
    {
        return $this->db
            ->table($this->table)
            ->where($this->key_id, $name)
            ->update($data);
    }

    function add(string $name)
    {
        return $this->db->table($this->table)->insert([$this->key_id => $name]);
    }
}