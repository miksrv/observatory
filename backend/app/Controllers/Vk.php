<?php

namespace App\Controllers;

header('Access-Control-Allow-Origin: *');

/**
 * Class Vkontakte
 * @package App\Controllers
 */
class Vk extends BaseController
{
    const API_URL = 'https://api.vk.com/method/';

    function get($action)
    {
        $request = \Config\Services::request();
        $client  = \Config\Services::curlrequest();

        switch ($action)
        {
            // Summary data on sensors of the observatory
            case 'wall' :
                $limit    = $request->getGet('limit');
                $offset   = $request->getGet('offset');
                $api_url  = self::API_URL . 'wall.get?domain=' . getenv('app.vkapi.domain')
                          . '&v=' . getenv('app.vkapi.version')
                          . '&access_token=' . getenv('app.vkapi.token')
                          . '&count=' . ($limit ?: 4)
                          . '&offset=' . ($offset ? $offset : 0);
                $response = $client->get($api_url, ['headers' => [CURLOPT_ENCODING => '']]);
                $this->response->setStatusCode(200)->setJSON( json_decode($response->getJSON()) )->send();

                break;

            default : throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }
    }
}