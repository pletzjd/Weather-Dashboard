let searchButton = $('#searchButton');
let searchBar = $('#searchBar');
let cities = [];
let searchHistory = $('#searchHistory');
let APIKey = '84d085c88283aedb8eea3df65fad1fc6';
let currentCity = '';
let longitude = '';
let latitude = '';
//current weather variables
let cityDateIcon = $('#cityDateIcon')
let todayIcon = $('#todayIcon')
let todayTemp = $('#todayTemp');
let todayWind = $('#todayWind');
let todayHumidity = $('#todayHumidity');
let todayUVI = $('#todayUVI');
// 5 day forcast day 1 variables
let day1Date = $('#day1Date');
let day1Temp = $('#day1Temp');
let day1Wind = $('#day1Wind');
let day1Humidity = $('#day1Humidity');
let day1Icon = $('#day1Icon');
// 5 day forcast day 2 variables
let day2Date = $('#day2Date');
let day2Temp = $('#day2Temp');
let day2Wind = $('#day2Wind');
let day2Humidity = $('#day2Humidity');
let day2Icon = $('#day2Icon');
// 5 day forcast day 3 variables
let day3Date = $('#day3Date');
let day3Temp = $('#day3Temp');
let day3Wind = $('#day3Wind');
let day3Humidity = $('#day3Humidity');
let day3Icon = $('#day3Icon');
// 5 day forcast day 4 variables
let day4Date = $('#day4Date');
let day4Temp = $('#day4Temp');
let day4Wind = $('#day4Wind');
let day4Humidity = $('#day4Humidity');
let day4Icon = $('#day4Icon');
// 5 day forcast day 1 variables
let day5Date = $('#day5Date');
let day5Temp = $('#day5Temp');
let day5Wind = $('#day5Wind');
let day5Humidity = $('#day5Humidity');
let day5Icon = $('#day5Icon');
// icon code storage
let todayIconCode = '';
let day1IconCode = '';
let day2IconCode = '';
let day3IconCode = '';
let day4IconCode = '';
let day5IconCode = '';

//functions

function init(){
    if(localStorage.getItem('cities')!==null){
        cities = JSON.parse(localStorage.getItem('cities'))
        for(i=0;i<cities.length;i++){
            let history = $('<button>');
            history.val(cities[i]);
            searchHistory.append('<li><button>'+history.val()+'</button></li>');
        }
    }
    currentCity = 'Toronto';

    getLatLon();
    
    setTimeout(getWeather,1000)
}

function iconSelect(iconCode){

    if(iconCode === '01d'){
        return 'fa-sun';
    }else if(iconCode === '01n'){
        return 'fa-moon';
    }else if(iconCode === '02d'){
        return 'fa-cloud-sun';
    }else if(iconCode === '02n'){
        return 'fa-cloud-moon';
    }else if(iconCode === '03d' || iconCode === '03n'){
        return 'fa-cloud';
    }else if(iconCode === '04d' || iconCode === '04n'){
        return 'fa-cloud';
    }else if(iconCode === '09d' || iconCode === '09n'){
        return 'fa-cloud-showers-heavy'
    }else if (iconCode === '10d'){
        return 'fa-cloud-sun-rain';
    }else if(iconCode === '10n'){
        return 'fa-cloud-moon-rain';
    }else if(iconCode === '11d' || iconCode === '11n'){
        return 'fa-cloud-bolt';
    }else if(iconCode === '13d' || iconCode === '13n'){
        return 'fa-snowflake'
    }else{
        return 'fa-smog';
    }
    
}

