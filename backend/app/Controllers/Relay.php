<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

use App\Libraries\Auth as libAuth;

class Relay extends BaseController
{

    protected libAuth $_auth;
    protected string $_token;
    protected $request;

    protected int $_cmd_set = 5;
    protected int $_cmd_get = 10;

    protected array $relayList = [
        'Блок питания 12В',
        '[Не задействовано]',
        'Монтировка (EQ6 Pro)',
        'Контроллер грелок',
        'Фокусер ZWO EAF',
        'Камера (ZWO ASI 1600mm)',
        '[Не задействовано]',
        '[Не задействовано]',
        'LED Flat панель'
    ];

    function __construct()
    {
        $this->request = \Config\Services::request();

        $this->_auth = new libAuth();
        $this->_token = $this->request->getHeaderLine('AuthToken');
    }

    function list()
    {
        $this->_response($this->relayList);
    }

    function state()
    {
        try {
            $client   = \Config\Services::curlrequest();
            $response = $client->get(getenv('app.observatory.controller') . '?command=' . $this->_cmd_get);

            $json = json_decode($response->getBody());
            $result = [];

            foreach ($json->relay as $key => $item)
            {
                foreach ($item as $state)
                {
                    $result[$key] = $state;
                }
            }

            $this->_response($result);
        } catch (\Exception $e) {
            $this->_response(null);
        }
    }

    function set()
    {
        if (!$this->_auth->check())
        {
            log_message('error', '[' .  __METHOD__ . '] Empty or wrong AuthToken');
            $this->_response(null);
        }

        $inputJSON = $this->request->getJSON();

        if (empty($inputJSON))
        {
            exit();
        }

        $index = $inputJSON->index ?? null;
        $state = $inputJSON->state ?? null;

        if (is_null($index) || is_null($state))
        {
            log_message('error', '[' .  __METHOD__ . '] Empty device (' . $index . ') or status (' . $state . ')');
            $this->_response(null);
        }

        log_message('info', '[' .  __METHOD__ . '] Set device (' . $index . ') status (' . $state . ')');

        $client = \Config\Services::curlrequest();
        $response = $client->get(getenv('app.observatory.controller') . '?command=' . $this->_cmd_set . '&pin=' . $index . '&set=' . $state);

        $this->_response($response->getBody());
    }

    function _response($data)
    {
        $this->response->setStatusCode(200)->setJSON([
            'status'  => (bool) $data,
            'payload' => $data
        ])->send();

        exit();
    }
}
