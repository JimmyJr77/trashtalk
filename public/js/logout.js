function init() {
    $('.btn-logout').on('click', handleLogout);
}

async function handleLogout(event) {
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST'
    });
    
    const responseData = await response.json();

    if (response.ok) {
        alert(responseData.message);  // Displays the message "You are now logged out!" (from user-routes.js)
        location.assign('/');
        return;
    } else {
        const { message } = await response.json();
        console.error(message);
    }
}

init();