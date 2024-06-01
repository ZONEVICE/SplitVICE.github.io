// Congrats you just ruined it.
const messages = [
    "I have no name.",
    "The 7 club is exclusive to those in 'this' being.",
    "Inki? I don't know such man.",
    "Earth keeps spinning.",
    "Get out of my sight.",
    "DNI",
    "Remember to unfollow and block.",
    "What kind of athlete you are if you have never been injured?",
    "Tick tock... tick tock...",
    "Memento Mori."
];

let message = messages[Math.round(Math.random() * messages.length - 1)];

if (message === undefined) {
    message = messages[0];
}

document.getElementById('content').innerHTML = message;
