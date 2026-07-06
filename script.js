// ===== ДАННЫЕ АНИМЕ =====
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
function renderCatalog() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    if (animeList.length === 0) {
        catalog.innerHTML = `
            <div style="text-align: center; padding: 50px; color: #55557a;">
                😔 Пока нет аниме в каталоге
            </div>
        `;
        return;
    }

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

console.log('⚡ AniVolume загружен!');
console.log('📚 В каталоге: ' + animeList.length + ' аниме');
