// Get data from sensor INA219

void get_sensor_ina219() {
  // SENSOR #1
  float shuntV   = ina219_1.getShuntVoltage_mV();
  float busV     = ina219_1.getBusVoltage_V();
  float currentI = ina219_1.getCurrent_mA();
  float power    = ina219_1.getPower_mW();
  float loadV    = (shuntV > 0.1) ? busV + (shuntV / 1000) : shuntV;

  #ifdef DEBUG
    Serial.print("  [Ok] INA219 (1) V: ");
    Serial.println(loadV);
    Serial.print("  [Ok] INA219 (1) I: ");
    Serial.println(currentI);
    Serial.print("  [Ok] INA219 (1) P: ");
    Serial.println(power);
  #endif
  dtostrf(loadV, 4, 1, VAH1_V);
  dtostrf(currentI, 4, 1, VAH1_I);
  dtostrf(power, 4, 1, VAH1_P);

  // SENSOR #2
  shuntV   = ina219_2.getShuntVoltage_mV();
  busV     = ina219_2.getBusVoltage_V();
  currentI = ina219_2.getCurrent_mA();
  power    = ina219_2.getPower_mW();
  loadV    = (shuntV > 0.1) ? busV + (shuntV / 1000) : shuntV;

  #ifdef DEBUG
    Serial.print("  [Ok] INA219 (2) V: ");
    Serial.println(loadV);
    Serial.print("  [Ok] INA219 (2) I: ");
    Serial.println(currentI);
    Serial.print("  [Ok] INA219 (2) P: ");
    Serial.println(power);
  #endif
  dtostrf(loadV, 4, 1, VAH2_V);
  dtostrf(currentI, 4, 1, VAH2_I);
  dtostrf(power, 4, 1, VAH2_P);

  // SENSOR #3
  shuntV   = ina219_3.getShuntVoltage_mV();
  busV     = ina219_3.getBusVoltage_V();
  currentI = ina219_3.getCurrent_mA();
  power    = ina219_3.getPower_mW();
  loadV    = (shuntV > 0.1) ? busV + (shuntV / 1000) : shuntV;

  #ifdef DEBUG
    Serial.print("  [Ok] INA219 (3) V: ");
    Serial.println(loadV);
    Serial.print("  [Ok] INA219 (3) I: ");
    Serial.println(currentI);
    Serial.print("  [Ok] INA219 (3) P: ");
    Serial.println(power);
  #endif
  dtostrf(loadV, 4, 1, VAH3_V);
  dtostrf(currentI, 4, 1, VAH3_I);
  dtostrf(power, 4, 1, VAH3_P);
 
  delay(1000);
}
