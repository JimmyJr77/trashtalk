let logoutTimer;

function init() {
    // Login and signup event bindings
    $('.error-message').hide();
    $('#login-form').on('submit', handleLogin);
    $('#signup-form').on('submit', handleSignup);

    // Logout event binding
    $('.btn-logout').on('click', handleLogout);

    // Start the logout timer if the user is authenticated
    // (you'll need to define the isAuthenticated() function or replace it with your authentication check)
    if (isAuthenticated()) {
        startLogoutTimer();
    }
}

function isAuthenticated() {
    return $('.btn-logout').length > 0;
}

function startLogoutTimer() {
    // Clear any existing timers
    if (logoutTimer) {
        clearTimeout(logoutTimer);
    }

    // 15 minutes = 15 * 60 * 1000 milliseconds
    logoutTimer = setTimeout(function() {
        handleLogout({ preventDefault: () => {} });
    }, 15 * 60 * 1000);
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

// Reset the logout timer whenever there's an action
document.addEventListener('click', startLogoutTimer);
document.addEventListener('mousemove', startLogoutTimer);
document.addEventListener('keypress', startLogoutTimer);

$(init);
