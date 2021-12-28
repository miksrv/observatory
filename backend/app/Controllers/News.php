<?php namespace App\Controllers;

use VK\Client\VKApiClient;
use VK\Exceptions\Api\VKApiBlockedException;
use VK\OAuth\Scopes\VKOAuthGroupScope;
use VK\OAuth\Scopes\VKOAuthUserScope;
use VK\OAuth\VKOAuth;
use VK\OAuth\VKOAuthDisplay;
use VK\OAuth\VKOAuthResponseType;
use function PHPUnit\Framework\exactly;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
header('Access-Control-Allow-Headers: Accept, AuthToken, Content-Type');

class NewsItem
{
    public int $date  = 0;
    public string $text  = '';
    public string $link  = '';
    public int $comments = 0;
    public int $likes    = 0;
    public int $reposts  = 0;
    public int $views    = 0;
    public array $photos = [];
}

class News extends BaseController
{
    /**
     * @throws VKApiBlockedException
     * @throws \VK\Exceptions\VKApiException
     * @throws \VK\Exceptions\VKClientException
     * @throws \VK\Exceptions\VKOAuthException
     */
    function list()
    {
        $VK = new VKApiClient();

        $limit  = $this->request->getGet('limit', FILTER_SANITIZE_NUMBER_INT);
        $offset  = $this->request->getGet('offset', FILTER_SANITIZE_NUMBER_INT);

        // Нужен один раз при авторизации, хранить нет смысла
        $client_secret = '2e8FbiDie6yFwd6JR2fw';

        /**
         * Для получения постов - нужно авторизоваться как пользователь и работать с токеном пользователя
         */

        // Получение токена группы
//        $OAuth = new VKOAuth();
//        $client_id = 8028256;
//        $redirect_uri = 'https://observatory.miksoft.pro/api/news/list';
//        $display = VKOAuthDisplay::PAGE;
//        $scope = array(VKOAuthGroupScope::MESSAGES);
//        $state = 'secret_state_code';
//        $groups_ids = array(150958214);
//
//        $browser_url = $OAuth->getAuthorizeUrl(VKOAuthResponseType::TOKEN, $client_id, $redirect_uri, $display, $scope, $state, $groups_ids);
//        $token = 'cce81c40bee66f11080e421b7a3060bf93509f356953794130f565fbaa1b47d4cf90b5d18b6cc308e6e1e';



        // 1. Получение токена пользователя
        $oauth = new VKOAuth();
        $client_id = 8028256;
        $redirect_uri = 'https://observatory.miksoft.pro/api/news/list';
//        $display = VKOAuthDisplay::PAGE;
//        $scope = [VKOAuthUserScope::WALL, VKOAuthUserScope::GROUPS];
//        $state = 'secret_state_code';
//
//        $browser_url = $oauth->getAuthorizeUrl(VKOAuthResponseType::CODE, $client_id, $redirect_uri, $display, $scope, $state);
//        echo $browser_url;
//        exit();

        /**
         * После успешной авторизации приложения браузер пользователя будет перенаправлен по адресу redirect_uri,
         * указанному при открытии диалога авторизации. При этом код для получения ключа доступа code будет передан как GET-параметр:
         * REDIRECT_URI?code=7a6fa4dff77a228eeda56603b8f53806c883f011c40b72630bb50df056f6479e52a
         */

        /**
         * client_id
        обязательный 	Идентификатор Вашего приложения
        client_secret
        обязательный 	Защищенный ключ Вашего приложения (указан в настройках приложения)
        redirect_uri
        обязательный 	URL, который использовался при получении code на первом этапе авторизации. Должен быть аналогичен переданному при авторизации.
        code
        обязательный 	Временный код, полученный после прохождения авторизации.
         */
        // https://observatory.miksoft.pro/api/news/list?code=ac11f415ed68fa8d52&state=secret_state_code
        // 2.
//        $get_token = $oauth->getAccessToken($client_id, $client_secret, $redirect_uri, '7d83892b366b99712e');
//        var_dump($get_token);
//        exit();
        // Этот метод возвращает уже токен: 5bcd6cf778f71a7f7f48ca6ffc644ecc3e1b1c726faa3826283813af6b9e8ddcf77927776eb500985068c

        $token = '300403ae300403ae300403aef53074e5c533004300403ae6e8a0d8e3c649eb40ace3368';
        $wall = $VK->wall()->get($token, ['domain' => 'openscope', 'count' => $limit ?? 5, 'offset' => $offset ?? 0]);
        $news = [];

        foreach ($wall['items'] as $item)
        {
            if (isset($item['is_pinned']) && $item['is_pinned'])
            {
                continue;
            }

            $_tmp = new NewsItem();
            $_tmp->date = $item['date'];
            $_tmp->text = $item['text'];
            $_tmp->comments = $item['comments']['count'];
            $_tmp->likes = $item['likes']['count'];
            $_tmp->reposts = $item['reposts']['count'];
            $_tmp->views = $item['views']['count'];
            $_tmp->link = 'wall' . $item['owner_id'] . '_' . $item['id'];
            $_tmp->photos = $this->_get_photos($item['attachments']);

            $news[] = $_tmp;
        }

        return $this->_response(['count' => $wall['count'], 'news' => $news]);
    }

    protected function _get_photos($attach)
    {
        if (!is_array($attach) || empty($attach))
        {
            return null;
        }

        $tmp = [];

        foreach ($attach as $item)
        {
            if ($item['type'] !== 'photo')
            {
                continue;
            }

            $sizes = $item['photo']['sizes'];
            usort($sizes, fn($a, $b) => $a['width'] < $b['width']);

            $sizes[0]['src'] = $sizes[0]['url'];
            $sizes[2]['src'] = $sizes[2]['url'];

            unset($sizes[0]['type'], $sizes[2]['type'], $sizes[0]['url'], $sizes[2]['url']);

            $tmp[] = (object) [
                'full' => $sizes[0],
                'thumb' => $sizes[2]
            ];
        }

        return $tmp;
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
