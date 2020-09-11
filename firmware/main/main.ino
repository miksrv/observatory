#include <SPI.h>
#include <Ethernet.h>
#include <TroykaDHT.h>

// DHT22 Initialization
DHT dht(4, DHT22);

// assign a MAC address for the ethernet controller.
// fill in your address here:
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
// Set the static IP address to use if the DHCP fails to assign
IPAddress ip(192, 168, 0, 177);
IPAddress myDns(192, 168, 0, 1);

// initialize the library instance:
EthernetClient client;

char server[] = "www.arduino.cc";  // also change the Host line in httpRequest()
//IPAddress server(64,131,82,241);

unsigned long lastConnectionTime = 0;           // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10*1000;  // delay between updates, in milliseconds
char webclient_data[120];
char temp[6], humd[6];

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
  if (Ethernet.begin(mac) == 0) {
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
    Ethernet.begin(mac, ip, myDns);
    Serial.print("My IP address: ");
    Serial.println(Ethernet.localIP());
  } else {
    Serial.print("  DHCP assigned IP ");
    Serial.println(Ethernet.localIP());
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
}

void loop() {
  // if there's incoming data from the net connection.
  // send it out the serial port.  This is for debugging
  // purposes only:
  if (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  // if ten seconds have passed since your last connection,
  // then connect again and send data:
  if (millis() - lastConnectionTime > postingInterval) {
    get_sensor_dht22();
    
    webclient_send_data();
    //httpRequest();
  }

}

// this method makes a HTTP connection to the server:
void httpRequest() {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();

  // if there's a successful connection:
  if (client.connect(server, 80)) {
    Serial.println("connecting...");
    // send the HTTP GET request:
    client.println("GET /latest.txt HTTP/1.1");
    client.println("Host: www.arduino.cc");
    client.println("User-Agent: arduino-ethernet");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}

void get_sensor_dht22() {
  dht.read();

  if (dht.getState() == DHT_OK) {
    dtostrf(dht.getTemperatureC(), 4, 1, temp);
    dtostrf(dht.getHumidity(), 4, 1, humd);

    #ifdef DEBUG
      Serial.print("  [Ok] DHT22 temperature: ");
      Serial.print(temp);
      Serial.println(" C");
      Serial.print("  [Ok] DHT22 humidity: ");
      Serial.print(humd);
      Serial.println(" %");
    #endif
  } else {
    #ifdef DEBUG
      Serial.println("  [ERROR] DHT22 no data");
    #endif
  }

  delay(2000);
}


/** WebClinet send data to remote server **/
void webclient_send_data() {
    client.stop();
  
    memset(webclient_data, 0, sizeof(webclient_data));

    strcpy(webclient_data, "id=A7FE9540D1F5");

    strcat(webclient_data, "&t="); // Room temperature
    strcat(webclient_data, temp);
    strcat(webclient_data, "&h=");  // Air humidity
    strcat(webclient_data, humd);

    #ifdef DEBUG
        Serial.print("  [Content-Length: ");
        Serial.print(len(webclient_data));
        Serial.print("] ");
        Serial.println(webclient_data);
    #endif

    if (client.connect(server, 80)) {
        client.println("POST /set/data HTTP/1.1");
        client.println("Host: api.miksoft.pro");
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.println("Connection: close");
        client.print("Content-Length: ");
        client.println(len(webclient_data));
        client.println();
        client.println(webclient_data);
        client.println();
        
        delay(2000);
        
        client.stop();

        #ifdef DEBUG
          Serial.println("  [Webclient] Data send success");
          Serial.println();
        #endif
    } else {
        #ifdef DEBUG
          Serial.println("  [Webclient] Data send error");
          Serial.println();
        #endif
    }

    // note the time that the connection was made:
    lastConnectionTime = millis();

    delay(2000);
}

/** The method determines the length of the string **/
int len(char *buf) {
  int i=0; 
  do {
    i++;
  } while (buf[i]!='\0');
  return i;
}
