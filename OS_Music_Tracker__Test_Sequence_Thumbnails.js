
// ==UserScript==
// @name         Song Tracker for OS!
// @match        https://onlinesequencer.net/forum/chat_frame.php?ez_iframe=1
// @version      2024-02-23
// @description  Music is nice.
// @author       You
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at document-top
// ==/UserScript==

function addToPlaylist(id, sequenceId){
    $.ajax('/ajax/update_playlist.php', {
        type: 'POST',
        data: {id: id, add_sequence: sequenceId, post_key: my_post_key}
    });
}

function removeNonNumericCharacters(id) {
    return id.replace(/[^0-9]/g, '');
}

function updateMessageCountAndIds() {

    let songId = 0;
    const elements = document.querySelectorAll('.chat');
    const count = elements.length;
    const idList = Array.from(elements).map((element) => element.id);
    const cleanedIds = idList.map(removeNonNumericCharacters);
    const latestMessage = 'chat-' + cleanedIds[cleanedIds.length - 1];

    if (latestMessage !== previousId || latestMessage !== undefined) {
        const parent = document.querySelector(`#${latestMessage}`);
        let child = parent.querySelector('.info');

        if (child !== null) {
            child = child.querySelector('div');
        } else if (child === null) {
            child = parent.querySelector('div');
        }

        const child2 = child.querySelector('.message');
        const message = child2.innerText;
        let hasSequence = child2.querySelector('a');
        let imgLocation = hasSequence;


        if (hasSequence !== null && message !== null) {
            hasSequence = hasSequence.href;
            if (hasSequence.includes("https://onlinesequencer.net/") || hasSequence.includes("https://test.onlinesequencer.net/")) {
                songId = removeNonNumericCharacters(hasSequence);
            }
            if (message + hasSequence !== previousFullMessage){
                console.log(message + hasSequence);
                previousFullMessage = message + hasSequence;
            }
        } if (hasSequence === null) {
            if (message !== previousFullMessage){
                console.log(message);
                previousFullMessage = message;
            }
            if (message.includes('https://onlinesequencer.net/' || message.includes("https://test.onlinesequencer.net/"))) {
                songId = removeNonNumericCharacters(message);
            }

        } if (message === null && hasSequence === null) {
            console.log('No message found!')
        }

        if (songId !== 0){
            if (hasSequence.includes('https://test.onlinesequencer.net/' && 'https://onlinesequencer.net/preview.php?id='+songId !== 'https://onlinesequencer.net/preview.php?id=')){
                const imgSrc = 'https://onlinesequencer.net/preview.php?id='+songId;
                // Create an image element
                const imgElement = document.createElement("img");
                imgElement.src = imgSrc;
                imgLocation.innerText = '';

                // Insert the image element after the reference element
                imgLocation.appendChild(imgElement);


            }

            addToPlaylist(playlistId, songId)
        }
        if (hasSequence !== null){
            if (hasSequence.includes(".gif") || hasSequence.includes(".png") || hasSequence.includes(".jpg") || hasSequence.includes(".jpeg") || hasSequence.includes(".svg") || hasSequence.includes(".tiff" || hasSequence.includes(".webp" && !hasSequence.includes(".webp")))){
                // Create an image element
                const imgElement = document.createElement("img");
                imgElement.src = hasSequence;
                imgLocation.innerText = '';

                // Insert the image element after the reference element
                imgLocation.appendChild(imgElement);
            }
            if (hasSequence.includes('https://www.youtube.com/embed/') || hasSequence.includes('https://youtu.be/') && hasSequence.includes(/[^0-9]/g)){
                // Create an image element
                const imgElement = document.createElement("iframe");
                imgLocation.innerText = '';
                imgElement.width="560";
                imgElement.height="315";
                imgElement.src=hasSequence;
                imgElement.title="YouTube video player";
                imgElement.frameborder="0";
                imgElement.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                imgElement.allowfullscreen;

                // Insert the image element after the reference element
                imgLocation.appendChild(imgElement);


            }
        }
    }

    previousId = latestMessage;
    return cleanedIds;
}
let previousFullMessage = null;
let previousId = 0;
let playlistId = 30876;
setInterval(updateMessageCountAndIds, 500);
