function renderUserData(user = {}){
    const { name = '', ...info } = user;
    const userContainer = $('#user-data');

    userContainer.html('').append(
        createUserGreeting(name),
        Object.keys(info).map(k => createUserInfoLine(k, info[k]))
    );
}

function renderElement(target, element, html, classes){
    const userContainer = $(target);

    userContainer.html('').append(
        $(`<${element}>`, {
            class: classes,
            html
        })
    );
}

function renderUsersList(users){
    console.log('USERS:', users);

    if(users && users.length){
        const table = $('<table>');
        const thead = $('<thead>', {
            html: '<th>Name</th><th>Email</th><th>User Created</th>'
        });
        const tbody = $('<tbody>');

        users.forEach(user => {
            const tr = $('<tr>');
            const name = $('<td>', {
                html: `<a href="/profile.html?userId=${user.id}">${user.name}</a>`
            });
            const email = $('<td>', {
                text: user.email
            });
            const created = $('<td>', {
                text: new Date(user.created).toLocaleString()
            });

            tr.append(name, email, created);

            tbody.append(tr);
        });

        table.append(thead, tbody);

        $('#users').append(table);
    }

    return false
}

function createUserGreeting(name){
    return $('<h2>', {
        class: 'center',
        text: `Welcome back ${name}`
    });
}

function createUserInfoLine(type, data){
    type = type.replace(/([A-Z]|_|-)/, char => {
        return char === '-' || char === '_' ? ' ' : ' ' + char;
    }).toUpperCase();

    return $('<p>', {
        class: 'green-light',
        html: `<strong class="green-dark">${type}:</strong> ${data}`
    });
}

renderUserData();
