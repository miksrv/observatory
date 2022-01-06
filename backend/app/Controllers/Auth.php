<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

use App\Libraries\Auth as libAuth;

class Auth extends BaseController
{

    protected libAuth $_lib;
    protected string $_token;
    protected $request;

    function __construct()
    {
        $this->request = \Config\Services::request();

        $this->_lib = new libAuth();
        $this->_token = $this->request->getHeaderLine('AuthToken');
    }

    function login()
    {
        $inputJSON = $this->request->getJSON();

        if (empty($inputJSON))
        {
            exit();
        }

        $username = $inputJSON->username ?? null;
        $password = $inputJSON->password ?? null;

        if (!$username || !$password)
        {
            $this->_response();
        }

        if ($username != getenv('app.user_username') ||
            $password != getenv('app.user_password'))
        {
            log_message('error', '[' . __METHOD__ . '] Wrong login or password (' . $username . ':' . $password . ')');
            $this->_response();
        }

        $this->_token = $this->_lib->do_login($username, $this->request->getIPAddress());

        log_message('info', '[' . __METHOD__ . '] New session (' . $username . ':' . $this->_token . ')');
        $this->_response();
    }

    function logout()
    {
        $this->_lib->do_logout($this->request->getHeaderLine('AuthToken'));
        $this->_token = '';
        $this->_response();
    }

    function check()
    {
        if (empty($this->_token) || ! $this->_lib->check())
        {
            $this->_token = '';
            $this->_response();
        }

        $this->_response();
    }

    function _response()
    {
        $this->response->setStatusCode(200)->setJSON([
            'status' => (bool) $this->_token,
            'token'  => $this->_token
        ])->send();

        exit();
    }
}
