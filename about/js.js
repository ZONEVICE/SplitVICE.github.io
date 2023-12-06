// Congrats you just ruined it.
const possible_messages = [
    "I have no name.",
    "The 7 club is exclusive to those in 'this' being.",
    "Inki? I don't know such man.",
    "World keeps spinning.",
    "Get out of my sight.",
    "DNI",
    "Remember to unfollow and block."
];

let message = possible_messages[Math.round(Math.random() * possible_messages.length - 1)];

if (message === undefined) {
    message = possible_messages[0];
}

document.getElementById('content').innerHTML = message;


