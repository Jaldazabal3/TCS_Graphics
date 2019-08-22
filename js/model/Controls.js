var Controls = (function () {
    function displayControls(graphicSelected) {
        switch(graphicSelected) {
            case 'mapGraphic':
                // $('#secondCol').empty();
                $('#secondCol').html(mapGraphicControls());
                break;
            case 'rankGraphic':
                break;
            case 'evoGraphic':
                break;
            default:
                break;
        }
    }

    function mapGraphicControls() {
        const arrayYears = [2016, 2013, 2010, 2007, 2005]
        var $htmlSecondRow = '<div class="form-group"><label>Year</label><select class="form-control" id="mapYear">';
        arrayYears.forEach( year => {
            $htmlSecondRow += '<option value="' + year + '">' + year + '</option>';
        });
        $htmlSecondRow += '</select>';
        return $htmlSecondRow;
    }

    return {
        displayControls: displayControls
    }
}());