$(document).ready(function() {
    $("#newCommentButton").click(function() {
        $("#commentFormContainer").html(`
            <form id="commentForm">
                <input type="text" name="title" placeholder="Title" required>
                <textarea name="post_content" placeholder="Your comment" required></textarea>
                <button type="submit">Post Comment</button>
            </form>
        `);
    });

    $("#commentFormContainer").on('submit', '#commentForm', function(e) {
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
                alert('Comment posted successfully!');
            },
            error: function(error) {
                alert('Failed to post the comment.');
            }
        });
    });
});


// $(document).ready(function() {
//     $("#newCommentButton").click(function() {
//         $.ajax({
//             type: "GET",
//             url: "/api/check-auth", 
//             success: function(response) {
//                 $("#commentFormContainer").html(`
//                     <form id="commentForm">
//                         <textarea name="post_content" placeholder="Your comment" required></textarea>
//                         <button type="submit">Post Comment</button>
//                     </form>
//                 `);
//             },
//             error: function(error) {
//                 if (error.status === 401) {
//                     $('#loginModal').modal('show'); // Updated to show the login modal
//                 } else {
//                     alert('Failed to check authentication.');
//                 }
//             }
//         });
//     });

//     $("#commentFormContainer").on('submit', '#commentForm', function(e) {
//         e.preventDefault();

//         const postContent = $(this).find('textarea[name="post_content"]').val();

//         $.ajax({
//             type: "POST",
//             url: "/api/posts",
//             data: {
//                 post_content: postContent,
//             },
//             success: function(response) {
//                 alert('Comment posted successfully!');
//                 // Refresh the page or update UI accordingly
//             },
//             error: function(error) {
//                 if (error.status === 401) {
//                     // Trigger the login modal to pop up
//                     $('#loginModal').modal('show');
//                 } else {
//                     alert('Failed to post the comment.');
//                 }
//             }
//         });
//     });
// });
