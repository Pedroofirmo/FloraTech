#include <LiquidCrystal.h>
LiquidCrystal lcd(11, 12, 5, 4, 3, 2);

// --- Sensores ---
int sensorPH      = A0;
int sensorCO2     = A1;
int sensorTemp    = A2;
int sensorUmidade = A3;
int sensorLuz     = A4;

int seco    = 800; // solo seco
int molhado = 300; // solo molhado

int lerSensorMedia(int pino, int N = 20) {
    long soma = 0;
    for (int i = 0; i < N; i++) {
        soma += analogRead(pino);
        delay(5);
    }
    return soma / N;
}

float mapFloat(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void setup() {
    Serial.begin(9600);
    lcd.begin(16, 2);
    lcd.print("Monitoramento");
    lcd.setCursor(0,1);
    lcd.print("de Sensores");
    delay(2000);
    lcd.clear();
}

void loop() {
    int valorPHraw      =  lerSensorMedia(sensorPH);
    delay(10);
    int valorCO2raw     =  lerSensorMedia(sensorCO2);
    delay(10);
    int valorTempRaw    =  lerSensorMedia(sensorTemp);
    delay(10);
    int valorUmidadeRaw =  lerSensorMedia(sensorUmidade);
    delay(10);
    int valorLuzRaw     =  lerSensorMedia(sensorLuz);
    float valorPH       =  mapFloat(valorPHraw, 0, 1023, 0.0, 14.0);
    int umidadePercent  =  map(valorUmidadeRaw, seco, molhado, 100, 0);
    umidadePercent      =  constrain(umidadePercent, 0, 100);
    float temperatura   =  mapFloat(valorTempRaw, 0, 1023, -10.0, 50.0);
    int valorCO2        =  map(valorCO2raw, 0, 1023, 400, 2000);

    static int ldrMin = 1023;
    static int ldrMax = 0;

    if(valorLuzRaw < ldrMin) ldrMin = valorLuzRaw;
    if(valorLuzRaw > ldrMax) ldrMax = valorLuzRaw;

    int lux = map(valorLuzRaw, ldrMax, ldrMin, 0, 20000);
    lux = constrain(lux, 0, 20000);

  // --- Serial Monitor ---
    Serial.println("=== Leitura dos Sensores ===");
    Serial.print("pH: "); Serial.println(valorPH, 1);
    Serial.print("Umidade: "); Serial.print(umidadePercent); Serial.println(" %");
    Serial.print("Temperatura: "); Serial.print(temperatura, 1); Serial.println(" C");
    Serial.print("CO2: "); Serial.print(valorCO2); Serial.println(" ppm");
    Serial.print("Luminosidade: "); Serial.print(lux); Serial.println(" lux");
    Serial.println("--------------------------------------------");

    // --- LCD ---
    lcd.setCursor(0,0);
    lcd.print("pH:"); lcd.print(valorPH,1);
    lcd.print(" U:"); lcd.print(umidadePercent); lcd.print("%   ");

    lcd.setCursor(0,1);
    lcd.print("T:"); lcd.print(temperatura,1);
    lcd.print("C CO2:"); lcd.print(valorCO2); lcd.print("  ");
    delay(2500);

    lcd.setCursor(0,0);
    lcd.print("Lux:"); lcd.print(lux); lcd.print("      ");
    lcd.setCursor(0,1);
    lcd.print("Monitor OK    ");
    delay(3000);
}
