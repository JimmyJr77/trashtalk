$(document).ready(function() {

    $("#newPostButton").click(function() {
        // Check if user is authenticated
        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                // If user is authenticated, show the comment form
                $("#postForm").slideDown();
                $("#newPostButton").hide();
            },
            error: function(error) {
                if (error.status === 401) {
                    // User is not authenticated, show the login modal
                    $('#loginModal').modal('show');
                } else {
                    alert('Failed to check authentication.');
                }
            }
        });
    });

    // Hide the comment form and clear its content
    $("#cancelButton").click(function() {
        $("#postForm").slideUp();
        $("#newPostButton").show();
        $("#title").val("");
        $("#post_content").val("");
    });

    // Handle the form submission
    $("#postForm").submit(function(e) {
        e.preventDefault();

        const title = $(this).find('input[name="title"]').val();
        const postContent = $(this).find('textarea[name="post_content"]').val();

        $.ajax({
            type: "POST",
            url: "/api/posts",
            data: {
                title: title,
                post_content: postContent,
            },
            success: function(response) {
                location.reload();  // This will refresh the page after successful submission
                alert('Comment posted successfully!');
            },
            error: function(error) {
                if (error.status === 401) {
                    // If user is not authenticated during submission, show the login modal
                    $('#loginModal').modal('show');
                } else {
                    alert('Failed to post the comment.');
                }
            }
        });
    });
});
