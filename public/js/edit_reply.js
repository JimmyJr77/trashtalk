$(document).ready(function() {

    $(document).on('click', '.edit-reply-btn', function() {
        console.log("Edit reply button clicked.");

        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                console.log("Authenticated and trying to slide down the edit reply form.");
                const form = $(this).closest('.primary-reply-container').find('.edit-reply-form').slideDown();
                if (form.length) {
                    console.log("Edit reply form found.");
                    form.slideDown();
                } else {
                    console.log("Edit reply form not found.");
                }
                $(this).hide();
            }.bind(this), // Binding `this` to ensure it's referring to the clicked button in the success callback
            error: function(error) {
                if (error.status === 401) {
                    $('#loginModal').modal('show');
                } else {
                    alert('Failed to check authentication.');
                }
            }
        });
    });

    $(document).on('click', '.cancel-btn', function() {
        $(this).closest('.edit-reply-form').slideUp();
        $(this).closest('.primary-reply-container').find('.edit-reply-btn').show();
        $(this).closest('.edit-reply-form').find('.edit-replies_content').val("");
    });

    $(document).on('submit', '.edit-reply-form', function(e) {
        e.preventDefault();

        const replyContent = $(this).find('textarea[name="edit-replies_content"]').val();
        const replyID = $(this).closest('.primary-reply-container').find('.edit-reply-btn').data('put-id');

        $.ajax({
            type: "PUT",
            url: "/api/replies/" + replyID, // Adds postID in the URL
            data: {
                replies_content: replyContent
            },
            success: function(response) {
                location.reload();
                alert('Reply updated successfully!');
            },
            error: function(error) {
                if (error.status === 401) {
                    $('#loginModal').modal('show');
                } else {
                    alert('Failed to update the reply.');
                    console.log(replyID);
                    console.log(replyContent);
                }
            }
        });
    });
});

