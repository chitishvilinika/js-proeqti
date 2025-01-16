const translations = {};

document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("languageSelector");

    languageSelector.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;

        loadLanguage(selectedLanguage);
    });
});

async function loadLanguage(lang) {
    const response = await fetch(`languages/${lang}.json`);
    translations[lang] = await response.json();

    updateContent(translations[lang]);
}

function updateContent(translation) {
    document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");

        element.textContent = translation[key] || key;
    });
}