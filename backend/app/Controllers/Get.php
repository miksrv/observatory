<?php namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

use App\Libraries\Objects;
use App\Libraries\Catalog;
use App\Libraries\Files;
use App\Libraries\Photos;
use App\Libraries\Statistic;
use App\Libraries\Sensors;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class Get extends BaseController
{
    /**
     * Объекты (виртуальные, из файлов берутся)
     */
    function object($what = null)
    {
        $Objects = new Objects();
        $object  = $this->request->getGet('object', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'list': // Получить список
                $this->_response($Objects->list());
                break;

            case 'names': // Возвращает список имён объектов
                $this->_response($Objects->names());
                break;

            case 'item': // Получить один
                if (! $object)
                {
                    throw PageNotFoundException::forPageNotFound();
                }

                $this->_response($Objects->item($object));
                break;

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Каталог (реальный)
     * @param null $what
     */
    function catalog($what = null)
    {
        $Catalog = new Catalog();
        $object  = $this->request->getGet('object', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'list': // Получить список
                $this->_response($Catalog->list());
                break;

            case 'item': // Получить один
                if (! $object)
                {
                    throw PageNotFoundException::forPageNotFound();
                }

                $this->_response($Catalog->item($object));
                break;

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Файлы
     * @param null $what
     */
    function file($what = null)
    {
        $Files  = new Files();
        $object = $this->request->getGet('object', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'list': // Получить список по объекту
                if (! $object)
                {
                    throw PageNotFoundException::forPageNotFound();
                }
                $this->_response($Files->list_by_object($object));
                break;

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Фотографии
     */
    function photo($what = null)
    {
        $Photos = new Photos();
        $name = $this->request->getGet('object', FILTER_SANITIZE_STRING);
        $date = $this->request->getGet('date', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'list': // Список всех фото
                $this->_response(! $name ? $Photos->list() : $Photos->list_by_object($name));
                break;

            case 'download': // Скачать фото по названию объекта и дате
                if (!$name || !$date)
                {
                    throw PageNotFoundException::forPageNotFound();
                }

                $filePath = $Photos->get_photo_path($name, $date);

                if (!$filePath)
                {
                    throw PageNotFoundException::forPageNotFound();
                }

                header('Content-Type: application/octet-stream');
                header('Content-Transfer-Encoding: Binary');
                header('Content-disposition: attachment; filename="' . basename($filePath) . '"');
                readfile($filePath);
                break;

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Статистика
     */
    function statistic($what = null)
    {
        $Statistic = new Statistic();
        $period = $this->request->getGet('date', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'summary': // Общая статистика (объектов, кадров, выдержка, фотографий, данных)
                $this->_response($Statistic->summary());
                break;

            case 'month':
                if (! $period)
                {
                    throw PageNotFoundException::forPageNotFound();
                }
                $this->_response($Statistic->month($period));
                break;

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Данные сенсоров с контроллера
     * @param $what
     * @return void
     */
    function sensors($what = null)
    {
        $Sensors = new Sensors();

        switch ($what)
        {
            case 'statistic': // Сводная статистика за несколько часов
                $this->_response($Sensors->statistic());
                break;

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    protected function _response($payload)
    {
        $data = (object) [
            'status'  => (bool) $payload,
            'payload' => $payload
        ];

        $this->response
            ->setStatusCode(200)
            ->setJSON($data)
            ->send();

        exit();
    }
}
