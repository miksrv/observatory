// WebClinet send data to remote server

void webclient_send_data() {
    memset(webclient_data, 0, sizeof(webclient_data));

    strcpy(webclient_data, "id=A7FE9540D1F5");

    strcat(webclient_data, "&t="); // Room temperature
    strcat(webclient_data, temp);
    strcat(webclient_data, "&h="); // Air humidity
    strcat(webclient_data, humd);
    strcat(webclient_data, "&t1=");
    strcat(webclient_data, temp1);
    strcat(webclient_data, "&t2=");
    strcat(webclient_data, temp2);
    strcat(webclient_data, "&t3=");
    strcat(webclient_data, temp3);

    strcat(webclient_data, "&v1=");
    strcat(webclient_data, VAH1_V);
    strcat(webclient_data, "&i1=");
    strcat(webclient_data, VAH1_I);
    strcat(webclient_data, "&p1=");
    strcat(webclient_data, VAH1_P);

    strcat(webclient_data, "&v2=");
    strcat(webclient_data, VAH2_V);
    strcat(webclient_data, "&i2=");
    strcat(webclient_data, VAH2_I);
    strcat(webclient_data, "&p2=");
    strcat(webclient_data, VAH2_P);

    strcat(webclient_data, "&v3=");
    strcat(webclient_data, VAH3_V);
    strcat(webclient_data, "&i3=");
    strcat(webclient_data, VAH3_I);
    strcat(webclient_data, "&p3=");
    strcat(webclient_data, VAH3_P);

    #ifdef DEBUG
        Serial.print("  [Content-Length: ");
        Serial.print(len(webclient_data));
        Serial.print("] ");
        Serial.println(webclient_data);
    #endif

    if (client.connect(server, 80)) {
        client.println("POST /set/astro_sensor HTTP/1.1");
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
