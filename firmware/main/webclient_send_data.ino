// WebClinet send data to remote server

void webclient_send_data() {
    memset(webclient_data, 0, sizeof(webclient_data));

    strcpy(webclient_data, "id=F2");

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
        client.println("POST /set/sensor HTTP/1.1");
        client.println("Host: fits.miksoft.pro");
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

    delay(2000);
}

// The method determines the length of the string
int len(char *buf) {
  int i=0; 
  do {
    i++;
  } while (buf[i]!='\0');
  return i;
}
