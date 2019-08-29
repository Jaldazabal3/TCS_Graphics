var Graphic = (function () {
    function chooseGraphicToDraw(geoJSONdata, graphicOptions) {
        $('#divGraph').empty();
        $('#divGraph').removeClass('c3');
        switch (graphicOptions.type) {
            case 'mapGraphic':
                graphicOptions.year = $('#dataYear').children('option:selected').val();
                MapGraph.generateMap(geoJSONdata, graphicOptions);
                break;
            case 'rankGraphic':
                graphicOptions.year = $('#dataYear').children('option:selected').val();
                graphicOptions.component = $('#rankComponent').children('option:selected').val();
                if (graphicOptions.component !== 'Total (100)') {
                    $('#breakDownCheck').prop('checked',false);
                    $('#breakDownCheck').prop('disabled',true);
                } else {
                    $('#breakDownCheck').prop('disabled',false);
                    graphicOptions.breakDownScores = document.getElementById('breakDownCheck').checked;
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

    return {
        chooseGraphicToDraw: chooseGraphicToDraw
    }
}());