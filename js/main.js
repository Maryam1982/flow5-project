const heroSection = document.querySelector(".hero-section");
const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) document.body.classList.add("sticky");
    else document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
  }
);

observer.observe(heroSection);

const locations = document.querySelectorAll(".map-container i");

locations.forEach((loc) => {
  loc.addEventListener("click", (event) => {
    const currentActiveLoc = document.querySelector(".map-container i.active");
    currentActiveLoc.classList.remove("active");
    event.target.classList.add("active");
    const textContainer = document.querySelector(
      ".loc-desc-text-container ul li"
    );
    const relatedImage = document.querySelector(".loc-desc-container img");
    const imgURL = `../img/Home_Page/sec-10/${event.target.getAttribute(
      "id"
    )}_img.png`;
    relatedImage.src = imgURL;
    textContainer.innerHTML = event.target.getAttribute("name");
  });
});

const slideInfos = [
  {
    nav: "ind-1",
    color: "rgb(239, 218, 21)",
    img: "../img/Home_Page/sec-9/c1-cropped.png",
    title: "Mes clients suivent nos actions en direct",
    body: `Une fois un flow créé par une demande client, un lien unique
  est généré.
  Mon client suit l’état d’avancement de sa demande (ex :
  commande
  préparée, support technique prévu, brainstorming en
  cours...). L’état
  d’avancement de mon travail est automatiquement transmi à
  mon client.`,
  },
  {
    nav: "ind-2",
    color: "rgb(3, 175, 240)",
    img: "../img/Home_Page/sec-9/c2.png",
    title: "Mes clients sont mieux servis et plus vite",
    body: `Depuis mon smartphone ou mon ordinateur je sais ce que je
    dois faire.
    Tous les documents nécessaires sont regroupés, je gagne du
    temps.
    Par exemple, j'ai accès aux besoins du client recu via le
    formulaire et le
    devis envoye par la secrétaire.
    Dès que mon intervention est finie, la facture est prête à
    être expédiée.`,
  },
  {
    nav: "ind-3",
    color: "rgb(242, 47, 118)",
    img: "../img/Home_Page/sec-9/c3.png",
    title: "Je communique facilement avec mes prestataires",
    body: `Je centralise tous les messages (email, courrier, SMS, PDF,
      formulaires...).
      Chaque message lance automatiquement le bon service.
      Tout mon eco-system est facilement connecté. Je peux me
      concentrer sur
      mon cœur de métier.`,
  },
  {
    nav: "ind-4",
    color: "rgb(141, 38, 165)",
    img: "../img/Home_Page/sec-9/c4.png",
    title: "Je connais KPI de mon entreprise en temps réel",
    body: `Le temps de réponse, le nombre d'interventions, le nombre de
    leads
    entrants, la localisation des ventes ... Tous les KPI sont
    représentés et mis à jour en direct`,
  },
];

let currentIndex = 0;
let automaticNav = true;
let timeoutID = undefined;
const allNavs = document.querySelectorAll(".carousel-indicators li");

allNavs.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    if (typeof timeoutID === "number") clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      automaticNav = true;
    }, 6000);

    resetNavs();
    const currentNav = document.querySelector(`#${event.target.id}`);
    currentNav.classList.add("active-index");
    switch (event.target.id) {
      case "ind-1":
        currentIndex = 0;
        changeSlide(currentIndex);
        automaticNav = false;

        break;
      case "ind-2":
        currentIndex = 1;
        changeSlide(currentIndex);
        automaticNav = false;
        break;
      case "ind-3":
        currentIndex = 2;
        changeSlide(currentIndex);
        automaticNav = false;
        break;
      case "ind-4":
        currentIndex = 3;
        changeSlide(currentIndex);
        automaticNav = false;
        break;
      default:
        break;
    }
  });
});

function resetNavs() {
  const allNavs = document.querySelectorAll(".carousel-indicators li");
  allNavs.forEach((nav) => {
    if (nav.classList.contains("active-index")) {
      nav.classList.remove("active-index");
      nav.classList.add("inactive-index");
    }
  });
}

function replaceContent(slideContent) {
  if (automaticNav) {
    setTimeout(() => {
      resetNavs();
      const currentNav = document.querySelector(`#${slideContent.nav}`);
      currentNav.classList.add("active-index");
    }, 1500);
  }

  const img = document.querySelector(".carousel-item .carousel-img");
  img.src = slideContent.img;
  const titleText = document.createTextNode(slideContent.title);
  const bodyText = document.createTextNode(slideContent.body);
  const titleElement = document.querySelector(
    ".carousel-item .carousel-item-title"
  );

  const bodyElement = document.querySelector(".carousel-item .body-text");
  bodyElement.removeChild(bodyElement.childNodes[0]);
  titleElement.removeChild(titleElement.childNodes[0]);

  bodyElement.appendChild(bodyText);
  titleElement.appendChild(titleText);
  titleElement.style.color = slideContent.color;
}

function changeSlide(i) {
  const slideContainer = document.querySelector(".carousel-item");

  slideContainer.classList.add("hideSlider");

  setTimeout(() => {
    replaceContent(slideInfos[i]);
  }, 1000);
  setTimeout(() => {
    slideContainer.classList.remove("hideSlider");
  }, 2500);
}

// setInterval(() => {
//   if (automaticNav) {
//     currentIndex = currentIndex + 1 >= slideInfos.length ? 0 : currentIndex + 1;
//     changeSlide(currentIndex);
//   }
// }, 6000);
