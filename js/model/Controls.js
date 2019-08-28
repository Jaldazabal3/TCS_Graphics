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
                evoGrapghicControls();
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

    function evoGrapghicControls() {
        $('#secondCol').html(chooseTypeEvo());
        $('#thirdCol').html(chooseCountries());
        createMultiSelectListener();
    }

    function chooseYearSelect() {
        const arrayYears = [2016, 2013, 2010, 2007, 2005, 2003]
        var $htmlSecondCol = '<div class="form-group"><label>Year</label><select class="form-control" id="dataYear">';
        arrayYears.forEach( year => {
            $htmlSecondCol += '<option value="' + year + '">' + year + '</option>';
        });
        $htmlSecondCol += '</select></div>';
        return $htmlSecondCol;
    }

    function scoreTypesAndBreakDown() {
        const arrayComponents = ['Total (100)','Price (30)', 'Public place bans (22)', 'Public info campaign spending (15)', 'Advertising bans (13)', 'Health warnings (10)', 'Treatment (10)'];
        var $htmlThirdCol = '<div class="form-group"><label>Component</label><select class="form-control" id="rankComponent">';
        arrayComponents.forEach( component => {
            $htmlThirdCol += '<option value="' + component + '">' + component + '</option>';
        });
        $htmlThirdCol += '</select></div>';
        $htmlThirdCol += '<div class="form-check">';
        $htmlThirdCol += '<input class="form-check-input" type="checkbox" value="breakdown" id="breakDownCheck"/>';
        $htmlThirdCol += '<label class="form-check-label" for="breakDownCheck">Break down score</label>';
        $htmlThirdCol += '</div>';
        return $htmlThirdCol;
    }

    function chooseTypeEvo() {
        const arrayComponents = [
            'Ranking',
            'Total (100)',
            'Price (30)',
            'Public place bans (22)',
            'Public info campaign spending (15)',
            'Advertising bans (13)',
            'Health warnings (10)',
            'Treatment (10)'
        ];
        var $htmlSecondCol = '<div class="form-group"><label>Type</label><select class="form-control" id="typeEvolution">';
        arrayComponents.forEach(component => {
            $htmlSecondCol += '<option value="' + component + '">' + component + '</option>';
        });
        $htmlSecondCol += '</select></div>';
        return $htmlSecondCol;
    }

    function chooseCountries() {
        var arrayCountries = ArrayCountries.getArrayCountries();
        var $htmlThirdCol = '<div class="ui sub header">Countries (up to 5)</div>';
        $htmlThirdCol += '<div name="states" class="ui fluid multiple search selection dropdown" id="multi-select">';
        $htmlThirdCol += '<input type="hidden" name="country">';
        $htmlThirdCol += '<i class="dropdown icon"></i>';
        $htmlThirdCol += '<div class="default text">Select Country</div>';
        $htmlThirdCol += '<div class="menu">';
        arrayCountries.forEach(country => {
            $htmlThirdCol += '<div class="item" data-value="' + country.name + '"><i class="' + country.flag + ' flag"></i>' + country.name + '</div>';
        });
        $htmlThirdCol += '</div></div>';
        // $htmlThirdCol += '</div>';
        return $htmlThirdCol;
    }

    return {
        displayControls: displayControls
    }
}());


function createMultiSelectListener() {
    $('#multi-select').dropdown({
        maxSelections: 5
    });
}