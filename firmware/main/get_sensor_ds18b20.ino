// Get data from sensor DS18B20

void get_sensor_ds18b20() {
  sensors.requestTemperatures();

  float f_temp1 = sensors.getTempC(sensor_temp_1);
  float f_temp2 = sensors.getTempC(sensor_temp_2);
  float f_temp3 = sensors.getTempC(sensor_temp_3);

  // Devices
  if (f_temp1 == DEVICE_DISCONNECTED_C) {
    #ifdef DEBUG
      Serial.println("  [ERROR] DS18B20 temp1 not connected");
    #endif
  } else {
    #ifdef DEBUG
      Serial.print("  [Ok] DS18B20 temp1: ");
      Serial.print(f_temp1);
      Serial.println(" C");
    #endif
    dtostrf(f_temp1, 4, 1, temp1);
  }

  // AC\DC
  if (f_temp2 == DEVICE_DISCONNECTED_C) {
    #ifdef DEBUG
      Serial.println("  [ERROR] DS18B20 temp2 not connected");
    #endif
  } else {
    #ifdef DEBUG
      Serial.print("  [Ok] DS18B20 temp2: ");
      Serial.print(f_temp1);
      Serial.println(" C");
    #endif
    dtostrf(f_temp1, 4, 1, temp1);
  }

  // Mirror
  if (f_temp3 == DEVICE_DISCONNECTED_C) {
    #ifdef DEBUG
      Serial.println("  [ERROR] DS18B20 temp3 not connected");
    #endif
  } else {
    #ifdef DEBUG
      Serial.print("  [Ok] DS18B20 temp3: ");
      Serial.print(f_temp3);
      Serial.println(" C");
    #endif
    dtostrf(f_temp3, 4, 1, temp3);
  }

  delay(1000);
}
