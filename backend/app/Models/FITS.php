<?php namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Validation\ValidationInterface;

class FITS extends Model
{
    protected $table = '';

    protected $keyDate = 'item_date_obs';
    protected $keyName = 'item_object';

    protected $db;

    public function __construct(ConnectionInterface &$db = null, ValidationInterface $validation = null)
    {
        parent::__construct($db, $validation);

        $this->table = getenv('database.table.astro_fits');
    }

    /**
     * Add FITS file to database
     * @param array $data
     * @return mixed
     */
    function add_fit(array $data)
    {
        return $this->db->table($this->table)->insert($data);
    }

    /**
     * Return full FITS data for create total statistic
     * @return mixed
     */
    function get_all()
    {
        return $this->db
            ->table($this->table)
            ->select('item_frame, item_exptime, item_object, item_filter, item_date_obs')
            ->get()
            ->getResult();
    }

    /**
     * Delete FITS file in database
     * @param string $id
     * @return mixed
     */
    function delete_by_id(string $id)
    {
        return $this->db->table($this->table)->delete(['file_id' => $id]);
    }

    /**
     * @param string $name
     * @return mixed
     */
    function get_by_name(string $name)
    {
        return $this->db
            ->table($this->table)
            ->select('file_id, item_file_name, item_exptime, item_date_obs, 
                      item_filter, item_object, item_ccd_temp, item_offset, item_gain,
                      item_dec, item_ra')
            ->orderBy($this->keyDate, 'DESC')
            ->getWhere([$this->keyName => $name])
            ->getResult();
    }

    /**
     * Return FITS data by day $date (%Y-%m-%d)
     * @param string $date
     * @return mixed
     */
    function get_by_date(string $date)
    {
        return $this->db
            ->table($this->table)
            ->select('file_id, item_file_name, item_exptime, item_date_obs, 
                      item_filter, item_object, item_ccd_temp, item_offset, item_gain')
            ->orderBy($this->keyDate, 'DESC')
            ->getWhere("DATE_FORMAT($this->keyDate, '%Y-%m-%d') = '{$date}'")
            ->getResult();
    }

    /**
     * Return all FITS data per $month and $year
     * @param string $month
     * @param string $year
     * @return mixed
     */
    function get_by_month(string $month, string $year)
    {
        return $this->db
            ->table($this->table)
            ->select('item_date_obs, item_exptime')
            ->orderBy($this->keyDate, 'DESC')
            ->getWhere(['YEAR(item_date_obs)' => $year, 'MONTH(item_date_obs)' => $month])
            ->getResult();
    }


    /**
     * Return FITS data by last $month_period
     * @param integer $month_period
     * @return mixed
     */
    function get_by_month_period(int $month_period)
    {
        return $this->db
            ->table($this->table)
            ->select('item_exptime, item_date_obs, item_object')
            ->orderBy($this->keyDate, 'DESC')
            ->getWhere("$this->keyDate > DATE_SUB(NOW(), INTERVAL $month_period MONTH)")
            ->getResult();
    }
}