<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class Auth extends BaseController
{
    function login()
    {
        $request   = \Config\Services::request();
        $inputJSON = (array) $request->getJSON();

        echo '<pre>';
        var_dump($inputJSON['username']);
        exit();

        $username = $inputJSON->username;
        $password = $inputJSON->password;

        if (empty($userLogin) || empty($userPassw))
        {
            log_message('error', '[' . __METHOD__ . '] Empty auth data (' . $userLogin . ')');
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }

        if ($userLogin != getenv('app.user_username') ||
            $userPassw != getenv('app.user_password'))
        {
            log_message('error', '[' . __METHOD__ . '] Wrong login or password (' . $userLogin . ':' . $userPassw . ')');
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            exit();
        }
//
//        $UserAuth = new UserAuth();
//
//        $token = $UserAuth->do_login($userLogin);
//
//        log_message('info', '[' . __METHOD__ . '] New session (' . $userLogin . ':' . $token . ')');
        $this->response->setStatusCode(200)->setJSON(['status' => true, 'token' => 'example'])->send();
        exit();
    }

    function logout()
    {

    }

    function check()
    {

    }
}
