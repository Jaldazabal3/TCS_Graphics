var MapGraph = (function() {

    var yearTCS;
    var geojson;
    var info = L.control();
    var legend = L.control({position: 'bottomleft'});

    // Displaying a map centered in Europe so the full continent is shown. We use a light map from Mapbox
    function createMapbox() {
        $('#divGraph').html('<div id="divMap"></div>');
        $('#divMap').css('width','100%').css('height','100%');
        var europeMap = L.map('divMap').setView([54.5260,15.2551],3);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 5,
            minZoom: 3,
            id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoiamFsZGF6YWJhbCIsImEiOiJjanppZWhsZ20wODMxM21vOGs4MHV2Y2toIn0.O8f9E4GyBreItjEADNYGcQ'
        }).addTo(europeMap);
        return europeMap;
    }

    function generateMap(geoJSONdata, graphicOptions) {
        yearTCS = graphicOptions.year;
        var europeMap = createMapbox();
        geojson = L.geoJson(
            geoJSONdata,
            {
                style: style,
                onEachFeature: onEachFeature
        }).addTo(europeMap);
        

        info.onAdd = function(europeMap) {
            // Create a div with class info
            this._div = L.DomUtil.create('div','info');
            this.update();
            return this._div;
        }
    
        info.update = function(props) {
            var divContent = '<h4>TCS Score</h4>';
            if (props) {
                var currentTCS = props.tcs.filter(d => d.Year === yearTCS);
                if (currentTCS[0]!==undefined) {
                    divContent += '<b>' + props.name + '</b><br/>';
                    divContent += 'Total (100): ' + currentTCS[0]['Total (100)'] + '<br/>';
                    divContent += 'Price (30): ' + currentTCS[0]['Price (30)'] + '<br/>';
                    divContent += 'Public place bans (22): ' + currentTCS[0]['Public place bans (22)'] + '<br/>';
                    divContent += 'Public info campaign spending (15): ' + currentTCS[0]['Public info campaign spending (15)'] + '<br/>';
                    divContent += 'Advertising bans (13): ' + currentTCS[0]['Advertising bans (13)'] + '<br/>';
                    divContent += 'Health warnings (10): ' + currentTCS[0]['Health warnings (10)'] + '<br/>';
                    divContent += 'Treatment (10): ' + currentTCS[0]['Treatment (10)'] + '<br/>';
                } else {
                    divContent += '<b>' + props.name + '</b><br />';
                    divContent += 'No TCS data';
                }
            } else {
                divContent += 'Hover on a country';
            }
            this._div.innerHTML = divContent;
        }

        info.addTo(europeMap);

        legend.onAdd = function (europeMap) {
            var divLegend = L.DomUtil.create('div','info legend');
            var grades = [0,50,100];
            var labels = [];
            for (var i = 0; i < grades.length - 1 ; i++) {
                divLegend.innerHTML += '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + '&ndash;' + grades[i + 1] + '<br>';
            }
            return divLegend;
        }
        legend.addTo(europeMap);
    }

    function getColor(data) {
        return parseInt(data) >= 50 ? 'green': 'red';
    }

    function style(feature) {
        var tcsSingleData = feature.properties.tcs.filter(d => d.Year === yearTCS)[0];

        
        if (tcsSingleData !== undefined) {
            return {
                fillColor: getColor(tcsSingleData['Total (100)']),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        } else{
            return {
                fillColor: 'white',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            }
        }
    }

    /**
     * Mouseover event event listener
     * @param {*} e 
     */
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 2,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    /**
     * Mouseout event listener
     * @param {*} e 
     */
    function resetHighlight(e) {
        geojson.resetStyle(e.target);

        info.update();
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
    }





    return {
        generateMap: generateMap
    }
}());