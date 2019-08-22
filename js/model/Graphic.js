var Graphic = (function () {
    function chooseGraphicToDraw(geoJSONdata, graphicOptions) {
        switch (graphicOptions.type) {
            case 'mapGraphic':
                graphicOptions.year = $('#mapYear').children('option:selected').val();
                MapGraph.generateMap(geoJSONdata, graphicOptions);
                break;
        
            default:
                break;
        }
    }

    return {
        chooseGraphicToDraw: chooseGraphicToDraw
    }
}());