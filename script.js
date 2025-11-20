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
            { "title": "X", "url": "https://x.com", "description": "Red social", "tags": [] },
            { "title": "Facebook", "url": "https://www.facebook.com", "description": "Red social", "tags": [] },
            // Agrega más de esta categoría aquí...
        ],
        "TECNOLOGÍA Y TRABAJO": [
            { "title": "ChatGPT", "url": "https://www.chat.openai.com", "description": "IA de OpenAI", "tags": [] },
            { "title": "Gemini", "url": "https://gemini.google.com/app", "description": "IA de Google", "tags": [] },
            { "title": "Perplexity", "url": "https://www.perplexity.ai", "description": "IA de Perplexity", "tags": [] },
            { "title": "Github", "url": "https://www.github.com", "description": "Programación", "tags": [] },
            { "title": "Gmail", "url": "https://mail.google.com", "description": "Correo", "tags": [] },
            { "title": "Calendario de Google", "url": "https://calendar.google.com", "description": "Calendario", "tags": [] },
            { "title": "Google Drive", "url": "https://drive.google.com", "description": "Almacenamiento", "tags": [] },
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

    // Convertir objeto de bookmarks por categoría a un array plano
    function convertDefaultBookmarks(obj) {
        const arr = [];
        let counter = 1;
        Object.entries(obj).forEach(([category, items]) => {
            (items || []).forEach(item => {
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

    // Mapa de iconos de alta calidad para dominios comunes (override)
    const ICON_OVERRIDES = {
        // Google products
        'google.com': 'https://www.google.com/favicon.ico',
        'mail.google.com': 'https://www.gstatic.com/images/branding/product/1x/gmail_64dp.png',
        'drive.google.com': 'https://www.gstatic.com/images/branding/product/1x/drive_64dp.png',
        'calendar.google.com': 'https://www.gstatic.com/images/branding/product/1x/calendar_64dp.png',
        // Video / social
        'youtube.com': 'https://www.youtube.com/favicon.ico',
        // Developer / profesional
        'github.com': 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        'linkedin.com': 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
        // IA services
        'chat.openai.com': 'https://chat.openai.com/favicon.ico',
        'gemini.google.com': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/120px-Google_Gemini_logo.svg.png',
        'perplexity.ai': 'https://perplexity.ai/favicon.ico'
    };

    // Inicializar links desde localStorage o con los datos por defecto (robusto)
    let links = [];
    const raw = localStorage.getItem('myLinks');
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                links = parsed;
            } else {
                // Si el parsed no es un array válido, fallback
                links = convertDefaultBookmarks(DEFAULT_BOOKMARKS);
                console.warn('myLinks válido pero vacío o no es array, cargando por defecto');
                save();
            }
        } catch (err) {
            console.warn('Error parseando myLinks desde localStorage:', err);
            links = convertDefaultBookmarks(DEFAULT_BOOKMARKS);
            save();
        }
    } else {
        links = convertDefaultBookmarks(DEFAULT_BOOKMARKS);
        save();
    }

    // Para depuración desde la consola del navegador
    window._myLinks = links;
    console.log('[Launchpad] enlaces cargados:', links.length);

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
    // Botones nuevos
    const btnSelectGemini = document.getElementById('btn-select-gemini');
    const btnSelectPplx = document.getElementById('btn-select-pplx');
    const btnAction = document.querySelector('.btn-action');
    const logoIcon = document.querySelector('.sparkle-icon');

    let chatHistory = [];
    let pplxHistory = [];
    // Estado del modo de búsqueda: 'gemini' por defecto
    let searchMode = 'gemini';

    function updateSearchUI() {
        if (searchMode === 'gemini') {
            promptInput.placeholder = "Pregúntale algo a Gemini...";
            btnAction.style.background = 'var(--gemini-gradient)';
            logoIcon.name = 'rocket'; logoIcon.style.color = '#4b90ff';
            btnSelectGemini.classList.add('active'); btnSelectPplx.classList.remove('active');
        } else {
            promptInput.placeholder = "Investigar con Perplexity...";
            btnAction.style.background = 'var(--pplx-gradient)';
            logoIcon.name = 'bulb'; logoIcon.style.color = '#22bfa5';
            btnSelectPplx.classList.add('active'); btnSelectGemini.classList.remove('active');
        }
    }

    btnSelectGemini.addEventListener('click', () => {
        searchMode = 'gemini';
        updateSearchUI();
        const text = promptInput.value.trim();
        if (text) startGeminiChat(text);
        else startGeminiChat('');
        promptInput.value = '';
    });
    btnSelectPplx.addEventListener('click', () => {
        searchMode = 'perplexity';
        updateSearchUI();
        const text = promptInput.value.trim();
        if (text) startPplxChat(text);
        else startPplxChat('');
        promptInput.value = '';
    });

    // Inicializar UI
    updateSearchUI();

    promptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = promptInput.value.trim();
        if (!text) return;
        if (searchMode === 'perplexity') { startPplxChat(text); glassHeader.classList.add('mode-pplx'); }
        else { startGeminiChat(text); glassHeader.classList.remove('mode-pplx'); }
        promptInput.value = "";
    });

    // 2. CATEGORY LOGIC (SELECT vs TEXT)
    let isNewCategory = false;

    btnToggleCat.addEventListener('click', () => {
        isNewCategory = !isNewCategory;
        if (isNewCategory) {
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

        // Si no hay categorías/enlaces, mostrar mensaje
        if (Object.keys(categories).length === 0) {
            categoriesContainer.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:3rem">No hay enlaces. Agrega uno con el botón <strong>+</strong>.</div>';
            return;
        }

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
                // Crear tarjeta con nodos DOM (más robusto que innerHTML)
                const domain = getDomain(link.url);
                const card = document.createElement('div'); card.className = 'card';
                card.addEventListener('click', () => window.open(link.url, '_blank'));

                const imgEl = document.createElement('img');
                imgEl.alt = `${link.title} favicon`;
                imgEl.width = 44; imgEl.height = 44; imgEl.draggable = false; imgEl.decoding = 'async';
                imgEl.style.objectFit = 'contain'; imgEl.style.background = 'transparent';

                // Preparar cadena de intentos (override -> googleByUrl -> googleByDomain -> ddg -> fallback)
                imgEl._tryCount = 0;
                const googleByUrl = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(link.url)}&sz=64`;
                const googleByDomain = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                const ddg = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
                const fallback = 'https://unpkg.com/ionicons@7.1.0/dist/svg/globe-outline.svg';

                function tryNextFavicon() {
                    try {
                        if (imgEl._tryCount === 0) imgEl.src = googleByUrl;
                        else if (imgEl._tryCount === 1) imgEl.src = googleByDomain;
                        else if (imgEl._tryCount === 2) imgEl.src = ddg;
                        else imgEl.src = fallback;
                        imgEl._tryCount++;
                    } catch (e) { imgEl.src = fallback; }
                }

                // Handlers para detectar imágenes inválidas y pasar al siguiente intento
                imgEl.addEventListener('load', () => {
                    // Algunos endpoints devuelven imágenes vacías; verificar naturalWidth
                    if (!imgEl.naturalWidth || imgEl.naturalWidth === 0) {
                        if (imgEl._tryCount < 4) tryNextFavicon();
                    }
                });
                imgEl.addEventListener('error', () => {
                    if (imgEl._tryCount < 4) {
                        tryNextFavicon();
                    } else {
                        imgEl.onerror = null;
                        imgEl.src = fallback;
                    }
                });

                // Si hay override para el dominio, intentar primero con ese recurso. Si falla, la lógica de error/load continuará con la cadena de favicons.
                const override = ICON_OVERRIDES[domain];
                if (override) {
                    imgEl.src = override;
                    // en caso de que el override no provoque ni load ni error (raro), programar un safety fallback corto
                    setTimeout(() => {
                        if ((!imgEl.naturalWidth || imgEl.naturalWidth === 0) && imgEl._tryCount === 0) {
                            // comenzar la cadena de intentos usando googleByUrl
                            tryNextFavicon();
                        }
                    }, 400);
                } else {
                    // Iniciar la cadena normal
                    tryNextFavicon();
                }

                const info = document.createElement('div'); info.className = 'card-info';
                const titleEl = document.createElement('span'); titleEl.className = 'card-title'; titleEl.textContent = link.title;
                const urlEl = document.createElement('span'); urlEl.className = 'card-url'; urlEl.textContent = domain;
                info.appendChild(titleEl); info.appendChild(urlEl);

                const actions = document.createElement('div'); actions.className = 'card-actions';
                const btnEdit = document.createElement('button'); btnEdit.className = 'action-btn btn-edit'; btnEdit.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>';
                const btnDel = document.createElement('button'); btnDel.className = 'action-btn btn-delete'; btnDel.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
                actions.appendChild(btnEdit); actions.appendChild(btnDel);

                card.appendChild(imgEl); card.appendChild(info); card.appendChild(actions);
                wrapper.appendChild(card);

                btnEdit.addEventListener('click', (e) => { e.stopPropagation(); openModal(link); });
                btnDel.addEventListener('click', (e) => { e.stopPropagation(); deleteLink(link.id); });
                gridContainer.appendChild(wrapper);
            });

            new Sortable(gridContainer, { group: 'shared', animation: 150, ghostClass: 'sortable-ghost', delay: 300, delayOnTouchOnly: true, onEnd: (evt) => { const itemEl = evt.item; const newCategory = evt.to.closest('.category-section').querySelector('.category-title').innerText.trim(); const linkId = parseInt(itemEl.getAttribute('data-id')); const linkIndex = links.findIndex(l => l.id === linkId); if (linkIndex > -1) { links[linkIndex].category = newCategory; save(); } } });
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
        if (confirm(`¿Borrar "${name}" y sus enlaces?`)) {
            links = links.filter(l => l.category !== name);
            save(); render();
        }
    }

    // CHATS
    function startGeminiChat(msg) { chatHistory = []; geminiContent.innerHTML = ''; geminiModal.classList.remove('hidden'); setTimeout(() => { geminiModal.classList.add('visible'); geminiChatInput.focus(); }, 10); continueGeminiChat(msg); }
    geminiChatForm.addEventListener('submit', (e) => { e.preventDefault(); const t = geminiChatInput.value.trim(); if (t) { continueGeminiChat(t); geminiChatInput.value = ""; } });
    async function continueGeminiChat(msg) {
        addMessageToUI(geminiContent, msg, 'user');
        chatHistory.push({ role: "user", parts: [{ text: msg }] });
        const loading = showLoading(geminiContent);
        try {
            let k = localStorage.getItem('gemini_api_key');
            if (!k) { k = prompt("Gemini API Key:"); if (k) localStorage.setItem('gemini_api_key', k.trim()); else { loading.remove(); return; } }
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${k}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: chatHistory }) });
            const d = await res.json(); loading.remove();
            if (d.error) throw new Error(d.error.message);
            const txt = d.candidates[0].content.parts[0].text;
            addMessageToUI(geminiContent, txt, 'model');
            chatHistory.push({ role: "model", parts: [{ text: txt }] });
        } catch (e) { loading.remove(); addErrorToUI(geminiContent, e.message, 'gemini'); }
    }

    function startPplxChat(msg) { pplxHistory = [{ role: "system", content: "Be precise." }]; pplxContent.innerHTML = ''; pplxModal.classList.remove('hidden'); setTimeout(() => { pplxModal.classList.add('visible'); pplxChatInput.focus(); }, 10); continuePplxChat(msg); }
    pplxChatForm.addEventListener('submit', (e) => { e.preventDefault(); const t = pplxChatInput.value.trim(); if (t) { continuePplxChat(t); pplxChatInput.value = ""; } });
    async function continuePplxChat(msg) {
        addMessageToUI(pplxContent, msg, 'user');
        pplxHistory.push({ role: "user", content: msg });
        const loading = showLoading(pplxContent);
        try {
            let k = localStorage.getItem('pplx_api_key');
            if (!k) { k = prompt("Perplexity API Key:"); if (k) localStorage.setItem('pplx_api_key', k.trim()); else { loading.remove(); return; } }
            const res = await fetch('https://api.perplexity.ai/chat/completions', { method: 'POST', headers: { 'Authorization': `Bearer ${k}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: "sonar-pro", messages: pplxHistory }) });
            const d = await res.json(); loading.remove();
            if (d.error) throw new Error(d.error.message);
            const txt = d.choices[0].message.content;
            addMessageToUI(pplxContent, txt, 'model');
            pplxHistory.push({ role: "assistant", content: txt });
        } catch (e) { loading.remove(); addErrorToUI(pplxContent, e.message, 'pplx'); }
    }

    // UTILS
    function addMessageToUI(c, t, r) { const b = document.createElement('div'); b.className = `chat-bubble chat-${r}`; if (r === 'model') b.innerHTML = marked.parse(t); else b.textContent = t; c.appendChild(b); c.scrollTop = c.scrollHeight; }
    function showLoading(c) { const d = document.createElement('div'); d.className = 'loading-spinner'; d.innerHTML = '<ion-icon name="sync"></ion-icon> ...'; c.appendChild(d); c.scrollTop = c.scrollHeight; return d; }
    function addErrorToUI(c, m, t) { c.innerHTML += `<div style="color:#ef4444;text-align:center">Error: ${m}</div>`; }
    function getDomain(u) { try { return new URL(u).hostname.replace('www.', ''); } catch { return 'link'; } }
    function save() { localStorage.setItem('myLinks', JSON.stringify(links)); }
    function deleteLink(id) { if (confirm('¿Borrar?')) { links = links.filter(l => l.id !== id); save(); render(); } }

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
        document.querySelectorAll('.modal').forEach(m => { m.classList.remove('visible'); setTimeout(() => m.classList.add('hidden'), 300); });
    }));
    [btnKeyGemini, btnKeyPplx].forEach(b => b.addEventListener('click', () => {
        const k = prompt("API Key:"); if (k) localStorage.setItem(b.id === 'btn-key-gemini' ? 'gemini_api_key' : 'pplx_api_key', k.trim());
    }));

    // Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    themeBtn.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme); localStorage.setItem('theme', newTheme);
    });

    // BACKUP SYSTEM (Export/Import)
    const btnExport = document.getElementById('btn-export');
    const btnImport = document.getElementById('btn-import');
    const fileImport = document.getElementById('file-import');

    btnExport.addEventListener('click', () => {
        const data = {
            myLinks: JSON.parse(localStorage.getItem('myLinks') || '[]'),
            theme: localStorage.getItem('theme') || 'dark',
            gemini_api_key: localStorage.getItem('gemini_api_key') || '',
            pplx_api_key: localStorage.getItem('pplx_api_key') || ''
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `launchpad-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    btnImport.addEventListener('click', () => fileImport.click());

    fileImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.myLinks) localStorage.setItem('myLinks', JSON.stringify(data.myLinks));
                if (data.theme) localStorage.setItem('theme', data.theme);
                if (data.gemini_api_key) localStorage.setItem('gemini_api_key', data.gemini_api_key);
                if (data.pplx_api_key) localStorage.setItem('pplx_api_key', data.pplx_api_key);

                alert('Configuración restaurada con éxito. La página se recargará.');
                location.reload();
            } catch (err) {
                alert('Error al leer el archivo de respaldo: ' + err.message);
            }
        };
        reader.readAsText(file);
    });

    render();
});
