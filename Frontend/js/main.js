const API = '/chat';

async function send() {
    const msg = document.getElementById('msg').value;

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    });
    
    document.getElementById('msg').value = '';
    load();
}

async function load() {
    const res = await fetch(API);
    const data = await res.json();
    const list = document.getElementById('chat');
    
    list.innerHTML = '';

    data.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg.content;
        list.appendChild(li);
    });
}

load();
