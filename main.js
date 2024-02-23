// Sélection des éléments du DOM
const pierre = document.getElementById("pierre");
const ciseaux = document.getElementById("ciseaux");
const feuille = document.getElementById("feuille");
const box = document.querySelectorAll(".item");
const resultManche = document.querySelector(".resultManche");
const resultChoix = document.querySelector(".choix");
const score = document.querySelector(".score");
const scoreJoueur = document.getElementById("scoreJoueur");
const scoreYasuo = document.getElementById("scoreYasuo");
const arbitre = document.querySelector(".arbitre");
const fin = document.querySelector(".result");
const rejouer = document.getElementById("arbitre");

// Fonction exécutée lors du choix d'une manche
const jouerManche = (e) => {
  let choix = e.target;

  // Désactivation des images après le choix
  box.forEach((img) => {
    img.classList.add("desactive");
    img.removeEventListener("click", jouerManche);
  });

  // Activation de l'image choisie
  choix.classList.remove("desactive");
  choix.classList.add("active");

  // Récupération du choix du joueur
  let choixJoueur = choix.id;

  // Choix aléatoire du robot
  let choixYasuo = faireChoixYasuo();

  // Détermination du gagnant
  quiGagne(choixJoueur, choixYasuo);

  // Affichage du score
  score.style.display = "block";

  setTimeout(() => {
    resetChoix();

    // Vérification de la fin de partie
    const Joueur = parseInt(document.getElementById("scoreJoueur").textContent);
    const Yasuo = parseInt(document.getElementById("scoreYasuo").textContent);

    if (Joueur === 5 || Yasuo === 5) {
      box.forEach((img) => {
        img.removeEventListener("click", jouerManche);
        choix.classList.add("active");
      });

      arbitre.style.display = "block";

      if (Joueur === 5) {
        fin.textContent = "Vous avez gagné !!";
        fin.style.color = "green";
      } else {
        fin.textContent = "Vous avez Perdu !!";
        fin.style.color = "red";
      }
    }
  }, 500);
};

// Fonction pour réinitialiser les choix
const resetChoix = () => {
  box.forEach((img) => {
    img.classList.remove("desactive");
    img.classList.remove("active");
  });
  box.forEach((img) => img.addEventListener("click", jouerManche));
};

// Fonction pour faire le choix du robot
const faireChoixYasuo = () => {
  let nbAlea = Math.floor(Math.random() * 3);

  switch (nbAlea) {
    case 0:
      return "pierre";
    case 1:
      return "feuille";
    default:
      return "ciseaux";
  }
};

// Fonction pour déterminer le gagnant
const quiGagne = (a, b) => {
  if (a === b) {
    return egalité(a, b);
  }
  if (a === "pierre") {
    if (b === "feuille") {
      return defaite(a, b);
    }
    if (b === "ciseaux") {
      return victoire(a, b);
    }
  }
  if (a === "feuille") {
    if (b === "pierre") {
      return victoire(a, b);
    }
    if (b === "ciseaux") {
      return defaite(a, b);
    }
  }
  if (a === "ciseaux") {
    if (b === "pierre") {
      return defaite(a, b);
    }
    if (b === "feuille") {
      return victoire(a, b);
    }
  }
};

// Fonction en cas d'égalité
const egalité = (a, b) => {
  resultManche.innerHTML = `
  <p> <span>Match nul</span> pour cette manche </p>
  `;
  resultManche.style.color = "gray";
  resultChoix.innerHTML = `
    <p>Vous avez choisi <span>${a}</span> et le robot a choisi <span>${b}</span></p>
    `;
};

// Fonction en cas de victoire
const victoire = (a, b) => {
  resultManche.innerHTML = `
  <p>Vous avez <span>Gagné</span> cette manche </p>
  `;
  resultManche.style.color = "green";
  resultChoix.innerHTML = `
    <p>Vous avez choisi <span>${a}</span> et le robot a choisi <span>${b}</span></p>
    `;
  scoreJoueur.textContent++;
};

// Fonction en cas de défaite
const defaite = (a, b) => {
  resultManche.innerHTML = `
  <p>Vous avez <span>Perdu</span> cette manche </p>
  `;
  resultManche.style.color = "red";
  resultChoix.innerHTML = `
    <p>Vous avez choisi <span>${a}</span> et le robot a choisi <span>${b}</span></p>
    `;
  scoreYasuo.textContent++;
};



// Ajout des écouteurs d'événements pour chaque choix du joueur
box.forEach((img) => img.addEventListener("click", jouerManche));



rejouer.addEventListener("click", () => {
  // Reset des choix des joueurs
  resetChoix();

  // Reset du score
  scoreJoueur.textContent = "0";
  scoreYasuo.textContent = "0";

  // Reset des éléments d'affichage
  resultManche.textContent = "";
  resultChoix.textContent = "";
  fin.textContent = "";
  fin.style.color = "";

  // Reset de l'arbitre
  arbitre.style.display = "none";

  // Activation de l'écouteur événements pour chaque choix du joueur
  box.forEach((img) => img.addEventListener("click", jouerManche));
});


