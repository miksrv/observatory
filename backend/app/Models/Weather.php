<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Weather extends Model
{
    protected $table   = 'weather_data';

    protected $keyID     = 'item_id';
    protected $keyDevice = 'item_device';
    protected $keyData   = 'item_data';
    protected $keyTime   = 'item_timestamp';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

//        $this->table = getenv('database.table.astro_photos');
    }

    function add($device, $data)
    {
        return $this->db
            ->table($this->table)->insert([
                $this->keyID     => uniqid(),
                $this->keyDevice => $device,
                $this->keyData   => $data,
                $this->keyTime   => gmdate('Y-m-d H:i:s')
            ]);
    }

    function add_meteo($data)
    {
        return $this->db
            ->table('meteo_data')->insert([
                'item_id'       => uniqid(),
                'item_raw_data' => $data,
                'item_timestamp'     => date('Y-m-d H:i:s')
            ]);
    }
}