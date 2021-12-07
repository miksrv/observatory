<?php

namespace App\Libraries;

use Exception;

/**
 * nooa.gov library
 */

class NooaData {
    // OpenWeather API URL
    const API_URL = 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json';

    // OpenWeatherMap result cache time in sec
    const CACHE_TIME = 300;

    /**
     * Weather forecast from OpenWeatherMap service
     * @return object
     * @throws Exception
     */
    public function get_kindex(): object
    {

        if ( ! $kindex = cache('kindex'))
        {
            $client   = \Config\Services::curlrequest();
            $request = $client->get(self::API_URL);

            if ($request->getStatusCode() !== 200)
            {
                log_message('error', '[' .  __METHOD__ . '] Data error: ' . $request->data);

                return (object) [
                    'status' => false
                ];
            }

            $kindex = json_decode($request->getBody());

            if ( ! is_array($kindex) || empty($kindex))
                return (object) ['status' => false];

            cache()->save('kindex', $kindex, self::CACHE_TIME);
        }

        $data = $this->_make_graph_data($kindex);

        return (object) [
            'status' => true,
            'data'   => $data
        ];
    }

    /**
     * Create data chart from array
     * @param array $data
     * @return array
     * @throws Exception
     */
    protected function _make_graph_data(array $data): array
    {
        $result = [];

        foreach ($data as $item)
        {
            $date = new \DateTime($item->time_tag);
            $date->modify('+5 hours');

            $result[] = [
                $date->getTimestamp() * 1000,
                $item->kp_index
            ];
        }

        return $result;
    }
}