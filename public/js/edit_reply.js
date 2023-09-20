$(document).on('click', '.editReplyButton', function() {
    console.log("Edit reply button clicked.");

    $.ajax({
        type: "GET",
        url: "/api/check-auth",
        success: function(response) {
            console.log("Authenticated and trying to slide down comment form.");

            // This targets the related commentForm inside the edit-reply-dropdown span.
            const form = $(this).closest('[data-reply-id]').find('#edit-reply-dropdown .editCommentForm');
            
            if (form.length) {
                console.log("Comment update form found.");
                form.removeClass('d-none').slideDown();
            } else {
                console.log("Comment update form not found.");
            }
            $(this).hide();
        }.bind(this),
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
    $(this).closest('#edit-reply-dropdown').find('.editCommentForm').slideUp();
    $(this).closest('[data-reply-id]').find('.editReplyButton').show();
    $(this).closest('.editCommentForm').find('textarea[name="editComment_content"]').val("");
});

$(document).on('submit', '.editCommentForm', function(e) {
    e.preventDefault();

    const commentContent = $(this).find('textarea[name="editComment_content"]').val();
    const replyID = $(this).closest('[data-reply-id]').data('reply-id');

    $.ajax({
        type: "PUT",
        url: "/api/replies/" + replyID, // Add postID in the URL
        data: {
            replies_content: commentContent
        },
        success: function(response) {
            location.reload();
            alert('Comment updated successfully!');
        },
        error: function(error) {
            if (error.status === 401) {
                $('#loginModal').modal('show');
            } else {
                alert('Failed to update the comment.');
            }
        }
    });
});
