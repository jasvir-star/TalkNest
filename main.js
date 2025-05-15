const API = '/chat';

async function send() {
    const msg = document.getElementById('msg').value;

    if (msg.length === 0) return;

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    });
    
    document.getElementById('msg').value = '';
    resizeTextArea();
    load();
}

async function load() {
    const res = await fetch(API);
    const data = await res.json();
    const list = document.getElementById('chat');
    
    list.innerHTML = '';

    data.forEach(msg => {
        const li = document.createElement('li');

        const time = new Date(msg.created_at);
        const localTime = time.toLocaleString();
        const formattedText = msg.content.replace(/\n/g, "<br>"); // Not very safe

        li.innerHTML = `[${localTime}]<br>${formattedText}`;
        list.appendChild(li);
    });

    list.scrollTop = list.scrollHeight; // Annoyingly scrolls you back to the newest message
}

const textarea = document.getElementById('msg');

function resizeTextArea() {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
}

textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        if (e.shiftKey) return;
        
        e.preventDefault();
        send();
    }
});

textarea.addEventListener('input', resizeTextArea);

load();
