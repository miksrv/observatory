<?php namespace App\Controllers;

use CodeIgniter\Exceptions\PageNotFoundException;

use App\Libraries\Objects;
use App\Libraries\Catalog;
use App\Libraries\Files;
use App\Libraries\Photos;
use App\Libraries\Statistic;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class Get extends BaseController
{
    /**
     * Объекты (виртуальные, из файлов беруться)
     */
    function object($what = null)
    {
        $Objects = new Objects();
        $object  = $this->request->getGet('object', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'list': // Получить список
                return $this->_response($Objects->list());

            case 'names': // Возвращает список имён объектов
                return $this->_response($Objects->names());

            case 'item': // Получить один
                if (! $object)
                {
                    throw PageNotFoundException::forPageNotFound();
                }

                return $this->_response($Objects->item($object));

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
                return $this->_response($Catalog->list());

            case 'item': // Получить один
                if (! $object)
                {
                    throw PageNotFoundException::forPageNotFound();
                }

                return $this->_response($Catalog->item($object));

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
                return $this->_response($Files->list_by_object($object));

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Фотографии
     */
    function photo($what = null)
    {
        $Photos = new Photos();
        $object = $this->request->getGet('object', FILTER_SANITIZE_STRING);

        switch ($what)
        {
            case 'list': // Список всех фото
                return $this->_response(! $object ? $Photos->list() : $Photos->list_by_object($object));

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    /**
     * Релюшки
     */
//    function relay($what = null)
//    {
//        $Relay = new Relay();
//
//        switch ($what)
//        {
//            case 'get': // Получить статус
//                return $this->_response($Relay->get());
//
//            case 'set': // Установить статус
//                return $this->_response($Relay->set());
//
//            default: throw PageNotFoundException::forPageNotFound();
//        }
//    }

    /**
     * Статистика
     */
    function statistic($what = null)
    {
        $Statistic = new Statistic();

        switch ($what)
        {
            case 'summary': // Общая статистика (объектов, кадров, выдержка, фотографий, данных)
                return $this->_response($Statistic->summary());

            default: throw PageNotFoundException::forPageNotFound();
        }
    }

    protected function _response($payload)
    {
        $data = (object) [
            'status'  => (bool)$payload,
            'payload' => $payload
        ];

        $this->response
            ->setStatusCode(200)
            ->setJSON($data)
            ->send();

        exit();
    }
}
