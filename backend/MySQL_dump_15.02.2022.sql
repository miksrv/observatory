-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: 10.0.0.231:3319
-- Время создания: Фев 15 2022 г., 03:36
-- Версия сервера: 10.3.30-MariaDB-log
-- Версия PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `mik_astro`
--

-- --------------------------------------------------------

--
-- Структура таблицы `astro_authors`
--

CREATE TABLE `astro_authors` (
  `author_id` smallint(6) NOT NULL,
  `author_name` varchar(200) DEFAULT NULL,
  `author_link` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `astro_fits`
--

CREATE TABLE `astro_fits` (
  `file_id` varchar(40) NOT NULL COMMENT 'ID записи',
  `item_file_name` varchar(80) NOT NULL COMMENT 'Наименование файла',
  `item_ypixsz` float NOT NULL DEFAULT 0 COMMENT 'Физический размер Y пикселей датчика в микронах',
  `item_xpixsz` float NOT NULL DEFAULT 0 COMMENT 'Физический размер X пикселей датчика в микронах',
  `item_naxis1` smallint(5) NOT NULL DEFAULT 4656 COMMENT 'Количество точек по оси X',
  `item_naxis2` smallint(5) NOT NULL DEFAULT 3520 COMMENT 'Количество точек по оси Y',
  `item_naxis` tinyint(1) NOT NULL DEFAULT 2 COMMENT 'Количество осей в массиве данных',
  `item_bscale` tinyint(2) NOT NULL DEFAULT 1,
  `item_simple` varchar(1) NOT NULL DEFAULT 'T' COMMENT 'Указывает заголовок FITS',
  `item_bitpix` tinyint(2) NOT NULL DEFAULT 16 COMMENT 'Указывает формат массива',
  `item_xbinning` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Коэффициент биннинга, используемый на оси X',
  `item_ybinning` tinyint(1) NOT NULL DEFAULT 1 COMMENT 'Коэффициент биннинга, используемый на оси Y',
  `item_exptime` int(5) NOT NULL DEFAULT 0 COMMENT 'Длительность выдержки в секундах',
  `item_frame` varchar(40) NOT NULL COMMENT 'Тип кадра',
  `item_aptdia` smallint(5) NOT NULL DEFAULT 200 COMMENT 'Диаметр телескопа в миллиметрах',
  `item_focallen` smallint(5) NOT NULL DEFAULT 1000 COMMENT 'Фокусное расстояние',
  `item_comment` text NOT NULL COMMENT 'Комментарий',
  `item_telescop` varchar(100) NOT NULL COMMENT 'Введенная пользователем информация об используемом телескопе',
  `item_observer` varchar(200) NOT NULL COMMENT 'Имя наблюдателя',
  `item_instrume` varchar(200) NOT NULL COMMENT 'Информация о камере',
  `item_pixsize1` float NOT NULL DEFAULT 0 COMMENT 'Размер пикселя X',
  `item_pixsize2` float NOT NULL DEFAULT 0 COMMENT 'Размер пикселя Y',
  `item_ccd_temp` tinyint(3) NOT NULL DEFAULT 0 COMMENT 'Температура сенсора матрицы',
  `item_offset` tinyint(3) NOT NULL DEFAULT 10 COMMENT 'Параметр "Offset"',
  `item_gain` smallint(3) NOT NULL DEFAULT 90 COMMENT 'Электронное усиление в фотоэлектронах на ADU',
  `item_scale` varchar(100) NOT NULL,
  `item_date_obs` datetime NOT NULL COMMENT 'Дата и время съемки',
  `item_equinox` varchar(200) NOT NULL,
  `item_filter` varchar(40) NOT NULL COMMENT 'Название выбранного фильтра',
  `item_dec` float NOT NULL DEFAULT 0 COMMENT 'Склонение отображаемого объекта',
  `item_ra` float NOT NULL DEFAULT 0 COMMENT 'Восхождение отображаемого объекта',
  `item_objctdec` varchar(40) NOT NULL COMMENT 'Склонение отображаемого объекта',
  `item_objctra` varchar(40) NOT NULL COMMENT ' Восхождение отображаемого объекта ',
  `item_sitelong` float NOT NULL COMMENT 'Долгота места съемки в градусах',
  `item_sitelat` float NOT NULL COMMENT 'Широта места съемки в градусах',
  `item_bzero` int(5) NOT NULL DEFAULT 32768,
  `item_extend` varchar(50) NOT NULL,
  `item_object` varchar(200) NOT NULL COMMENT 'Имя или каталожный номер отображаемого объекта',
  `item_airmass` float NOT NULL COMMENT 'Относительная длина оптического пути через атмосферу',
  `item_hfr` float DEFAULT NULL,
  `item_fwhm` float DEFAULT NULL,
  `item_sigma` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `astro_objects`
--

CREATE TABLE `astro_objects` (
  `object_name` varchar(20) NOT NULL,
  `object_title` varchar(100) NOT NULL,
  `object_text` text NOT NULL,
  `object_category` varchar(100) NOT NULL,
  `object_ra` float NOT NULL,
  `object_dec` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `astro_photos`
--

CREATE TABLE `astro_photos` (
  `photo_id` smallint(5) NOT NULL,
  `photo_obj` varchar(40) NOT NULL,
  `photo_date` date DEFAULT NULL,
  `photo_author` smallint(6) DEFAULT NULL COMMENT 'Author ID',
  `photo_file` varchar(50) NOT NULL,
  `photo_file_ext` varchar(5) NOT NULL DEFAULT 'jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `astro_sensors`
--

CREATE TABLE `astro_sensors` (
  `item_id` varchar(20) NOT NULL COMMENT 'Unique item ID',
  `item_data_json` tinytext NOT NULL COMMENT 'Client raw data JSON',
  `item_timestamp` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Insert datetime'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Обработанные данные устройств';

-- --------------------------------------------------------

--
-- Структура таблицы `astro_users`
--

CREATE TABLE `astro_users` (
  `user_token` varchar(100) NOT NULL DEFAULT '',
  `user_name` varchar(50) DEFAULT NULL,
  `user_last_activity` datetime NOT NULL DEFAULT current_timestamp(),
  `user_ip` varchar(25) DEFAULT '0.0.0.0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `astro_authors`
--
ALTER TABLE `astro_authors`
  ADD PRIMARY KEY (`author_id`);

--
-- Индексы таблицы `astro_fits`
--
ALTER TABLE `astro_fits`
  ADD PRIMARY KEY (`file_id`),
  ADD UNIQUE KEY `file_id` (`file_id`),
  ADD KEY `item_object` (`item_object`),
  ADD KEY `item_date_obs` (`item_date_obs`);

--
-- Индексы таблицы `astro_objects`
--
ALTER TABLE `astro_objects`
  ADD PRIMARY KEY (`object_name`),
  ADD UNIQUE KEY `object_name` (`object_name`);

--
-- Индексы таблицы `astro_photos`
--
ALTER TABLE `astro_photos`
  ADD PRIMARY KEY (`photo_id`),
  ADD UNIQUE KEY `photo_id` (`photo_id`),
  ADD KEY `photo_obj` (`photo_obj`);

--
-- Индексы таблицы `astro_sensors`
--
ALTER TABLE `astro_sensors`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `item_id` (`item_id`),
  ADD KEY `item_timestamp` (`item_timestamp`);

--
-- Индексы таблицы `astro_users`
--
ALTER TABLE `astro_users`
  ADD PRIMARY KEY (`user_token`),
  ADD UNIQUE KEY `user_token` (`user_token`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `astro_authors`
--
ALTER TABLE `astro_authors`
  MODIFY `author_id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `astro_photos`
--
ALTER TABLE `astro_photos`
  MODIFY `photo_id` smallint(5) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
