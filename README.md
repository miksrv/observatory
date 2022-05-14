Amateur astronomical observatory portal
===============
[![Build & Test](https://github.com/miksrv/observatory/actions/workflows/build.yml/badge.svg)](https://github.com/miksrv/observatory/actions/workflows/build.yml)

An interface project for the management of an amateur astronomical observatory. The WEB-interface provides the ability to control the power supply of devices through a relay system, to receive data on temperatures at various points, humidity and voltage of various devices. The interface displays images from cameras, builds graphs for viewing archive statistics. The main function is to display statistics of the observatory's work: a calendar of filming with statistics of a filming night, display of captured objects with the number of frames in various filters, a photo gallery of the final results. 

[ [DEMO](https://observatory.miksoft.pro/) ]

![General view of the interface](./docs/ui-screen-1.png)

----------------------
### Observatory 

This is an amateur and completely homemade astronomical observatory project. The goal of the project is to teach the skills of building objects offline, writing drivers in C++, scripts in Python to automate the process of equipment operation. In addition, obtaining good astrophotography of deep-sky objects, observing comets, asteroids and searching for supernovae and variable stars. 

![General view of the observatory](./docs/photo-1.jpg)

The observatory controller is based on Ardunio (AVR) and connects to the observatory network. The controller is controlled by means of HTTP requests, which send commands to switch the state of the relay and other elements of the power load. The controller's WEB client sends statistics to a remote server ([API](https://github.com/miksrv/api-backend)) at a specified time interval. The web interface in this repository displays statistics from the backend server and sends commands to the observatory controller through it. 

![General view of the observatory](./docs/photo-2.jpg)

##### Controller components 
- Arduino Mega 2560
- INA219 I2C sensor
- Relay shield 16 channel
- DHT22
- DS18B20

### API methods
The response format is JSON, the response structure is always the same, only payload will change in different APIs
```json
{
  "status": true,
  "payload": []
}
```

#### FITS files controller
``/api/get/file/list?object=${string}``
```json
{
  "id": "fe03bc1c2cfd97de1f97edbdd57e3acb",
  "name": "M33_Light_Red_300_secs_2020-08-27T03-45-00_010.fits",
  "date": "2020-08-26 22:39:59",
  "filter": "Red",
  "exposure": 300,
  "temp": -10,
  "offset": 10,
  "gain": 120,
  "dec": 30.5457,
  "ra": 23.4641
}
```
#### Photo controller
``/api/get/photo/list``
```json
{
  "object": "NGC_896",
  "date": "2022-02-09",
  "file": "NGC_896-710m-2022.02.09",
  "ext": "jpg",
  "author": {
    "name": "Author name",
    "link": ""
  }
}
```

``/api/get/photo/list?object=${string}``
```json
{
  "object": "M_33",
  "date": "2020-12-25",
  "file": "M33-630m-2020.12.25",
  "ext": "jpg",
  "author": {
    "name": "Author name",
    "link": ""
  },
  "parameters": {
    "date": "2020-08-26 23:10:55",
    "exposure": 45367,
    "frames": 214,
    "filesizes": 7016,
    "filters": {
      "Luminance": {
        "exposure": 13203,
        "frames": 45
      },
      "Red": {
        "exposure": 11138,
        "frames": 75
      },
      "Green": {
        "exposure": 8722,
        "frames": 51
      },
      "Blue": {
        "exposure": 7500,
        "frames": 25
      },
      "Ha": {
        "exposure": 4804,
        "frames": 18
      },
      "OIII": {
        "exposure": 0,
        "frames": 0
      },
      "SII": {
        "exposure": 0,
        "frames": 0
      }
    }
  }
}
```

#### Object controller
``/api/get/object/list``
```json
{
  "name": "NGC_925",
  "date": "2021-10-10 00:51:07",
  "exposure": 51300,
  "frames": 171,
  "Luminance": 12900,
  "Red": 14700,
  "Green": 13500,
  "Blue": 10200,
  "Ha": 0,
  "OIII": 0,
  "SII": 0
}
```

``/api/get/object/names``
```json
[
  "Vesta_A807_FA",
  "V1405_Cas",
  "UGC_6930",
  "Sh2_132",
  "Sh2_109",
  "Sh2_103",
  "Sh2-168"
]
```

``/api/get/object/item?object=${string}``
```json
{
  "date": "2020-08-26 23:10:55",
  "exposure": 45367,
  "frames": 214,
  "filesizes": 7016,
  "filters": {
    "Luminance": {
      "exposure": 13203,
      "frames": 45
    },
    "Red": {
      "exposure": 11138,
      "frames": 75
    },
    "Green": {
      "exposure": 8722,
      "frames": 51
    },
    "Blue": {
      "exposure": 7500,
      "frames": 25
    },
    "Ha": {
      "exposure": 4804,
      "frames": 18
    },
    "OIII": {
      "exposure": 0,
      "frames": 0
    },
    "SII": {
      "exposure": 0,
      "frames": 0
    }
  }
}
```

#### Catalog controller
``/api/get/catalog/list``
```json
[
  {
    "name": "V1405_Cas",
    "title": "Новая Кассиопеи (V1405 Cas)",
    "text": "Вспышка классической новой звезды, представляющая собой взрыв на поверхности белого карлика.",
    "category": "Сверхновые",
    "ra": 351.147,
    "dec": 61.1585
  }
]
```

``/api/get/catalog/item?object=${string}``
```json
{
  "name": "V1405_Cas",
  "title": "Новая Кассиопеи (V1405 Cas)",
  "text": "Вспышка классической новой звезды, представляющая собой взрыв на поверхности белого карлика.",
  "category": "Сверхновые",
  "ra": 351.147,
  "dec": 61.1585
}
```

#### Statistic controller
``/api/get/statistic/summary``
```json
{
  "photos": 63,
  "objects": 89,
  "frames": 5987,
  "exposure": 1785611,
  "filesize": 196289
}
```

----------------------
### Project structure

This project consists of 3 main sections: 

1. [ **firmware** ] Firmware for Arduino microcontroller (AVR), observatory controller control unit.
2. [ **backend** ] Backend server. 
3. [ **frontend** ] Observatory control interface. Written in ReactJS + Redux (use Node and NPM). To debug an application on a local server, you must first install the required dependencies:
  * `npm install` Installing dependencies.
  * `npm update` Update all dependencies.
  * `npm start` Launches a local webserver for debugging the application.
  * `npm run build` Compiles applications for deployment.
