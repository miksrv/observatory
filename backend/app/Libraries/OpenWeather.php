<?php

namespace App\Libraries;

use App\Models\Weather as modelWeather;

class OpenWeather {
    const DEVICE_ID   = 'openweather';
    const API_VERSION = 2.5;
    const API_URL     = 'http://api.openweathermap.org/data/' . self::API_VERSION . '/';

    private $_modelWeather;
    private $_serviceCURL;

    function __construct()
    {
        $this->_serviceCURL  = \Config\Services::curlrequest();
        $this->_modelWeather = new modelWeather();
    }

    function parse()
    {
        $endpoint = 'weather?lat=' . getenv('app.latitude') . '&lon=' . getenv('app.longitude');
        $response = $this->_endpoint($endpoint);

        $data = (object) [
            't' => round($response->main->temp, 1),
            'h' => $response->main->humidity,
            'p' => round($response->main->pressure / 1.333, 1),
            'ws' => $response->wind->speed,
            'wd' => $response->wind->deg,
            'wg' => $response->wind->gust,
            'c'  => $response->clouds->all,
            'r'  => $response->rain->{'1h'} ?? 0,
            's'  => $response->snow->{'1h'} ?? 0,
        ];

        $this->_modelWeather->add(self::DEVICE_ID, json_encode($data));

        $meteo = (object) [
            'p' => round($response->main->pressure / 1.333, 1),
            't1' => round($response->main->temp, 1),
            't2' => round($response->main->temp, 1),
            'h' => $response->main->humidity,
            'lux' => 0,
            'uv' => 0,
            'wd' => $response->wind->deg,
            'ws' => $response->wind->speed
        ];

        $this->_modelWeather->add_meteo(json_encode($meteo));
    }

    private function _endpoint($name)
    {
        $response = $this->_serviceCURL->get(self::API_URL . $name . '&appid=' . getenv('app.openweather.key') . '&units=metric&lang=ru');

        return json_decode($response->getBody());
    }




    /**
     * Weather forecast from OpenWeatherMap service
     * @return object
     */
    public function get_forecast(): object
    {
        if ( ! $foreacst = cache('forecast'))
        {
            $client   = \Config\Services::curlrequest();
            $api_url  = 'http://api.openweathermap.org/data/2.5/forecast' . '?id=' . getenv('app.openweather.city') . '&appid=' . getenv('app.openweather.key') . '&units=metric&lang=ru';
            $response = $client->get($api_url);

            if ($response->getStatusCode() !== 200)
            {
                log_message('error', '[' .  __METHOD__ . '] Data error: ' . $response->getBody());

                return (object) [
                    'status' => false,
                    'code'   => $response->getStatusCode(),
                    'data'   => $response->getBody()
                ];
            }

            $foreacst = $response->getBody();

            cache()->save('foreacst', $foreacst, 600);
        }

        return (object) [
            'status' => true,
            'data'   => json_decode($foreacst)->list
        ];
    }
}