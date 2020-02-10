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
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 5,
            minZoom: 3
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
                const currentTCS = props.tcs.filter(d => d.Year === yearTCS);
                console.log(currentTCS);
                if (currentTCS[0] !== undefined) {
                    let arrayComponents = [];
                    if(graphicOptions.year === '2019') {
                        arrayComponents = [
                            'Total (100)', 'Price (30)',
                            'Public place bans (22)',
                            'Public info campaign spending (10)',
                            'Advertising bans (13)',
                            'Health warnings (10)',
                            'Treatment (10)',
                            'Illicit trade (3)',
                            'Art 5.3 FCTC (2)'
                        ];
                    } else {
                        arrayComponents = [
                            'Total (100)',
                            'Price (30)',
                            'Public place bans (22)',
                            'Public info campaign spending (15)',
                            'Advertising bans (13)',
                            'Health warnings (10)',
                            'Treatment (10)'
                        ];
                    }
                    divContent += '<b>' + props.name + '</b><br/>';
                    arrayComponents.forEach(component => {
                        divContent += '<span class="score-name">' + component + ': </span><span class="score-value">' + currentTCS[0][component] + '</span><br/>';
                    });
                } else {
                    divContent += '<b>' + props.name + '</b><br />';
                    divContent += 'No TCS data';
                }
            } else {
                divContent += 'Hover over a country';
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