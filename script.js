document.addEventListener('DOMContentLoaded', () => {
            
            // --- CONSTANTES DE DATOS Y DOM ---
            const STORAGE_KEY_BOOKMARKS = 'dinamicBookmarks';
            const STORAGE_KEY_ORDER = 'dinamicBookmarksOrder';
            const STORAGE_KEY_THEME = 'dinamicBookmarksTheme';
            
            
            // --- ¡¡¡TUS DATOS PREDETERMINADOS!!! ---
            const DEFAULT_BOOKMARKS = {
                "🔎 Búsqueda y Noticias": [
                    {"title": "Google", "url": "https://www.google.com", "description": "Buscador web", "tags": []},
                    {"title": "La Nueva", "url": "https://www.lanueva.com/", "description": "Noticias Locales y de la Argentina", "tags": []},
                    {"title": "La Brújula", "url": "https://www.labrujula24.com/", "description": "Noticias Locales y de la Argentina", "tags": []},
                    {"title": "Infobae", "url": "https://www.infobae.com/", "description": "Infobae", "tags": []},
                    {"title": "DuckDuckGo", "url": "https://duckduckgo.com", "description": "Un buscador enfocado en la privacidad que no rastrea tu historial de búsqueda.", "tags": ["busqueda", "privacidad", "motor"]},
                    {"title": "Google News", "url": "https://news.google.com", "description": "Agregador de noticias de Google, personalizado según tus intereses.", "tags": ["noticias", "google", "agregador"]},
                    {"title": "Feedly", "url": "https://feedly.com", "description": "Lector de RSS para seguir blogs y sitios de noticias en un solo lugar.", "tags": ["rss", "noticias", "blogs", "tecnologia"]}
                ],
                "🎬 Entretenimiento": [
                    {"title": "YouTube", "url": "https://www.youtube.com", "description": "Plataforma de videos", "tags": []},
                    {"title": "TikTok", "url": "https://www.tiktok.com/es/", "description": "Videos cortos", "tags": []},
                    {"title": "Twitch", "url": "https://www.twitch.tv/", "description": "Twitch", "tags": []},
                    {"title": "Spotify (Web Player)", "url": "https://open.spotify.com", "description": "Escucha música y podcasts directamente desde el navegador.", "tags": ["musica", "podcast", "streaming"]},
                    {"title": "Reddit", "url": "https://www.reddit.com", "description": "La \"portada de internet\". Foros y comunidades (subreddits) sobre cualquier tema.", "tags": ["comunidad", "foros", "noticias"]},
                    {"title": "Letterboxd", "url": "https://letterboxd.com", "description": "Red social para cinéfilos. Registra, califica y descubre películas.", "tags": ["cine", "peliculas", "social"]}
                ],
                "💬 Redes Sociales": [
                    {"title": "Twitter / X", "url": "https://twitter.com", "description": "Red social de noticias y tendencias", "tags": []},
                    {"title": "Facebook", "url": "https://www.facebook.com", "description": "Red social para compartir con amigos", "tags": []},
                    {"title": "Instagram", "url": "https://www.instagram.com", "description": "Fotos, videos y contenido de creadores", "tags": []},
                    {"title": "WhatsApp Web", "url": "https://web.whatsapp.com", "description": "Usa WhatsApp directamente desde tu computadora.", "tags": ["chat", "mensajeria", "social"]},
                    {"title": "LinkedIn", "url": "https://www.linkedin.com", "description": "Red social profesional para networking, perfiles de trabajo y noticias del sector.", "tags": ["profesional", "trabajo", "networking"]},
                    {"title": "Discord", "url": "https://discord.com/app", "description": "Plataforma de chat por voz, video y texto para comunidades.", "tags": ["chat", "comunidad", "gaming"]}
                ],
                "👨‍💻 Tecnología / Trabajo": [
                    {"title": "GitHub", "url": "https://github.com", "description": "Repositorio y colaboración de proyectos de código", "tags": []},
                    {"title": "Gmail", "url": "https://mail.google.com/mail/u/0/#inbox", "description": "Correo electrónico de Google", "tags": []},
                    {"title": "Google Calendar", "url": "https://calendar.google.com", "description": "Calendario y eventos online", "tags": []},
                    {"title": "Notion", "url": "https://www.notion.so", "description": "Espacio de trabajo todo-en-uno para notas, tareas, wikis y bases de datos.", "tags": ["productividad", "notas", "wiki"]},
                    {"title": "Google Drive", "url": "https://drive.google.com", "description": "Almacenamiento en la nube, documentos, hojas de cálculo y presentaciones de Google.", "tags": ["nube", "docs", "google", "oficina"]},
                    {"title": "Trello", "url": "https://trello.com", "description": "Herramienta visual de gestión de proyectos estilo Kanban (tableros y tarjetas).", "tags": ["productividad", "kanban", "proyectos"]}
                ],
                "🤖 Inteligencia Artificial": [
                    {"title": "ChatGPT", "url": "https://chat.openai.com", "description": "Chat de IA de OpenAI", "tags": []},
                    {"title": "Perplexity", "url": "https://www.perplexity.ai/?login-source=oneTapHome&login-new=false", "description": "Buscador con IA", "tags": []},
                    {"title": "Gemini", "url": "https://gemini.google.com", "description": "Gemini", "tags": []},
                    {"title": "Claude", "url": "https://claude.ai", "description": "Modelo de IA conversacional de Anthropic, gran competidor de ChatGPT.", "tags": ["ia", "chatbot", "anthropic"]},
                    {"title": "Poe", "url": "https://poe.com", "description": "Plataforma para chatear con múltiples bots de IA (ChatGPT, Claude, etc.) en un solo lugar.", "tags": ["ia", "chatbot", "agregador"]},
                    {"title": "Midjourney", "url": "https://www.midjourney.com", "description": "El generador de imágenes por IA más potente (se usa a través de Discord).", "tags": ["ia", "imagenes", "generador"]}
                ],
                "🧠 Programación": [
                    {"title": "Hugging Face", "url": "https://huggingface.co", "description": "Modelos de IA, datasets y herramientas colaborativas", "tags": []},
                    {"title": "Kaggle", "url": "https://www.kaggle.com", "description": "Competencias de IA, análisis de datos y notebooks", "tags": []},
                    {"title": "freeCodeCamp", "url": "https://www.freecodecamp.org", "description": "Cursos gratuitos interactivos de HTML, CSS, JS y más", "tags": []},
                    {"title": "W3Schools", "url": "https://www.w3schools.com", "description": "Tutoriales fáciles de HTML, CSS, JavaScript y más", "tags": []},
                    {"title": "MDN Web Docs", "url": "https://developer.mozilla.org/es/", "description": "Documentación oficial y ejemplos de HTML, CSS y JS", "tags": []},
                    {"title": "JavaScript Info", "url": "https://javascript.info", "description": "Guía completa y clara para aprender JavaScript", "tags": []},
                    {"title": "Codecademy", "url": "https://www.codecademy.com", "description": "Cursos prácticos de programación interactivos", "tags": []},
                    {"title": "SoloLearn", "url": "https://www.sololearn.com", "description": "Aprendé programación desde el celu o la compu con lecciones cortas", "tags": []},
                    {"title": "GeeksForGeeks", "url": "https://www.geeksforgeeks.org", "description": "Ejemplos, ejercicios y teoría de programación", "tags": []},
                    {"title": "Stack Overflow", "url": "https://www.stackoverflow.com", "description": "Preguntá y buscá soluciones a problemas de código", "tags": []},
                    {"title": "Figma", "url": "https://www.figma.com", "description": "Herramienta de diseño de interfaces (UI/UX) colaborativa basada en la web.", "tags": ["diseño", "ui", "ux", "frontend"]},
                    {"title": "CodePen", "url": "https://codepen.io", "description": "Patio de juegos online para probar y mostrar snippets de HTML, CSS y JavaScript.", "tags": ["frontend", "css", "js", "html", "demo"]},
                    {"title": "Replit", "url": "https://replit.com", "description": "IDE completo en la nube para programar, compilar y alojar proyectos en cualquier lenguaje.", "tags": ["ide", "nube", "programacion", "backend"]}
                ],
                "Descargas para Mac": [
                    {"title": "MacTorrents", "url": "https://www.torrentmac.net/", "description": "MacTorrents", "tags": []}
                ]
            };
            const DEFAULT_ORDER = [
                "🔎 Búsqueda y Noticias", "🎬 Entretenimiento", "💬 Redes Sociales", "👨‍💻 Tecnología / Trabajo", "🤖 Inteligencia Artificial", "🧠 Programación", "Descargas para Mac"
            ];
            // -----------------------------------------------

            // --- Elementos del DOM ---
            const elements = {
                categoriesContainer: document.getElementById('categories-container'),
                categoryModal: document.getElementById('category-modal'),
                linkModal: document.getElementById('link-modal'),
                modalCloseBtns: document.querySelectorAll('.modal-close-btn'),
                categoryForm: document.getElementById('category-form'),
                categoryModalTitle: document.getElementById('category-modal-title'),
                linkForm: document.getElementById('link-form'),
                linkModalTitle: document.getElementById('link-modal-title'),
                categoryNameInput: document.getElementById('category-name'),
                linkTitleInput: document.getElementById('link-title'),
                linkUrlInput: document.getElementById('link-url'),
                linkCategorySelect: document.getElementById('link-category'),
                linkDescriptionInput: document.getElementById('link-description'),
                linkTagsInput: document.getElementById('link-tags'),
                addCategoryBtn: document.getElementById('add-category-btn'),
                addLinkBtn: document.getElementById('add-link-btn'),
                categoryError: document.getElementById('category-error'),
                linkError: document.getElementById('link-error'),
                undoToast: document.getElementById('undo-toast'),
                undoBtn: document.getElementById('undo-btn'),
                searchInput: document.getElementById('search-input'),
                importBtn: document.getElementById('import-btn'),
                exportBtn: document.getElementById('export-btn'),
                importFileInput: document.getElementById('import-file'),
                themeToggleBtn: document.getElementById('theme-toggle-btn'),
                themeIcon: document.getElementById('theme-toggle-btn').querySelector('ion-icon'),
                backToTopBtn: document.getElementById('back-to-top-btn')
            };

            // --- Estado de la Aplicación ---
            let bookmarksData = {};
            let categoryOrder = [];
            let undoState = null; 
            let undoTimeout = null; 
            let editState = null; 

            // --- Funciones de Datos (migrate, load, save) ---
            function migrateData() {
                let needsSave = false;
                categoryOrder.forEach(category => {
                    if (bookmarksData[category]) {
                        bookmarksData[category].forEach(link => {
                            if (link.description === undefined) { link.description = ""; needsSave = true; }
                            if (link.tags === undefined) { link.tags = []; needsSave = true; }
                        });
                    } else {
                        categoryOrder = categoryOrder.filter(c => c !== category);
                        needsSave = true;
                    }
                });
                for (const categoryName in bookmarksData) {
                    if (!categoryOrder.includes(categoryName)) {
                        categoryOrder.push(categoryName);
                        needsSave = true;
                    }
                }
                if (needsSave) { saveData(); }
            }

            function loadData() {
                const savedData = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
                const savedOrder = localStorage.getItem(STORAGE_KEY_ORDER);
                bookmarksData = savedData ? JSON.parse(savedData) : DEFAULT_BOOKMARKS;
                categoryOrder = savedOrder ? JSON.parse(savedOrder) : DEFAULT_ORDER;
                if (!savedData && !savedOrder) {
                    saveData(); 
                }
                migrateData();
            }
            
            function saveData() {
                localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarksData));
                localStorage.setItem(STORAGE_KEY_ORDER, JSON.stringify(categoryOrder));
            }
            
            function getDomain(url) {
                try {
                    const parsedUrl = new URL(url);
                    return parsedUrl.hostname.replace('www.', '');
                } catch (e) { return 'enlace.com'; }
            }
            
            function updateArrowStates(container) {
                if (!container) return;

                const leftArrow = container.parentElement.querySelector('.scroll-left');
                const rightArrow = container.parentElement.querySelector('.scroll-right');

                if (!leftArrow || !rightArrow) return;

                const scrollWidth = container.scrollWidth;
                const clientWidth = container.clientWidth;

                // Ocultar flechas si no hay scroll (no hay nada que mover)
                if (scrollWidth <= clientWidth) {
                    leftArrow.style.display = 'none';
                    rightArrow.style.display = 'none';
                } else {
                    leftArrow.style.display = 'flex';
                    rightArrow.style.display = 'flex';
                }

                // Ya no deshabilitamos las flechas, para permitir el "loop"
                leftArrow.disabled = false;
                rightArrow.disabled = false;
            }

