
# ESP32 GPS Tracking Device with Webserver Maps

Create a GPS tracking device for motorbikes using an ESP32, and build a management website with a map

### Nếu bạn cần hỗ trợ đề tài này, đừng ngần ngại liên hệ mình. Mình là người tiên phong làm sản phẩm này tại Việt Nam và cũng như trên thế giới. Trên internet rất ít tài liệu liên quan tới dự án này!!!

![images](https://github.com/VinhCao09/Making_a_RemoteTVSony/blob/main/images/1.jpg)

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


## Giải thích về remote hồng ngoại
Nguyên lý là sử dụng tia hồng ngoại (IR, infrared). Hồng ngoại là bức xạ điện từ có bước sóng dài hơn ánh sáng khả kiến nhưng ngắn hơn sóng vô tuyến (khoảng từ 760nm đến 1mm). Bước sóng này nằm ngoài khả năng nhìn thấy của con người nên với mắt thường bạn không thể nhìn thấy được. Các hãng điện tử thì hầu hết tất cả các tín hiệu hồng ngoại để điều khiển dùng ở các Remote thì đều sử dụng sóng 38Khz, với thạch anh 455Khz. Về chuẩn điều chế và mã hóa code điều khiển thì có khá nhiều, mỗi nhà sản xuất đều có một chuẩn riêng cho mình như chuẩn NEC, RC5, RC6, Sony,... ,đây chính là điểm phân biệt giữa các nhà sản xuất và giữa các thiết bị với nhau, chứ không phải là mạch chọn tần.

## How to use
*Connect*

Pin Neo 6M | Pin ESP32 | 
--- | --- |
VCC | Vin (5V) |
GND | GND |
TX | GPIO16 (RX) |
RX | GPIO17 (TX) |


✔️Please read the code to connect the button pins.

![images](https://github.com/VinhCao09/Making_a_RemoteTVSony/blob/main/images/3.jpg)

Power Supply: 9V Battery

Button: Use internal pull-up resistor

Joystick: 5V from Arduino Nano Pin

Ở đoạn code có 2 code test, một code test để kết nối với mắt thu hồng ngoại. Mục đích là sử dụng code này để thử nghiệm lấy mã hồng ngoại. Ở đây mình sử dụng điều khiển Tivi nhà mình và thử một số nút, mã hồng ngoại đọc vào được là dạng mã hóa Sony 12 bit. Kết quả được liệt kê như sau:



Ngoài ra, các bạn có thể xem mã tại đây, mình thấy nó khá chính xác: https://tasmota.github.io/docs/Codes-for-IR-Remotes/#sony-kdl-ex540-tv

Ở link đính kèm bao gồm một số mã TV: Samsung AA59 TV, TCL 55P715 TV, Panasonic TX65FXW784 TV, LG 55UH8509 TV, AppleTV Gen4,... Nếu không có thì bạn dùng code test ở trên để tự lấy mã hồng ngoại nhé. Ngoài tivi ra thì bạn có có thể thử nghiệm làm remote với điều hòa, máy quạt,... chỉ với code test trên để lấy mã. Sau đó lập trình cho nó phát ra thôi.

## Schematic

Nhìn chung khá đơn giản, mình đọc một số tài liệu trên mạng thì họ có gắn nối tiếp một trở 220ohm hay 330ohm cho Led IR. Nhưng mình kết nối trực tiếp với chân từ Aruduino thì thấy nó chạy vẫn khá ngon, nên trong sơ đồ mình làm không nối với trở luôn.

![images](https://github.com/VinhCao09/Making_a_RemoteTVSony/blob/main/images/4.jpg)

## 

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

[![Watch the video](https://media3.giphy.com/media/A7LF3J4uMJQ4r8ApLg/giphy.gif?cid=6c09b95275l1l3krhehcppcrgllmv64r7jd6py964efin2av&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s)](https://www.tiktok.com/@vinhcaoplay/video/7395468211141004551?lang=vi-VN)

[https://www.tiktok.com/@vinhcaoplay/video/7389532656867740944?lang=vi-VN](https://www.tiktok.com/@vinhcaoplay/video/7395468211141004551?lang=vi-VN)


![Logo](https://codingninja.asia/images/codeninjalogo.png)

