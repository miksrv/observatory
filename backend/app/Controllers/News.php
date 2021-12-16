<?php namespace App\Controllers;

use VK\Client\VKApiClient;
use VK\OAuth\Scopes\VKOAuthGroupScope;
use VK\OAuth\Scopes\VKOAuthUserScope;
use VK\OAuth\VKOAuth;
use VK\OAuth\VKOAuthDisplay;
use VK\OAuth\VKOAuthResponseType;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");

class NewsItem
{
    public string $date  = '';
    public string $text  = '';
    public array $photos = [];
    public int $comments = 0;
    public int $likes    = 0;
    public int $reposts  = 0;
    public int $views    = 0;
}

class News extends BaseController
{
    /**
     * @throws \VK\Exceptions\Api\VKApiBlockedException
     * @throws \VK\Exceptions\VKApiException
     * @throws \VK\Exceptions\VKClientException
     */
    function list()
    {
        $VK = new VKApiClient();

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
//        $oauth = new VKOAuth();
//        $client_id = 8028256;
//        $redirect_uri = 'https://observatory.miksoft.pro/api/news/list';
//        $display = VKOAuthDisplay::PAGE;
//        $scope = [VKOAuthUserScope::WALL];
//        $state = 'secret_state_code';
//
//        $browser_url = $oauth->getAuthorizeUrl(VKOAuthResponseType::CODE, $client_id, $redirect_uri, $display, $scope, $state);

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
        // 2. $get_token = $oauth->getAccessToken($client_id, $client_secret, $redirect_uri, 'ac11f415ed68fa8d52');
        // Этот метод возвращает уже токен: 5bcd6cf778f71a7f7f48ca6ffc644ecc3e1b1c726faa3826283813af6b9e8ddcf77927776eb500985068c

        $token = '5bcd6cf778f71a7f7f48ca6ffc644ecc3e1b1c726faa3826283813af6b9e8ddcf77927776eb500985068c';
        $wall = $VK->wall()->get($token, ['domain' => 'openscope', 'count' => 4, 'offset' => 0]);
        $news = [];

        foreach ($wall['items'] as $item)
        {
            $_tmp = new NewsItem();
            $_tmp->date = $item['date'];
            $_tmp->text = $item['text'];
            $_tmp->comments = $item['comments']['count'];
            $_tmp->likes = $item['likes']['count'];
            $_tmp->reposts = $item['reposts']['count'];
            $_tmp->views = $item['views']['count'];

            $news[] = $_tmp;
        }

        echo '<pre>';
        var_dump($news);
        var_dump($wall);
        exit();
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
