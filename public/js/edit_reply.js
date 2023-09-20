$(document).ready(function() {

    $(document).on('click', '.editReplyButton', function() {
        console.log("Edit reply button clicked.");

        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                console.log("Authenticated and trying to slide down comment form.");
                const form = $(this).closest('.primary-comment-container').find('.editCommentForm').slideDown(); // Targeting the related commentForm
                if (form.length) {
                    console.log("Comment update form found.");
                    form.slideDown();
                } else {
                    console.log("Comment update form not found.");
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
        $(this).closest('.editCommentForm').slideUp();
        $(this).closest('.primary-comment-container').find('#editReplyButton').show();
        $(this).closest('.editCommentForm').find('.editComment_content').val("");
    });

    $(document).on('submit', '.editCommentForm', function(e) {
        e.preventDefault();

        const commentContent = $(this).find('textarea[name="editComment_content"]').val();
        const replyID = $(this).closest('.comments-dropdown').data('reply-id');

        $.ajax({
            type: "PUT",
            url: "/api/replies/" + replyID, // Add postID in the URL
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
