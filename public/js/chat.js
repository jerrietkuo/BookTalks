//tag and variable declarations
const states = {
    visible: 'visibility: visible',
    hidden: 'visibility: hidden',
}

var visibilityState = states.hidden;
var tags = null;
var intervalId = null;
var signal = false;
const inputArea =  document.querySelector('#users');
var metaData = {};

const chatBtnHandler = async (event) => {
    // event.preventDefault();
    clearInterval(intervalId);
    const chatForm = document.querySelector('.chatForm');
    chatForm.setAttribute('style', 'visibility: hidden');
    inputArea.value = '';

    if(visibilityState === states.hidden){
        visibilityState = states.visible;
    } else {
        visibilityState = states.hidden;
    }
    // render message board
    const messageBoard = document.querySelector('#newMessageBox');
    messageBoard.setAttribute('style', `${visibilityState}`)

    try{
        const response = await fetch('/api/chat/users');

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        tags = json[0].map((x) => x.username);
        tags.sort();
    } catch(err){
        console.log(err);
    }
    renderUserBtn(tags)
    return tags
}

//search algorithm and helpers
const searchResults = (tags, search) => {
    const results = [];
    for(let i = 0; i < tags.length; i++){
        if(tags[i].startsWith(search)){
            results.push(tags[i]);
        }
    }
    return results;
}

const renderUserBtn = (users) => {
  const usersArea = document.querySelector('.usersArea');
  usersArea.innerHTML = '';
  const chatForm = document.querySelector('.chatForm');
  chatForm.setAttribute('style', 'visibility: hidden');

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
    const chatForm = document.querySelector('.chatForm');
    chatForm.setAttribute('style', 'visibility: visible');
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
    // newText.setAttribute('class', '')
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
    const chatForm = document.querySelector('.chatForm');
    chatForm.setAttribute('style', 'visibility: hidden')
    const search = document.querySelector('#users').value.trim();
    renderUserBtn(searchResults(tags, search));
}

const chatHandler = async (event) => {
    event.preventDefault();
    const chat = document.querySelector('#chat').value.trim();
    //post chat
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
    //run retrieve chat again
    //retrieve chat should also run when other persons post is made

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