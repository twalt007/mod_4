getUser();

async function getUser(){
    try {
        const { userId = null } = getQueryObj();

        if(!userId) throw new Error('Missing user ID query string');

        // Make ajax request to /api/users/:id
        const user = await $.ajax({
            url: `/api/users/${userId}`
        });

        // Pass user data from server into renderUserData
        renderUserData(user);
    } catch (error) {
        console.log('User API Error:', error.message);
        
        renderElement('#user-data', 'h1', 'No User Data, <a href="/users.html">View Users List</a>', 'center');
    }
}

function getQueryObj(){
    let q = location.search;
    const query = {};

    if(q){
        q.slice(1).split('&').forEach((keyValue) => {
            const [k, v] = keyValue.split('=');

            query[k] = v;
        });
    }

    return query;
}
