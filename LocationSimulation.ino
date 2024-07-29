#include <WiFi.h>
#include "ThingSpeak.h" 
#include <TinyGPS++.h>
#include <HardwareSerial.h>

HardwareSerial GPSSerial(1);
TinyGPSPlus gps;  // the TinyGPS++ object
String lat_data, lng_data;

char ssid[] = "VC Analog 2"; 
char pass[] = "12356789";  
WiFiClient  client;

unsigned long myChannelNumber = 2543450;
const char * myWriteAPIKey = "WW2QG9CRI57KMB2U";
unsigned long previousMillis_ts = 0;  
const long ts_update_interval = 10000;  //update data every 20s

void setup() {
  Serial.begin(115200);
  GPSSerial.begin(9600, SERIAL_8N1, 16, 17);
  delay(3000);
  WiFi.mode(WIFI_STA);   
  ThingSpeak.begin(client);  // Initialize ThingSpeak
  ConnectWIFI();
}

void loop() {
  if (Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    int commaIndex = input.indexOf(',');
    if (commaIndex > 0) {
      lat_data = input.substring(0, commaIndex);
      lng_data = input.substring(commaIndex + 1);
      Serial.print("Latitude: "); Serial.println(lat_data);
      Serial.print("Longitude: "); Serial.println(lng_data);
    }
  }

  unsigned long currentMillis = millis(); 
  if (currentMillis - previousMillis_ts >= ts_update_interval) { 
    previousMillis_ts = currentMillis;
    if(WiFi.status() != WL_CONNECTED){
        Serial.print("Attempting to connect to SSID: ");
        Serial.println(ssid);
        WiFi.begin(ssid, pass);
        int i=0;
        while (WiFi.status() != WL_CONNECTED) {
          delay(500);
          Serial.print(".");
          ++i;
          if (i==20){
            i=0;
            Serial.println("\n Failed to Connect.");
            break;
          } 
        }
    }

    ThingSpeak.setField(1, lat_data);  // field latitude
    ThingSpeak.setField(2, lng_data);  
    // write to the ThingSpeak channel
    int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    if(x == 200){
      Serial.println("Cập nhật dữ liệu thành công.");
    }else{
      Serial.println("Update Lỗi!. HTTP error code " + String(x));
    }
    Serial.println();
  }
}

void ConnectWIFI(){
  if(WiFi.status() != WL_CONNECTED){
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    WiFi.begin(ssid, pass);
    int i=0;
    while(WiFi.status() != WL_CONNECTED){ 
      Serial.print(".");
      delay(1000); 
      ++i;
      if (i==30){
        i=0;
        Serial.println("\n Failed to Connect.");
        break;
      }    
    }
    if(WiFi.status() == WL_CONNECTED){
      Serial.println("\n Connected!"); 
    }
    delay(3000);
  }
}
