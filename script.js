// ===== ДАННЫЕ АНИМЕ =====
const animeList = [
    {
        id: 'naruto',
        title: 'Наруто',
        year: 2002,
        poster: 'posters/IMG_20260707_003347_040.jpg',
        link: 'animes/naruto.html'
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

    catalog.innerHTML = animeList.map(anime => `
        <a href="${anime.link}" class="card">
            <img src="${anime.poster}?v=${Date.now()}" alt="${anime.title}" class="card-poster" 
                 onerror="this.src='https://placehold.co/300x450/1a1a3a/7c4dff?text=No+Poster'">
            <div class="card-info">
                <div class="card-title">${anime.title}</div>
                <div class="card-year">${anime.year}</div>
            </div>
        </a>
    `).join('');
}

// ===== АВТООБНОВЛЕНИЕ (без перезагрузки) =====
let lastUpdate = Date.now();

async function checkForUpdates() {
    try {
        // Проверяем, изменился ли файл script.js
        const response = await fetch('script.js?t=' + Date.now(), {
            method: 'HEAD',
            cache: 'no-cache'
        });
        
        const lastModified = new Date(response.headers.get('Last-Modified')).getTime();
        
        if (lastModified > lastUpdate) {
            console.log('🔄 Обнаружены изменения! Обновляем...');
            lastUpdate = lastModified;
            
            // Показываем уведомление
            showUpdateNotification();
            
            // Перезагружаем страницу через 1 секунду
            setTimeout(() => {
                location.reload(true);
            }, 1000);
        }
    } catch (error) {
        console.log('❌ Не удалось проверить обновления');
    }
}

// ===== КРАСИВОЕ УВЕДОМЛЕНИЕ ОБ ОБНОВЛЕНИИ =====
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #6a3de8, #4a1db8);
        color: white;
        padding: 16px 24px;
        border-radius: 16px;
        font-weight: 700;
        box-shadow: 0 0 50px rgba(106, 61, 232, 0.5);
        z-index: 9999;
        animation: slideIn 0.5s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        border: 1px solid rgba(255,255,255,0.2);
    `;
    notification.innerHTML = `
        <span style="font-size: 24px;">🔄</span>
        <span>Обновление контента...</span>
        <span style="margin-left: 8px; font-size: 12px; opacity: 0.7;">1с</span>
    `;
    document.body.appendChild(notification);
    
    // Добавляем анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    
    // Проверка обновлений каждые 30 секунд
    setInterval(checkForUpdates, 30000);
    
    // Проверяем при видимости страницы
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            checkForUpdates();
        }
    });
});

// ===== СОХРАНЯЕМ ВРЕМЯ ПОСЛЕДНЕГО ОБНОВЛЕНИЯ =====
window.addEventListener('load', () => {
    lastUpdate = Date.now();
});
