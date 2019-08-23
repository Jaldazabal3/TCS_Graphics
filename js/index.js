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
                    "type":graphTypeSelected
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
                "type":graphTypeSelected
            });
        });
    });

    // Draw graphic if there is a change on the third row year select
    $('#thirdCol').on('change','#rankComponent', () => {
        var graphTypeSelected = $('.graphicType.active').attr('id');
        // We draw the default graphic for each section
        tcsJSON.then(data => {
            Graphic.chooseGraphicToDraw(data, {
                "type":graphTypeSelected
            });
        });
    });

    
});

