$(function () {
    var tcsJSON = DataAccess.init();

    //When one button of the first button group is clicked, we do the following steps, only if we are changing the graphic type
    $('.graphicType').click(function() {
        if (!$(this).hasClass('active')) {
            // Set none of the buttons active
            $('.graphicType.active').removeClass('active');
            var graphTypeSelected = $(this).attr('id');
            // Send the button id to displayControls method
            Controls.displayControls(graphTypeSelected);
            // Set the clicked button active
            $(this).addClass('active');

            // We draw the default graphic for each section
            tcsJSON.then(data => {
                Graphic.chooseGraphicToDraw(data, {
                    "type": graphTypeSelected
                });
            });
        }
    });

    // Draw graphic if there is a change on the second row year select
    $('#secondCol').on('change','#dataYear',  () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        // We draw the default graphic for each section
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type": graphTypeSelected
            });
        });
    });

    // Draw graphic if there is a change on the third row year select
    $('#thirdCol').on('change','#rankComponent', () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        // We draw the default graphic for each section
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type": graphTypeSelected
            });
        });
    });

    // Draw graphic if the checkbox for breaking down the score is checked or unchecked
    $('#thirdCol').on('change','#breakDownCheckRank', () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        // We draw the default graphic for each section
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type": graphTypeSelected
            });
        });
    });
    
    // Draw graphic if the type of evolution graphic select changes
    $('#secondCol').on('change','#typeEvolution', () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type": graphTypeSelected
            })
        })
    });

    // Draw graphic if the checkbox for breaking down the score in evolution is checked
    $('#secondCol').on('change','#breakDownCheckEvo', () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type": graphTypeSelected
            });
        });
    });

    // Draw graphic if there is a change on the third row array of country select
    $('#thirdCol').on('change','#countryMultiInput', () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type": graphTypeSelected
            });
        });
    });





    // Trying to do the barchart needed when data is ready (TO REMOVE WHEN I ARCHIEVE IT)
    tcsJSON.then(data => {
        var graphicOptions = {
            'type': "evoGraphic",
            'component': "Total (100)",
            breakDownCheckEvo: true,
            arrayCountries: ['Spain','France','Russia']
        };
        var arrayCountriesScores = EvolutionGraph.createArrayCountriesScores(data, graphicOptions);
        const arrayYears = [2003, 2005, 2007, 2010, 2013, 2016];
        
        //Creating values for margin and size
        const margin = 60;
        const width = 700 - 2 * margin;
        const height = 600 - 2 * margin;
        // Selecting the created svg
        const svg = d3.select('svg');

        // Moving the start of the chart to the (60,60) position of the svg
        const chart = svg.append('g')
        .attr('transform', `translate(${margin},${margin})`);

        // Creating yscale from 0 to 100, which is the range of scores of the TCS (range length that should be divided between the limits of the domain values)
        const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0,100]);
        
        // Creating axis Y
        chart.append('g').call(d3.axisLeft(yScale));

        // Creating axis X with array of years, with padding of 0.2 between values
        const xScale = d3.scaleBand()
        .range([0, width])
        .domain(arrayYears)
        .padding(0.2);

        // Positioning the axis on the bottom of the chart (minus the margin)
        chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));
        
        

        


    });

});



