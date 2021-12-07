<?php

namespace App\Libraries;

class UserAuth {

    protected $_dataModel;

    function __construct($param = [])
    {
        $this->_dataModel = $dataModel = model('App\Models\AuthModel');
    }

    /**
     * Login user - remove all old tokens for user login and add new
     * @param $login
     * @return string
     */
    function do_login($login): string
    {
        $request = \Config\Services::request();
        $token   = $this->create_token($login);

        $this->_dataModel->delete_by_login($login);
        $this->_dataModel->add_new_token($login, $token, $request->getIPAddress());

        return $token;
    }

    /**
     * Delete user token in store
     * @param $token
     * @return mixed
     */
    function do_logout($token)
    {
        return $this->_dataModel->delete_by_token($token);
    }

    /**
     * Check current user token
     * @param $token
     * @return bool
     */
    function do_check_token($token): bool
    {
        $request   = \Config\Services::request();
        $tokenData = $this->_dataModel->get_by_token($token);

        if (! isset($tokenData[0]) || empty($tokenData[0]) )
        {
            return false;
        }

        if ((time() - $tokenData[0]->user_last_activity > getenv('app.user_session_time')) ||
            $tokenData[0]->user_ip != $request->getIPAddress())
        {
            $this->_dataModel->delete_by_token($token);
            return false;
        }

        $this->_dataModel->update_token_time($token);
        return true;
    }

    /**
     * Generate user token
     * @param $user_login
     * @return string
     */
    function create_token($user_login): string
    {
        $request = \Config\Services::request();

        $token  = $request->getIPAddress();
        $token .= time();
        $token .= $user_login;

        return md5($token);
    }
}