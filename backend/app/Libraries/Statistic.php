<?php namespace App\Libraries;

use App\Models\Photos;
use App\Models\Files;

class Statistic
{
    function summary(): object
    {
        $Photos = new Photos();
        $Files  = new Files();

        $filesData = $Files->get_list();
        $objects   = [];
        $exposure  = 0;

        foreach ($filesData as $file)
        {
            $exposure += $file->item_exptime;

            if (!in_array($file->item_object, $objects))
            {
                $objects[] = $file->item_object;
            }
        }

        return (object) [
            'photos'   => $Photos->get_count(),
            'objects'  => count($objects),
            'frames'   => count($filesData),
            'exposure' => $exposure,
            'filesize' => round(count($filesData) * FITS_FILE_SIZE)
        ];
    }
}