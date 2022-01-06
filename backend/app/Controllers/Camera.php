<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class Camera extends BaseController
{
    function get()
    {
        if ( ! $photo = cache('webcam_photo'))
        {
            try {
                $photo = file_get_contents(getenv('app.observatory.webcam'));
            } catch (\Exception $e) {
                $photo = file_get_contents(FCPATH . '/images/camera_offline.png');
            }

            cache()->save('webcam_photo', $photo, 15);
        }

        $this->response->setHeader('Content-Type', 'image/pjpeg')->setBody($photo)->send();
    }
}
