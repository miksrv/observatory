<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class Users extends Model
{
    protected $table = '';

    protected string $key_token    = 'user_token';
    protected string $key_name     = 'user_name';
    protected string $key_activity = 'user_last_activity';
    protected string $key_ip       = 'user_ip';

    protected $db;

    function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_users');
    }

    /**
     * Remove all users token by name
     * @param string $name
     * @return mixed
     */
    function delete_by_name(string $name)
    {
        return $this->_remove($this->key_name, $name);
    }

    /**
     * Delete user session in DB by token
     * @param string $token
     * @return mixed
     */
    function delete_by_token(string $token)
    {
        return $this->_remove($this->key_token, $token);
    }

    /**
     * Return session data by token and user IP
     * @param string $token
     * @return mixed
     */
    function get_by_token(string $token)
    {
        return $this->db->table($this->table)
            ->getWhere([$this->key_token => $token])
            ->getRow();
    }

    /**
     * Create new user token in DB
     * @param string $name
     * @param string $token
     * @param string $ip
     * @return mixed
     */
    function add_new_token(string $name, string $token, string $ip)
    {
        return $this->db->table($this->table)->insert([
            $this->key_token => $token,
            $this->key_name  => $name,
            $this->key_ip    => $ip,
            $this->key_activity => date('Y-m-d H:i:s')
        ]);
    }

    /**
     * Update token last activity
     * @param string $token
     * @return mixed
     */
    function update_token_time(string $token)
    {
        return $this->db->table($this->table)->update(
            [$this->key_activity => date('Y-m-d H:i:s')],
            [$this->key_token => $token]
        );
    }

    protected function _remove(string $field, string $value)
    {
        return $this->db->table($this->table)->delete([$field => $value]);
    }
}