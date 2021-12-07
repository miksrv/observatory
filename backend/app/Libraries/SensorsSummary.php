<?php

namespace App\Libraries;

set_time_limit(0);

class SensorsSummary {

    protected $_source;
    protected $_dataModel;
    protected $counter = 0;

    function __construct($param = [])
    {
        error_reporting(E_ALL);
        ini_set('display_errors', '1');

        helper(['transform', 'calculate']);

        $this->_dataModel = model('App\Models\SensorData');
        $this->_source    = $param['source'] ?? 'meteo';
    }

    /**
     * Create summary data
     * @throws Exception
     */
    function run()
    {
        $this->counter++;

        $lastTotalData = $this->_dataModel->get_last(true);

        if (empty($lastTotalData) || ! is_array($lastTotalData))
            $lastTotalData = $this->_dataModel->get_last();

        $sensors = $this->_get_last_sensor_data($lastTotalData[0]->item_timestamp);
        $dataset = $this->_create_data_summary($sensors->data);
        $dateSum = date('Y-m-d H:00:00', $sensors->time);

        $this->_get_date_diff_hours($dateSum);
        $this->_set_total($dataset, $dateSum);

        if ($this->counter >= 100)
        {
            echo 'Max iteration (' . $this->counter . ') complete';
            exit();
        }

        $this->run();
    }

    /**
     * @param $date
     * @throws Exception
     */
    protected function _get_date_diff_hours($date)
    {
        $date1 = new \DateTime($date);
        $date2 = new \DateTime();
        $diff  = $date1->diff($date2);
        $hours = $diff->h;
        $hours = $hours + ($diff->days*24);

        if ($hours <= 1)
        {
            echo 'The difference between dates is less than 1 hour';
            exit();
        }
    }

    /**
     * @param $time
     * @return object
     */
    protected function _get_last_sensor_data($time): object
    {
        $time = strtotime($time . ' +1 hours');
        $data = $this->_dataModel->get_sensor_by_hour(
            date('Y', $time),
            date('m', $time),
            date('d', $time),
            date('H', $time)
        );

        if (empty($data) || ! is_array($data))
            $data = $this->_get_empty_value($time, 1);

        return (object) [
            'data' => $data,
            'time' => $time
        ];
    }

    /**
     * Если вдруг не получается выцепить значение следующего часа,
     * то берется час предидущего дня
     * @param $time
     * @param $days
     * @return mixed
     */
    protected function _get_empty_value($time, $days) {
        $prev_time = strtotime(date('Y-m-d H:i:s', $time) . " -$days days");
        $prev_data = $this->_dataModel->get_sensor_by_hour(
            date('Y', $prev_time),
            date('m', $prev_time),
            date('d', $prev_time),
            date('H', $prev_time)
        );

        if (empty($prev_data))
            return $this->_get_empty_value($time, $days + 1);

        return $prev_data;
    }

    /**
     * @param $data
     * @return object
     */
    protected function _create_data_summary($data): object
    {
        $count  = 0;
        $summary = [];
        $extreme = [];

        if ( ! empty($data))
        {
            foreach ($data as $item)
            {
                $count++;
                $sensorData = json_decode($item->item_raw_data);
                foreach ($sensorData as $sensor => $value)
                {
                    if ( ! isset($summary[$sensor]))
                    {
                        $summary[$sensor] = $value;
                        $extreme[$sensor] = (object) ['min' => $value, 'max' => $value];
                    } else {
                        $summary[$sensor] += $value;
                        if ($extreme[$sensor]->min > $value)
                            $extreme[$sensor]->min = $value;
                        if ($extreme[$sensor]->max < $value)
                            $extreme[$sensor]->max = $value;
                    }
                }
            }

            foreach ($summary as $sensor => $value) {
                $summary[$sensor] = round($value / $count, 1);
            }
        }

        return (object) ['summary' => $summary, 'extreme' => $extreme];
    }

    /**
     * @param $dataset
     * @param $time
     * @return mixed
     */
    protected function _set_total($dataset, $time)
    {
        if (empty($dataset->summary) || empty($dataset->extreme))
        {
            echo '<pre>';
            var_dump($dataset);
            exit();
        }

        $summary = json_encode($dataset->summary);
        $extreme = json_encode($dataset->extreme);

        return $this->_dataModel->set_total($summary, $extreme, $time);
    }

    /**
     * @return mixed
     */
    function get_last_hour() {
        return $this->_dataModel->get_day_order();
        //return $this->_dataModel->get_day();
    }

    /**
     * @param $year
     * @param $month
     * @param $day
     * @param $hour
     * @return mixed
     */
    function get_day($year, $month, $day, $hour)
    {
        return $this->_dataModel->get_hour($year, $month, $day, $hour);
    }

    /**
     * @return mixed
     */
    function get_last_total()
    {
        return $this->_dataModel->get_last_total();
    }

    /**
     * @param $data
     * @param $time
     * @return mixed
     */
    function set_total($data, $time)
    {
        return $this->_dataModel->set_total($data, $time);
    }
}