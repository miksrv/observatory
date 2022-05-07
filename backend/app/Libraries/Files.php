<?php namespace App\Libraries;

use App\Models\Files as Model;
use App\Entities\FileList;

class Files
{
    protected Model $_model;

    function __construct()
    {
        $this->_model = new Model();
    }

    function list(): array
    {
        return $this->_model->get_list();
    }

    function names(): array
    {
        $names = [];

        foreach ($this->_model->get_group_names() as $file) {
            $names[] = $file->item_object;
        }

        return $names;
    }

    function list_by_object(string $object): array
    {
        return $this->_make_list($this->_model->get_by_object($object));
    }

    function save_data(object $data): bool
    {
        $headers = [
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
            'item_frame'     => $data->FRAME ?? NULL,
            'item_aptdia'    => isset($data->APTDIA) ? intval($data->APTDIA) : NULL,
            'item_focallen'  => isset($data->FOCALLEN) ? intval($data->FOCALLEN) : NULL,
            'item_comment'   => $data->COMMENT ?? NULL,
            'item_telescop'  => $data->TELESCOP ?? NULL,
            'item_observer'  => $data->OBSERVER ?? NULL,
            'item_instrume'  => $data->INSTRUME ?? NULL,
            'item_pixsize1'  => isset($data->PIXSIZE1) ? floatval($data->PIXSIZE1) : NULL,
            'item_pixsize2'  => isset($data->PIXSIZE2) ? floatval($data->PIXSIZE2) : NULL,
            'item_ccd_temp'  => isset($data->CCD_TEMP) ? floatval($data->CCD_TEMP) : NULL,
            'item_offset'    => isset($data->OFFSET) ? intval($data->OFFSET) : NULL,
            'item_gain'      => isset($data->GAIN) ? intval($data->GAIN) : NULL,
            'item_scale'     => isset($data->SCALE) ? floatval($data->SCALE) : NULL,
            'item_date_obs'  => $data->DATE_OBS ?? NULL,
            'item_equinox'   => $data->EQUINOX ?? NULL,
            'item_filter'    => $data->FILTER ?? 'Luminance',
            'item_dec'       => floatval($data->DEC),
            'item_ra'        => floatval($data->RA),
            'item_object'    => $data->OBJECT ?? NULL,
            'item_objctdec'  => $data->OBJCTDEC ?? NULL,
            'item_objctra'   => $data->OBJCTRA ?? NULL,
            'item_sitelong'  => floatval($data->SITELONG),
            'item_sitelat'   => floatval($data->SITELAT),
            'item_bzero'     => isset($data->BZERO) ? intval($data->BZERO) : 0,
            'item_extend'    => $data->EXTEND ?? NULL,
            'item_airmass'   => floatval($data->AIRMASS),

            'item_star_count' => isset($data->STARS_COUNT) ? intval($data->STARS_COUNT) : NULL,
            'item_sky_background' => isset($data->SKY_BACKGROUND) ? floatval($data->SKY_BACKGROUND) : NULL,
            'item_devitation' => isset($data->DEVIATION) ? floatval($data->DEVIATION) : NULL,
            'item_sigma' => isset($data->SIGMA) ? floatval($data->SIGMA) : NULL,

            'item_hfr'   => isset($data->MEAN_FWHM) ? floatval($data->MEAN_FWHM) : NULL,
            'item_fwhm'  => isset($data->MEAN_SNR) ? floatval($data->MEAN_SNR) : NULL,
        ];

        if ($this->_model->add_new_file_data($headers))
        {
            return true;
        }

        return false;
    }

    protected function _make_list($files): array
    {
        $FileList = new FileList();

        foreach ($files as $file) {
            $FileList->add(
                $file->file_id,
                $file->item_file_name,
                $file->item_date_obs, // #TODO Add GMT+5
                $file->item_filter,
                $file->item_exptime,
                $file->item_ccd_temp,
                $file->item_offset,
                $file->item_gain,
                $file->item_dec,
                $file->item_ra,
            );
        }

        return $FileList->list;
    }
}