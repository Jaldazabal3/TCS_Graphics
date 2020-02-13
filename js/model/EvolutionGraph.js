var EvolutionGraph = (function () {
    const arrayYears = [2003, 2005, 2007, 2010, 2013, 2016, 2019];

    function generateEvoGraph(geoJSONdata, graphicOptions) {
        switch (graphicOptions.component) {
            case 'Ranking':
                createRankingGraphic(geoJSONdata,graphicOptions);
                break;
            default:
                if (graphicOptions.breakDownScoresEvo) {
                    createBrokenDownScoresEvo(geoJSONdata, graphicOptions);
                } else {
                    createOtherEvoGraphic(geoJSONdata, graphicOptions);
                }
                break;
        }
    }

    function createRankingGraphic(geoJSONdata, graphicOptions) {
        //This is an array of objects, which have the country name as key and an array of ranking for each year
        var arrayData = getArrayChosenComponenet(geoJSONdata, graphicOptions);
        
        c3.generate({
            bindto: '#divGraph',
            data: {
                json: arrayData
            },
            axis: {
                x: {
                    type: 'category',
                    categories: arrayYears
                },
                y: {
                    inverted: 'true',
                    label: graphicOptions.component,
                    min: 0,
                    max: ArrayCountries.getArrayCountries().length
                }
            }
        });
    }

    function getArrayChosenComponenet(geoJSONdata, graphicOptions) {
        var arrayData = {};  // Object that will hace the countries names as keys and an array of the components chosen as value
        graphicOptions.arrayCountries.forEach(country => {
            var arrayComponent = [];
            var countrySelFeature = geoJSONdata.features.filter(feature => {
                return feature.properties.name === country
            })[0];
            arrayYears.forEach(year => {
                if(countrySelFeature !== undefined){
                    if (countrySelFeature.properties.tcs.some(singleTCS => {
                        return parseInt(singleTCS.Year) === year
                    })) {
                        arrayComponent.push(countrySelFeature.properties.tcs.filter(singleTCS => {
                            return parseInt(singleTCS.Year) === year
                        })[0][graphicOptions.component]);
                    } else {
                        arrayComponent.push(null);
                    }
                }
            });
            arrayData[country] = arrayComponent;
        });
        return arrayData;
    }

    function createOtherEvoGraphic(geoJSONdata, graphicOptions) {
        //This is an array of objects, which have the country name as key and an array of ranking for each year
        var arrayData = getArrayChosenComponenet(geoJSONdata, graphicOptions);
        c3.generate({
            bindto: '#divGraph',
            data: {
                json: arrayData,
                type: 'bar'
            },
            axis: {
                x: {
                    type: 'category',
                    categories: arrayYears
                },
                y: {
                    label: graphicOptions.component
                }
            }
        });
    }

    function createBrokenDownScoresEvo(geoJSONdata, graphicOptions) {
        // Each position in the array will be an object like: {country: , year: , Price (30): , etc}. We will have countriesSelected * tcsYears number of elements inside the array
        var arrayCountriesScores = createArrayCountriesScores(geoJSONdata, graphicOptions);
        c3.generate({
            bindto: '#divGraph',
            data: {
                json: arrayCountriesScores,
                type: 'bar',
                keys: {
                    x: 'Year',
                    value: ['Price (30)', 'Public place bans (22)', 'Public info campaign spending, Illicit trade and Art. 5.3 FCTC (15)', 'Advertising bans (13)', 'Health warnings (10)', 'Treatment (10)'],
                },
                groups: [
                    ['Price (30)', 'Public place bans (22)', 'Public info campaign spending, Illicit trade and Art. 5.3 FCTC (15)', 'Advertising bans (13)', 'Health warnings (10)', 'Treatment (10)']
                ],
            },
            axis: {
                x: {
                    type: 'category',
                    categories: 'Year'
                },
                y: {
                    label: graphicOptions.component
                }
            }
        });
    }

    function createArrayCountriesScores(geoJSONdata, graphicOptions) {
        var arrayCountriesScores = [];
        if (graphicOptions.arrayCountries[0] !== "") {
            graphicOptions.arrayCountries.forEach(country => {
                geoJSONdata.features.find(feature => {
                    return feature.properties.name === country;
                }).properties.tcs.forEach(singleTCS => {
                    arrayCountriesScores.push({
                        'country': country,
                        "Year": singleTCS['Year'],
                        "Price (30)": singleTCS['Price (30)'],
                        "Public place bans (22)": singleTCS['Public place bans (22)'],
                        "Public info campaign spending, Illicit trade and Art. 5.3 FCTC (15)": singleTCS['Public info campaign spending, Illicit trade and Art. 5.3 FCTC (15)'],
                        "Advertising bans (13)": singleTCS['Advertising bans (13)'],
                        "Health warnings (10)": singleTCS['Health warnings (10)'],
                        "Treatment (10)": singleTCS['Treatment (10)'],
                    });
                });
            });
        }
        return arrayCountriesScores;
    }

    return {
        generateEvoGraph: generateEvoGraph
    }
}());