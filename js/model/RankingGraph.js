var RankingGraph = (function () {

    function generateGraph(geoJSONdata, graphicOptions) {
        if (graphicOptions.breakDownScores === true) {
            
        } else {
            return createRanking(geoJSONdata, graphicOptions);
        }
    }

    // Creates an horizontal bar chart of the score selected, ordered by ranking
    function createRanking(geoJSONdata, graphicOptions) {
        // Creating array of countries
        var arrayTCScores = [];
        geoJSONdata.features.filter(feature => {
            return feature.properties.tcs.some( tcs => {
                return tcs.Year === graphicOptions.year;
            });
        }).forEach( d => {
            var yearTCS = d.properties.tcs.filter(singleTCS => {
                return singleTCS.Year === graphicOptions.year
            })[0];
            arrayTCScores.push(
                {
                    "country": d.properties.name,
                    "totalScore": yearTCS['Total (100)'],
                    "rank": yearTCS['Ranking'],
                    [graphicOptions.component]: yearTCS[graphicOptions.component]
                });
        });
        arrayTCScores.sort((first, second) => (parseInt(first.rank) > parseInt(second.rank)) ? 1 : ((parseInt(first.rank) < parseInt(second.rank)) ? -1 : 0));
        var arrayDataChart = arrayTCScores.map(a => parseInt(a[graphicOptions.component]));
        arrayDataChart.unshift(graphicOptions.component);
        var chart = c3.generate({
            bindto: '#divGraph',
            data: {
                columns: [
                    arrayDataChart
                ],
                type: 'bar'
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category',
                    categories: arrayTCScores.map(a => a.country)
                }
            }
        });
        return chart;
    }

    return {
        generateGraph: generateGraph
    }

}());