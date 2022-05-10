<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Sensors extends Model
{
    protected $table = '';

    protected string $key_id   = 'item_id';
    protected string $key_data = 'item_data_json';
    protected string $key_time = 'item_timestamp';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_sensors');
    }

    function get_by_range($period = null)
    {
        return $this->db->table($this->table)
            ->select([$this->key_data, $this->key_time])
            ->where("item_timestamp BETWEEN '{$period->start}' AND '{$period->end}'")
            ->orderBy('item_timestamp', 'DESC')
            ->get()
            ->getResult();
    }
}