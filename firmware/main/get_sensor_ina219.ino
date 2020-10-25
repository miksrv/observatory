// Get data from sensor INA219

void get_sensor_ina219() {
  float shuntvoltage = 0;
  float busvoltage = 0;
  float current_mA = 0;
  float loadvoltage = 0;
  float power_mW = 0;

  shuntvoltage = ina219_1.getShuntVoltage_mV();
  busvoltage = ina219_1.getBusVoltage_V();
  current_mA = ina219_1.getCurrent_mA();
  power_mW = ina219_1.getPower_mW();
  loadvoltage = (shuntvoltage > 0.1) ? busvoltage + (shuntvoltage / 1000) : shuntvoltage;
  
  Serial.print("1Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("1Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("1Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V"); //+
  Serial.print("1Current:       "); Serial.print(current_mA); Serial.println(" mA"); //+
  Serial.print("1Power:         "); Serial.print(power_mW); Serial.println(" mW"); //+
  Serial.println("");

  shuntvoltage = ina219_2.getShuntVoltage_mV();
  busvoltage = ina219_2.getBusVoltage_V();
  current_mA = ina219_2.getCurrent_mA();
  power_mW = ina219_2.getPower_mW();
  loadvoltage = (shuntvoltage > 0.1) ? busvoltage + (shuntvoltage / 1000) : shuntvoltage;

  Serial.print("2Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("2Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("2Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  Serial.print("2Current:       "); Serial.print(current_mA); Serial.println(" mA");
  Serial.print("2Power:         "); Serial.print(power_mW); Serial.println(" mW");
  Serial.println("");


  delay(2000);
}
