<?php namespace App\Libraries;

use App\Models\Sensors as Model;

class Sensors
{
    protected Model $_model;
    protected object $period;

    function __construct()
    {
        $this->_model = new Model();

        $this->period = (object) [
            'start' => date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s') . '-12 hours')),
            'end'   => date('Y-m-d H:i:s')
        ];
    }

    function statistic()
    {
        $data = $this->_model->get_by_range($this->period);

        if (empty($data))
        {
            return [];
        }

        $response = [];

        foreach ($data as $item)
        {
            $response[] = [
                'time' => strtotime($item->item_timestamp . ' UTC') * 1000,
                'sensors' => $this->_unpack_sensors_json($item->item_data_json)
            ];
        }

        return $response;
    }

    private function _unpack_sensors_json(string $json): array
    {
        $data = json_decode($json);

        if (!is_object($data))
        {
            return [];
        }

        $result = [];

        foreach ($data as $key => $value)
        {
            $result[$key] = $value;
        }

        return $result;
    }
}