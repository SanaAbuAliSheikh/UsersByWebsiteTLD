import { renderColumn } from "./card.js";

// Fetching the users data
var xhr = new XMLHttpRequest();

// Function to get a domain from email
function getDomain(email){
    const emailSplit = email.split(".");
    const domain = emailSplit[emailSplit.length - 1];
    return domain
}

// Function to handle users data
function handleUsersData(usersData){

    // Spliting the email and get the domain name
    // e.g: Sincere@april.biz -> biz
    let usersByTLD = {}
    usersData.forEach(user => {
        
        const title = getDomain(user.email);

        // Now that we have title, let's maintain an object which has users against distinct domain
        // If usersByTLD object doesn't have title then do the following
        if(usersByTLD.hasOwnProperty(title) == false){
            usersByTLD[title] = [user]
        } else{
            usersByTLD[title].push(user)
        }
        
    });

    console.log(usersByTLD)
    // Once the new object usersByTLD set, let's render the column card
    Object.entries(usersByTLD).map(keyValue => {
        const title = keyValue[0];
        const userList = keyValue[1];
        renderColumn(title,userList);
    })
    
}

// Function to call an API
function callUsersEndpoint(){
    const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

    xhr.open("GET", USERS_ENDPOINT, true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4 || xhr.status != 200){
            return;
        }
        console.log(xhr.response)
        const data = xhr.response;
        const usersData = JSON.parse(data);

        // Handling data
        handleUsersData(usersData);

    }
    xhr.send("-")
    
}


callUsersEndpoint();
