const navSections = document.querySelector('.nav-sections')
// NAV OPACITY
navSections.addEventListener('mouseenter', () => {
    navSections.style.opacity = "1"
})

navSections.addEventListener('mouseleave', () => {
    navSections.style.opacity = "0.4"
})


const sections = document.querySelectorAll("main section")
const links = document.querySelectorAll(".nav-sections a")


const bar = document.querySelector(".selection-bar")

function moveBar(link) {

    bar.style.width = link.offsetWidth + "px"
    bar.style.transform = `translateX(${link.offsetLeft}px)`
    links.forEach(l => l.classList.remove("active"))
    link.classList.add("active")

}



const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const id = entry.target.id

            const activeLink = document.querySelector(`.nav-sections a[href="#${id}"]`)

            if (activeLink) {
                moveBar(activeLink)
            }

        }

    })

}, {
    threshold: 0.75
})


// observar todas as sections
sections.forEach(section => observer.observe(section))


document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchers = document.querySelectorAll('input[name="themeSelection"]');
    const body = document.body;

    const setTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    };

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
        const currentRadio = document.getElementById(currentTheme + 'Mode');
        if(currentRadio) {
            currentRadio.checked = true;
        }
    } else {
        // Default to dark mode if no theme is set
        const darkRadio = document.getElementById('darkMode');
        if(darkRadio) {
            darkRadio.checked = true;
        }
    }

    themeSwitchers.forEach(switcher => {
        switcher.addEventListener('change', function() {
            setTheme(this.id.replace('Mode', ''));
        });
    });
});
