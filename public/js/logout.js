function init() {
    // Login and signup event bindings
    $('.error-message').hide();
    $('#login-form').on('submit', handleLogin);
    $('#signup-form').on('submit', handleSignup);

    // Logout event binding
    $('.btn-logout').on('click', handleLogout);
}

async function handleLogout(event) {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });
    
    if (response.ok) {
        // After logging out, revert the UI to the logged-out state
        $('#btn-login').show();
        $('.btn-logout').remove();

        location.assign('/');
        return;
    }

    const { message } = await response.json();
    console.error(message);
}

const auth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    next();
}


$(init);
