<?php

namespace App\Libraries;

use App\Libraries\FITS as libFITS;
use App\Models\Photo as modelPhoto;
use App\Models\Catalog as modelCatalog;

class Photo
{
    protected $_modelPhoto;
    protected $_modelCatalog;
    protected $_libFITS;

    function __construct()
    {
        $this->_modelPhoto   = new modelPhoto();
        $this->_modelCatalog = new modelCatalog();

        $this->_libFITS = new libFITS();
    }

    /**
     * Get full photos list (array) with catalog object information
     * @return array
     */
    function get_list(): array
    {
        $arrPhotos  = $this->_modelPhoto->get_list();
        $arrCatalog = $this->_modelCatalog->get_list();
        $arrResult  = [];

        if (!$arrPhotos) return $arrResult;

        foreach ($arrPhotos as $item) {
            $key = array_search($item->photo_obj, array_column($arrCatalog, 'object_name'));

            $arrResult[] = [
                'id'       => (int) $item->photo_id,
                'object'   => $item->photo_obj,
                'title'    => ($key !== false ? $arrCatalog[$key]->object_title : ''),
                'text'     => ($key !== false ? $arrCatalog[$key]->object_text : ''),
                'category' => ($key !== false ? $arrCatalog[$key]->object_category : ''),
                'date'     => $item->photo_date,
                'file'     => $item->photo_file,
                'file_ext' => $item->photo_file_ext,
            ];
        }

        return $arrResult;
    }

    /**
     * Get photo item with catalog information, statistic and archive
     * @param string $name
     * @param string|null $date
     * @param bool $archive Return all photos in archive
     * @return array
     */
    function get_item(string $name, string $date = null, $archive = false): array
    {
        $arrPhotos = $this->_modelPhoto->get_by_name($name);
        $objResult = [];

        if (empty($arrPhotos)) return $objResult;

        $objCatalog = $this->_modelCatalog->get_by_name($name);
        $objResult  = [
            'name'     => (! empty($objCatalog) ? $objCatalog->object_name : ''),
            'title'    => (! empty($objCatalog) ? $objCatalog->object_title : ''),
            'text'     => (! empty($objCatalog) ? $objCatalog->object_text : ''),
            'category' => (! empty($objCatalog) ? $objCatalog->object_category : ''),
            'photo'    => [],
            'archive'  => [],
        ];

        foreach ($arrPhotos as $key => $item) {
            if ( !$archive && (($key === 0 && empty($date)) || (! empty($date) && $date === $item->photo_date)))
            {
                $objResult['photo'] = $this->_create_photo_object($item);;

                continue;
            }

            $objResult['archive'][] = $this->_create_photo_object($item);
        }

        return $objResult;
    }

    /**
     * Create object with photo params
     * @param object $photoObject
     * @return object
     */
    protected function _create_photo_object(object $photoObject): object
    {
        return (object) [
            'date'     => $photoObject->photo_date,
            'file'     => $photoObject->photo_file,
            'file_ext' => $photoObject->photo_file_ext,
            'statistic'=> $this->_libFITS->get_fits_stat(
                [],
                $photoObject->photo_obj,
                $photoObject->photo_date
            )
        ];
    }
}