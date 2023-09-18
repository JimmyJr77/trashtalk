$(document).ready(function() {

    $(document).on('click', '.recycle-btn', function() {
        console.log("Recycle button clicked.");
        const postID = $(this).data('post-id'); // Grabbing the post ID

        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                console.log("Authenticated and trying to slide down comment form.");
                $(this).closest('.primary-comment-container').find('.commentForm').slideDown(); // Targeting the related commentForm
                if (form.length) {
                    console.log("Comment form found.");
                    form.slideDown();
                } else {
                    console.log("Comment form not found.");
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

    $(document).on('click', '.cancelButton', function() {
        $(this).closest('.commentForm').slideUp();
        $(this).closest('.primary-comment-container').find('.recycle-btn').show();
        $(this).closest('.commentForm').find('.comment_content').val("");
    });

    $(document).on('submit', '.commentForm', function(e) {
        e.preventDefault();

        const commentContent = $(this).find('textarea[name="comment_content"]').val();
        const postID = $(this).closest('.primary-comment-container').find('.recycle-btn').data('post-id');

        $.ajax({
            type: "POST",
            url: "/api/replies/" + postID, // Add postID in the URL
            data: {
                replies_content: commentContent
            },
            success: function(response) {
                location.reload();
                alert('Comment posted successfully!');
            },
            error: function(error) {
                if (error.status === 401) {
                    $('#loginModal').modal('show');
                } else {
                    alert('Failed to post the comment.');
                }
            }
        });
    });
});
