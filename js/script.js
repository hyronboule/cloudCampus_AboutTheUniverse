//récupérer donnée & envoyé
async function onInit() {
    const people = await getData("https://swapi.dev/api/people/");
    const vehicule = await getData("https://swapi.dev/api/vehicles/")
    const planete = await getData("https://swapi.dev/api/planets/")
    affichageNombre(people,"nombrePersonne");
    affichageNombre(vehicule,"nombreVehicule");
    affichageNombre(planete,"nombrePlanete");

}
// fonction de récupération des données
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.count;
}
// fonction affichage dans P des donnée
function affichageNombre(data, classe){
    let element = document.getElementById(classe);
    element.textContent = data;
}


onInit();
