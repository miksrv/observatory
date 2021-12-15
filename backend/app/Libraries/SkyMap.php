<?php namespace App\Libraries;

//ini_set( 'memory_limit', '256M' );

class SkyMap
{
    function search($object)
    {
        $dir = FCPATH . 'skymap/';

//        $file = file_get_contents($dir . 'dsos.14.json');
        $file = file_get_contents($dir . 'messier.json');
        $file = json_decode($file);

        echo '<pre>';
        var_dump($file);
        exit();
    }
}