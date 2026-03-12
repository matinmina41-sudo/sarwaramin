// ئەو بەشەی تۆ لەسەری بیت active بکات
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// سێرچکردنی زۆر بەهێز + کلیککردن ڕاستەوخۆ دەچێتە ناو پرسیارەکە
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if (query.length < 2) {
        resultsContainer.classList.remove('show');
        resultsContainer.innerHTML = '';
        return;
    }

    const allItems = Array.from(document.querySelectorAll('.item')).map(item => {
        const summary = item.querySelector('summary');
        const title = summary?.textContent || '';
        const content = item.querySelector('.content')?.textContent || '';
        return {title, content, summary, item};
    });

    const filtered = allItems.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item" style="text-align:center;color:#94a3b8;padding:30px;">هیچ ئەنجامێک نەدۆزرایەوە 😔</div>';
        resultsContainer.classList.add('show');
        return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
        <div class="search-result-item" onclick="openThisItem('${item.item.id || item.summary.textContent.substring(0,30)}')">
            <h4 style="color:#60a5fa;margin:0 0 8px 0;">${item.title.substring(0,70)}${item.title.length > 70 ? '...' : ''}</h4>
            <p style="margin:0;color:#94a3b8;">${item.content.substring(0,90)}...</p>
        </div>
    `).join('');

    resultsContainer.classList.add('show');
});

// فەنکشنی کردنەوەی پرسیارەکە بە کلیک لەسەر ئەنجام
function openThisItem(identifier) {
    const allItems = document.querySelectorAll('.item');
    for (let item of allItems) {
        const summary = item.querySelector('summary');
        const titleText = summary?.textContent || '';
        if (titleText.includes(identifier) || item.id === identifier) {
            item.scrollIntoView({behavior: "smooth", block: "center"});
            if (!item.hasAttribute('open')) {
                item.setAttribute('open', '');
            }
            document.getElementById('searchResults').classList.remove('show');
            document.getElementById('searchInput').value = '';
            break;
        }
    }
}

// کلیک لە دەرەوەی سێرچ بشارێتەوە
document.addEventListener('click', e => {
    if (!e.target.closest('.search-box')) {
        document.getElementById('searchResults')?.classList.remove('show');
    }
});
