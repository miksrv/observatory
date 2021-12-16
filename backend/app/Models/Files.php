<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Files extends Model
{
    protected $table = '';

    protected string $key_id     = 'file_id';
    protected string $key_object = 'item_object';
    protected string $key_frame  = 'item_frame';
    protected array $fields = ['item_object', 'item_filter', 'item_date_obs', 'item_exptime'];

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_files');
    }

    /**
     * Return array of all FITS objects
     * @return mixed
     */
    function get_list()
    {
        return $this->_db()
            ->orderBy($this->key_id, 'DESC')
            ->getWhere([$this->key_frame => 'Light'])
            ->getResult();
    }

    /**
     * Более подробный
     * @param string $name
     * @return mixed
     */
    function get_by_object(string $name)
    {
        return $this->_db(['file_id', 'item_file_name', 'item_ccd_temp', 'item_offset', 'item_gain', 'item_dec', 'item_ra'])
            ->orderBy($this->key_id, 'DESC')
            ->getWhere([$this->key_frame => 'Light', $this->key_object => $name])
            ->getResult();
    }

    /**
     * Получить координаты объекта
     * @param string $name
     * @return mixed
     */
    function get_coord_by_object(string $name)
    {
        return $this->db
            ->table($this->table)
            ->select(['item_dec', 'item_ra'])
            ->orderBy($this->key_id, 'DESC')
            ->getWhere([$this->key_frame => 'Light', $this->key_object => $name])
            ->getRow();
    }

    function get_group_names()
    {
        return $this->db
            ->table($this->table)
            ->select('item_object')
            ->orderBy($this->key_object, 'DESC')
            ->groupBy('item_object')
            ->getWhere([$this->key_frame => 'Light'])
            ->getResult();
    }

    protected function _db(array $fields = [])
    {
        return $this->db
            ->table($this->table)
            ->select(implode(', ', array_merge($this->fields, $fields)));
    }
}