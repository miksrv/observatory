<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

ini_set('memory_limit', '512M');

class SensorData extends Model
{
    protected $table = '';
    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);
    }

    /**
     * Return sensor data in period
     * @return mixed
     */
    function get_period($source = 'meteo', $daterange = null, $summary = false)
    {
        $this->table = getenv('database.table.' . $source . '_data') . ($summary ? '_total' : '');

        return $this->db->table($this->table)
            ->where("item_timestamp BETWEEN '{$daterange->start}' AND '{$daterange->end}'")
            ->orderBy('item_timestamp', 'DESC')
            ->get()
            ->getResult();
    }

    function clear_old_entries()
    {
        $table = getenv('database.table.astro_data');
        return $this->db->table($table)
            ->where("item_timestamp < DATE_SUB(NOW(), INTERVAL 7 DAY)")
            ->delete();
    }

    /**
     * Return sensor data by month
     * @param $month
     * @param $year
     * @return mixed
     */
    function get_month($month, $year)
    {
        $this->table = getenv('database.table.meteo_data');

        return $this->db
            ->table($this->table)
            ->orderBy('item_timestamp', 'DESC')
            ->getWhere(['YEAR(item_timestamp)' => $year, 'MONTH(item_timestamp)' => $month])
            ->getResult();
    }

    function get_sensor_by_hour($year, $month, $day, $hour)
    {
        $this->table = getenv('database.table.meteo_data');

        return $this->db
            ->table($this->table)
            ->orderBy('item_timestamp', 'DESC')
            ->getWhere([
                'YEAR(item_timestamp)'  => $year,
                'MONTH(item_timestamp)' => $month,
                'DAY(item_timestamp)'   => $day,
                'HOUR(item_timestamp)'  => $hour,
                ])
            ->getResult();
    }

    function get_day_order()
    {
        $this->table = getenv('database.table.meteo_data');

        return $this->db
            ->table($this->table)
            ->orderBy('item_timestamp', 'ASC')
            ->limit(1)
            ->get()
            ->getResult();
    }

    /**
     * Получает последнюю по дате обощенную запись за час наблюдений
     * @return mixed
     */
    function get_last($total = false)
    {
        $table = ($total ? 'meteo_data_total' : 'meteo_data');

        return $this->db
            ->table($table)
            ->orderBy('item_timestamp', $total ? 'DESC' : 'ASC')
            ->limit(1)
            ->get()
            ->getResult();
    }

    function set_total($summary, $extreme, $time)
    {
        return $this->db
            ->table('meteo_data_total')->insert([
                'item_id'             => uniqid(),
                'item_raw_data'       => $summary,
                'item_extreme_values' => $extreme,
                'item_timestamp'      => $time
            ]);
    }
}