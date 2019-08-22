var MapGraph = (function() {

    var yearTCS;
    // Displaying a map centered in Europe so the full continent is shown. We use a light map from Mapbox
    function createMapbox() {
        var europeMap = L.map('divGraph').setView([54.5260,15.2551],3);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 4,
            minZoom: 3,
            id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoiamFsZGF6YWJhbCIsImEiOiJjanppZWhsZ20wODMxM21vOGs4MHV2Y2toIn0.O8f9E4GyBreItjEADNYGcQ'
        }).addTo(europeMap);
        return europeMap;
    }

    function generateMap(geoJSONdata, graphicOptions) {
        console.log(geoJSONdata);
        yearTCS = graphicOptions.year;
        var europeMap = createMapbox();
        L.geoJson(geoJSONdata, {style: style}).addTo(europeMap);
    }

    function getColor(data) {
        if (data[0]!==undefined) {
            console.log(data[0]["Total (100)"]);
            return parseInt(data[0]["Total (100)"]) >= 50 ? 'green': 'red';
        }
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.tcs.filter(d => d.Year === yearTCS)),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        }
    }



    return {
        generateMap: generateMap
    }
}());