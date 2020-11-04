//**************************************************************//
//  Name    : OBSERVATORY CONTROLLER
//  Author  : Mik™ <miksoft.tm@gmail.com>
//  Version : 0.6.2 (03 Nov 2020)
//**************************************************************//

#include <SPI.h>
#include <Ethernet.h>
#include <TextFinder.h>
#include <TroykaDHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <Adafruit_INA219.h>

#define PIN_DS18B20 22 // DS18B20 PIN
#define PIN_DHT22 23   // DHT22 PIN

byte MAC[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};

IPAddress IP(10, 10, 2, 8);
IPAddress Gateway(10, 10, 2, 1);

// initialize the library instance:
EthernetServer inServer(80);
EthernetClient client;

// 0X40 - (1) K9
// 0X41 - (2) K10
// 0x44 - (3) (K11)
Adafruit_INA219 ina219_1(0X40);
Adafruit_INA219 ina219_2(0X41);
Adafruit_INA219 ina219_3(0x44);

// DHT22 Initialization
DHT dht(PIN_DHT22, DHT22);

// DS18B20
#define TEMPERATURE_PRECISION 9

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(PIN_DS18B20);

// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);

char server[] = "api.miksoft.pro";

unsigned long lastConnectionTime = 0;           // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 40*1000;  // delay between updates, in milliseconds
char webclient_data[140];
char temp[6], humd[6], temp1[6], temp2[6], temp3[6],
     VAH1_V[6], VAH1_I[6], VAH1_P[6],
     VAH2_V[6], VAH2_I[6], VAH2_P[6],
     VAH3_V[6], VAH3_I[6], VAH3_P[6];

// Relay control
int pinscount = 9;
int pins[] = {30, 31, 32, 33, 34, 35, 36, 37, 38};
int pins_status[] = {HIGH, HIGH, HIGH, HIGH, HIGH, HIGH, HIGH, HIGH, HIGH};

int command = 0;
int setpin = 0;
int setpinstatus = 0;

// Assign address manually. The addresses below will need to be changed
// to valid device addresses on your bus. Device address can be retrieved
// by using either oneWire.search(deviceAddress) or individually via
// sensors.getAddress(deviceAddress, index)
DeviceAddress sensor_temp_1 = { 0x28, 0x6B, 0xC7, 0x56, 0xB5, 0x01, 0x3C, 0xD7 };
DeviceAddress sensor_temp_2 = { 0x28, 0xC6, 0xB3, 0x56, 0xB5, 0x01, 0x3C, 0xB3 };
DeviceAddress sensor_temp_3 = { 0x28, 0x4B, 0x9F, 0x56, 0xB5, 0x01, 0x3C, 0xCA };

// If the variable is not commented out, debug mode is activated, messages are sent to the serial port
// #define DEBUG

