$(document).ready(function() {

    // Fixed the selector to use the "#" symbol for the id
    $(document).on('click', '#edit-post-btn', function() {
        console.log("Edit post button clicked.");
        // const postID = $(this).data('put-id');

        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                console.log("Authenticated and trying to slide down comment form.");

                const form = $(this).closest('.primary-comment-container').find('.editPostForm');
                if (form.length) {
                    console.log("Edit post form found.");
                    form.slideDown();
                } else {
                    console.log("Edit post form not found.");
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
        $(this).closest('.primary-comment-container').find('.editPostForm').slideUp();
        $(this).closest('.primary-comment-container').find('#edit-post-btn').show();
        $(this).closest('.editPostForm').find('.editPost_content').val("");
    });

    $(document).on('submit', '.editPostForm', function(e) {
        e.preventDefault();

        const title = $(this).find('input[name="editTitle"]').val();
        const postContent = $(this).find('textarea[name="editPost_content"]').val();
        const postID = $(this).closest('.primary-comment-container').find('#edit-post-btn').data('put-id');

        $.ajax({
            type: "PUT",
            url: "/api/posts/" + postID,
            data: {
                title: title,
                post_content: postContent
            },
            success: function(response) {
                location.reload();
                alert('Post updated successfully!');
            },
            error: function(error) {
                if (error.status === 401) {
                    $('#loginModal').modal('show');
                } else {
                    alert('Failed to update the post.');
                }
            }
        });
    });

});

