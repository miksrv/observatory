// Get data from sensor DHT22

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
