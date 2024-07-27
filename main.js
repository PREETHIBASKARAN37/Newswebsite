// main.js

const regionSelect = document.getElementById('region');
const categorySelect = document.getElementById('category');
const newsContainer = document.getElementById('news-container');
const loadingIndicator = document.getElementById('loading');
const errorIndicator = document.getElementById('error');

async function fetchNews(region = 'us', category = '') {
    loadingIndicator.classList.remove('hidden');
    errorIndicator.classList.add('hidden');
    newsContainer.innerHTML = '';

    const url = `http://localhost:3000/news?region=${region}&category=${category}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.articles) {
            throw new Error('Unexpected response format');
        }
        displayNews(data.articles);
    } catch (error) {
        console.error('Fetch Error:', error);
        errorIndicator.textContent = `Error: ${error.message}`;
        errorIndicator.classList.remove('hidden');
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

function displayNews(articles) {
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${article.urlToImage || 'default-image.jpg'}" alt="Image" class="news-card-image">
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(card);
    });
}

function handleSelectChange() {
    const region = regionSelect.value;
    const category = categorySelect.value;
    fetchNews(region, category);
}

regionSelect.addEventListener('change', handleSelectChange);
categorySelect.addEventListener('change', handleSelectChange);

// Initial fetch
fetchNews();
