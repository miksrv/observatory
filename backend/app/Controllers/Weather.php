<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class Weather extends BaseController
{

    function current()
    {
        $client = \Config\Services::curlrequest();

        try {
            $response = $client->request('GET', 'https://meteo.miksoft.pro/api/get/current');
            $weather  = json_decode($response->getBody());

            $this->_response(['timestamp' => $weather->timestamp, 'conditions' => $weather->payload]);
        } catch (\Exception $e) {
            $this->_response(null);
        }
    }

    function month()
    {
        $period = $this->request->getGet('date', FILTER_SANITIZE_STRING);
        $client = \Config\Services::curlrequest();

        $start = $period . '-01';
        $end = date('Y-m-t', strtotime($period));

        $response = $client->request('GET', 'https://meteo.miksoft.pro/api/get/sensors_period?date_start='. $start . '&date_end=' . $end .'&sensors=clouds,temperature,wind_speed');
        $weather  = json_decode($response->getBody());

        $days = [];

        foreach ($weather->payload as $item)
        {
            $sunData = date_sun_info($item->date, getenv('app.latitude'), getenv('app.longitude'));

            $sunrise = $sunData['astronomical_twilight_end'];
            $sunset  = $sunData['astronomical_twilight_begin'];

            if ($item->date > $sunset && $item->date < $sunrise)
            {
                continue;
            }

            $day = date('Y-m-d', $item->date);

            if (!isset($days[$day]))
            {
                $days[$day] = (object) ['count' => 0];
            }

            foreach ($item as $var => $val)
            {
                if ($var === 'date')
                {
                    continue;
                }

                if ($val === null)
                {
                    $days[$day]->$var = null;
                } else {
                    if (!isset($days[$day]->$var))
                    {
                        $days[$day]->$var = (float) $val;
                    } else {
                        $days[$day]->$var += (float) $val;
                    }
                }
            }

            $days[$day]->count++;
        }

        $result = [];

        foreach ($days as $date => $item) {

            foreach ($item as $var => $value)
            {
                if ($var === 'count')
                {
                    continue;
                }

                if ($value !== null)
                {
                    $item->$var = round($value / $item->count, 1);
                }
            }

            unset($item->count);

            $result[] = array_merge(['date' => $date], (array) $item);
        }

        $this->_response(['date' => $period, 'weather' => $result]);
    }

    protected function _response($payload)
    {
        $data = (object) [
            'status'  => (bool)$payload,
            'payload' => $payload
        ];

        $this->response
            ->setStatusCode(200)
            ->setJSON($data)
            ->send();

        exit();
    }
}
