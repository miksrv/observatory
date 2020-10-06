<?php namespace App\Controllers;

class Set extends BaseController
{

    /**
     * Device data
     * @var
     */
    protected $rawData;

    /**
     * Device request source string
     * @var
     */
    protected $rawInput;

    public function sensor() {
        $this->rawInput = '?';
        $this->rawData  = [];

        $source = (object) $this->request->getPost();
        //$source = (object) $this->request->getGet();

        foreach ($source as $key => $val)
        {
            $this->rawInput     .= $key . '=' . $val . (end($source) != $val ? '&' : NULL);
            $this->rawData[$key] = (float) $val;
        }

        unset($this->rawData['id']);

        $db = \Config\Database::connect();
        $db->table('astro_sensor_data')->insert([
            'item_id'        => uniqid(),
            'item_raw_data'  => json_encode($this->rawData),
            'item_timestamp' => date("Y-m-d H:i:s")
        ]);

        $response = ['state' => TRUE, 'data' => 'Data accepted'];
        $this->_response($response, 200);
    }

    /**
     * Generates an answer for the client
     * @param $data
     */
    protected function _response($data, $code = 400)
    {
        $this->response
            ->setStatusCode($code)
            ->setJSON($data)
            ->send();

        exit();
    }

    public function data()
    {
        $request = \Config\Services::request();
        
        //$json  = '{"YPIXSZ":"3.800000E+00","NAXIS":"2","XBINNING":"1","YBINNING":"1","EXPTIME":"6.000000E+02","FRAME":"Light","FILE_NAME":"IC_5146_Light_Ha_600_secs_2020-06-02T02-17-59_005.fits","APTDIA":"2.00E+02","COMMENT":"FITS (Flexible Image Transport System) format is defined in \'Astronomy and Astrophysics\', volume 376, page 359; bibcode: 2001A&A...376..359H Generated by INDI ","TELESCOP":"EQMod Mount","PIXSIZE2":"3.800000E+00","PIXSIZE1":"3.800000E+00","CCD_TEMP":"-1.00E+01","OFFSET":"10.","SCALE":"7.839400E-01","DATE_OBS":"2020-06-01T21:07:48.949","GAIN":"90.","EQUINOX":"2000","FILTER":"Ha","DEC":"4.729267E+01","INSTRUME":"ZWO CCD ASI1600MM Pro","BZERO":"32768","EXTEND":"T","OBJCTRA":"21 53 41.34","OBJECT":"IC_5146","SITELONG":"5.525670E+01","OBJCTDEC":"47 17 33.63","SITELAT":"5.171890E+01","RA":"3.284222E+02","AIRMASS":"1.330899E+00","NAXIS2":"3520","NAXIS1":"4656","BSCALE":"1","SIMPLE":"T","BITPIX":"16","XPIXSZ":"3.800000E+00","FOCALLEN":"1.00E+03","OBSERVER":"Mikhail Topchilo"}';
        
        $RAW = $request->getJSON();
        if ( ! is_object($RAW) || ! isset($RAW->OBJECT)) {
            return ;
        }

        $FITS_header = [
            'file_id' => md5($RAW->FILE_NAME),
            'item_file_name' => $RAW->FILE_NAME,
            'item_ypixsz' => floatval($RAW->YPIXSZ),
            'item_xpixsz' => floatval($RAW->XPIXSZ),
            'item_naxis1' => intval($RAW->NAXIS1),
            'item_naxis2' => intval($RAW->NAXIS2),
            'item_naxis' => intval($RAW->NAXIS),
            'item_bscale' => intval($RAW->BSCALE),
            'item_simple' => intval($RAW->SIMPLE),
            'item_bitpix' => intval($RAW->BITPIX),
            'item_xbinning' => intval($RAW->XBINNING),
            'item_ybinning' => intval($RAW->YBINNING),
            'item_exptime' => intval($RAW->EXPTIME),
            'item_frame' => $RAW->FRAME,
            'item_aptdia' => intval($RAW->APTDIA),
            'item_focallen' => intval($RAW->FOCALLEN),
            'item_comment' => $RAW->COMMENT,
            'item_telescop' => $RAW->TELESCOP,
            'item_observer' => $RAW->OBSERVER,
            'item_instrume' => $RAW->INSTRUME,
            'item_pixsize1' => floatval($RAW->PIXSIZE1),
            'item_pixsize2' => floatval($RAW->PIXSIZE2),
            'item_ccd_temp' => floatval($RAW->CCD_TEMP),
            'item_offset' => intval($RAW->OFFSET),
            'item_gain' => intval($RAW->GAIN),
            'item_scale' => floatval($RAW->SCALE),
            'item_date_obs' => $RAW->DATE_OBS,
            'item_equinox' => $RAW->EQUINOX,
            'item_filter' => $RAW->FILTER,
            'item_dec' => floatval($RAW->DEC),
            'item_ra' => floatval($RAW->RA),
            'item_object' => $RAW->OBJECT,
            'item_objctdec' => $RAW->OBJCTDEC,
            'item_objctra' => $RAW->OBJCTRA,
            'item_sitelong' => floatval($RAW->SITELONG),
            'item_sitelat' => floatval($RAW->SITELAT),
            'item_bzero' => intval($RAW->BZERO),
            'item_extend' => $RAW->EXTEND,
            'item_airmass' => floatval($RAW->AIRMASS),
        ];

        $db = \Config\Database::connect();
        $db->table('astro_fits_data')->insert($FITS_header);

        exit();
    }
}
