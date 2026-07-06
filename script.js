// ===== ДАННЫЕ АНИМЕ (только для каталога) =====
const animeList = [
    {
        id: 'Koori-no-Jouheki',
        title: 'Ледяная стена',
        year: 2026,
        poster: 'posters/V5x5K4dAaiE.jpg',
        link: 'animes/Koori-no-Jouheki.html'
    },
    {
        id: 'bleach',
        title: 'Блич',
        year: 2004,
        poster: 'posters/bleach.jpg',
        link: 'animes/bleach.html'
    },
    {
        id: 'jujutsu-kaisen',
        title: 'Магическая битва',
        year: 2020,
        poster: 'posters/jujutsu-kaisen.jpg',
        link: 'animes/jujutsu-kaisen.html'
    }
];

// ===== ОТРИСОВКА КАТАЛОГА =====
function renderCatalog(filteredList) {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    const list = filteredList || animeList;

    if (list.length === 0) {
        catalog.innerHTML = `
            <div class="no-results">
                <span class="icon">🔍</span>
                <div class="title">Ничего не найдено</div>
                <div class="subtitle">Попробуй изменить запрос</div>
            </div>
        `;
        return;
    }

    catalog.innerHTML = list.map(anime => `
        <a href="${anime.link}" class="card">
            <img src="${anime.poster}" alt="${anime.title}" class="card-poster" 
                 onerror="this.src='https://placehold.co/300x450/1a1a3a/7c4dff?text=No+Poster'">
            <div class="card-info">
                <div class="card-title">${anime.title}</div>
                <div class="card-year">${anime.year}</div>
            </div>
        </a>
    `).join('');
}

// ===== ПОИСК =====
function searchAnime(query) {
    if (!query || query.trim() === '') {
        renderCatalog(animeList);
        updateSearchInfo(animeList.length, '');
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results = animeList.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm)
    );

    renderCatalog(results);
    updateSearchInfo(results.length, searchTerm);
    return results;
}

function updateSearchInfo(count, searchTerm) {
    const info = document.getElementById('searchInfo');
    if (!info) return;

    if (!searchTerm || searchTerm === '') {
        info.innerHTML = `<span class="highlight">${animeList.length}</span> аниме в каталоге`;
        return;
    }

    if (count === 0) {
        info.innerHTML = `По запросу <span class="highlight">«${searchTerm}»</span> ничего не найдено 😔`;
    } else {
        info.innerHTML = `Найдено <span class="highlight">${count}</span> аниме по запросу <span class="highlight">«${searchTerm}»</span>`;
    }
}

// ===== ОБРАБОТЧИКИ ПОИСКА =====
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearSearchBtn');

    // Показываем все аниме при загрузке
    renderCatalog(animeList);
    updateSearchInfo(animeList.length, '');

    // Функция поиска
    function performSearch() {
        const query = searchInput.value;
        searchAnime(query);
        
        // Показываем/скрываем кнопку очистки
        if (query.trim() !== '') {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }
    }

    // Поиск по кнопке
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Поиск при вводе (с задержкой)
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });

        // Поиск по Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                performSearch();
            }
        });
    }

    // Очистка поиска
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            renderCatalog(animeList);
            updateSearchInfo(animeList.length, '');
            searchInput.focus();
        });
    }

    console.log('⚡ AniVolume загружен!');
    console.log('📚 В каталоге: ' + animeList.length + ' аниме');
    console.log('🔍 Поиск активен!');
});
