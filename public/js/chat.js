//tag and variable declarations
const states = {
    visible: 'visibility: visible',
    hidden: 'visibility: hidden',
}

var visibilityState = states.hidden;
var userList = [];
var intervalId = null;
const inputArea =  document.querySelector('#users');
var metaData = {};

function hideMe(tag){
    const hideMe = document.querySelector(tag);
    hideMe.setAttribute('style', 'visibility: hidden');
    return 0;
}
function showMe(tag){
    const showMe = document.querySelector(tag);
    showMe.setAttribute('style', 'visibility: visible');
    return 0;
}

const chatBtnHandler = async (event) => {
    clearInterval(intervalId);
    inputArea.value = '';

    if(visibilityState === states.hidden){
        visibilityState = states.visible;
    } else {
        visibilityState = states.hidden;
    }
    // render message board
    const messageBoard = document.querySelector('#newMessageBox');
    messageBoard.setAttribute('style', `${visibilityState}`)

    if(userList.length === 0){
        try{
            const response = await fetch('/api/chat/users');
    
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
    
            userList = await response.json();
            userList = userList.map((x) => x.username);
            userList.sort();
        } catch(err){
            console.log(err);
        }
    }
   
    renderUserBtn(userList);
    return 0;
}

//search algorithm and helpers
const searchResults = (userList, search) => {
    const results = [];
    for(let i = 0; i < userList.length; i++){
        if(userList[i].startsWith(search)){
            results.push(userList[i]);
        }
    }
    return results;
}

const renderUserBtn = (users) => {
    const usersArea = document.querySelector('.usersArea');
    usersArea.innerHTML = '';
    hideMe('.chatForm');

    for(let i of users){
        const newBtn = document.createElement('button');
        newBtn.setAttribute('id', i);
        newBtn.setAttribute('class', 'btn userBtn col-12');
        newBtn.innerHTML = i;
        newBtn.addEventListener('click', userSelectBtnHandler);
        usersArea.appendChild(newBtn);
    }
}

const retrieveConversationMetaData = async (user) => {
    showMe('.chatForm');
    var conversationMetaDate = {};

    try{
        const response = await fetch(`api/chat/metadata/${user}`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        conversationMetaDate = await response.json();
        
    } catch(err){
        console.log(err);
        return;
    }   
    return conversationMetaDate;
}

const retrieveChatLogs = async (convoId) => {
    var chatLogs = [];
    try {
        const response = await fetch(`api/chat/chatLogs/${convoId}`);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };
        chatLogs = await response.json();
    } catch (err) {
        console.log(err);
    }

    return chatLogs;
}

const renderText = (side, chat, textArea) => {
    const newText = document.createElement('p');
    newText.innerHTML = chat

    if(side === 'right') {
        newText.setAttribute('class', 'chat rightSideChat');
    } else if(side === 'left') {
        newText.setAttribute('class', 'chat leftSideChat');
    } 

    textArea.appendChild(newText);
}

//handlers
const userSelectBtnHandler = async (event) => {
    inputArea.value = event.target.id;

    metaData = await retrieveConversationMetaData(inputArea.value);
    //run on signal
    renderChatLog(metaData);
    
    intervalId = setInterval(async function onInterval() {
        if(onInterval.isRunning) {
            console.log('save')
            return;
        }
        onInterval.isRunning = true;
        const response = await fetch(`api/chat/signal/${metaData.convoId.id}`);
        const dbSignal = await response.json()
    
        if(dbSignal.signal === metaData.otherUserId.id){
            renderChatLog(metaData);
            const response = await fetch('/signal', {
                method: 'POST',
                body: JSON.stringify({
                    conversationId: metaData.convoId.id,
                }),
                headers: {'Content-Type': 'application/json'},
            })
        }
        onInterval.isRunning = false;
    }, 1000)


}

const renderChatLog = async (metaData) =>{
    const chatLog = await retrieveChatLogs(metaData.convoId.id);
    const textArea = document.querySelector('.usersArea');
    textArea.innerHTML = '';

    for(let chat of chatLog) {
        if(chat.userId === metaData.userId.id){
            renderText('right', chat.chat, document.querySelector('.usersArea'));
        } else if(chat.userId === metaData.otherUserId.id) {
            renderText('left', chat.chat, document.querySelector('.usersArea'));
        } else {
            req.session.destroy(() => {
                res.status(204).end();
            })
        }
    }

    textArea.scrollTop = textArea.scrollHeight;
}

const inputHandler = (event) => {
    clearInterval(intervalId);
    hideMe('.chatForm');
    const search = document.querySelector('#users').value.trim();
    renderUserBtn(searchResults(userList, search));
}

const chatHandler = async (event) => {
    event.preventDefault();
    const chat = document.querySelector('#chat').value.trim();
    //post chat
    if(chat.length < 1) {
        alert('Cannot send empty chat');
        return 1;
    }
    //post needs to send a signal
    const userId = metaData.userId.id;
    const otherUserId = metaData.otherUserId.id;
    const conversationId = metaData.convoId.id;

    try {
        const response = await fetch('api/chat/chatLogs', {
            method: 'POST',
            body: JSON.stringify({
                chat,
                userId,
                otherUserId,
                conversationId,
            }),
            headers: {'Content-Type': 'application/json'}
        })
        
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };
        
    } catch (err){
        console.log(err);
        return
    }

    renderChatLog(metaData);
    document.querySelector('#chat').value = '';
}



document
    .querySelector('.chatBoxBtn')
    .addEventListener('click', chatBtnHandler);

document
    .querySelector('#users')
    .addEventListener('input', inputHandler);

document
    .querySelector('.chatForm')
    .addEventListener('submit', chatHandler);

// document
//     .querySelector('.send-chat')
//     .addEventListener('submit', chatHandler);