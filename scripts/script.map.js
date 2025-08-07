$(function () {
    const map = L.map('map', { zoomControl: false }).setView([52.2297, 21.0122], 6);
    L.tileLayer('https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=cXN3ntECWicJwKROlz3f', {
        maxZoom: 22,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    L.Control.geocoder({
        defaultMarkGeocode: true,
        placeholder: 'Wyszukaj miejscowość...',
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);

    let isMapToggling = false
    $('.calculator-toggle-map').on('click', function () {
        if (isMapToggling) return
        isMapToggling = true
        $('.calculator-drivertime-map-controls-container').slideToggle()
        setTimeout(() => {
            $('.calculator-drivertime-map-container').slideToggle(250, function () {
                const isVisible = $(this).is(':visible')
                $('.calculator-toggle-map').text(isVisible ? 'Schowaj mapę' : 'Pokaż mapę')
                if (isVisible) {
                    map.invalidateSize()
                }

                isMapToggling = false
            })
        }, 500)
    })

    $('#map-controls-visibility').on('click', function () {
        if ($(this).hasClass('fa-eye')) {
            $(this).removeClass('fa-eye').addClass('fa-eye-low-vision')
            $('.calculator-drivertime-map-controls-wrapper').css('display', 'flex')
        } else {
            $(this).removeClass('fa-eye-low-vision').addClass('fa-eye')
            $('.calculator-drivertime-map-controls-wrapper').css('display', 'none')
        }
    })

    let addingPoint = false
    let points = []
    let markers = []
    let canPointing = true
    const routeCache = new Map();

    function resetPoints(map) {
        points = [];
        markers.forEach(m => map.removeLayer(m));
        markers = [];
        if (polyline) {
            map.removeLayer(polyline)
            polyline = null
        }
        $('#drivertime-distance').val('')
    }

    $('#map-map-point-add').on('click', function () {
        addingPoint = true
        $(this).addClass('active')
        resetPoints(map)
    });

    const ORSApiKey = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImI5ZjhmZGFhNzZhZTRhMmM4NWE0YjQzZjc2YmE3ZDVhIiwiaCI6Im11cm11cjY0In0='

    let polyline = null

    map.on('click', function (e) {
        if (!addingPoint) return

        const latlng = e.latlng
        points.push(latlng)

        const marker = L.marker(latlng).addTo(map).bindPopup(`Punkt ${points.length}`).openPopup()
        markers.push(marker)
    });


    function getORSRoute(points) {
        const coords = points.map(p => [p.lng, p.lat])
        const cacheKey = coords.map(c => c.join(',')).join('|')

        if (routeCache.has(cacheKey)) {
            const data = routeCache.get(cacheKey);
            renderORSRoute(data);
            return
        }

        fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
            method: 'POST',
            headers: {
                'Authorization': ORSApiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ coordinates: coords })
        })
            .then(res => res.json())
            .then(data => {
                routeCache.set(cacheKey, data)
                renderORSRoute(data)
            }).catch(err => {
                console.error('Błąd ORS:', err)
                alert('Nie udało się pobrać trasy z ORS.')
            })
    }

    function renderORSRoute(data) {
        const route = data.features[0];
        const distanceKm = (route.properties.summary.distance / 1000).toFixed(2);
        $('#drivertime-distance').val(distanceKm);

        if (polyline) {
            map.removeLayer(polyline);
        }

        polyline = L.geoJSON(route.geometry, {
            style: {
                color: 'blue',
                weight: 4
            }
        }).addTo(map);
    }

    $('#map-map-zoom-in').on('click', function () {
        map.zoomIn()
    });

    $('#map-map-zoom-out').on('click', function () {
        map.zoomOut()
    });

    $('#map-map-generate-route').on('click', function () {
        if (points.length < 2) {
            Notify('Musisz zaznaczyć co najmniej 2 punkty aby zaznaczyć trasę.')
            return
        }

        if (!canPointing) {
            Notify('Odczekaj chwilę...')
            return
        }

        getORSRoute(points)
        addingPoint = false
        canPointing = false

        setTimeout(() => {
            canPointing = true
        }, 5000)

        $('.calculator-drivertime-map-control:contains("Dodaj punkt")').removeClass('active')
    });
})