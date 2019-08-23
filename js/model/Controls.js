var Controls = (function () {
    function displayControls(graphicSelected) {
        switch(graphicSelected) {
            case 'mapGraphic':
                mapGraphicControls();
                break;
            case 'rankGraphic':
                rankingGraphicControls();
                break;
            case 'evoGraphic':
                break;
            default:
                break;
        }
    }
    
    function mapGraphicControls() {
        $('#secondCol').html(chooseYearSelect());
        $('#thirdCol').empty();
    }

    function rankingGraphicControls() {
        $('#secondCol').html(chooseYearSelect());
        $('#thirdCol').html(scoreTypesAndBreakDown());
    }

    function chooseYearSelect() {
        const arrayYears = [2016, 2013, 2010, 2007, 2005, 2003]
        var $htmlSecondRow = '<div class="form-group"><label>Year</label><select class="form-control" id="dataYear">';
        arrayYears.forEach( year => {
            $htmlSecondRow += '<option value="' + year + '">' + year + '</option>';
        });
        $htmlSecondRow += '</select></div>';
        return $htmlSecondRow;
    }

    function scoreTypesAndBreakDown() {
        const arrayComponents = ['Total (100)','Price (30)', 'Public place bans (22)', 'Public info campaign spending (15)', 'Advertising bans (13)', 'Health warnings (10)', 'Treatment (10)'];
        var $htmlThirdRow = '<div class="form-group"><label>Component</label><select class="form-control" id="rankComponent">';
        arrayComponents.forEach( component => {
            $htmlThirdRow += '<option value="' + component + '">' + component + '</option>';
        });
        $htmlThirdRow += '</select></div>';
        $htmlThirdRow += '<div class="form-check">';
        $htmlThirdRow += '<input class="form-check-input" type="checkbox" value="breakdown" id="breakDownCheck"/>';
        $htmlThirdRow += '<label class="form-check-label" for="breakDownCheck">Break down score</label>';
        $htmlThirdRow += '</div>';
        return $htmlThirdRow;
    }

    return {
        displayControls: displayControls
    }
}());