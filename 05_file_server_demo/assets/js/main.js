function renderUserData(user = {}){
    const { name = '', ...info } = user;
    const userContainer = $('#user-data');

    userContainer.html('').append(
        createUserGreeting(name),
        Object.keys(info).map(k => createUserInfoLine(k, info[k]))
    );
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
