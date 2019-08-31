getUser();

async function getUser() {
    try {

        // Make ajax request to /api/users
        const users = await $.ajax({
            url: `/api/users`
        });

        // Pass user data from server into renderUserData
        renderUsersList(users);
    } catch (error) {
        console.log('User API Error:', error.message);

        renderElement('#users', 'h1', 'No Users Data', 'center');
    }
}