let userId;

function init() {
    $('.error-message').hide();
    $('#login-form').on('submit', handleLogin);
    $('#signup-form').on('submit', handleSignup);
}

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

        if (response.ok) {
            const { username, message } = await response.json();
            alert(message); // Shows a temporary alert to the user about successful login.
            
            // Updates the UI elements to reflect the logged-in state
            $('#btn-login').hide();
            $('#btn-signup').after(`<button class="btn btn-logout">Logout, ${username}</button>`);
            
            location.reload(); // This is optional. The UI is already updated.
            return;
        }

        const { message } = await response.json();
        $('#login-form.error-message').text(message).show();
    } catch (error) {
        $('#login-form.error-message').text('An error occurred. Please try again later.').show();
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

    // Hides any previously shown error messages
    $('#signup-form .error-message').hide();

    // Checks if passwords match
    if (password !== confirmPassword) {
        $('#signup-form .error-message').text('Password fields must match.').show();
        return;
    }

    //I can add more password validation considerations here if I want

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

        if (response.ok) {
            const { userId } = await response.json();
            location.reload();
            return;
        }

        const { message } = await response.json();
        $('#signup-form .error-message').text(message).show();

    } catch (error) {
        $('#signup-form .error-message').text('An error occurred. Please try again later.').show();
    }
}

init();