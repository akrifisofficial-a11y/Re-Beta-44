// ===== ДАННЫЕ АНИМЕ =====
const animeList = [
    {
        id: 'naruto',
        title: 'Наруто',
        year: 2002,
        poster: 'posters/naruto.jpg',
        link: 'animes/naruto.html'
    },
    // 👇 ДОБАВЛЯЙ НОВЫЕ АНИМЕ СЮДА
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
function renderCatalog() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    catalog.innerHTML = animeList.map(anime => `
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

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', renderCatalog);
