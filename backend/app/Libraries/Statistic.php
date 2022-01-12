<?php namespace App\Libraries;

use App\Models\Photos;
use App\Models\Files;

class Statistic
{
    protected Files $Files;

    function __construct()
    {
        $this->Files = new Files();
    }

    function summary(): object
    {
        $Photos = new Photos();

        $filesData = $this->Files->get_list();
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

    function month(string $period): ?array
    {
        $month = date('m');
        $year = date('Y');

        if (!empty($period)) {
            $date = strtotime($period);
            if (checkdate(date('m', $date), date('d', $date), date('Y', $date))) {
                $month = date('m', $date);
                $year = date('Y', $date);
            }
        }

        $filesData = $this->Files->get_by_month($month, $year);

        if (empty($filesData)) {
            return null;
        }

        $days = [];

        foreach ($filesData as $file)
        {
            $day = date('Y-m-d', strtotime($file->item_date_obs . ' +5 hours'));

            if (!isset($days[$day]))
            {
                $days[$day] = (object) [
                    'date'     => $day,
                    'exposure' => 0,
                    'frames'   => 0,
                    'objects'  => []
                ];
            }

            $days[$day]->exposure += $file->item_exptime;
            $days[$day]->frames   += 1;

            if (!in_array($file->item_object, $days[$day]->objects))
            {
                $days[$day]->objects[] = $file->item_object;
            }
        }

        $result = [];

        foreach ($days as $day)
        {
            $result[] = $day;
        }

        unset($days);

        return $result;
    }
}