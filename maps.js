   // Code có bản quyền logo leaflet:
        // var map = L.map('map').setView([0, 0], 15);
        //Tắt bản quyền:
        var map = L.map('map', {
            attributionControl: false // Tắt điều khiển thông tin bản quyền
                        }).setView([0, 0], 15);

        var blueIcon = new L.Icon({
            iconUrl: 'https://cdn-icons-png.freepik.com/256/2264/2264768.png?semt=ais_hybrid',
            // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [30, 30],
            iconAnchor: [12, 15],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        var redIcon = new L.Icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/256/3721/3721619.png',
            // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [30, 30],
            iconAnchor: [12, 15],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        var greenIcon = new L.Icon({
            iconUrl: 'https://static.thenounproject.com/png/3437096-200.png',
            // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [30, 30],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        var orangeIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        var initialMarker = L.marker([0, 0], {icon: redIcon});
        var updatedMarker = L.marker([0, 0], {icon: blueIcon});
        var finishMarker = L.marker([0, 0], {icon: greenIcon}); 
        var polyline = L.polyline([], { color: 'red' });
        var startPolylineButton = document.getElementById('startPolylineButton');
        var resetButton = document.getElementById('resetButton');
        var createSafetyZoneButton = document.getElementById('createSafetyZoneButton');
        var isPolylineStarted = false;
        var locationData = [];
        var currentIndex = 0;
        var polylineIndex = 0;
        var stat_btn = 0;
        var safetyCircle = null;
        var drawingSafetyZone = false;

        var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        var satelliteLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenTopoMap'
        });

        streetLayer.addTo(map);

        document.getElementById('mapTypeSelect').addEventListener('change', function() {
            var selectedMapType = this.value;
            if (selectedMapType === 'streets') {
                map.removeLayer(satelliteLayer);
                streetLayer.addTo(map);
            } else if (selectedMapType === 'satellite') {
                map.removeLayer(streetLayer);
                satelliteLayer.addTo(map);
            }
        });

        var circleCenter = null;
        var safetyCircle = null;

        createSafetyZoneButton.addEventListener('click', function () {
            if (!drawingSafetyZone) {
                createSafetyZoneButton.textContent = 'Nhấp vào bản đồ để thiết lập bán kính vùng an toàn';
                createSafetyZoneButton.classList.remove('btn-info');
                createSafetyZoneButton.classList.add('btn-danger');
                drawingSafetyZone = true;
                map.on('click', onSafetyZoneClick);
            } else {
                map.off('click', onSafetyZoneClick);
                createSafetyZoneButton.textContent = 'Tạo vùng an toàn mới';
                createSafetyZoneButton.classList.remove('btn-danger');
                createSafetyZoneButton.classList.add('btn-info');
                drawingSafetyZone = false;
                circleCenter = null;
            }
        });

        function onSafetyZoneClick(e) {
            if (!circleCenter) {
                circleCenter = e.latlng;
                safetyCircle = L.circle(circleCenter, { radius: 100, color: 'red', fillOpacity: 0.2 }).addTo(map);
                document.getElementById('safety-status').textContent = 'Tiếp tục chọn điểm tiếp theo để tạo bán kính an toàn!!!';
                map.off('click', onSafetyZoneClick);
                map.on('click', onRadiusClick);
            } else {
                var radius = map.distance(circleCenter, e.latlng);
                safetyCircle.setRadius(radius);
                document.getElementById('safety-status').textContent = 'Tạo vùng an toàn thành công';
                map.off('click', onRadiusClick);
                createSafetyZoneButton.textContent = 'Tạo vùng an toàn';
                createSafetyZoneButton.classList.remove('btn-danger');
                createSafetyZoneButton.classList.add('btn-info');
                drawingSafetyZone = false;
                circleCenter = null;
            }
        }

        function onRadiusClick(e) {
            var radius = map.distance(circleCenter, e.latlng);
            safetyCircle.setRadius(radius);
            document.getElementById('safety-status').textContent = 'Tạo vùng an toàn';
            map.off('click', onRadiusClick);
            createSafetyZoneButton.textContent = 'Tạo vùng an toàn mới'; 
            createSafetyZoneButton.classList.remove('btn-danger');
            createSafetyZoneButton.classList.add('btn-info');
            drawingSafetyZone = false;
            circleCenter = null;
        }

        function updateMap(data) {
            var latitude = parseFloat(data.field1);
            var longitude = parseFloat(data.field2);
            var timestamp = data.created_at;

            var date_ = timestamp.split('T'), 
                date_now = date_[0], time_z = date_[1];
            var time_ = time_z.split('+'), time_now = time_[0];

            document.getElementById('latitude').textContent = latitude.toFixed(6);
            document.getElementById('longitude').textContent = longitude.toFixed(6);
            document.getElementById('time_date').textContent = date_now;
            document.getElementById('time_time').textContent = time_now;

            var isInSafetyZone = safetyCircle ? map.distance(L.latLng(latitude, longitude), safetyCircle.getLatLng()) <= safetyCircle.getRadius() : true;
            document.getElementById('safety-status').textContent = isInSafetyZone ? 'Xe của bạn đang trong vùng an toàn' : 'Xe của bạn đã ra khỏi vùng an toàn';

            updateMarker(latitude, longitude, date_now, time_now);
            if (stat_btn == 1) {
                polyline.addLatLng([latitude, longitude]);
                polyline.addTo(map);
            }

            map.panTo([latitude, longitude]);
        }

        function updateMarker(latitude, longitude, date_now, time_now) {
            var customPopup = "<b>Vị trí xe hiện tại<br>" + date_now + " " + time_now + "</b><br><b>Vĩ độ: </b>" + latitude.toFixed(6) + "<br><b>Kinh độ: </b>" + longitude.toFixed(6);
            var marker;

            if (stat_btn == 0) {
                marker = initialMarker.addTo(map);
            }
            if (stat_btn == 1) {
                marker = updatedMarker.addTo(map);
            }
            if (stat_btn == 2) {
                marker = finishMarker.addTo(map);
            }
            marker.setLatLng([latitude, longitude]).update();
            marker.bindPopup(customPopup).addTo(map);
            map.setView([latitude, longitude], map.getZoom());
        }

        function updatePolyline(data) {
            var coordinates = data.map(location => [location.lat, location.lng]);
            polyline.setLatLngs(coordinates);
            map.addLayer(polyline);
        }

        function startPolyline() {
            stat_btn++;
            if (stat_btn == 1) {
                startPolylineButton.classList.remove('btn-success');
                startPolylineButton.classList.add('btn-danger');
                startPolylineButton.textContent = 'Dừng chế độ theo dõi vị trí';
                resetButton.style.display = 'block';
            }
            if (stat_btn == 2) {
                startPolylineButton.disabled = true;
                startPolylineButton.classList.remove('btn-danger');
                startPolylineButton.classList.add('btn-success');
            }
            console.log('Button Status:', stat_btn);
        }

        function resetMap() {
            stat_btn = 0;
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle) {
                    map.removeLayer(layer);
                }
            });
            startPolylineButton.disabled = false;
            document.getElementById('latitude').textContent = "";
            document.getElementById('longitude').textContent = "";
            document.getElementById('time_date').textContent = "";
            document.getElementById('time_time').textContent = "";
            document.getElementById('safety-status').textContent = "";
            initialMarker = L.marker([0, 0], {icon: redIcon});
            updatedMarker = L.marker([0, 0], {icon: blueIcon});
            finishMarker = L.marker([0, 0], {icon: greenIcon});
            polyline = L.polyline([], { color: 'blue' });
            safetyCircle = null; // Clear safety circle
            resetButton.style.display = 'none';
            fetchData();
        }

        function fetchData() {
            fetch('https://api.thingspeak.com/channels/2543450/feeds/last.json?api_key=5Q7YJ6AA78FTRNK9')
                .then(response => response.json())
                .then(data => {
                    updateMap(data);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        setInterval(fetchData, 5000);
        fetchData();
        startPolylineButton.addEventListener('click', startPolyline);
        resetButton.addEventListener('click', resetMap);