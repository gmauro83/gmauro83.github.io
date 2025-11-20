document.addEventListener('DOMContentLoaded', () => {
    
    // --- ¡¡¡TUS DATOS PREDETERMINADOS!!! ---
            const DEFAULT_BOOKMARKS = {
                "BÚSQUEDA Y NOTICIAS": [
                    { "title": "Google", "url": "https://www.google.com", "description": "Buscador", "tags": [] },
                    { "title": "La Nueva", "url": "https://www.lanueva.com/", "description": "Noticias Locales", "tags": [] },
                    { "title": "La Brújula 24", "url": "https://www.labrujula24.com", "description": "Noticias Locales", "tags": [] },
                    { "title": "Infobae", "url": "https://www.infobae.com", "description": "Noticias Nacionales", "tags": [] },
                    { "title": "Google News", "url": "https://www.news.google.com", "description": "Noticias Nacionales", "tags": [] },
                    // Agrega más de esta categoría aquí...
                ],
                "ENTRETENIMIENTO Y REDES SOCIALES": [
                    { "title": "Youtube", "url": "https://www.youtube.com", "description": "Videos", "tags": [] },
                    { "title": "Twitch", "url": "https://www.twitch.tv", "description": "Entretenimiento", "tags": [] },
                    { "title": "Instagram", "url": "https://www.instagram.com", "description": "Red Social", "tags": [] },
                    { "title": "TikTok", "url": "https://www.tiktok.com", "description": "Entretenimiento", "tags": [] },
                    { "title": "Reddit", "url": "https://www.reddit.com", "description": "Red Social", "tags": [] },
                    { "title": "X", "url": "https://www.x.com", "description": "Red social", "tags": [] },
                    { "title": "Facebook", "url": "https://www.facebook.com", "description": "Red social", "tags": [] },
                    // Agrega más de esta categoría aquí...
                ],
                "TECNOLOGÍA Y TRABAJO": [
                    { "title": "ChatGPT", "url": "https://www.chat.openai.com", "description": "IA de OpenAI", "tags": [] },
                    { "title": "Gemini", "url": "https://www.gemini.google.com", "description": "IA de Google", "tags": [] },
                    { "title": "Perplexity", "url": "https://www.perplexity.ai", "description": "IA de Perplexity", "tags": [] },
                    { "title": "Github", "url": "https://www.github.com", "description": "Programación", "tags": [] },
                    { "title": "Gmail", "url": "https://www.mail.google.com", "description": "Correo", "tags": [] },
                    { "title": "Calendario de Google", "url": "https://www.calendar.google.com", "description": "Calendario", "tags": [] },
                    { "title": "Google Drive", "url": "https://www.drive.google.com", "description": "Almacenamiento", "tags": [] },
                    { "title": "Linkdein", "url": "https://www.linkedin.com", "description": "Trabajo", "tags": [] },
                    { "title": "Lenguajes Programación", "url": "https://www.lenguajehtml.com", "description": "Programación", "tags": [] },
                    // Agrega más de esta categoría aquí...
                ],
                "DESCARGAS": [
                    { "title": "MacTorrents", "url": "https://www.torrentmac.net", "description": "Torrent para Mac", "tags": [] },
                    { "title": "nMac.to", "url": "https://www.nmac.to", "description": "Torrent para Mac", "tags": [] }
                    // Agrega más de esta categoría aquí...
                ]
                // Puedes crear nuevas categorías copiando el bloque entero:
                // "Mi Nueva Categoría": [ ... ],
            };

            const DEFAULT_ORDER = [
                "Búsqueda y Noticias", 
                "Tecnología y Trabajo"
            ];
            // -----------------------------------------------

    // DOM
    const categoriesContainer = document.getElementById('categories-container');
    const modal = document.getElementById('modal');
    const linkForm = document.getElementById('link-form');
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const glassHeader = document.querySelector('.glass-header');
    
    // Chats
    const geminiModal = document.getElementById('gemini-modal');
    const geminiContent = document.getElementById('gemini-content');
    const closeGeminiBtn = document.getElementById('close-gemini');
    const geminiChatForm = document.getElementById('gemini-chat-form');
    const geminiChatInput = document.getElementById('gemini-chat-input');
    const btnKeyGemini = document.getElementById('btn-key-gemini');
    const pplxModal = document.getElementById('pplx-modal');
    const pplxContent = document.getElementById('pplx-content');
    const closePplxBtn = document.getElementById('close-pplx');
    const pplxChatForm = document.getElementById('pplx-chat-form');
    const pplxChatInput = document.getElementById('pplx-chat-input');
    const btnKeyPplx = document.getElementById('btn-key-pplx');

    // Inputs del Modal de Link
    const inputCatSelect = document.getElementById('input-category-select');
    const inputCatText = document.getElementById('input-category-text');
    const btnToggleCat = document.getElementById('btn-toggle-cat');

    // 1. SEARCH BAR LOGIC
    const promptForm = document.getElementById('prompt-form');
    const promptInput = document.getElementById('prompt-input');
    const searchModeSelect = document.getElementById('search-mode');
    const btnAction = document.querySelector('.btn-action');
    const logoIcon = document.querySelector('.sparkle-icon');

    let chatHistory = [];
    let pplxHistory = [];

    // Convierte el objeto DEFAULT_BOOKMARKS a un array plano con los campos necesarios
    function convertDefaultBookmarks(obj) {
        const arr = [];
        let counter = 1;
        Object.entries(obj).forEach(([category, items]) => {
            items.forEach(item => {
                arr.push({
                    id: Date.now() + counter++,
                    title: item.title || item.titulo || 'Sin título',
                    url: item.url || item.href || '#',
                    description: item.description || '',
                    tags: item.tags || [],
                    category
                });
            });
        });
        return arr;
    }

    // Cargar links desde localStorage o desde DEFAULT_BOOKMARKS convertido
    let links = JSON.parse(localStorage.getItem('myLinks')) || convertDefaultBookmarks(DEFAULT_BOOKMARKS);

    searchModeSelect.addEventListener('change', () => {
        const mode = searchModeSelect.value;
        glassHeader.classList.remove('mode-pplx');
        if (mode === 'gemini') {
            promptInput.placeholder = "Pregúntale algo a Gemini...";
            btnAction.style.background = 'var(--gemini-gradient)';
            logoIcon.name = "rocket"; logoIcon.style.color = "#4b90ff";
        } else if (mode === 'perplexity') {
            promptInput.placeholder = "Investigar con Perplexity...";
            btnAction.style.background = '#22bfa5';
            glassHeader.classList.add('mode-pplx');
            logoIcon.name = "bulb"; logoIcon.style.color = "#22bfa5";
        }
    });

    promptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = promptInput.value.trim();
        const mode = searchModeSelect.value;
        if (!text) return;
        if (mode === 'perplexity') { startPplxChat(text); }
        else { startGeminiChat(text); }
        promptInput.value = "";
    });

    // 2. CATEGORY LOGIC (SELECT vs TEXT)
    let isNewCategory = false;
    
    btnToggleCat.addEventListener('click', () => {
        isNewCategory = !isNewCategory;
        if(isNewCategory) {
            inputCatSelect.classList.add('hidden');
            inputCatText.classList.remove('hidden');
            btnToggleCat.innerHTML = '<ion-icon name="list-outline"></ion-icon>';
            inputCatText.focus();
        } else {
            inputCatSelect.classList.remove('hidden');
            inputCatText.classList.add('hidden');
            btnToggleCat.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
        }
    });

    function populateCategories() {
        const categories = new Set();
        links.forEach(l => categories.add(l.category));
        inputCatSelect.innerHTML = '';
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat; opt.textContent = cat;
            inputCatSelect.appendChild(opt);
        });
    }

    // 3. RENDER
    function render() {
        categoriesContainer.innerHTML = '';
        const categories = {};
        links.forEach(link => {
            if (!categories[link.category]) categories[link.category] = [];
            categories[link.category].push(link);
        });

        for (const [catName, catLinks] of Object.entries(categories)) {
            const section = document.createElement('section');
            section.className = 'category-section';
            section.innerHTML = `
                <div class="category-header">
                    <div class="category-title"><ion-icon name="folder-open-outline"></ion-icon> ${catName}</div>
                    <div class="category-actions">
                        <button class="btn-cat-action btn-rename-cat" title="Renombrar"><ion-icon name="pencil-outline"></ion-icon></button>
                        <button class="btn-cat-action btn-delete-cat btn-cat-delete" title="Eliminar"><ion-icon name="trash-outline"></ion-icon></button>
                    </div>
                </div>
                <div class="links-grid-container"></div>
            `;
            categoriesContainer.appendChild(section);
            
            section.querySelector('.btn-rename-cat').addEventListener('click', () => renameCategory(catName));
            section.querySelector('.btn-delete-cat').addEventListener('click', () => deleteCategory(catName));

            const gridContainer = section.querySelector('.links-grid-container');
            catLinks.forEach(link => {
                const wrapper = document.createElement('div'); wrapper.className = 'card-wrapper';
                wrapper.setAttribute('data-id', link.id);
                const favicon = `https://www.google.com/s2/favicons?domain=${link.url}&sz=64`;
                wrapper.innerHTML = `<div class="card" onclick="window.open('${link.url}', '_blank')"><img src="${favicon}" onerror="this.src='https://unpkg.com/ionicons@7.1.0/dist/svg/globe-outline.svg'"><div class="card-info"><span class="card-title">${link.title}</span><span class="card-url">${getDomain(link.url)}</span></div><div class="card-actions"><button class="action-btn btn-edit"><ion-icon name="pencil-outline"></ion-icon></button><button class="action-btn btn-delete"><ion-icon name="trash-outline"></ion-icon></button></div></div>`;
                wrapper.querySelector('.btn-edit').addEventListener('click', (e) => { e.stopPropagation(); openModal(link); });
                wrapper.querySelector('.btn-delete').addEventListener('click', (e) => { e.stopPropagation(); deleteLink(link.id); });
                gridContainer.appendChild(wrapper);
            });

            new Sortable(gridContainer, { group: 'shared', animation: 150, ghostClass: 'sortable-ghost', delay: 300, delayOnTouchOnly: true, onEnd: (evt) => { const itemEl = evt.item; const newCategory = evt.to.closest('.category-section').querySelector('.category-title').innerText.trim(); const linkId = parseInt(itemEl.getAttribute('data-id')); const linkIndex = links.findIndex(l => l.id === linkId); if(linkIndex > -1) { links[linkIndex].category = newCategory; save(); } } });
        }
    }

    function renameCategory(oldName) {
        const newName = prompt("Nuevo nombre:", oldName);
        if (newName && newName.trim() && newName !== oldName) {
            links.forEach(l => { if (l.category === oldName) l.category = newName.trim(); });
            save(); render();
        }
    }
    function deleteCategory(name) {
        if(confirm(`¿Borrar "${name}" y sus enlaces?`)) {
            links = links.filter(l => l.category !== name);
            save(); render();
        }
    }

    // CHATS
    function startGeminiChat(msg) { chatHistory = []; geminiContent.innerHTML = ''; geminiModal.classList.remove('hidden'); setTimeout(() => { geminiModal.classList.add('visible'); geminiChatInput.focus(); }, 10); continueGeminiChat(msg); }
    geminiChatForm.addEventListener('submit', (e) => { e.preventDefault(); const t = geminiChatInput.value.trim(); if(t) { continueGeminiChat(t); geminiChatInput.value = ""; } });
    async function continueGeminiChat(msg) {
        addMessageToUI(geminiContent, msg, 'user');
        chatHistory.push({ role: "user", parts: [{ text: msg }] });
        const loading = showLoading(geminiContent);
        try {
            let k = localStorage.getItem('gemini_api_key');
            if(!k) { k=prompt("Gemini API Key:"); if(k) localStorage.setItem('gemini_api_key', k.trim()); else { loading.remove(); return; } }
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${k}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ contents: chatHistory }) });
            const d = await res.json(); loading.remove();
            if(d.error) throw new Error(d.error.message);
            const txt = d.candidates[0].content.parts[0].text;
            addMessageToUI(geminiContent, txt, 'model');
            chatHistory.push({ role: "model", parts: [{ text: txt }] });
        } catch(e) { loading.remove(); addErrorToUI(geminiContent, e.message, 'gemini'); }
    }

    function startPplxChat(msg) { pplxHistory = [{ role: "system", content: "Be precise." }]; pplxContent.innerHTML = ''; pplxModal.classList.remove('hidden'); setTimeout(() => { pplxModal.classList.add('visible'); pplxChatInput.focus(); }, 10); continuePplxChat(msg); }
    pplxChatForm.addEventListener('submit', (e) => { e.preventDefault(); const t = pplxChatInput.value.trim(); if(t) { continuePplxChat(t); pplxChatInput.value = ""; } });
    async function continuePplxChat(msg) {
        addMessageToUI(pplxContent, msg, 'user');
        pplxHistory.push({ role: "user", content: msg });
        const loading = showLoading(pplxContent);
        try {
            let k = localStorage.getItem('pplx_api_key');
            if(!k) { k=prompt("Perplexity API Key:"); if(k) localStorage.setItem('pplx_api_key', k.trim()); else { loading.remove(); return; } }
            const res = await fetch('https://api.perplexity.ai/chat/completions', { method: 'POST', headers: {'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json'}, body: JSON.stringify({ model: "sonar-pro", messages: pplxHistory }) });
            const d = await res.json(); loading.remove();
            if(d.error) throw new Error(d.error.message);
            const txt = d.choices[0].message.content;
            addMessageToUI(pplxContent, txt, 'model');
            pplxHistory.push({ role: "assistant", content: txt });
        } catch(e) { loading.remove(); addErrorToUI(pplxContent, e.message, 'pplx'); }
    }

    // UTILS
    function addMessageToUI(c, t, r) { const b = document.createElement('div'); b.className = `chat-bubble chat-${r}`; if(r==='model') b.innerHTML = marked.parse(t); else b.textContent = t; c.appendChild(b); c.scrollTop = c.scrollHeight; }
    function showLoading(c) { const d = document.createElement('div'); d.className = 'loading-spinner'; d.innerHTML = '<ion-icon name="sync"></ion-icon> ...'; c.appendChild(d); c.scrollTop = c.scrollHeight; return d; }
    function addErrorToUI(c, m, t) { c.innerHTML += `<div style="color:#ef4444;text-align:center">Error: ${m}</div>`; }
    function getDomain(u) { try { return new URL(u).hostname.replace('www.',''); } catch { return 'link'; } }
    function save() { localStorage.setItem('myLinks', JSON.stringify(links)); }
    function deleteLink(id) { if(confirm('¿Borrar?')) { links = links.filter(l => l.id !== id); save(); render(); } }

    // MODAL LOGIC
    function openModal(link = null) {
        populateCategories();
        isNewCategory = false;
        inputCatSelect.classList.remove('hidden');
        inputCatText.classList.add('hidden');
        btnToggleCat.innerHTML = '<ion-icon name="add-outline"></ion-icon>';
        
        modal.classList.remove('hidden'); setTimeout(() => modal.classList.add('visible'), 10);
        if (link) {
            document.getElementById('edit-id').value = link.id;
            document.getElementById('input-title').value = link.title;
            document.getElementById('input-url').value = link.url;
            inputCatSelect.value = link.category;
        } else {
            document.getElementById('edit-id').value = '';
            linkForm.reset();
        }
    }
    function closeModal() { modal.classList.remove('visible'); setTimeout(() => modal.classList.add('hidden'), 300); }
    
    document.getElementById('btn-add').addEventListener('click', () => openModal());
    document.getElementById('btn-cancel').addEventListener('click', () => closeModal());
    
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const title = document.getElementById('input-title').value;
        let url = document.getElementById('input-url').value;
        if (!url.startsWith('http')) url = 'https://' + url;
        
        // DETERMINAR CATEGORÍA
        let category;
        if (isNewCategory) {
            category = inputCatText.value.trim();
            if (!category) return alert("Escribe un nombre para la categoría");
        } else {
            category = inputCatSelect.value;
        }

        if (id) {
            const index = links.findIndex(l => l.id == id);
            if (index > -1) links[index] = { ...links[index], title, url, category };
        } else {
            links.push({ id: Date.now(), title, url, category });
        }
        save(); render(); closeModal();
    });

    // Close Btns
    [closeGeminiBtn, closePplxBtn].forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => { m.classList.remove('visible'); setTimeout(()=>m.classList.add('hidden'), 300); });
    }));
    [btnKeyGemini, btnKeyPplx].forEach(b => b.addEventListener('click', () => {
        const k = prompt("API Key:"); if(k) localStorage.setItem(b.id === 'btn-key-gemini' ? 'gemini_api_key' : 'pplx_api_key', k.trim());
    }));

    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    themeBtn.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme); localStorage.setItem('theme', newTheme);
    });

    render();
});
