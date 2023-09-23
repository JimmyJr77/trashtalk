async function handleLogin(event) {
    event.preventDefault();

    const username = $('#login-username-input').val();
    const password = $('#login-password-input').val();

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username, 
                password: password
            }),   
        });

        const responseData = await response.json();
        
        // Checks if the response is successful
        if (response.ok) {
            alert(responseData.message);  // Displays the message "You are now logged in!" (from user-routes.js)
            location.reload();
            return;
        } else {
            // This displays any/all server-sent error messages
            alert(responseData.message); 
        }
    } catch (error) {
        alert('An error occurred. Please try again later.'); 
    }
}


async function handleSignup(event) {
    event.preventDefault();

    const username = $('#signupUsername').val();
    const password = $('#signupPassword').val();
    const confirmPassword = $('#signupConfirmPassword').val();
    const email = $('#signupEmail').val();
    const first_name = $('#signupFirstName').val();
    const last_name = $('#signupLastName').val();

    // Checks if passwords match
    if (password !== confirmPassword) {
        alert('Password fields must match.');
        return;
    }

    try {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
                first_name,
                last_name
            }),
        });

        const data = await response.json();

        if (response.ok) {
            location.reload();
            return;
        }

        // Assuming the server returns a message in the JSON response for errors
        alert(data.message);

    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
}

init();