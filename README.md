
# ESP32 GPS Tracking Device with Webserver Maps

Create a GPS tracking device for motorbikes using an ESP32, and build a management website with a map

### Nếu bạn cần hỗ trợ đề tài này, đừng ngần ngại liên hệ mình. Mình là người tiên phong làm sản phẩm này tại Việt Nam và cũng như trên thế giới. Trên internet rất ít tài liệu liên quan tới dự án này!!!

![images](https://github.com/VinhCao09/ESP32_GPS_Tracking_Device_with_Webserver_Maps/blob/main/images/1.jpg)
![images](https://github.com/VinhCao09/ESP32_GPS_Tracking_Device_with_Webserver_Maps/blob/main/images/4.jpg)
## Components
- ESP32-DevKitC
- GPS NEO-6MV2 (UART)

## Version Recommend
*Version Arduino IDE:*
`2.3.2`

*Version Board:* ESP32 by Espressif Systems - `3.0.3`

*Version Library:* 

- ThingSpeak by MathWorks - `2.0.1`

- TinyGPSPlus by Mikal Hart - `1.0.3`


## Working principle
![images](https://github.com/VinhCao09/ESP32_GPS_Tracking_Device_with_Webserver_Maps/blob/main/images/2.jpg)

## How to use
*Connect*

Pin Neo 6M | Pin ESP32 | 
--- | --- |
VCC | Vin (5V) |
GND | GND |
TX | GPIO16 (RX) |
RX | GPIO17 (TX) |

Change the wifi configuration

```bash
char ssid[] = "VC Analog 2"; 
char pass[] = "12356789";  
```

Change the ThingSpeak configuration

```bash
unsigned long myChannelNumber = 2543450;
const char * myWriteAPIKey = "WW2QG9CRI57KMB2U";
```

✔️Please read the code to connect the button pins.

![images](https://github.com/VinhCao09/ESP32_GPS_Tracking_Device_with_Webserver_Maps/blob/main/images/3.jpg)

![images](https://github.com/VinhCao09/Making_a_RemoteTVSony/blob/main/images/4.jpg)

## 🚀 About Me
Hello 👋I am Vinh. I'm studying HCMC University of Technology and Education

**Major:** Electronics and Telecommunication

**Skill:** 

*- Microcontroller:* ESP32/8266 - ARDUINO - PIC - Raspberry Pi - PLC Rockwell Allen Bradley

*- Programming languages:* C/C++/HTML/CSS/PHP/SQL and
related Frameworks (Bootstrap)

*- Communication Protocols:* SPI, I2C, UART, CAN

*- Data Trasmissions:* HTTP, TCP/IP, MQTT
## Authors

- [@my_fb](https://www.facebook.com/vcao.vn)
- [@my_email](contact@vinhcaodatabase.com)

## Demo

👉Click on the icon below to watch the demo video:

[![Watch the video](https://media3.giphy.com/media/A7LF3J4uMJQ4r8ApLg/giphy.gif?cid=6c09b95275l1l3krhehcppcrgllmv64r7jd6py964efin2av&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s)](https://www.tiktok.com/@vinhcaoplay/video/7396630681628970256?lang=vi-VN)

https://www.tiktok.com/@vinhcaoplay/video/7396630681628970256?lang=vi-VN


![Logo](https://codingninja.asia/images/codeninjalogo.png)

