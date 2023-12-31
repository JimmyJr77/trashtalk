$(document).ready(function() {

    $(document).on('click', '#delete-post-btn', function() {
        console.log("Delete post button clicked.");

        if(!window.confirm("Are you sure you want to delete this post?")) {
            return; // User clicked 'Cancel', so stop here.
        }

        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                console.log("Authenticated, proceeding to delete.");

                // Use 'data-put-id' since that's what you set in your template
                const postID = $(this).data('delete-id');
                
                $.ajax({
                    type: "DELETE",
                    url: "/api/posts/" + postID,
                    success: function(response) {
                        location.reload();
                        alert('Post deleted successfully!');
                    },
                    error: function(error) {
                        if (error.status === 401) {
                            $('#loginModal').modal('show');
                        } else {
                            alert(`Failed to delete the post ${postID}.`);
                        }
                    }
                });
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
});
