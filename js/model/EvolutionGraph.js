var EvolutionGraph = (function () {
    const arrayYears = [2003, 2005, 2007, 2010, 2013, 2016];

    function generateEvoGraph(geoJSONdata, graphicOptions) {
        switch (graphicOptions.component) {
            case 'Ranking':
                createRankingGraphic(geoJSONdata,graphicOptions);
                break;
            default:
                createOtherEvoGraphic(geoJSONdata, graphicOptions);
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
                        arrayComponent.push('');
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

    return {
        generateEvoGraph: generateEvoGraph
    }
}());