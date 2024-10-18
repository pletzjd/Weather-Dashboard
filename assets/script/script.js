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
    let icon = ''
    switch (iconCode){
        case '0d':
        case '1d':
            icon = 'fa-sun';
            break;
        case '0n':
        case '1n':
            icon = 'fa-moon';
            break;
        case '2d':
            icon = 'fa-cloud-sun';
            break;
        case '2n':
            icon = 'fa-cloud-moon';
            break;
        case '3d':
        case '3n':
            icon = 'fa-cloud';
            break;
        case '45d':
        case '45n':
        case '48n':
        case '48n':
            icon = 'fa-smog';
            break;
        case '51d':
        case '51n':
        case '53d':
        case '53n':
        case '55d':
        case '55n':
        case '56d':
        case '56n':
        case '57d':
        case '57n':
        case '80d':
        case '80n':
        case '81d':
        case '81n':
        case '82d':
        case '82n':
            icon = 'fa-cloud-showers-heavy';
            break;
        case '61d':
        case '63d':
        case '65d':
        case '66d':
        case '67d':
            icon = 'fa-cloud-sun-rain';
            break;
        case '61n':
        case '63n':
        case '65n':
        case '66n':
        case '67n':
            icon = 'fa-cloud-moon-rain';
            break;
        case '71d':
        case '71n':
        case '73d':
        case '73n':
        case '75d':
        case '75n':
        case '77d':
        case '77n':
        case '85d':
        case '85n':
        case '86d':
        case '86n':
            icon = 'fa-snowflake';
            break;
        case '95d':
        case '95n':
        case '96d':
        case '96n':
        case '99d':
        case '99n':
            icon = 'fa-cloud-bolt';
            break;
        default:
            icon = 'fa-question';
    }
    return icon;
}

function getLatLon(){
    //Creates url for api get request
    let searchArr = currentCity.split(',');
    let url = 'https://geocoding-api.open-meteo.com/v1/search?name=';

    for(let i = 0; i < searchArr.length; i++){
        if(i >= 1){
            url = url.concat('%2C+')
        }

        url = url.concat(searchArr[i].trim())
    }

    url = url.concat('&count=1&language=en&format=json')

    //Gets longitude and latitude of currently searched city
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        latitude = data.results[0].latitude;
        longitude = data.results[0].longitude;
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

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,uv_index&timezone=auto`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //current weather variables
            todayTemp.text(`Temp: ${data.current.temperature_2m} °C`);
            todayWind.text(`Wind: ${data.current.wind_speed_10m} km/h`);
            todayHumidity.text(`Humidity: ${data.current.relative_humidity_2m}%`);
            todayUVI.text(`${data.current.uv_index}`);
            cityDateIcon.text(`${currentCity} ${data.current.time.split('T')[0]}`);
            todayIconCode = data.current.weather_code;
            if(data.current.is_day){
                todayIconCode = `${todayIconCode}`.concat('d');
            }else{
                todayIconCode = `${todayIconCode}`.concat('n');
            }

            //5 day forcast day 1 variables
            // day1Date.text(moment().format('DD/MM/YYYY'))
            // day1Temp.text('Temp: '+Math.round((data.daily[0].temp.day-273.15))+' °C'); 
            // day1Wind.text('Wind: '+Math.round((data.daily[0].wind_speed*3.6))+' km/h'); 
            // day1Humidity.text('Humidity: '+data.daily[0].humidity+'%');
            // day1IconCode = data.daily[0].weather[0].icon;
            // // 5 day forcast day 2 variables
            // day2Date.text(moment().add(1,'d').format('DD/MM/YYYY'))
            // day2Temp.text('Temp: '+Math.round((data.daily[1].temp.day-273.15))+' °C'); 
            // day2Wind.text('Wind: '+Math.round((data.daily[1].wind_speed*3.6))+' km/h'); 
            // day2Humidity.text('Humidity: '+data.daily[1].humidity+'%');
            // day2IconCode = data.daily[1].weather[0].icon;
            // // 5 day forcast day 3 variables
            // day3Date.text(moment().add(2,'d').format('DD/MM/YYYY'))
            // day3Temp.text('Temp: '+Math.round((data.daily[2].temp.day-273.15))+' °C'); 
            // day3Wind.text('Wind: '+Math.round((data.daily[2].wind_speed*3.6))+' km/h'); 
            // day3Humidity.text('Humidity: '+data.daily[2].humidity+'%');
            // day3IconCode = data.daily[2].weather[0].icon;
            // // 5 day forcast day 4 variables
            // day4Date.text(moment().add(3,'d').format('DD/MM/YYYY'))
            // day4Temp.text('Temp: '+Math.round((data.daily[3].temp.day-273.15))+' °C'); 
            // day4Wind.text('Wind: '+Math.round((data.daily[3].wind_speed*3.6))+' km/h');
            // day4Humidity.text('Humidity: '+data.daily[3].humidity+'%');
            // day4IconCode = data.daily[3].weather[0].icon;
            // // 5 day forcast day 1 variables
            // day5Date.text(moment().add(4,'d').format('DD/MM/YYYY'))
            // day5Temp.text('Temp: '+Math.round((data.daily[4].temp.day-273.15))+' °C');
            // day5Wind.text('Wind: '+Math.round((data.daily[4].wind_speed*3.6))+' km/h');
            // day5Humidity.text('Humidity: '+data.daily[4].humidity+'%');
            // day5IconCode = data.daily[4].weather[0].icon;
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