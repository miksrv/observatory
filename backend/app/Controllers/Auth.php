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
            $this->response->setStatusCode(400)->setJSON(['status' => false])->send();
            exit();
        }

        if ($username != getenv('app.user_username') ||
            $password != getenv('app.user_password'))
        {
            log_message('error', '[' . __METHOD__ . '] Wrong login or password (' . $username . ':' . $password . ')');
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }

        $this->_token = $this->_lib->do_login($username, $this->request->getIPAddress());

        log_message('info', '[' . __METHOD__ . '] New session (' . $username . ':' . $this->_token . ')');
        $this->response->setStatusCode(200)->setJSON(['status' => true, 'token' => $this->_token])->send();
        exit();
    }

    function logout()
    {
        $this->_lib->do_logout($this->request->getHeaderLine('AuthToken'));
        $this->response->setStatusCode(200)->setJSON(['status' => true, 'token' => null])->send();
        exit();
    }

    function check()
    {
        if (empty($this->_token))
        {
            $this->response->setStatusCode(200)->setJSON(['status' => false, 'token' => null])->send();
            exit();
        }

        if ( ! $this->_lib->do_check_token($this->_token, $this->request->getIPAddress()))
        {
            $this->response->setStatusCode(200)->setJSON(['status' => false, 'token' => null])->send();
            exit();
        }

        $this->response->setStatusCode(200)->setJSON(['status' => true, 'token' => $this->_token])->send();
        exit();
    }
}
