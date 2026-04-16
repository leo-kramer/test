let template

// Load template
async function loadTemplate() {
	const res = await fetch("test/templates/landing.hbs")
	const source = await res.text()
	template = Handlebars.compile(source)
}

// Initialize i18next
async function initI18n() {
	await i18next.init({
		lng: "en",
		fallbackLng: "en",
		debug: false,
	})

	await loadLanguage("en")
}

async function loadLanguage(lang) {
	const res = await fetch(`test/locales/${lang}.json`)
	const translations = await res.json()

	i18next.addResourceBundle(lang, "translation", translations, true, true)
	i18next.changeLanguage(lang)

	render()
}

// Language switch
function changeLanguage(lang) {
	loadLanguage(lang)
}

// Render function
function render() {
	const html = template({
		t: (key) => i18next.t(key),
	})

	document.getElementById("app").innerHTML = html
}

// Init app
;(async function () {
	await loadTemplate()
	await initI18n()
})()
