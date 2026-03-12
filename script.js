// ئەو بەشەی تۆ لەسەری بیت active بکات
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// سێرچکردنی زۆر بەهێز بۆ هەموو بەشەکان (وانەکان + پرسیارەکان + گومانەکان)
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (query.length < 2) {
        resultsContainer.classList.remove('show');
        resultsContainer.innerHTML = '';
        return;
    }

    // هەموو ناوەڕۆکەکان لە پەڕەکەدا بە کۆکردنەوە
    const allItems = Array.from(document.querySelectorAll('.item')).map(item => {
        const title = item.querySelector('summary')?.textContent || '';
        const content = item.querySelector('.content')?.textContent || '';
        return {title, content, element: item};
    });

    const filtered = allItems
        .filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        )
        .slice(0, 10);

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '< Scoops<div class="search-result-item" style="text-align:center;color:#94a3b8;padding:25px;font-size:1rem;">هیچ ئەنجامێک نەدۆزرایەوە 😔</div>';
        resultsContainer.classList.add('show');
        return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
        <div class="search-result-item" onclick="this.closest('.item')?.previousElementSibling?.click() || this.closest('.item')?.querySelector('summary')?.click()">
            <h4 style="color:#60a5fa;margin:0 0 8px 0;font-size:1.1rem;">${item.title.substring(0, 60)}${item.title.length > 60 ? '...' : ''}</h4>
            <p style="margin:0;color:#94a3b8;font-size:0.92rem;line-height:1.5;">${item.content.substring(0, 100)}...</p>
        </div>
    `).join('');

    resultsContainer.classList.add('show');
});

// کلیک لە دەرەوەی سێرچ بشارێتەوە
document.addEventListener('click', e => {
    if (!e.target.closest('.search-box')) {
        document.getElementById('searchResults')?.classList.remove('show');
    }
});