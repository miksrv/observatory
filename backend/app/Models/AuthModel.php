<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class AuthModel extends Model
{
    protected $table      = '';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.users_data');
    }

    /**
     * Remove all users token by login
     * @param $login
     * @return mixed
     */
    function delete_by_login($login)
    {
        return $this->db->table($this->table)->delete(['user_login' => $login]);
    }

    /**
     * Delete user session in DB by token
     * @param $token
     * @return mixed
     */
    function delete_by_token($token)
    {
        return $this->db->table($this->table)->delete(['user_token' => $token]);
    }

    /**
     * Return session data by token and user IP
     * @param $token
     * @return mixed
     */
    function get_by_token($token)
    {
        return $this->db->table($this->table)
                    ->getWhere(['user_token' => $token])
                    ->getResult();
    }

    /**
     * Create new user token in DB
     * @param $login
     * @param $token
     * @param $ip
     */
    function add_new_token($login, $token, $ip)
    {
        return $this->db->table($this->table)->insert([
            'user_token' => $token,
            'user_login' => $login,
            'user_last_activity' => time(),
            'user_ip' => $ip
        ]);
    }

    /**
     * Update token last activity
     * @param $token
     * @return mixed
     */
    function update_token_time($token)
    {
        return $this->db->table($this->table)->update(
            ['user_last_activity' => time()],
            ['user_token' => $token]
        );
    }
}