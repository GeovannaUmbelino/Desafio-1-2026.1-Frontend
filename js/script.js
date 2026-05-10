// ALTERNAR TEMA (DARK/LIGHT)
const htmlRoot = document.documentElement;
const themeBtn = document.getElementById('theme-toggle') || document.querySelector('[data-theme-toggle]');
let icon = null;

if (themeBtn) {
    icon = themeBtn.querySelector('.icon') || themeBtn.querySelector('img') || null;
}

const updateThemeAriaLabel = (theme) => {
    if (themeBtn) {
        const label = theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro';
        themeBtn.setAttribute('aria-label', label);
    }
};

let saved = localStorage.getItem('theme');
if (!saved) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    saved = prefersDark ? 'dark' : 'light';
}

htmlRoot.setAttribute('data-theme', saved);
updateThemeAriaLabel(saved); 

if (icon) {
    icon.src = saved === 'light' ? './assets/modo-escuro.png' : './assets/modo-claro.png';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const current = htmlRoot.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        
        htmlRoot.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeAriaLabel(next); 
        
        if (icon) {
            icon.src = next === 'light' ? './assets/modo-escuro.png' : './assets/modo-claro.png';
        }
    });
} else {
    console.warn('Theme toggle not found: add an element with id="theme-toggle" or data-theme-toggle');
}

const tags = document.querySelectorAll('.skill-tag');
const allSkillItems = document.querySelectorAll('.skill-item');

tags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        const targetId = tag.getAttribute('data-target');
        const contribution = tag.getAttribute('data-contribution');
        const targetSkillItem = document.getElementById(targetId);
        
        if (targetSkillItem) {
            allSkillItems.forEach(item => {
                item.classList.remove('highlight');
                const circle = item.querySelector('.skill-circle');
                if (circle) {
                    circle.style.setProperty('--contrib', '0%');
                }
            });

            targetSkillItem.classList.add('highlight');
            const circle = targetSkillItem.querySelector('.skill-circle');
            const calloutValue = targetSkillItem.querySelector('.contrib-value');
            
            circle.style.setProperty('--contrib', contribution);
            if (calloutValue) {
                calloutValue.innerText = `+${contribution}`;
            }

            targetSkillItem.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        
            targetSkillItem.focus();
        }
    });
});

//função  para "limpar" a tela
const limparDestaques = () => {
    allSkillItems.forEach(item => {
        item.classList.remove('highlight');
        const circle = item.querySelector('.skill-circle');
        if (circle) {
            circle.style.setProperty('--contrib', '0%');
        }
    });
};

document.addEventListener('click', (e) => {
    const clicouNaTag = e.target.closest('.skill-tag');
    const clicouNoGrafico = e.target.closest('.skill-item');
    
    if (!clicouNaTag && !clicouNoGrafico) {
        limparDestaques();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        limparDestaques();
    }
});