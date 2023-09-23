
// Operates the hamburger functionality. hamburger spins and buttons appear.
$(document).ready(function(){
    $('.hamburger-icon').on('click', function() {
        // Toggles the visibility of the button container inside the same div as the clicked hamburger
        $(this).siblings('.hamburger-hide').toggle();

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


// Toggle to opens & close the replies dropdown for each post

let currentDropdown = null;

function toggleDropdown(element) {
    const dropdown = element.nextElementSibling;

    if (dropdown !== currentDropdown) {
        // Close the previously opened dropdown
        if (currentDropdown) {
            currentDropdown.style.display = "none";
            currentDropdown.classList.add("d-none");
        }

        // Open the clicked dropdown
        dropdown.style.display = "block";
        dropdown.classList.remove("d-none");
        currentDropdown = dropdown;
    } else {
        // Toggle the visibility of the same dropdown
        if (dropdown.style.display === "none" || dropdown.classList.contains("d-none")) {
            dropdown.style.display = "block";
            dropdown.classList.remove("d-none");
        } else {
            dropdown.style.display = "none";
        }
    }
}