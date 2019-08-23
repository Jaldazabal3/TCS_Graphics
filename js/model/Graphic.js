var Graphic = (function () {
    function chooseGraphicToDraw(geoJSONdata, graphicOptions) {
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
                
            default:
                break;
        }
    }

    return {
        chooseGraphicToDraw: chooseGraphicToDraw
    }
}());