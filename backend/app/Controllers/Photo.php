<?php namespace App\Controllers;

use App\Models\PhotoModel;
use App\Libraries\Photo as libPhoto;
use App\Libraries\FITS as libFITS;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

/**
 * Class Photo
 * @package App\Controllers
 */
class Photo extends BaseController
{
    protected $_libPhoto;
    protected $_libFITS;

    function __construct()
    {
        $this->_libPhoto = new libPhoto();
        $this->_libFITS  = new libFITS();
    }

    function get($action)
    {
        $request = \Config\Services::request();

        switch ($action)
        {
            case 'list' :
                $this->response->setJSON([
                    'status' => true,
                    'photos' => $this->_libPhoto->get_list()
                ])->send();

                break;

            case 'item' :
                $varName  = $request->getVar('name', FILTER_SANITIZE_STRING);
                $varDate  = $request->getVar('date', FILTER_SANITIZE_STRING);
                $objPhoto = $this->_libPhoto->get_item($varName, $varDate);
                $objData  = $this->_libFITS->get_object_info($varName);

                if (!$objPhoto) $this->_send_error(__METHOD__, "Empty photo data ($varName)");

                $this->response->setJSON(array_merge(['status' => true], $objPhoto, $objData))->send();

                break;

            case 'download' :
                $varName  = $request->getVar('name', FILTER_SANITIZE_STRING);
                $varDate  = $request->getVar('date', FILTER_SANITIZE_STRING);
                $objPhoto = $this->_libPhoto->get_item($varName, $varDate);

                if (!$objPhoto) $this->_send_error(__METHOD__, "Empty photo data ($varName)");

                $this->_download($_SERVER['DOCUMENT_ROOT'] . '/public/photo/' . $objPhoto['photo']->file . '.jpg');

                break;

            default : throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Response application/octet-stream for file download
     * @param string $filePath
     */
    protected function _download(string $filePath) {
        if ( ! file_exists($filePath)) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }

        header('Content-Type: application/octet-stream');
        header("Content-Transfer-Encoding: Binary");
        header("Content-disposition: attachment; filename=\"" . basename($filePath) . "\"");
        readfile($filePath);
    }

    /**
     * Send JSON error
     * @param string $method
     * @param string $log
     */
    protected function _send_error(string $method, string $log)
    {
        log_message('error', '[' . $method . '] ' . $log);

        $this->response->setJSON(['status' => false])->send();

        exit();
    }
}