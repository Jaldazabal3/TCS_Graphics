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
        }).catch(e => alert("Unexpected error. If the problem persists contact the administrator."));
    }

    function singleYearGeoJSON(year) {
        // Loading csv and geojson data using d3 library.
        // If success, we want to filter geojson data to get only countries in TCS and then, 
        // add data of TCS to geojson variable
        return Promise
        .all([
            d3.dsv(';',`data/tcs_${year}.csv`),
            d3.json('world.geojson')
        ]).then(([tcsData, geoJSONdata]) => {
            //We get a geoJSON object containing only the countries in TCS
            geoJSONdata.features = geoJSONdata.features.filter( d => {
                return tcsData.map(a => a.Country).includes(d.properties.name);
            });
            //For each country we create an array of objects and bind them to geoJSONdata by creating a new property
            if(year === '2019') {
                geoJSONdata.features.forEach(feature => {
                    let singleCountryTCS = [];
                    tcsData.filter(d => {
                            return d.Country === feature.properties.name;
                        }).forEach(element => {
                            singleCountryTCS.push({
                                "Year": element['Year'] === '' ? 0 : element['Year'],
                                "Ranking": element['Ranking'] === '' ? 0 : element['Ranking'],
                                "Price (30)": element['Price (30)'] === '' ? 0 : element['Price (30)'],
                                "Public place bans (22)": element['Public place bans (22)'] === '' ? 0 : element['Public place bans (22)'],
                                "Public info campaign spending (10)": element['Public info campaign spending (10)'] === '' ? 0 : element['Public info campaign spending (10)'],
                                "Advertising bans (13)": element['Advertising bans (13)'] === '' ? 0 : element['Advertising bans (13)'],
                                "Health warnings (10)": element['Health warnings (10)'] === '' ? 0 : element['Advertising bans (13)'],
                                "Treatment (10)": element['Treatment (10)'] === '' ? 0 : element['Treatment (10)'],
                                "Illicit trade (3)": element["Illicit trade (3)"] === '' ? 0 : element["Illicit trade (3)"],
                                "Art 5.3 FCTC (2)": element['Art 5.3 FCTC (2)'] === '' ? 0 : element['Art 5.3 FCTC (2)'],
                                "Total (100)": element['Total (100)'] === '' ? 0 :element['Total (100)']
                            });
                        });
                    feature.properties.tcs = singleCountryTCS;
                });
            } else {
                geoJSONdata.features.forEach(feature => {
                    let singleCountryTCS = [];
                    tcsData.filter(d => {
                            return d.Country === feature.properties.name;
                        }).forEach(element => {
                            singleCountryTCS.push({
                                "Year": element['Year'] === '' ? 0 : element['Year'],
                                "Ranking": element['Ranking'] === '' ? 0 : element['Ranking'],
                                "Price (30)": element['Price (30)'] === '' ? 0 : element['Price (30)'],
                                "Public place bans (22)": element['Public place bans (22)'] === '' ? 0 : element['Public place bans (22)'],
                                "Public info campaign spending (15)": element['Public info campaign spending (15)'] === '' ? 0 : element['Public info campaign spending (15)'],
                                "Advertising bans (13)": element['Advertising bans (13)'] === '' ? 0 : element['Advertising bans (13)'],
                                "Health warnings (10)": element['Health warnings (10)'] === '' ? 0 : element['Health warnings (10)'],
                                "Treatment (10)": element['Treatment (10)'] === '' ? 0 : element['Treatment (10)'],
                                "Total (100)": element['Total (100)'] === '' ? 0 : element['Total (100)']
                            });
                        });
                    feature.properties.tcs = singleCountryTCS;
                });
            }
            return geoJSONdata;
        }).catch(e => alert("Unexpected error. If the problem persists contact the administrator."));
    }

    function readAllData() {
        return createGeoJSON();
    }


    return {
        readAllData: readAllData,
        singleYearGeoJSON: singleYearGeoJSON
    };

}());