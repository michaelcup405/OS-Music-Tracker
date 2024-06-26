
// ==UserScript==
// @name         OS Chat Styling!
// @match        https://onlinesequencer.net/chat/
// @version      2024-02-23
// @description  Music is nice.
// @author       You
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at document-top
// ==/UserScript==

const change = document.querySelector('html').innerHTML = `<html>
<head>
<title>Online Sequencer Chat - General</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {
	margin: 0;
	padding: 0;
	background-color: #000;
}
iframe {
	position:absolute;
	border: 0;
	width: 100%;
	height: 100%;
}
.buttons {
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 45%;
    transform: translateX(-60%);
    z-index: 1000;
}

button {
    z-index: 1000;
    display: block;
    width: 100px;
    height: 46px;
    line-height: 46px;
    background-color: rgba(13, 71, 161, 0.5);
    text-transform: none;
}

</style>
</head>
<body>
<div class="buttons">
<button class="roomSelector" onclick="document.querySelector('iframe').src = 'https://onlinesequencer.net/forum/chat_frame.php?ez_iframe=1?context=0'; document.querySelector('title').innerText = 'Online Sequencer Chat - General';">General</button>
<button class="roomSelector" onclick="document.querySelector('iframe').src = 'https://onlinesequencer.net/forum/chat_frame.php?ez_iframe=1?context=10293847'; document.querySelector('title').innerText = 'Online Sequencer Chat - Music';">Music</button>
</div>
<iframe src="https://onlinesequencer.net/forum/chat_frame.php?ez_iframe=1?context=0"></iframe>
</body>
</html>`;