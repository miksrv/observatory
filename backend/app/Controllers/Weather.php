<?php namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;
use App\Libraries\Sensors;
use App\Libraries\SensorsSummary;
use App\Libraries\OpenWeather as libOpenWeather;
use App\Libraries\NooaData;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

class Weather extends BaseController
{
    private $_libOpenWeather;

    function __construct() {
        $this->_libOpenWeather = new libOpenWeather();
    }

    function get($action)
    {
        switch ($action)
        {
            case 'parse' :
                $this->_libOpenWeather->parse();
                break;

            default : throw PageNotFoundException::forPageNotFound();
        }
    }
}