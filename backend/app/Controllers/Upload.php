<?php namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;
use App\Libraries\Files;

define('IMAGE_PATH', FCPATH . 'uploads/');

class Upload extends BaseController
{
    function image()
    {
        $request = \Config\Services::request();
        $files = $request->getFiles();

        if (!$files)
        {
            throw PageNotFoundException::forPageNotFound();
        }

        foreach ($files as $key => $file)
        {
            $dirName = IMAGE_PATH . $key . '/';

            if (!file_exists($dirName))
            {
                mkdir($dirName, 0777, true);
            }

            if (! $file->hasMoved()) {
                $file->move($dirName, $file->getClientName());

                $fileInfo = pathinfo($dirName . $file->getName());

                \Config\Services::image()
                    ->withFile($dirName . $file->getName())
                    ->resize(500, 500, true, 'height')
                    ->save($dirName . $fileInfo['filename'] . '_thumb.' . $fileInfo['extension']);

                $this->response->setStatusCode(200)->setJSON(['status' => true])->send();
            } else {
                $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
            }
        }

        exit();
    }

    function fit_data()
    {
        $request = \Config\Services::request();
        $RAWData = json_decode($request->getJSON());

        if (empty($RAWData) || ! isset($RAWData->OBJECT) || ! isset($RAWData->FILE_NAME))
        {
            log_message('error', '[' . __METHOD__ . '] Empty RAW data (' . json_encode($RAWData) . ')');
            $this->response->setStatusCode(400)->setJSON(['status' => false])->send();

            exit();
        }

        $Files  = new Files();

        if ($Files->save_data($RAWData)) {
            $this->response->setStatusCode(200)->setJSON(['status' => true])->send();
        } else {
            $this->response->setStatusCode(200)->setJSON(['status' => false])->send();
        }

        exit();
    }
}
