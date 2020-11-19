let moduleList = (function(){

    let metroList = document.querySelector('#metroList')
    let stationList = document.querySelector('#stationList')
    let scheduleList = document.querySelector('#schedule')


    function fetchMetro() {
        const url = 'https://api-ratp.pierre-grimaud.fr/v4/lines/metros'
        
        fetch(url)
            .then(function(response){
                response.json().then(function(data){
                  
                    console.log(data.result.metros)  
                  
                    data.result.metros.forEach(function(metro){
                      console.log(metro)

                      metroList.innerHTML += '<option value="'+ metro.code +'">'  + metro.name + '</option>'



                  })
                })

            
            })
    
    
    }

    function fetchStation(code) {
        const url = 'https://api-ratp.pierre-grimaud.fr/v4/stations/metros/'+ code
        
        fetch(url)
            .then(function(response){
                response.json().then(function(data){
                  
                    console.log(data.result.stations)  
                  
                    data.result.stations.forEach(function(station){
                      console.log(station)

                      stationList.innerHTML += '<option value="'+ station.slug +'">'  + station.name + '</option>'



                  })
                })

            
            })
    
    
    }
    function fetchSchedule(code, slug) {
        const url = 'https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/' + code + '/' + slug + '/A+R '
        
        fetch(url)
            .then(function(response){
                response.json().then(function(data){
                  
                    console.log(data.result.schedules) 

                    scheduleList.innerHTML += '<ul>' 
                  
                    data.result.schedules.forEach(function(schedule){
                      console.log(schedule)

                      scheduleList.innerHTML += '<li>'  + schedule.message + ' ' + 'vers' + ' ' + schedule.destination + '</li>'
                      

                  }) 
                  scheduleList.innerHTML += '</ul>'
                })

            
            })
    
    
    }

   
    
    return {

        fetchMetro: fetchMetro,
        fetchStation: fetchStation,
        fetchSchedule: fetchSchedule,
        
    }
    
})()

let metroList = document.querySelector('#metroList')

stationList.addEventListener('change', function(){
    moduleList.fetchSchedule(metroList.value, stationList.value)
})

metroList.addEventListener('change', function(){
    moduleList.fetchStation(metroList.value)
})

moduleList.fetchMetro()

setInterval(function(){
    if(metroList.value){
    if(stationList.value){
        moduleList.fetchSchedule(metroList.value, stationList.value)
    }}

    
},30000)




/*

// https://api-ratp.pierre-grimaud.fr/v4/schedules/' + type + '/' + line + '/' + station + '/A+R

    // Dans la boucle
    var
        fragment = document.createDocumentFragment(); // Crée un objet vide
        opt;
     
    opt = document.createElement( "option" ); // Crée un élément option
    opt.value = "valeur"; // Attribue une valeur à l'option précédemment créée
    opt.innerHTML = "ce_qui_s_affiche"; // Attribue un contenu à l'option
     
    fragment.appendChild( opt );
     
    document.getElementById( "liste" ).appendChild( fragment ); // A insére

    addOption(element) */