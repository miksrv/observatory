//**************************************************************//
//  Name    : OBSERVATORY CONTROLLER
//  Author  : Mik™ <miksoft.tm@gmail.com>
//  Version : 0.5.0 (06 Oct 2020)
//**************************************************************//

#include <SPI.h>
#include <Ethernet.h>
#include <TextFinder.h>
#include <TroykaDHT.h>

byte MAC[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};

IPAddress IP(10, 10, 1, 50);
IPAddress Gateway(10, 10, 1, 1);

// initialize the library instance:
EthernetServer inServer(80);
EthernetClient client;

// DHT22 Initialization
DHT dht(36, DHT22);

char server[] = "fits.miksoft.pro";

unsigned long lastConnectionTime = 0;           // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 30*1000;  // delay between updates, in milliseconds
char webclient_data[120];
char temp[6], humd[6];

// Relay control
int pinscount = 3;
int pins[] = {2, 3, 4};
int pins_status[] = {HIGH, HIGH, HIGH};

int command = 0;
int setpin = 0;
int setpinstatus = 0;

// If the variable is not commented out, debug mode is activated, messages are sent to the serial port
#define DEBUG

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

  // start the Ethernet connection:
  Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(MAC) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // Check for Ethernet hardware present
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
      while (true) {
        delay(1); // do nothing, no point running without Ethernet hardware
      }
    }
    if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(MAC, IP, Gateway);
    Serial.print("My IP address: ");
    Serial.println(Ethernet.localIP());
  } else {
    Serial.print("DHCP assigned IP: ");
    Serial.println(Ethernet.localIP());
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);

  for (int i=0; i < pinscount; i++) {
    pinMode(pins[i], OUTPUT);
    digitalWrite(pins[i], HIGH);
    delay(50);
  };

  Serial.println("Controller started");
}

void loop() {
  // if ten seconds have passed since your last connection,
  // then connect again and send data:
  if (millis() - lastConnectionTime > postingInterval) {
    // note the time that the connection was made:
    lastConnectionTime = millis();

    get_sensor_dht22();
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
          if (command == 10) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-Type: application/json");                
            client.println("Connection: close");  
            client.println();
                
            client.print("{\"ip\":\"");
            client.print(Ethernet.localIP());
            client.print("\",\"relay\":[");
            
            for (int i=0; i < pinscount; i++) {
              client.print("{");
              client.print(i); // pins[i]
              client.print(":");
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
