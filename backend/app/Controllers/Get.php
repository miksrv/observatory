<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

class Get extends BaseController
{

    public function graph_data() {
        $db = \Config\Database::connect();
        $builder = $db->table('astro_fits_data');

        $query = $builder->orderBy('item_date_obs', 'ASC')->get();

        $_data = $_exp = [];

        foreach ($query->getResult() as $row)
        {
            $day = date('d.m.Y', strtotime($row->item_date_obs));

            if ( ! isset($_data[$day])) {
                $_data[$day] = 1;
                $_exp[$day]  = $row->item_exptime;

                continue;
            }

            $_data[$day] += 1;
            $_exp[$day]  += $row->item_exptime;
        }

        $_tmp = [];

        foreach ($_data as $key => $item)
        {
            $_tmp['frame'][] = [strtotime($key) * 1000, $item];
        }

        foreach ($_exp as $key => $item)
        {
            $_tmp['exp'][] = [strtotime($key) * 1000, round($item / 60, 1)];
        }

        $this->response
            ->setJSON([
                'chart' => $_tmp,
            ])->send();

        exit();
    }

    public function data()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('astro_fits_data');

        $query = $builder->get();

        $total_frame = $total_exp = 0;

        $objects  = [];
        $template = [
            'name'  => '',
            'total' => 0,
            'frame' => 0,
            'l' => 0,
            'r' => 0,
            'g' => 0,
            'b' => 0,
            'h' => 0,
            'o' => 0,
            's' => 0,
        ];
        $filter_map = [
            'Luminance' => 'l', 'Red' => 'r', 'Green' => 'g',
            'Blue' => 'b', 'Ha' => 'h', 'OIII' => 'o', 'SII' => 's'
        ];

        foreach ($query->getResult() as $row)
        {
            
            if ($row->item_frame != 'Light') {
                continue;
            }

            $total_exp   += $row->item_exptime;
            $total_frame += 1;

            $key = array_search($row->item_object, array_column($objects, 'name'));

            if ($key === false)
            {
                $_tmp = $template;
                $_tmp['name'] = $row->item_object;

                $objects[] = $_tmp;

                end($objects);

                $key = key($objects);
            }

            $objects[$key]['total'] += $row->item_exptime;
            $objects[$key]['frame'] += 1;

            $objects[$key][ $filter_map[$row->item_filter] ] += $row->item_exptime;
        }

        $this->response
            ->setJSON([
                'statistic' => $objects,
                'frames'    => $total_frame,
                'exposure'  => $total_exp,
                'objects'   => count($objects)
            ])->send();

        exit();
    }

    function webcam_photo()
    {
        if ( ! $photo = cache('webcam_photo'))
        {
            $photo = file_get_contents('http://astro.myftp.org:8002/jpg/1/image.jpg');

            cache()->save('narodmon', $photo);
        }

        return $this->response
            ->setHeader('Content-Type', 'image/pjpeg')
            ->setBody($photo)
            ->send();;
    }
}
