var Graphic = (function () {
    var activeGraphic;

    function chooseGraphicToDraw(geoJSONdata, graphicOptions) {
        // We destroy the existing graphic if any because it gives problems between c3 and leaflet
        if (activeGraphic !== undefined) {
            activeGraphic.destroy();
        }
        $('#divGraph').empty();
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
                    graphicOptions.breakDownScores = document.getElementById('breakDownCheck').checked;
                    $('#breakDownCheck').prop('disabled',false);
                }
                activeGraphic = RankingGraph.generateGraph(geoJSONdata, graphicOptions);
            default:
                break;
        }
    }

    return {
        chooseGraphicToDraw: chooseGraphicToDraw
    }
}());