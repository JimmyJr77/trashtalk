$(document).ready(function(){
    $('.hamburger-icon').on('click', function() {
        // Toggles the visibility of the button container inside the same div as the clicked hamburger
        $(this).siblings('.dashboard-button-container').toggle();

        // Checks to see if the hamburger icon has the class rotated
        if ($(this).hasClass('rotated')) {
            // If so this remove the class to rotate back to its original position
            $(this).removeClass('rotated');
        } else {
            // Otherwise it adds the class to rotate it by 90 degrees
            $(this).addClass('rotated');
        }
    });
});