void setup() {
  // You can use Ethernet.init(pin) to configure the CS pin
  //Ethernet.init(10);  // Most Arduino shields
  //Ethernet.init(5);   // MKR ETH shield
  //Ethernet.init(0);   // Teensy 2.0
  //Ethernet.init(20);  // Teensy++ 2.0
  //Ethernet.init(15);  // ESP8266 with Adafruit Featherwing Ethernet
  //Ethernet.init(33);  // ESP32 with Adafruit Featherwing Ethernet

  // start serial port:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // Start up the library
  sensors.begin();

  // locate devices on the bus
  #ifdef DEBUG
    Serial.print("Locating DS18B20 devices...");
    Serial.print("Found ");
    Serial.print(sensors.getDeviceCount(), DEC);
    Serial.println(" devices.");
    Serial.print("Parasite power is: ");
    if (sensors.isParasitePowerMode()) Serial.println("ON");
    else Serial.println("OFF");

    oneWire.reset_search();
    if (!oneWire.search(sensor_temp_1)) Serial.println("Unable to find address for sensor_temp_1");
    if (!oneWire.search(sensor_temp_2)) Serial.println("Unable to find address for sensor_temp_2");
    if (!oneWire.search(sensor_temp_3)) Serial.println("Unable to find address for sensor_temp_3");
  #endif

  sensors.setResolution(sensor_temp_1, TEMPERATURE_PRECISION);
  sensors.setResolution(sensor_temp_2, TEMPERATURE_PRECISION);
  sensors.setResolution(sensor_temp_3, TEMPERATURE_PRECISION);

  // start the Ethernet connection:
//  Serial.println("Initialize Ethernet with DHCP:");
//  if (Ethernet.begin(MAC) == 0) {
//    Serial.println("Failed to configure Ethernet using DHCP");
//    // Check for Ethernet hardware present
//    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
//      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
//      while (true) {
//        delay(1); // do nothing, no point running without Ethernet hardware
//      }
//    }
//    if (Ethernet.linkStatus() == LinkOFF) {
//      Serial.println("Ethernet cable is not connected.");
//    }
//    // try to congifure using IP address instead of DHCP:
//    Ethernet.begin(MAC, IP, Gateway);
//    Serial.print("My IP address: ");
//    Serial.println(Ethernet.localIP());
//  } else {
//    Serial.print("DHCP assigned IP: ");
//    Serial.println(Ethernet.localIP());
//  }
  Ethernet.begin(MAC, IP, Gateway);
  // give the Ethernet shield a second to initialize:
  delay(1000);

  for (int i=0; i < pinscount; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], HIGH);
    delay(50);
  };

  if (! ina219_1.begin()) {
    Serial.println("Failed to find ina219_1 chip");
    while (1) { delay(10); }
  }

  if (! ina219_2.begin()) {
    Serial.println("Failed to find ina219_2 chip");
    while (1) { delay(10); }
  }

  if (! ina219_3.begin()) {
    Serial.println("Failed to find ina219_3 chip");
    while (1) { delay(10); }
  }

  Serial.println("Controller started");
}

void loop() {
  // if ten seconds have passed since your last connection,
  // then connect again and send data:
  if (millis() - lastConnectionTime > postingInterval) {
    // note the time that the connection was made:
    lastConnectionTime = millis();

    get_sensor_dht22();
    get_sensor_ds18b20();
    get_sensor_ina219();
    webclient_send_data();

  } else {
    
    EthernetClient client = inServer.available();

    if (client)  {
      while (client.connected()) {
        if (client.available()) {
          TextFinder response(client);

          if (response.find("GET /")) {
            if (response.find("command=")) {
              command = response.getValue();
            }
          };

          // Relay controll
          // http://10.10.1.50/?command=5&pin=1&set=1
          if (command == 5) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: application/json");                                
            client.println("Connection: close");
            client.println();
            
            if (response.find("pin=")) {
              setpin = response.getValue();
            }                
            
            if (response.find("set=")) {
              setpinstatus = invertPinVal(response.getValue());
            }

            digitalWrite(pins[setpin], setpinstatus);
            pins_status[setpin] = setpinstatus;
            client.print("{\"status\":\"ok\"}\n");
          };

          // Get controller status
          // http://10.10.1.50/?command=10
          if (command == 10) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: application/json");                
            client.println("Connection: close");  
            client.println();
                
            client.print("{\"ip\":\"");
            client.print(Ethernet.localIP());
            client.print("\",\"relay\":[");
            
            for (int i=0; i < pinscount; i++) {
              client.print("{\"");
              client.print(i); // pins[i]
              client.print("\":");
              client.print(invertPinVal(pins_status[i]));
              client.print("}");
              if (i < pinscount-1) {
                client.print(",");
              };
            };

            client.print("], \"freeram\":\"");
            client.print(freeRam());
            client.print("\"}\n");
          };

          client.stop();   
        }
      }
      delay(1);    
      client.stop();
    }
  }
}

int invertPinVal(int val) {
  if (val == 0) {
    return 1;
  } else {
    return 0;
  }
}

int freeRam () {
  extern int __heap_start, *__brkval; 
  int v; 
  return (int) &v - (__brkval == 0 ? (int) &__heap_start : (int) __brkval); 
}
