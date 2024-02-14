// Sélection des éléments du DOM
const color1 = document.getElementById('firstColor');
const color2 = document.getElementById('secondColor');
const dataColor1 = document.getElementById('firstColorValue');
const dataColor2 = document.getElementById('secondColorValue');
const control = document.getElementById('control');
const dataControl = document.querySelector('.numDeg');
const backgroundBody = document.body;
const btnAlea = document.getElementById('alea');
const btnCopie = document.getElementById('copie');
const popUp = document.querySelector('.popUp');

// Fonction pour mettre à jour le dégradé
const upDatelinear = () => {
    const color1Value = color1.value;
    const color2Value = color2.value;
    const controlValue = control.value + 'deg';
    
    const linear = `linear-gradient(${controlValue},${color1Value},${color2Value})`;

    backgroundBody.style.background = linear;
};

// Initialisation du dégradé au chargement de la page
upDatelinear();

// Écouteurs d'événements pour les changements de couleurs et d'orientation
color1.addEventListener('input', upDatelinear);
color2.addEventListener('input', upDatelinear);
control.addEventListener('input', upDatelinear);

// Fonction pour mettre à jour la valeur de couleur affichée
function updateColorValue(input, span) {
    const hexColor = input.value.toUpperCase();
    span.textContent = hexColor;

    // Change la couleur du texte pour un meilleur contraste
    span.style.color = getTextColor(hexColor);
}

// Écouteurs d'événements pour les changements de couleurs
color1.addEventListener('input', () => {
    updateColorValue(color1, dataColor1);
});
color2.addEventListener('input', () => {
    updateColorValue(color2, dataColor2);
});

// Écouteur d'événement pour le changement d'orientation
control.addEventListener('input', (e) => {
    dataControl.textContent = e.target.value;
});

// Fonction pour générer une couleur aléatoire
const randomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

// Fonction pour appliquer des couleurs aléatoires au dégradé
const random = () => {
    btnAlea.addEventListener('click', () => {
        const newColor1 = '#' + randomColor();
        const newColor2 = '#' + randomColor();
        const controlValue = control.value + 'deg';

        color1.value = newColor1;
        color2.value = newColor2;

        updateColorValue(color1, dataColor1);
        updateColorValue(color2, dataColor2);

        const linear = `linear-gradient(${controlValue},${newColor1},${newColor2})`;

        backgroundBody.style.background = linear;
    });
};

// Appel de la fonction random pour appliquer des couleurs aléatoires
random();

// Écouteur d'événement pour la copie du dégradé
btnCopie.addEventListener('click', () => {  
    navigator.clipboard.writeText(backgroundBody.style.background);
    
    // Affichage de la popup de confirmation
    popUp.style.opacity = '1';

    // Masquage de la popup après un délai
    setTimeout(() => { 
        popUp.style.opacity = '0';
    }, 1000);
});

// Fonction pour obtenir la couleur du texte en fonction de la luminosité du fond
const getTextColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'black' : 'white';
};
