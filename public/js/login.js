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
            const { userId } = await response.json();
            location.reload();
            return;
        }

        const { message } = await response.json();
        $('#login-form .error-message').text(message).show();
    } catch (error) {
        $('#login-form .error-message').text('An error occurred. Please try again later.').show();
    }
}


async function handleSignup(event) {
    event.preventDefault();

    const username = $('#signupUsername').val();
    const password = $('#signupPassword').val();
    const confirmPassword = $('#signupConfirmPassword').val(); // Added this line
    const email = $('#signupEmail').val();
    const first_name = $('#signupFirstName').val();
    const last_name = $('#signupLastName').val();

    // Hide any previously shown error messages
    $('#signup-form .error-message').hide();

    // Check if passwords match
    if (password !== confirmPassword) {
        $('#signup-form .error-message').text('Password fields must match.').show();
        return;
    }

    // TODO: Add more password validation here if desired (e.g. length, special characters)

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