<?php namespace App\Libraries;

use App\Models\Users;

class Auth
{
    protected Users $_model;

    function __construct()
    {
        $this->_model = new Users();
    }

    /**
     * Login user - remove all old tokens for user login and add new
     * @param string $username
     * @param string $userIP
     * @return string
     */
    function do_login(string $username, string $userIP): string
    {
        $token   = $this->create_token($username, $userIP);

        $this->_model->delete_by_name($username);
        $this->_model->add_new_token($username, $token, $userIP);

        return $token;
    }

    /**
     * Delete user token in store
     * @param string $token
     * @return mixed
     */
    function do_logout(string $token)
    {
        return $this->_model->delete_by_token($token);
    }

    /**
     * Check current user token
     * @return bool
     */
    function check(): bool
    {
        $Request = \Config\Services::request();
        $userIP  = $Request->getIPAddress();
        $token   = $Request->getHeaderLine('AuthToken');

        $tokenData = $this->_model->get_by_token($token);

        if (empty($tokenData))
        {
            return false;
        }

        if ((time() - strtotime($tokenData->user_last_activity) > getenv('app.user_session_time')) ||
            $tokenData->user_ip != $userIP)
        {
            $this->_model->delete_by_token($token);
            return false;
        }

        $this->_model->update_token_time($token);
        return true;
    }

    /**
     * Generate user token
     * @param string $username
     * @param string $userIP
     * @return string
     */
    function create_token(string $username, string $userIP): string
    {
        $token  = $userIP;
        $token .= time();
        $token .= $username;

        return md5($token);
    }
}