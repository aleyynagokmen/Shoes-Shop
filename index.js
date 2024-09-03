document.addEventListener("DOMContentLoaded", function () {
    const defaultLink = document.querySelector('a[data-title="Yeni Gelenler"]');
    if (defaultLink) {
        updateInfo(defaultLink);
        handleActiveLink(defaultLink);
        loadPageContent(defaultLink.getAttribute('href'));
    }

    document.querySelectorAll(".link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            updateInfo(this);
            handleActiveLink(this);
            loadPageContent(this.getAttribute('href'));
        });
    });
});

function updateInfo(linkElement) {
    const title = linkElement.getAttribute("data-title");
    const content = linkElement.getAttribute("data-content");

    document.querySelector('.getInfo').textContent = title.toUpperCase();
    document.querySelector('.infoContent').innerHTML = `<i>${content}</i>`;
}

function handleActiveLink(linkElement) {
    document.querySelectorAll('#nav .link.active').forEach(activeLink => {
        activeLink.classList.remove('active');
    });
    linkElement.classList.add('active');
}

function loadPageContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const productsContent = doc.querySelector('#products');
            if (productsContent) {
                document.querySelector('#products').innerHTML = productsContent.innerHTML;
            }
        })
        .catch(error => console.error('Error loading content:', error));
}

function toggleDropdown(contentId) {
    document.querySelectorAll('.filter-content').forEach(content => {
        if (content.id === contentId) {
            content.classList.toggle('show');
        } else {
            content.classList.remove('show');
        }
    });
}


