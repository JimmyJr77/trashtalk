$(document).ready(function() {

    $(document).on('click', '.deleteReplyButton', function() {
        console.log("Delete reply button clicked.");

        if(!window.confirm("Are you sure you want to delete this reply?")) {
            return; // User clicked 'Cancel', so stop here.
        }

        const replyID = $(this).data('delete-id'); // Extracting the replyID

        if (!replyID) {
            console.error("replyID not found. Aborting delete operation.");
            return;
        }

        $.ajax({
            type: "GET",
            url: "/api/check-auth",
            success: function(response) {
                console.log("Authenticated, proceeding to delete.");

                $.ajax({
                    type: "DELETE",
                    url: "/api/replies/" + replyID,
                    success: function(response) {
                        location.reload();
                        alert('Reply deleted successfully!');
                    },
                    error: function(error) {
                        if (error.status === 401) {
                            $('#loginModal').modal('show');
                        } else {
                            alert('Failed to delete the reply.');
                        }
                    }
                });
            },
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
