<?php namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

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
}
