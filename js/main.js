// Fetching the users data
var xhr = new XMLHttpRequest();

function callUsersEndpoint(){
    const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

    xhr.open("GET", USERS_ENDPOINT, true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4 || xhr.status != 200){
            return;
        }
        data = xhr.responseText;
        alert(data);
    }
    xhr.send("-")
    
}

callUsersEndpoint();