function getLatLon(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+currentCity+'&appid='+APIKey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        latitude = data.coord.lat;
        longitude = data.coord.lon;
    });
}
function getWeather(){

    if(todayIconCode !== ''){
        todayIcon.removeClass(iconSelect(todayIconCode));
        day1Icon.removeClass(iconSelect(day1IconCode));
        day2Icon.removeClass(iconSelect(day2IconCode));
        day3Icon.removeClass(iconSelect(day3IconCode));
        day4Icon.removeClass(iconSelect(day4IconCode));
        day5Icon.removeClass(iconSelect(day5IconCode));
    }

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+String(latitude)+'&lon='+String(longitude)+'&exclude=minutely,hourly&appid='+APIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //current weather variables
            todayTemp.text('Temp: '+(data.current.temp-273.15)+' °C'); //-273.15 to convert from Kelvin to Celcius
            todayWind.text('Wind: '+(data.current.wind_speed*3.6)+' km/h'); //Multiply by 3.6 to convert from m/s to km/h
            todayHumidity.text('Humidity: '+data.current.humidity+'%');
            todayUVI.text(data.current.uvi);
            cityDateIcon.text(currentCity+' '+moment().format('DD/MM/YYYY'));
            todayIconCode = data.current.weather[0].icon
            //5 day forcast day 1 variables
            day1Date.text(moment().format('DD/MM/YYYY'))
            day1Temp.text('Temp: '+(data.daily[0].temp.day-273.15)+' °C'); //-273.15 to convert from Kelvin to Celcius
            day1Wind.text('Wind: '+(data.daily[0].wind_speed*3.6)+' km/h'); //Multiply by 3.6 to convert from m/s to km/h
            day1Humidity.text('Humidity: '+data.daily[0].humidity+'%');
            day1IconCode = data.daily[0].weather[0].icon;
            // 5 day forcast day 2 variables
            day2Date.text(moment().add(1,'d').format('DD/MM/YYYY'))
            day2Temp.text('Temp: '+(data.daily[1].temp.day-273.15)+' °C'); //-273.15 to convert from Kelvin to Celcius
            day2Wind.text('Wind: '+(data.daily[1].wind_speed*3.6)+' km/h'); //Multiply by 3.6 to convert from m/s to km/h
            day2Humidity.text('Humidity: '+data.daily[1].humidity+'%');
            day2IconCode = data.daily[1].weather[0].icon;
            // 5 day forcast day 3 variables
            day3Date.text(moment().add(2,'d').format('DD/MM/YYYY'))
            day3Temp.text('Temp: '+(data.daily[2].temp.day-273.15)+' °C'); //-273.15 to convert from Kelvin to Celcius
            day3Wind.text('Wind: '+(data.daily[2].wind_speed*3.6)+' km/h'); //Multiply by 3.6 to convert from m/s to km/h
            day3Humidity.text('Humidity: '+data.daily[2].humidity+'%');
            day3IconCode = data.daily[2].weather[0].icon;
            // 5 day forcast day 4 variables
            day4Date.text(moment().add(3,'d').format('DD/MM/YYYY'))
            day4Temp.text('Temp: '+(data.daily[3].temp.day-273.15)+' °C'); //-273.15 to convert from Kelvin to Celcius
            day4Wind.text('Wind: '+(data.daily[3].wind_speed*3.6)+' km/h'); //Multiply by 3.6 to convert from m/s to km/h
            day4Humidity.text('Humidity: '+data.daily[3].humidity+'%');
            day4IconCode = data.daily[3].weather[0].icon;
            // 5 day forcast day 1 variables
            day5Date.text(moment().add(4,'d').format('DD/MM/YYYY'))
            day5Temp.text('Temp: '+(data.daily[4].temp.day-273.15)+' °C'); //-273.15 to convert from Kelvin to Celcius
            day5Wind.text('Wind: '+(data.daily[4].wind_speed*3.6)+' km/h'); //Multiply by 3.6 to convert from m/s to km/h
            day5Humidity.text('Humidity: '+data.daily[4].humidity+'%');
            day5IconCode = data.daily[4].weather[0].icon;
            //UV coloring
            if(0<=todayUVI.text() && todayUVI.text()<=2){
                todayUVI.css('background-color','green');
                todayUVI.css('color','whitesmoke');
            }else if(2<todayUVI.text() && todayUVI.text()<=7){
                todayUVI.css('background-color','yellow');
                todayUVI.css('color','whitesmoke');
            }else{
                todayUVI.css('background-color','red');
                todayUVI.css('color','whitesmoke');
            }
            todayIcon.addClass(iconSelect(todayIconCode));
            day1Icon.addClass(iconSelect(day1IconCode));
            day2Icon.addClass(iconSelect(day2IconCode));
            day3Icon.addClass(iconSelect(day3IconCode));
            day4Icon.addClass(iconSelect(day4IconCode));
            day5Icon.addClass(iconSelect(day5IconCode));
            
        });

}

function searchFunc(event){
    event.stopPropagation();
    event.preventDefault();
    
    currentCity = searchBar.val();
    
    cities.push(currentCity);
    localStorage.setItem('cities',JSON.stringify(cities));

    let history = $('<button>');
    history.val(currentCity);
    searchHistory.append('<li><button>'+history.val()+'</button></li>');

    getLatLon();
    
    setTimeout(getWeather,1000)
    
    
    
}

function historySearch(event){
    event.stopPropagation();
    event.preventDefault();
    let element = event.target;
    if (element.matches("button")){
        currentCity = element.textContent;
        getLatLon();
        setTimeout(getWeather,1000);
    }else{
        return;
    }

        
}

searchButton.on('click', searchFunc)
searchHistory.on('click',historySearch)

init()