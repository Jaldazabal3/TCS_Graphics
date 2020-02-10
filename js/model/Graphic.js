var Graphic = (function () {
    async function chooseGraphicToDraw(graphicOptions) {
        $('#divGraph').empty();
        $('#divGraph').removeClass('c3');
        switch (graphicOptions.type) {
            case 'mapGraphic':
                graphicOptions.year = $('#dataYear').children('option:selected').val();
                const geoJSONdata = await dataAccess(graphicOptions);
                MapGraph.generateMap(geoJSONdata, graphicOptions);
                break;
            case 'rankGraphic':
                graphicOptions.year = $('#dataYear').children('option:selected').val();
                graphicOptions.component = $('#rankComponent').children('option:selected').val();
                if (graphicOptions.component !== 'Total (100)') {
                    $('#breakDownCheckRank').prop('checked',false);
                    $('#breakDownCheckRank').prop('disabled',true);
                } else {
                    $('#breakDownCheckRank').prop('disabled',false);
                    graphicOptions.breakDownScoresRank = document.getElementById('breakDownCheckRank').checked;
                }
                RankingGraph.generateGraph(geoJSONdata, graphicOptions);
                break;
            case 'evoGraphic':
                graphicOptions.component = $('#typeEvolution').children('option:selected').val();
                graphicOptions.arrayCountries = $('#countryMultiInput').val().split(',');
                EvolutionGraph.generateEvoGraph(geoJSONdata, graphicOptions);
                break;
            default:
                break;
        }
    }

    async function dataAccess(graphicOptions) {
        if(graphicOptions.type === 'mapGraphic' || graphicOptions.type === 'rankGraphic') {
            return DataAccess.singleYearGeoJSON(graphicOptions.year);
        } else {
            return DataAccess.readAllData();
        }
    }

    return {
        chooseGraphicToDraw: chooseGraphicToDraw
    }
}());