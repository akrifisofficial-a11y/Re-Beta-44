// ===== ДАННЫЕ АНИМЕ =====
const animeList = [
     {
        id: 'Koori-no-Jouheki',
        title: 'Ледяная стена',
        year: 2026,
        poster: 'posters/V5x5K4dAaiE.jpg',
        link: 'animes/Koori-no-Jouheki.html'
    },
    
];

// ===== ОТРИСОВКА КАТАЛОГА =====
function renderCatalog() {
    const catalog = document.getElementById('catalog');
    
    // Проверяем, существует ли элемент
    if (!catalog) {
        console.error('❌ Элемент #catalog не найден!');
        return;
    }

    // Проверяем, есть ли данные
    if (!animeList || animeList.length === 0) {
        catalog.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #55557a; grid-column: 1 / -1;">
                <span style="font-size: 48px; display: block; margin-bottom: 16px;">🎬</span>
                <div style="font-size: 22px; font-weight: 700; color: #8888bb;">Пока нет аниме</div>
                <div style="font-size: 16px; margin-top: 4px;">Скоро добавятся новые сериалы</div>
            </div>
        `;
        return;
    }

    // Рендерим карточки
    try {
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
    } catch (error) {
        console.error('❌ Ошибка при рендере каталога:', error);
        catalog.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #f44336; grid-column: 1 / -1;">
                <span style="font-size: 48px; display: block; margin-bottom: 16px;">⚠️</span>
                <div style="font-size: 22px; font-weight: 700;">Ошибка загрузки</div>
                <div style="font-size: 16px; margin-top: 4px;">Попробуйте обновить страницу</div>
            </div>
        `;
    }
}

// ===== ЗАПУСК ПОСЛЕ ПОЛНОЙ ЗАГРУЗКИ СТРАНИЦЫ =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('⚡ DOM загружен, начинаем рендеринг...');
        renderCatalog();
        console.log('📚 В каталоге: ' + animeList.length + ' аниме');
    });
} else {
    // Если DOM уже загружен
    console.log('⚡ DOM уже загружен, начинаем рендеринг...');
    renderCatalog();
    console.log('📚 В каталоге: ' + animeList.length + ' аниме');
}

// ===== ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА ДЛЯ БЕЗОПАСНОСТИ =====
window.addEventListener('load', () => {
    const catalog = document.getElementById('catalog');
    if (catalog && catalog.innerHTML === '') {
        console.warn('⚠️ Каталог пуст, пробуем перерендерить...');
        renderCatalog();
    }
});
