import { renderColumn } from "./card.js";

// Fetching the users data
var xhr = new XMLHttpRequest();

// Function to get a domain from website
function getDomain(website){
    const websiteSplit = website.split(".");
    const domain = websiteSplit[websiteSplit.length - 1];
    return domain
}

// Function to handle users data
function handleUsersData(usersData){

    // Spliting the website and get the domain name
    // e.g: kale.biz -> biz
    let usersByTLD = {}
    usersData.forEach(user => {
        
        const title = "."+getDomain(user.website);

        // Now that we have title, let's maintain an object which has users against distinct domain
        // If usersByTLD object doesn't have title then do the following
        if(usersByTLD.hasOwnProperty(title) == false){
            usersByTLD[title] = [user]
        } else{
            usersByTLD[title].push(user)
        }
        
    });

    // console.log(usersByTLD)
    // Once the new object usersByTLD set, let's render the column card
    for(let key in usersByTLD){
        const title = key;
        const userList = usersByTLD[key];
        renderColumn(title,userList);
    }
    
}

// Function to call an API
function callUsersEndpoint(){
    const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

    xhr.open("GET", USERS_ENDPOINT, true);

    xhr.onreadystatechange = function(){
        if(xhr.readyState != 4 || xhr.status != 200){
            return;
        }
        // console.log(xhr.response)
        const data = xhr.response;
        const usersData = JSON.parse(data);

        // Handling data
        handleUsersData(usersData);

    }
    xhr.send("-")
    
}


callUsersEndpoint();
