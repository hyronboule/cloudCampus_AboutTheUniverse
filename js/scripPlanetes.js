onInit();

async function onInit() {
    let i = await nombrePlanete("https://swapi.dev/api/planets/");
    i = i / 10; //stock dans la var i puis divise par 10 => nbr page
    let x = 0;
    // boucle pour récupérer liste de 10 planetes dans chaque page
    while (x < i) {
        x++
        const planete = await getData("https://swapi.dev/api/planets/?page=" + x)
        planeteListe(planete);
    }
}

// function récupére nombre de page
async function nombrePlanete(url) {
    const reponse = await fetch(url);
    const donnee = await reponse.json();
    return donnee.count;
}

// function qui récupére liste planetes dans la page
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

// funtion qui récupére infos précises de chaque planete
function planeteListe(planete) {
    for (const property in planete) {
        const nom = planete[property].name;
        const terrain = planete[property].terrain;
        creationLiNom(nom, terrain);
    }
}


// crea des li
function creationLiNom(nom, terrain) {
    let liNom = document.createElement("li");
    let liTerrain = document.createElement("li");
    let listeNom = document.querySelector("#nom");
    let listTerrain = document.querySelector("#terrain");
    liNom.textContent = nom;
    liTerrain.textContent = terrain;
    listeNom.appendChild(liNom);
    listTerrain.appendChild(liTerrain);

    insertionInfoPlanete(liNom)
}



// met event au li créé et envoie valeur pour afficher
function insertionInfoPlanete(namePlanete) {
    namePlanete.addEventListener("click", () => {
        affichageContenuPlanete()

        let planeteNomcontenu = namePlanete.textContent;
        document.querySelector("#nomPlaneteSelect").textContent = planeteNomcontenu;

        fetch('https://swapi.dev/api/planets/?search=' + planeteNomcontenu)
            .then(response => response.json())
            .then(data => {
                document.querySelector("#climat").textContent = data.results[0].climate;
                document.querySelector("#population").textContent = data.results[0].population;
                document.querySelector("#diametre").textContent = data.results[0].diameter;
            });
    });
}

// affichage contenu info planéte 
function affichageContenuPlanete() {
    let content = document.getElementById("contenuInfoPlanete");
    content.style.display = "block";
    document.getElementById("noteAffichage").style.display = "none";
}
