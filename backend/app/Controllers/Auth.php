<?php

namespace App\Controllers;
use App\Libraries\UserAuth;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

/**
 * @package App\Controllers
 */
class Auth extends BaseController
{

    function login()
    {
        $request = \Config\Services::request();
        $RAWData = $request->getJSON();

        $userLogin = $RAWData->login;
        $userPassw = $RAWData->passw;

        if (empty($userLogin) || empty($userPassw))
        {
            log_message('error', '[' . __METHOD__ . '] Empty auth data (' . $userLogin . ')');
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }

        if ($userLogin != getenv('app.user_login') ||
            $userPassw != getenv('app.user_passw'))
        {
            log_message('error', '[' . __METHOD__ . '] Wrong login or password (' . $userLogin . ':' . $userPassw . ')');
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }

        $UserAuth = new UserAuth();

        $token = $UserAuth->do_login($userLogin);

        log_message('info', '[' . __METHOD__ . '] New session (' . $userLogin . ':' . $token . ')');
        $this->response->setStatusCode(200)->setJSON(['status' => true, 'token' => $token])->send();
        exit();
    }

    function logout()
    {
        $UserAuth = new UserAuth();

        $UserAuth->do_logout($this->request->getHeaderLine('AuthToken'));

        exit();
    }

    function check()
    {
        $UserAuth = new UserAuth();

        $token = $this->request->getHeaderLine('AuthToken');

        if (empty($token))
        {
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }

        if ( ! $UserAuth->do_check_token($token))
        {
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }

        $this->response->setStatusCode(200)->setJSON(['status' => true])->send();
        exit();
    }
}