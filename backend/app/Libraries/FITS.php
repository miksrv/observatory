<?php

namespace App\Libraries;

use App\Models\FITS as modelFITS;

class FITS
{
    protected $fit_header = [];
    protected $_dataModel;

    // FIT file size in byte for 16 bit mask
    const FITS_FILE_SIZE = 32.78592; // in Mb

    function __construct()
    {
        $this->_dataModel = new modelFITS();
        
        helper(['transform']);
    }

    /**
     * Create array from input FITS file data
     * @param object $data
     * @return array
     */
    function create_fit_array(object $data): array
    {
        return $this->fit_header = [
            'file_id'        => md5($data->FILE_NAME),
            'item_file_name' => $data->FILE_NAME,
            'item_ypixsz'    => isset($data->YPIXSZ) ? floatval($data->YPIXSZ) : NULL,
            'item_xpixsz'    => isset($data->XPIXSZ) ? floatval($data->XPIXSZ) : NULL,
            'item_naxis1'    => isset($data->NAXIS1) ? intval($data->NAXIS1) : NULL,
            'item_naxis2'    => isset($data->NAXIS2) ? intval($data->NAXIS2) : NULL,
            'item_naxis'     => isset($data->NAXIS) ? intval($data->NAXIS) : NULL,
            'item_bscale'    => isset($data->BSCALE) ? intval($data->BSCALE) : 0,
            'item_simple'    => isset($data->SIMPLE) ? intval($data->SIMPLE) : NULL,
            'item_bitpix'    => isset($data->BITPIX) ? intval($data->BITPIX) : NULL,
            'item_xbinning'  => isset($data->XBINNING) ? intval($data->XBINNING) : NULL,
            'item_ybinning'  => isset($data->YBINNING) ? intval($data->YBINNING) : NULL,
            'item_exptime'   => isset($data->EXPTIME) ? intval($data->EXPTIME) : NULL,
            'item_frame'     => isset($data->FRAME) ? $data->FRAME : NULL,
            'item_aptdia'    => isset($data->APTDIA) ? intval($data->APTDIA) : NULL,
            'item_focallen'  => isset($data->FOCALLEN) ? intval($data->FOCALLEN) : NULL,
            'item_comment'   => $data->COMMENT,
            'item_telescop'  => $data->TELESCOP,
            'item_observer'  => $data->OBSERVER,
            'item_instrume'  => $data->INSTRUME,
            'item_pixsize1'  => isset($data->PIXSIZE1) ? floatval($data->PIXSIZE1) : NULL,
            'item_pixsize2'  => isset($data->PIXSIZE2) ? floatval($data->PIXSIZE2) : NULL,
            'item_ccd_temp'  => floatval($data->CCD_TEMP),
            'item_offset'    => intval($data->OFFSET),
            'item_gain'      => intval($data->GAIN),
            'item_scale'     => isset($data->SCALE) ? floatval($data->SCALE) : NULL,
            'item_date_obs'  => $data->DATE_OBS,
            'item_equinox'   => $data->EQUINOX,
            'item_filter'    => $data->FILTER,
            'item_dec'       => floatval($data->DEC),
            'item_ra'        => floatval($data->RA),
            'item_object'    => $data->OBJECT,
            'item_objctdec'  => $data->OBJCTDEC,
            'item_objctra'   => $data->OBJCTRA,
            'item_sitelong'  => floatval($data->SITELONG),
            'item_sitelat'   => floatval($data->SITELAT),
            'item_bzero'     => isset($data->BZERO) ? intval($data->BZERO) : 0,
            'item_extend'    => $data->EXTEND,
            'item_airmass'   => floatval($data->AIRMASS),

            'item_hfr'   => isset($data->HFR) ? floatval($data->HFR) : NULL,
            'item_fwhm'  => isset($data->FWHM_INFO) ? floatval($data->FWHM_INFO->FWHM) : NULL,
            'item_sigma' => isset($data->FWHM_INFO) ? floatval($data->FWHM_INFO->SIGMA) : NULL,
        ];
    }

