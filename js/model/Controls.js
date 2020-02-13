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

    function redrawThirdColComponent(graphicSelected) {
        if(graphicSelected === 'rankGraphic') {
            $('#thirdCol').html(scoreTypesAndBreakDown());
        }
    }

    function evoGrapghicControls() {
        $('#secondCol').html(chooseTypeEvoAndBreakDown());
        $('#thirdCol').html(chooseCountries());
        createMultiSelectListener();
    }

    function chooseYearSelect() {
        const arrayYears = [2019, 2016, 2013, 2010, 2007, 2005, 2003];
        var $htmlSecondCol = '<div class="form-group"><label>Year</label><select class="form-control" id="dataYear">';
        arrayYears.forEach( year => {
            $htmlSecondCol += '<option value="' + year + '">' + year + '</option>';
        });
        $htmlSecondCol += '</select></div>';
        return $htmlSecondCol;
    }

    function scoreTypesAndBreakDown() {
        const yearSelected = $('#dataYear').children('option:selected').val();
        let arrayComponents = [];
        if(yearSelected === '2019') {
            arrayComponents = [
                'Total (100)',
                'Price (30)',
                'Public place bans (22)',
                'Public info campaign spending (10)',
                'Advertising bans (13)',
                'Health warnings (10)',
                'Treatment (10)',
                'Illicit trade (3)',
                'Art 5.3 FCTC (2)'
            ];
        } else {
            arrayComponents = [
                'Total (100)',
                'Price (30)',
                'Public place bans (22)',
                'Public info campaign spending (15)',
                'Advertising bans (13)', 'Health warnings (10)',
                'Treatment (10)'
            ];
        }
        let $htmlThirdCol = '<div class="form-group"><label>Component</label><select class="form-control" id="rankComponent">';
        arrayComponents.forEach( component => {
            $htmlThirdCol += '<option value="' + component + '">' + component + '</option>';
        });
        $htmlThirdCol += '</select></div>';
        $htmlThirdCol += '<div class="form-check">';
        $htmlThirdCol += '<input class="form-check-input" type="checkbox" value="breakdown" id="breakDownCheckRank"/>';
        $htmlThirdCol += '<label class="form-check-label" for="breakDownCheckRank">Break down score</label>';
        $htmlThirdCol += '</div>';
        return $htmlThirdCol;
    }

    function chooseTypeEvoAndBreakDown() {
        const arrayComponents = [
            'Ranking',
            'Total (100)',
            'Price (30)',
            'Public place bans (22)',
            'Public info campaign spending, Illicit trade and Art. 5.3 FCTC (15)',
            'Advertising bans (13)',
            'Health warnings (10)',
            'Treatment (10)'
        ];
        let $htmlSecondCol = '<div class="form-group"><label>Type</label><select class="form-control" id="typeEvolution">';
        arrayComponents.forEach(component => {
            $htmlSecondCol += '<option value="' + component + '">' + component + '</option>';
        });
        $htmlSecondCol += '</select></div>';
        return $htmlSecondCol;
    }

    function chooseCountries() {
        let arrayCountries = ArrayCountries.getArrayCountries();
        let $htmlThirdCol = '<div class="ui sub header">Countries (up to 5)</div>';
        $htmlThirdCol += '<div name="states" class="ui fluid multiple search selection dropdown" id="multi-select">';
        $htmlThirdCol += '<input type="hidden" name="country" id="countryMultiInput">';
        $htmlThirdCol += '<i class="dropdown icon"></i>';
        $htmlThirdCol += '<div class="default text">Select Country</div>';
        $htmlThirdCol += '<div class="menu">';
        arrayCountries.forEach(country => {
            $htmlThirdCol += '<div class="item" data-value="' + country.name + '"><i class="' + country.flag + ' flag"></i>' + country.name + '</div>';
        });
        $htmlThirdCol += '</div></div>';
        return $htmlThirdCol;
    }

    return {
        displayControls: displayControls,
        redrawThirdColComponent: redrawThirdColComponent
    }
}());


function createMultiSelectListener() {
    $('#multi-select').dropdown({
        maxSelections: 5
    });
}