var DataAccess = (function() {
    function createGeoJSON() {
        // Loading csv and geojson data using d3 library.
        // If success, we want to filter geojson data to get only countries in TCS and then, 
        // add data of TCS to geojson variable
        return Promise
        .all([
            d3.dsv(';','dades_paisos_all.csv'),
            d3.json('world.geojson')
        ]).then(([tcsData, geoJSONdata]) => {
            //We get a geoJSON object containing only the countries in TCS
            geoJSONdata.features = geoJSONdata.features.filter( d => {
                return tcsData.map(a => a.Country).includes(d.properties.name);
            });
            //For each country we create an array of objects and bind them to geoJSONdata by creating a new property
            geoJSONdata.features.forEach(feature => {
                var singleCountryTCS = [];
                tcsData.filter(d => {
                        return d.Country === feature.properties.name;
                    }).forEach(element => {
                        singleCountryTCS.push({
                            "Year": element['Year'],
                            "Ranking": element['Ranking'],
                            "Price (30)": element['Price (30)'],
                            "Public place bans (22)": element['Public place bans (22)'],
                            "Public info campaign spending (15)": element['Public info campaign spending (15)'],
                            "Advertising bans (13)": element['Advertising bans (13)'],
                            "Health warnings (10)": element['Health warnings (10)'],
                            "Treatment (10)": element['Treatment (10)'],
                            "Total (100)": element['Total (100)']
                        });
                    });
                feature.properties.tcs = singleCountryTCS;
            });
            return geoJSONdata;
        }).catch(e => alert("App failed! Contact the administrator or throw the computer through the window."));
    }

    function init() {
        return createGeoJSON();
    }

    return {
        init: init
    };

}());