    /**
     * Delete file by ID
     * @param string $fileID
     * @return bool
     */
    public function delete(string $fileID): bool
    {
        if (empty($fileID)) return false;

        $this->_dataModel->delete_by_id($fileID);

        return true;
    }

    /**
     * Save FIT header in database
     * @param array $data
     * @return bool
     */
    function save_fit(array $data = []): bool
    {
        $data = (empty($data) ? $this->fit_header : $data);

        if (empty($data)) return false;

        $this->_dataModel->add_fit($data);

        return true;
    }

    /**
     * Return object info by name
     * @param string $name
     * @return array
     */
    public function get_object_info(string $name): array
    {
        $arrData   = $this->_dataModel->get_by_name($name);
        $objReturn = ['object' => null];

        if (empty($arrData)) return $objReturn;

        $objReturn['object'] = [
            'ra'  => $arrData[0]->item_ra,
            'dec' => $arrData[0]->item_dec
        ];

        return $objReturn;
    }

    /**
     * Return JSON data for statistic chart - observatory last 10 month exp, frames and object per month
     * @return object
     */
    public function month_period_statistic() {
        $dataFITs = $this->_dataModel->get_by_month_period(10);

        $result = [];

        foreach ($dataFITs as $item)
        {
            $date = date('Y-m', strtotime($item->item_date_obs));
            $date = strtotime($date) * 1000;

            if ( ! isset($result[$date]))
                $result[$date] = [
                    'exp'    => $item->item_exptime,
                    'count'  => 1,
                    'object' => [$item->item_object]
                ];

            else {
                $_obj = $result[$date]['object'];
                if (! in_array($item->item_object, $_obj))
                    array_push($_obj, $item->item_object);

                $result[$date] = [
                    'exp'    => $result[$date]['exp'] + $item->item_exptime,
                    'count'  => $result[$date]['count'] + 1,
                    'object' => $_obj
                ];
            }
        }

        $exp  = [];
        $shot = [];
        $obj  = [];

        foreach ($result as $key => $val)
        {
            $exp[]  = [$key, round($val['exp'] / 60 / 60, 1)];
            $shot[] = [$key, $val['count']];
            $obj[]  = [$key, count($val['object'])];
        }

        return (object) [
            'exp'  => $exp,
            'shot' => $shot,
            'obj'  => $obj
        ];
    }

    /**
     * Creates a summary array of objects and general statistics for frames, exposure
     * @return object
     */
    public function statistics(): object
    {
        $dataFITs = $this->_dataModel->get_all();

        $total_frame = $total_exp = 0;

        $objects  = [];
        $template = [
            'name'  => '',
            'total' => 0,
            'frame' => 0,
            'l' => 0,
            'r' => 0,
            'g' => 0,
            'b' => 0,
            'h' => 0,
            'o' => 0,
            's' => 0,
        ];
        $filter_map = [
            'Luminance' => 'l', 'Red' => 'r', 'Green' => 'g',
            'Blue' => 'b', 'Ha' => 'h', 'OIII' => 'o', 'SII' => 's'
        ];

        foreach ($dataFITs as $row)
        {

            if ($row->item_frame != 'Light') {
                continue;
            }

            $total_exp   += $row->item_exptime;
            $total_frame += 1;

            $key = array_search($row->item_object, array_column($objects, 'name'));

            if ($key === false)
            {
                $_tmp = $template;
                $_tmp['name'] = $row->item_object;

                $objects[] = $_tmp;

                end($objects);

                $key = key($objects);
            }

            $objects[$key]['date']   = (! isset($objects[$key]['date']) || $objects[$key]['date'] < $row->item_date_obs ? $row->item_date_obs : $objects[$key]['date']);
            $objects[$key]['total'] += $row->item_exptime;
            $objects[$key]['frame'] += 1;

            $objects[$key][ $filter_map[$row->item_filter] ] += $row->item_exptime;
        }

        return (object) [
            'frames'    => $total_frame,
            'exposure'  => $total_exp,
            'filesize'  => round($total_frame * self::FITS_FILE_SIZE),
            'objects'   => count($objects),
            'statistic' => $objects,
        ];
    }

