

function genererListeDatesMois(annee, mois) {
    const listeDates = [];
    const dateDebut = new Date(annee, mois - 1, 1);
    const dateFin = new Date(annee, mois, 0, 23, 59);
  
    let currentDate = dateDebut;
    while (currentDate <= dateFin) {
      listeDates.push(currentDate);
  
      // Ajoute une minute à la date actuelle
      currentDate = new Date(currentDate.getTime() + 60000);
    }
  
    return listeDates;
  }
  
  // Exemple d'utilisation : génération de la liste pour juin 2023
  const annee = 2023;
  const mois = 6;
  const listeDatesJuin2023 = genererListeDatesMois(annee, mois);


  
  function generateFloatBetween(min, max) {
    // Calculer le nombre de décimales autorisées
    const decimalPlaces = Math.max(
        getDecimalPlaces(min),
        getDecimalPlaces(max),
        1 // Au moins une décimale autorisée
    );

    // Générer un nombre aléatoire entre les valeurs spécifiées
    const randomFloat = Math.random() * (max - min) + min;

    // Formater le nombre avec le nombre de décimales autorisées
    const formattedFloat = randomFloat.toFixed(decimalPlaces);

    // Convertir en nombre à virgule flottante et retourner
    return parseFloat(formattedFloat);
    }

    // Fonction pour déterminer le nombre de décimales d'un nombre
    function getDecimalPlaces(number) {
        const decimalPart = String(number).split('.')[1];
        return decimalPart ? decimalPart.length : 0;
    }

const genererData = () => {

    for(let i = 0; i < listeDatesJuin2023.length; i++) {

        let objetGenere = {

            stationId: 'ESIEE-1',
            dataDate: listeDatesJuin2023[i],
            datas: {
                humidity: generateFloatBetween(0, 100),
                temperature: generateFloatBetween(0, 45),
                pressure: generateFloatBetween(800, 1400),
                luminosity: generateFloatBetween(0, 100)
            }
        }

        console.log(JSON.stringify(objetGenere))
    }

}

genererData()

  