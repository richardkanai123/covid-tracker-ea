const Statistics = document.querySelector('.Statistics');
const capitalCity = document.querySelector('#CCity')
const TCases = document.querySelector('#TCases')
const RCases = document.querySelector('#RCases')
const TDeaths = document.querySelector('#TDeaths')
const Population = document.querySelector('#Population')
const Life = document.querySelector('#Life')
const UpdateTime = document.querySelector('#UpdateTime')


let map;

function initMap() {

  const locations = [
    {
      position: new google.maps.LatLng(1.3733, 32.2903),
      Title :  'Uganda',
      icon: "./ug.png",
      content: "ata mimi sijui"
      
    },
  
    {
      position: new google.maps.LatLng(-6.3690, 34.8888),
      Title :  'Tanzania',
      icon: "./tz.png",
      content: "ata mimi sijui"
      
    },
  
    {
      position: new google.maps.LatLng(-1.9403, 29.8739),
      Title :  'Rwanda',
      icon: "./rw.png",
      content: "ata mimi sijui"
      
    },
  
    {
      position: new google.maps.LatLng(-3.3731, 29.9189),
      Title :  'Burundi',
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      content: "ata mimi sijui"
      
    },
  
    {
      position: new google.maps.LatLng(9.1450, 40.4897),
      Title :  'Ethiopia',
      icon: "./et.png",
      content: "ata mimi sijui"
      
    },
  
    {
      position: new google.maps.LatLng(6.8770, 31.3070),
      Title :  'South Sudan',
      icon: "./sd.png",
      content: "ata mimi sijui"
    },
  
    {
      position: new google.maps.LatLng(12.8628, 30.2176),
      Title :  'Sudan',
      icon: "./sd.png",
      content: "ata mimi sijui"
    },
  
    {
      position: new google.maps.LatLng(3.1521, 45.1996),
      Title :  'Somalia',
      icon: "./sm.png",
      content: "Somali"
    },  
    {
      position: new google.maps.LatLng(-0.0236, 37.9062),
      Title :  'Kenya',
      icon: "./ke.png",
      content: "ata mimi sijui"
    }
  ];
  
  
  const Eaposition = { lat: 1.9577, lng: 37.2972}
  map = new google.maps.Map(document.getElementById("map"), {
    center: Eaposition ,
    zoom: 5,
  });



    // Create markers.
  for (let i = 0; i < locations.length; i++) {
      const marker = new google.maps.Marker({
        position: locations[i].position,
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 7,
          fillColor: "red",
          fillOpacity: 0.7,
        },
        animation: google.maps.Animation.DROP,
        draggable: false,
        title: locations[i].Title,
        map: map,
        optimized: true,
    });

        
    // Click marker to open infoWindow
      marker.addListener("click", (e) => {

          // for each location
        for(let j = 0; j < locations.length; j++){

          // title of clicked marker = country name
          if(marker.title === locations[j].Title){

            // get data from API 
            ApiReq(locations[j].Title);

            // create the window and append Statistics div on it
            const infowindow = new google.maps.InfoWindow({
              content: Statistics,
            });


            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: true,
            });
          } 
        }
      })


  


        


}


  // Call API for each country
  for(let j = 0; j < locations.length; j++){
    ApiReq(locations[j].Title);
  }

  // for(let q = 0; q<locations.length; q++){
    function CreateWindow(){
      const infowindow = new google.maps.InfoWindow({
        content: Statistics,
      });
    }

  // }

};







function ApiReq(country){
  // api fetch foe each country
    fetch(`https://covid-api.mmediagroup.fr/v1/cases?country=${country}`)
    .then(response => response.json())
    .then(data =>{
      let results = [data];
      capitalCity.textContent = results[0].All.capital_city;
      TCases.textContent = results[0].All.confirmed
      TDeaths.textContent = results[0].All.deaths
      Life.textContent = results[0].All.life_expectancy
      Population.textContent = results[0].All.population
      UpdateTime.textContent = results[0].All.updated
      RCases.textContent = results[0].All.recovered
    })
}