    /**
     * Create month archive stats per day
     * @param null $month
     * @param null $year
     * @return object
     */
    function archive($month = null, $year = null): object
    {
        if (empty($month) || empty($year))
        {
            $month = date('m');
            $year  = date('Y');
        }

        $dataFITs = $this->_dataModel->get_by_month($month, $year);

        if (empty($dataFITs))
        {
            return (object)[
                'status' => false,
            ];
        }

        $_dataTmp = $result = [];

        foreach ($dataFITs as $row)
        {
            $_date = date('d', strtotime($row->item_date_obs));

            if (! isset($_dataTmp[$_date]))
            {
                $_dataTmp[$_date] = [
                    'frames'   => 1,
                    'exposure' => $row->item_exptime
                ];
            }
            else
            {
                $_dataTmp[$_date]['frames']   += 1;
                $_dataTmp[$_date]['exposure'] += $row->item_exptime;
            }
        }

        foreach ($_dataTmp as $day => $row)
        {
            $date     = $day . '.' . $month . '.' . $year;
            $result[$date] = [
                'frames'   => (int) $row['frames'],
                'exposure' => (int) ($row['exposure'] / 60)
            ];
        }
        
        return (object) [
            'status' => true,
            'data'   => $result
        ];
    }

    /**
     * Return statistic by object name
     * @param string $name
     * @return object
     */
    function statistics_object(string $name): object
    {
        return $this->_get_statistic($this->_dataModel->get_by_name($name));
    }

    /**
     * Create stats array from input FITS data
     * @param array $data
     * @param string|null $name
     * @param string|null $shooting_date
     * @return object
     */
    function get_fits_stat(array $data = [], string $name = null, string $shooting_date = null): object
    {
        if (empty($data)) $data = $this->_dataModel->get_by_name($name);

        $result = (object) [
            'exp'  => 0,
            'shot' => 0,
            'size' => 0,
            'filters' => (object) [
                'Luminance' => (object) ['exp' => 0, 'shot' => 0],
                'Red'       => (object) ['exp' => 0, 'shot' => 0],
                'Green'     => (object) ['exp' => 0, 'shot' => 0],
                'Blue'      => (object) ['exp' => 0, 'shot' => 0],
                'Ha'        => (object) ['exp' => 0, 'shot' => 0],
                'OIII'      => (object) ['exp' => 0, 'shot' => 0],
                'SII'       => (object) ['exp' => 0, 'shot' => 0]
            ]
        ];

        foreach ($data as $row)
        {
            if ($shooting_date !== null && strtotime($row->item_date_obs) > strtotime($shooting_date)) continue;

            $filterName = $row->item_filter;

            $result->exp  += $row->item_exptime;
            $result->shot += 1;
            $result->filters->$filterName->exp  += $row->item_exptime;
            $result->filters->$filterName->shot += 1;
        }

        $result->size = round($result->shot * self::FITS_FILE_SIZE);

        return $result;
    }

    /**
     * Return statistic by shooting date
     * @param string $date format (Y-m-d)
     * @return object
     */
    function statistics_day(string $date): object
    {
        return $this->_get_statistic($this->_dataModel->get_by_date($date));
    }

    /**
     * Create objects statistic by FIT object
     * @param $data
     * @return object
     */
    protected function _get_statistic($data): object
    {
        $total_exp  = 0;

        foreach ($data as $row)
            $total_exp += $row->item_exptime;

        return (object) [
            'status' => count($data) > 0,
            'stats'  => $this->get_fits_stat($data),
            'files'  => $data,
        ];
    }
}