// ... (Aquí termina tu función updateArrowStates)

            /**
             * Utilidad: Espera a que el usuario deje de hacer algo (como scroll)
             * para ejecutar una función.
             */
            function debounce(func, wait) {
                let timeout;
                return function(...args) {
                    const context = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), wait);
                };
            }

            /**
             * Encuentra la tarjeta más cercana al centro del carrusel y la destaca.
             */
            function highlightCenterCard(container) {
                if (!container) return;

                // 1. Encontrar el "objetivo" central del viewport del carrusel
                // (Ej: 0 (scroll) + (800 / 2) (ancho) = 400)
                const containerCenterTarget = container.scrollLeft + (container.clientWidth / 2);

                const cards = container.querySelectorAll('.link-card');
                let minDistance = Infinity;
                let centerCard = null;

                cards.forEach(card => {
                    // 2. Encontrar el centro "real" de la tarjeta (relativo al scroll)
                    // card.offsetLeft = distancia desde el borde izq del contenedor (0px, 272px, 544px...)
                    // card.clientWidth = ancho de la tarjeta (256px)
                    const cardRealCenter = card.offsetLeft + (card.clientWidth / 2);

                    // 3. Calcular la distancia entre el centro de la tarjeta y el centro del viewport
                    const distance = Math.abs(containerCenterTarget - cardRealCenter);

                    // 4. Quedarse con la más cercana
                    if (distance < minDistance) {
                        minDistance = distance;
                        centerCard = card;
                    }

                    // 5. Limpiar todas
                    card.classList.remove('is-centered');
                });

                // 6. Aplicar la clase solo a la ganadora
                if (centerCard) {
                    centerCard.classList.add('is-centered');
                }
            }

            // --- NUEVA FUNCIÓN RENDER (MINIMALISTA) ---
            function renderPage() {
                elements.categoriesContainer.innerHTML = ''; 
                hideUndoToast();

                if (categoryOrder.length === 0) {
                    elements.categoriesContainer.innerHTML = `
                        <div class="text-center text-gray-500 dark:text-gray-400 py-20">
                            <ion-icon name="rocket-outline" class="text-6xl text-accent-500"></ion-icon>
                            <h2 class="text-2xl font-semibold mt-4">Plataforma de lanzamiento vacía</h2>
                            <p class="mt-2">Añade una categoría o importa tu copia de seguridad.</p>
                        </div>
                    `;
                    return;
                }

                categoryOrder.forEach(categoryName => {
                    if (!bookmarksData[categoryName]) return; 

                    const links = bookmarksData[categoryName];
                    const categoryEl = document.createElement('section');
                    categoryEl.className = 'category-section relative';
                    
                    // 1. HTML DE LA CATEGORÍA (Casi igual, pero cambiamos 'ul' por 'div')
                    categoryEl.innerHTML = `
                        <div class="category-header group flex justify-between items-center mb-3">
                            <div class="flex items-center gap-2">
                                <div class="category-drag-handle cursor-move text-gray-400 dark:text-gray-600 p-1" title="Mover categoría">
                                    <ion-icon name="reorder-two-outline" class="text-2xl"></ion-icon>
                                </div>
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${categoryName} 
                                    <span class="text-xl font-medium text-gray-500 dark:text-gray-400">(${links.length})</span>
                                </h2>
                            </div>
                            <div class="category-actions flex items-center gap-2 text-gray-500">
                                <button class="edit-category-btn hover:text-accent-500 p-1" data-category="${categoryName}" title="Renombrar categoría">
                                    <ion-icon name="pencil-outline" class="text-lg"></ion-icon>
                                </button>
                                <button class="delete-category-btn hover:text-red-500 p-1" data-category="${categoryName}" title="Eliminar categoría">
                                    <ion-icon name="trash-outline" class="text-lg"></ion-icon>
                                </button>
                            </div>
                        </div>
                        <div class="horizontal-scroll-container">
                            <div class="links-row">
                                </div>
                        </div>
                        <button class="scroll-arrow scroll-left" title="Anterior">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button class="scroll-arrow scroll-right" title="Siguiente">
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
                    `;

                    const linksRow = categoryEl.querySelector('.links-row');

                    if (links.length > 0) {
                        links.forEach((link, index) => {
                            const domain = getDomain(link.url);
                            const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`; // Pedimos un favicon más grande
                            
                            const tagsHTML = (link.tags || []).map(tag => 
                                `<span class="link-tag-span text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">${tag}</span>`
                            ).join('');

                            const faviconHTML = `
                                <div class="w-8 h-8 flex-shrink-0">
                                    <img src="${faviconUrl}" alt="" class="w-8 h-8 rounded-md" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500" style="display: none;">
                                        <ion-icon name="globe-outline" class="text-lg"></ion-icon>
                                    </div>
                                </div>
                            `;
                            
                            // 3. HTML DE LA TARJETA (¡Esta es la parte nueva!)
                            const linkEl = document.createElement('div');
                            linkEl.className = "link-card w-64 h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm group transition-all duration-200 hover:shadow-md hover:border-accent-500/50";
                            
                            linkEl.innerHTML = `
                                <a href="${link.url}" target="_blank" class="block p-4" title="${link.description || link.title}">
                                    <div class="flex items-center gap-3 mb-2">
                                        ${faviconHTML}
                                        <span class="link-title font-medium text-gray-900 dark:text-gray-100 truncate">${link.title}</span>
                                    </div>
                                    <p class="link-url text-sm text-gray-500 dark:text-gray-400 truncate">${link.url.replace('https://', '').replace('www.', '')}</p>
                                </a>
                                
                                <div class="border-t border-gray-200 dark:border-gray-700 p-3 mt-auto bg-gray-50/50 dark:bg-gray-800/50">
                                    <div class="flex justify-between items-center">
                                        <div class="flex-1 flex flex-wrap gap-1.5 overflow-hidden h-5">${tagsHTML}</div>
                                        
                                        <div class="link-actions flex gap-1 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button class="edit-link-btn hover:text-accent-500 p-1" data-category="${categoryName}" data-index="${index}" title="Editar enlace">
                                                <ion-icon name="pencil-outline" class="text-lg"></ion-icon>
                                            </button>
                                            <button class="delete-link-btn hover:text-red-500 p-1" data-category="${categoryName}" data-index="${index}" title="Eliminar enlace">
                                                <ion-icon name="close-outline" class="text-lg"></ion-icon>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `;
                            linksRow.appendChild(linkEl);
                        });
                    } else {
                        // Mensaje si no hay enlaces
                        const emptyEl = document.createElement('div');
                        emptyEl.innerHTML = `<p class="p-4 text-gray-500 dark:text-gray-400 italic text-sm">No hay enlaces en esta categoría.</p>`;
                        linksRow.appendChild(emptyEl);
                    }

                    elements.categoriesContainer.appendChild(categoryEl);

                    // Forzar estilos inline para asegurar que el scroll horizontal funcione
                    const scrollContainerEl = categoryEl.querySelector('.horizontal-scroll-container');
                    const linksRowEl = categoryEl.querySelector('.links-row');
                    if (linksRowEl) {
                        linksRowEl.style.display = 'flex';
                        linksRowEl.style.gap = '16px';
                        linksRowEl.style.alignItems = 'flex-start';
                    }
                    if (scrollContainerEl) {
                        scrollContainerEl.style.overflowX = 'auto';
                        scrollContainerEl.style.whiteSpace = 'nowrap';
                        scrollContainerEl.style.webkitOverflowScrolling = 'touch';
                        scrollContainerEl.style.scrollBehavior = 'smooth';
                        scrollContainerEl.style.padding = '8px 4px';
                    }

                    // Asegurar que las flechas sean botones (no submit) para evitar submit accidental
                    categoryEl.querySelectorAll('.scroll-arrow').forEach(b => { try { b.type = 'button'; } catch(e){} });

                    // Añadir listeners directos a las flechas del carrusel para evitar problemas de delegación
                    (function attachArrowHandlers(sectionEl){
                        const leftBtn = sectionEl.querySelector('.scroll-left');
                        const rightBtn = sectionEl.querySelector('.scroll-right');
                        const scrollContainer = sectionEl.querySelector('.horizontal-scroll-container');
                        if(!leftBtn || !rightBtn || !scrollContainer) return;

                        const gap = 16; // mismo gap que usas en el cálculo
                        const computeScrollAmount = () => {
                            const firstCard = scrollContainer.querySelector('.link-card');
                            if(firstCard && firstCard.clientWidth > 0) return firstCard.clientWidth + gap;
                            // fallback: mover una fracción del ancho visible
                            return Math.round(scrollContainer.clientWidth * 0.6);
                        };

                        leftBtn.addEventListener('click', (ev) => {
                            ev.preventDefault();
                            scrollContainer.scrollBy({ left: -computeScrollAmount(), behavior: 'smooth' });
                            // actualizar flechas
                            setTimeout(() => updateArrowStates(scrollContainer), 220);
                        });

                        rightBtn.addEventListener('click', (ev) => {
                            ev.preventDefault();
                            scrollContainer.scrollBy({ left: computeScrollAmount(), behavior: 'smooth' });
                            // actualizar flechas
                            setTimeout(() => updateArrowStates(scrollContainer), 220);
                        });

                        // Actualizar estado de flechas al cargar
                        setTimeout(() => updateArrowStates(scrollContainer), 60);
                    })(categoryEl);
 
                     // 4. ¡IMPORTANTE! Eliminamos el SortableJS para los enlaces
                     // new Sortable(linksList, { ... }); <--- ESTA LÍNEA SE BORRA

                 }); // Fin del forEach de categorías

                // SortableJS para CATEGORÍAS (Este se mantiene)
                new Sortable(elements.categoriesContainer, {
                    animation: 150,
                    ghostClass: 'sortable-ghost',
                    draggable: '.category-section', 
                    handle: '.category-drag-handle',
                    onEnd: (evt) => {
                        const [movedItem] = categoryOrder.splice(evt.oldIndex, 1);
                        categoryOrder.splice(evt.newIndex, 0, movedItem);
                        saveData(); 
                    }
                });

                updateCategorySelect();
            }
                // ...
            // Añadido: Configurar cada carrusel
            
            // --- Resto de funciones (sin cambios) ---
            function updateCategorySelect(){elements.linkCategorySelect.innerHTML='';let e=elements.linkCategorySelect.value;categoryOrder.forEach(t=>{const n=document.createElement("option");n.value=t,n.textContent=t,elements.linkCategorySelect.appendChild(n)}),categoryOrder.includes(e)&&(elements.linkCategorySelect.value=e)}
            function showModal(e){hideErrorMessages(),e.classList.add("flex")}
            function hideModal(e){e.classList.remove("flex"),elements.categoryForm.reset(),elements.linkForm.reset(),editState=null,elements.categoryModalTitle.textContent="Crear Nueva Categoría",elements.linkModalTitle.textContent="Añadir Nuevo Enlace"}
            function hideErrorMessages(){elements.categoryError.classList.add("hidden"),elements.linkError.classList.add("hidden")}
            function showUndoToast(e,t,n){clearTimeout(undoTimeout),undoState={category:e,index:t,linkData:n},elements.undoToast.classList.add("show"),undoTimeout=setTimeout(hideUndoToast,5e3)}
            function hideUndoToast(){elements.undoToast.classList.remove("show"),undoState=null,clearTimeout(undoTimeout)}
            function handleUndoClick(){if(!undoState)return;const{category:e,index:t,linkData:n}=undoState;bookmarksData[e].splice(t,0,n),saveData(),renderPage(),hideUndoToast()}
            function showEditCategoryModal(e){editState={type:"category",oldName:e},elements.categoryNameInput.value=e,elements.categoryModalTitle.textContent="Renombrar Categoría",showModal(elements.categoryModal)}
            function showEditLinkModal(e,t){editState={type:"link",category:e,index:t};const n=bookmarksData[e][t];elements.linkTitleInput.value=n.title,elements.linkUrlInput.value=n.url,elements.linkDescriptionInput.value=n.description||"",elements.linkTagsInput.value=(n.tags||[]).join(", "),updateCategorySelect(),elements.linkCategorySelect.value=e,elements.linkModalTitle.textContent="Editar Enlace",showModal(elements.linkModal)}
            function handleSearch(){const e=elements.searchInput.value.toLowerCase();document.querySelectorAll(".category-section").forEach(t=>{let n=!1;const o=t.querySelectorAll(".link-item");o.length>0?o.forEach(t=>{const o=(t.querySelector(".link-title")?.textContent||"").toLowerCase(),a=(t.title||"").toLowerCase(),i=Array.from(t.querySelectorAll(".link-tag-span")).map(e=>e.textContent.toLowerCase()).join(" "),c=`${o} ${a} ${i}`;c.includes(e)?(t.classList.remove("hidden"),n=!0):t.classList.add("hidden")}):n=!1,n||""===e||t.querySelector("h2").textContent.toLowerCase().includes(e)?t.classList.remove("hidden"):t.classList.add("hidden")})}
            function exportData(){const e={bookmarks:bookmarksData,order:categoryOrder},t=JSON.stringify(e,null,2),n=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(n),a=document.createElement("a");a.href=o,a.download="favoritos_backup.json",a.click(),URL.revokeObjectURL(o)}
            function importData(e){const t=e.target.files[0];if(!t)return;const n=new FileReader;n.onload=e=>{let t="replace";try{const n=JSON.parse(e.target.result);if(!n.bookmarks||!n.order)throw new Error("El archivo no tiene el formato correcto.");confirm('¿Quieres COMBINAR los enlaces del archivo con los actuales? \n\n(Presiona "Cancelar" para REEMPLAZAR todo).')?(t="merge",Object.keys(n.bookmarks).forEach(e=>{bookmarksData.hasOwnProperty(e)?n.bookmarks[e].forEach(t=>{bookmarksData[e].some(e=>e.url===t.url)||bookmarksData[e].push(t)}):(bookmarksData[e]=n.bookmarks[e],categoryOrder.includes(e)||categoryOrder.push(e))})):(t="replace",bookmarksData=n.bookmarks,categoryOrder=n.order),migrateData(),saveData(),renderPage(),"merge"===t?alert("¡Enlaces combinados con éxito!"):alert("¡Importación (reemplazo) exitosa!")}catch(e){alert("Error: "+e.message)}elements.importFileInput.value=""},n.readAsText(t)}
            function applyTheme(e){"light"===e?(document.documentElement.classList.remove("dark"),elements.themeIcon.setAttribute("name","moon-outline")):(document.documentElement.classList.add("dark"),elements.themeIcon.setAttribute("name","sunny-outline")),localStorage.setItem(STORAGE_KEY_THEME,e)}
            function toggleTheme(){const e=document.documentElement.classList.contains("dark")?"dark":"light";applyTheme("dark"===e?"light":"dark")}
            function handleScroll(){window.scrollY>300?(elements.backToTopBtn.classList.remove("hidden"),elements.backToTopBtn.classList.add("flex")):(elements.backToTopBtn.classList.add("hidden"),elements.backToTopBtn.classList.remove("flex"))}

            // --- Manejadores de Eventos ---
            elements.addCategoryBtn.addEventListener('click', () => {
                editState = null; 
                elements.categoryModalTitle.textContent = 'Crear Nueva Categoría';
                showModal(elements.categoryModal);
            });
            elements.addLinkBtn.addEventListener('click', () => {
                if (categoryOrder.length === 0) {
                    showModal(elements.categoryModal);
                    elements.categoryError.textContent = 'Debes crear una categoría primero.';
                    elements.categoryError.classList.remove("hidden");
                    return;
                }
                editState = null; 
                elements.linkModalTitle.textContent = 'Añadir Nuevo Enlace';
                updateCategorySelect();
                showModal(elements.linkModal);
            });
            elements.modalCloseBtns.forEach(btn => {
                btn.addEventListener('click', (e) => hideModal(e.target.closest('.modal')));
            });
            elements.categoryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newName = elements.categoryNameInput.value.trim();
                if (!newName) return;
                if (editState && editState.type === 'category') {
                    const oldName = editState.oldName;
                    if (newName === oldName) { hideModal(elements.categoryModal); return; }
                    if (bookmarksData.hasOwnProperty(newName)) {
                        elements.categoryError.textContent = 'Esa categoría ya existe.';
                        elements.categoryError.classList.remove("hidden");
                        return;
                    }
                    bookmarksData[newName] = bookmarksData[oldName];
                    delete bookmarksData[oldName];
                    const index = categoryOrder.indexOf(oldName);
                    if (index > -1) { categoryOrder[index] = newName; }
                } else {
                    if (bookmarksData.hasOwnProperty(newName)) {
                        elements.categoryError.textContent = 'Esa categoría ya existe.';
                        elements.categoryError.classList.remove("hidden");
                        return;
                    }
                    bookmarksData[newName] = []; 
                    categoryOrder.push(newName); 
                }
                saveData();
                renderPage();
                hideModal(elements.categoryModal);
            });
            elements.linkForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = elements.linkTitleInput.value.trim();
                const url = elements.linkUrlInput.value.trim();
                const category = elements.linkCategorySelect.value;
                const description = elements.linkDescriptionInput.value.trim();
                const tags = elements.linkTagsInput.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag !== ''); 
                if (!title || !url || !category) {
                    elements.linkError.textContent = 'Por favor completa todos los campos.';
                    elements.linkError.classList.remove("hidden");
                    return;
                }
                const finalUrl = (url.startsWith('http://') || url.startsWith('https://')) ? url : `https://${url}`;
                const newLink = { title, url: finalUrl, description, tags };
                if (editState && editState.type === 'link') {
                    const oldCategory = editState.category;
                    const oldIndex = editState.index;
                    if (oldCategory === category) {
                        bookmarksData[oldCategory][oldIndex] = newLink;
                    } else {
                        bookmarksData[oldCategory].splice(oldIndex, 1); 
                        bookmarksData[category].push(newLink); 
                    }
                } else {
                    bookmarksData[category].push(newLink);
                }
                saveData();
                renderPage();
                hideModal(elements.linkModal);
            });
            elements.undoBtn.addEventListener('click', handleUndoClick);
            elements.searchInput.addEventListener('input', handleSearch);
            elements.exportBtn.addEventListener('click', exportData);
            elements.importBtn.addEventListener('click', () => elements.importFileInput.click());
            elements.importFileInput.addEventListener('change', importData);
            elements.themeToggleBtn.addEventListener('click', toggleTheme);
            window.addEventListener('scroll', handleScroll);
            elements.backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            elements.categoriesContainer.addEventListener('click', (e) => {
                const linkAnchor = e.target.closest('a');
                const dragHandle = e.target.closest('.link-drag-handle, .category-drag-handle');
                const button = e.target.closest('button');

                if (linkAnchor && !button && !dragHandle) {
                    return; // Permite que el enlace funcione
                }
                
                if (button || dragHandle) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                const scrollBtn = e.target.closest('.scroll-arrow');
                if (scrollBtn) {
                    e.preventDefault(); 
                    const container = scrollBtn.parentElement.querySelector('.horizontal-scroll-container');
                    const firstCard = container.querySelector('.link-card');
                    
                    if (!firstCard) return;

                    // Calculamos el scroll exacto: Ancho de 1 tarjeta + 1 gap = 272px
                    const scrollAmount = firstCard.clientWidth + 16; 

                    if (scrollBtn.classList.contains('scroll-right')) {
                        // Simplemente nos movemos
                        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    } else { // Es 'scroll-left'
                        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    }
                    
                    // El 'scroll' listener que acabamos de crear
                    // se encargará del "teletransporte" y del destacado.
                    
                    return;
                }

/* --- FIN DEL BLOQUE DE FLECHAS --- */          
                const editLinkBtn = e.target.closest('.edit-link-btn');
                if (editLinkBtn) {
                    showEditLinkModal(editLinkBtn.dataset.category, parseInt(editLinkBtn.dataset.index, 10));
                    return;
                }
                const deleteLinkBtn = e.target.closest('.delete-link-btn');
                if (deleteLinkBtn) {
                    const category = deleteLinkBtn.dataset.category;
                    const index = parseInt(deleteLinkBtn.dataset.index, 10);
                    const deletedLink = bookmarksData[category].splice(index, 1)[0];
                    saveData();
                    renderPage(); 
                    showUndoToast(category, index, deletedLink);
                    return; 
                }
                const editCategoryBtn = e.target.closest('.edit-category-btn');
                if (editCategoryBtn) {
                    showEditCategoryModal(editCategoryBtn.dataset.category);
                    return;
                }
                const deleteCategoryBtn = e.target.closest('.delete-category-btn');
                if (deleteCategoryBtn) {
                    const category = deleteCategoryBtn.dataset.category;
                    if (confirm(`¿Seguro que quieres eliminar la categoría "${category}" y todos sus enlaces?`)) {
                        delete bookmarksData[category]; 
                        categoryOrder = categoryOrder.filter(c => c !== category); 
                        saveData();
                        renderPage(); 
                    }
                }
            });

            // --- INICIALIZACIÓN ---
            const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light'; 
            applyTheme(savedTheme);
            
            loadData(); 
            renderPage(); // 1. Dibuja el HTML (sin clones)

            // 2. ESPERA 100ms y LUEGO configura los carruseles
            setTimeout(() => {
                document.querySelectorAll('.horizontal-scroll-container').forEach(container => {
                    const linksRow = container.querySelector('.links-row');
                    const allCards = Array.from(linksRow.querySelectorAll('.link-card'));
                    
                    if (allCards.length === 0) return; 
                    
                    // cardWidth será ~272px (256 + 16)
                    const cardWidth = allCards[0].clientWidth + 16; 
                    
                    // Si el navegador no calculó el ancho, no hacer nada (evita bug)
                    if (cardWidth === 16) return; 

                    const cardsToClone = 3; 
                    
                    if (allCards.length > cardsToClone) {
                        
                        // 1. Clonar las últimas N...
                        for (let i = allCards.length - cardsToClone; i < allCards.length; i++) {
                            const clone = allCards[i].cloneNode(true);
                            linksRow.prepend(clone);
                        }
                        
                        // 2. Clonar las primeras N...
                        for (let i = 0; i < cardsToClone; i++) {
                            const clone = allCards[i].cloneNode(true);
                            linksRow.append(clone);
                        }

                        // 3. Posicionar el scroll al inicio de las "reales"
                        const initialScrollLeft = Math.round(cardWidth * cardsToClone);
                        container.scrollLeft = initialScrollLeft;

                        // 4. Guardar posiciones para el "teletransporte"
                        const realCardsCount = allCards.length;
                        const scrollStart = initialScrollLeft;
                        const scrollEnd = scrollStart + (realCardsCount * cardWidth);

                        // 5. Crear el listener de scroll con protección contra loops
                        const debouncedHighlight = debounce(highlightCenterCard, 100);

                        let isAdjusting = false; // bandera que evita bucle al reasignar scrollLeft
                        let lastScrollLeft = container.scrollLeft; // guardamos la última posición para detectar dirección

                        container.addEventListener('scroll', () => {
                            if (isAdjusting) {
                                // Sincronizar última posición y salir
                                lastScrollLeft = container.scrollLeft;
                                return; // ignorar eventos generados por el ajuste
                            }

                            const currentScroll = container.scrollLeft;
                            const delta = currentScroll - lastScrollLeft;
                            const direction = delta > 0 ? 'right' : (delta < 0 ? 'left' : null);

                            debouncedHighlight(container); // Destacamos

                            // total de ancho real (sin clones)
                            const totalRealWidth = realCardsCount * cardWidth;
                            const relative = currentScroll - scrollStart; // posición relativa dentro del espacio virtual

                            // Si estamos fuera de la zona "real" (es decir en clones al principio o al final), recalcular una posición dentro de la zona real
                            if (relative < 0 || relative >= totalRealWidth) {
                                // normalizamos la posición dentro del rango [0, totalRealWidth)
                                const normalized = ((relative % totalRealWidth) + totalRealWidth) % totalRealWidth;
                                const indexFloat = normalized / cardWidth;

                                // Elegimos el índice según la dirección del scroll para evitar saltos opuestos
                                let nearestIndex;
                                if (direction === 'right') {
                                    nearestIndex = Math.ceil(indexFloat);
                                } else if (direction === 'left') {
                                    nearestIndex = Math.floor(indexFloat);
                                } else {
                                    nearestIndex = Math.round(indexFloat);
                                }

                                const clampedIndex = Math.min(Math.max(nearestIndex, 0), realCardsCount - 1);
                                const newPos = scrollStart + (clampedIndex * cardWidth);

                                // si la diferencia es mínima, no hacemos nada
                                if (Math.abs(newPos - currentScroll) < 1) { lastScrollLeft = currentScroll; return; }

                                isAdjusting = true;
                                // aplicar el salto en el siguiente frame y esperar un poco más para estabilizar
                                requestAnimationFrame(() => {
                                    container.scrollLeft = newPos;
                                    setTimeout(() => { isAdjusting = false; debouncedHighlight(container); lastScrollLeft = container.scrollLeft; }, 120);
                                });
                            } else {
                                // dentro del rango real: actualizar última posición
                                lastScrollLeft = currentScroll;
                            }
                        }, { passive: true });

                        // Destacar al cargar
                        setTimeout(() => highlightCenterCard(container), 50);

                    } else {
                        // No hay suficientes tarjetas para el loop, solo centrar la primera
                        setTimeout(() => highlightCenterCard(container), 50);
                    }
                });
            }, 100); // 100 milisegundos de espera

            // Listener global delegado por si las flechas no se registraron correctamente
            document.addEventListener('click', function(e){
                const btn = e.target.closest('.scroll-arrow');
                if(!btn) return;
                e.preventDefault();
                const section = btn.closest('.category-section');
                if(!section) return;
                const scrollContainer = section.querySelector('.horizontal-scroll-container');
                if(!scrollContainer) return;

                const gap = 16;
                const firstCard = scrollContainer.querySelector('.link-card');
                const scrollAmount = (firstCard && firstCard.clientWidth > 0) ? firstCard.clientWidth + gap : Math.round(scrollContainer.clientWidth * 0.6);

                if (btn.classList.contains('scroll-right')) {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }

                setTimeout(() => updateArrowStates(scrollContainer), 220);
            });

            // Inyectar estilos para destacar la tarjeta centrada
            (function injectCenterCardStyles(){
                const css = `
                /* Transiciones y apariencia por defecto */
                .link-card {
                    transition: transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms cubic-bezier(.2,.8,.2,1), border-color 220ms;
                    will-change: transform;
                    transform-origin: center center;
                }

                /* Estado destacado: escala, sombra y ligero borde */
                .link-card.is-centered {
                    transform: scale(1.12);
                    z-index: 50;
                    box-shadow: 0 18px 40px rgba(16,24,40,0.18), 0 6px 18px rgba(16,24,40,0.08);
                    border-color: rgba(59,130,246,0.35); /* azul suave como acento */
                }

                /* Opcional: evitar que el escalado colapse el layout en navegadores con subpixel issues */
                .horizontal-scroll-container { overflow-anchor: none; }
                `;
                const styleEl = document.createElement('style');
                styleEl.setAttribute('data-generated', 'center-card-styles');
                styleEl.appendChild(document.createTextNode(css));
                document.head.appendChild(styleEl);
            })();

        });