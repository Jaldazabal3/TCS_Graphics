var Map = (function() {
    // Displaying a map centered in Europe so the full continent is shown. We use a light map from Mapbox
    function createMapbox() {
        var mymap = L.map('mapid').setView([54.5260,15.2551],3);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 3,
            id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoiamFsZGF6YWJhbCIsImEiOiJjanppZWhsZ20wODMxM21vOGs4MHV2Y2toIn0.O8f9E4GyBreItjEADNYGcQ'
        }).addTo(mymap);
    }

    return {
        generateMap: createMapbox()
    }
});