
async function getUser(){
    try {
        // Make ajax request to /api/user
        const user = await $.ajax({
            url: '/api/user'
        });

        // Pass user data from server into renderUserData
        renderUserData(user);
    } catch (error) {
        renderUserData({
            name: '',
            username: 'Error loading data',
            email: 'Error loading data',
            phone: 'Error loading data'
        });
    }
}

getUser();
