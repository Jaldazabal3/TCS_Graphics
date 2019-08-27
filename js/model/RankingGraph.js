var RankingGraph = (function () {

    function generateGraph(geoJSONdata, graphicOptions) {
        if (graphicOptions.breakDownScores === true) {
            createStackedRanking(geoJSONdata, graphicOptions);
        } else {
            createSingleRanking(geoJSONdata, graphicOptions);
        }
    }

    /**
     * Creates an horizontal bar chart of the score selected, ordered by ranking
     * @param {*} geoJSONdata 
     * @param {*} graphicOptions 
     */
    function createSingleRanking(geoJSONdata, graphicOptions) {
        var  arrayTCScores = createRankingArray(geoJSONdata, graphicOptions);
        // We get the property of the objects that corresponds to the array of data that we want to use for the graphic
        var arrayDataChart = arrayTCScores.map(a => parseInt(a[graphicOptions.component]));
        // We add at the beggining of the array the name of the data that is showing
        arrayDataChart.unshift(graphicOptions.component);
        // Chart construction
        c3.generate({
            bindto: '#divGraph',
            data: {
                columns: [
                    arrayDataChart
                ],
                type: 'bar',
                color: (color, d) => {
                        return d.id === 'Total (100)' ? (d.value >= 50 ? 'green' : 'red') : color;
                    }
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category',
                    categories: arrayTCScores.map(a => a.country)
                }
            },
            legend: {
                show: false
            }
        });
    }

    /**
     * Creates an array of objects that corresponds to the ranking of countries for the year selected
     * @param {*} geoJSONdata 
     * @param {*} graphicOptions 
     */
    function createRankingArray(geoJSONdata, graphicOptions) {
        // Creating array of countries
        var arrayTCScores = [];
        // We get the data from the countries which have an TCS score for the year selected inside graphic options
        geoJSONdata.features.filter(feature => {
            return feature.properties.tcs.some( tcs => {
                return tcs.Year === graphicOptions.year;
            });
            // We get only the score from the year selected
        }).forEach( d => {
            var yearTCS = d.properties.tcs.filter(singleTCS => {
                return singleTCS.Year === graphicOptions.year
            })[0];
            // We push an object with all the data for a country and the year selected by the user
            arrayTCScores.push(
                {
                    "country": d.properties.name,
                    "Year": yearTCS['Year'],
                    "Ranking": yearTCS['Ranking'],
                    "Price (30)": yearTCS['Price (30)'],
                    "Public place bans (22)": yearTCS['Public place bans (22)'],
                    "Public info campaign spending (15)": yearTCS['Public info campaign spending (15)'],
                    "Advertising bans (13)": yearTCS['Advertising bans (13)'],
                    "Health warnings (10)": yearTCS['Health warnings (10)'],
                    "Treatment (10)": yearTCS['Treatment (10)'],
                    "Total (100)": yearTCS['Total (100)']
                });
        });
        // Sorting the array in ranking order
        arrayTCScores.sort((first, second) => (parseInt(first.Ranking) > parseInt(second.Ranking)) ? 1 : ((parseInt(first.Ranking) < parseInt(second.Ranking)) ? -1 : 0));
        return arrayTCScores;
    }

    /**
     * Creates an stacked barchart of all the components that form the score
     * @param {*} geoJSONdata 
     * @param {*} graphicOptions 
     */
    function createStackedRanking(geoJSONdata, graphicOptions) {
        const arrayComponents = ['Total (100)','Price (30)', 'Public place bans (22)', 'Public info campaign spending (15)', 'Advertising bans (13)', 'Health warnings (10)', 'Treatment (10)'];
        var arrayTCScores = createRankingArray(geoJSONdata, graphicOptions);
        var arrayDataChart = [];                                                    // This will be an bidimensional array. But the next day
        var i = 0;
        arrayComponents.forEach(component => {
            if(component !== 'Total (100)') {
                arrayDataChart.push(arrayTCScores.map(a => parseInt(a[component])));
                arrayDataChart[i].unshift(component);
                i++;
            }
        });
        c3.generate({
            bindto: '#divGraph',
            data: {
                columns: [
                    arrayDataChart[0],
                    arrayDataChart[1],
                    arrayDataChart[2],
                    arrayDataChart[3],
                    arrayDataChart[4],
                    arrayDataChart[5]
                ],
                type: 'bar',
                groups: [
                    [
                        arrayComponents[1],
                        arrayComponents[2],
                        arrayComponents[3],
                        arrayComponents[4],
                        arrayComponents[5],
                        arrayComponents[6]
                    ]
                ]
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category',
                    categories: arrayTCScores.map(a => a.country)
                }
            }
        });
    }

    return {
        generateGraph: generateGraph
    }

}());