// function init() {
//     $('.btn-logout').on('click', handleLogout);
// }

// async function handleLogout() {
//     const response = await fetch('/api/users/logout', {
//         method: 'POST'      
//     });
    
//     if (response.ok) {
//         location.assign('/');const auth = (req, res, next) => {
//             if (!req.session.loggedIn) {
//                 res.redirect('/');
//                 return;
//             }
        
//             next();
//         }
        
//         module.exports = auth;
//         return;
//     }

//     const { message } = await response.json();
//     console.error(message);
// }

// $(init());