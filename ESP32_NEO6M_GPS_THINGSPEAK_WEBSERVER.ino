#include <WiFi.h>
#include "ThingSpeak.h" 
#include <TinyGPS++.h>
#include <HardwareSerial.h>
HardwareSerial GPSSerial(1);

TinyGPSPlus gps;  // the TinyGPS++ object
String lat_data, lng_data;
// #define GPS_BAUDRATE 9600 

char ssid[] = "YOUR_SSID"; 
char pass[] = "YOUR_PASSWORD";  
// int keyIndex = 0;            // your network key Index number (needed only for WEP)
WiFiClient  client;

unsigned long myChannelNumber = YourChannelNumber;
const char * myWriteAPIKey = "YourAPIKey";
unsigned long previousMillis_ts = 0;  
const long ts_update_interval = 20000;  //update data evert 20s


void setup() {
  Serial.begin(115200);
  GPSSerial.begin(9600, SERIAL_8N1, 16, 17);
  delay(3000);
  WiFi.mode(WIFI_STA);   
  ThingSpeak.begin(client);  // Initialize ThingSpeak
  ConnectWIFI();
}

void loop() {
  if (GPSSerial.available() > 0) {
    if (gps.encode(GPSSerial.read())) {
      if (gps.location.isValid()) {
        Serial.print(F("Lat: "));Serial.print(gps.location.lat(),6);
        lat_data=String(gps.location.lat(),8);
        // lat_data=String(10.886387);
        Serial.print(F(" , Longitude: ")); Serial.println(gps.location.lng(),6);
        lng_data=String(gps.location.lng(),8);
// lng_data=String(106.781490);
      } else {
        Serial.println(F("Location: INVALID"));
      }
      //Serial.println();
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

    ThingSpeak.setField(1, lat_data);  //field latitude
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
    //WiFi.mode(WIFI_STA);  
    WiFi.begin(ssid, pass); //Untuk Simulasi >> Spesifik channel 6 
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
