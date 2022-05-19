<?php namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class Camera extends BaseController
{
    const CACHE_TIME = 15;

    function get(int $id = null)
    {
        $param = getenv('app.observatory.webcam_' . $id);
        $cache = 'webcam_' . $id;

        if (!$param) {
            throw PageNotFoundException::forPageNotFound();
        }

        if ( ! $photo = cache($cache))
        {
            try {
                $photo = file_get_contents($param);
            } catch (\Exception $e) {
                $photo = file_get_contents(FCPATH . '/images/camera_offline.png');
            }

            cache()->save($cache, $photo, self::CACHE_TIME);
        }

        $this->response->setHeader('Content-Type', 'image/pjpeg')->setBody($photo)->send();
    }
}
