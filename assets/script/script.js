let searchButton = $('#searchButton');
let searchBar = $('#searchBar');
let cities = [];
let searchHistory = $('#searchHistory');
let APIKey = '84d085c88283aedb8eea3df65fad1fc6';
let currentCity = '';
let longitude = '';
let latitude = '';

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

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+String(latitude)+'&lon='+String(longitude)+'&exclude=minutely,hourly&appid='+APIKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}

function searchFunc(event){
    event.stopPropagation();
    event.preventDefault();
    
    currentCity = searchBar.val();
    
    cities.push(currentCity);
    localStorage.setItem('cities',cities);

    let history = $('<button>');
    history.val(currentCity);
    searchHistory.append('<li><button>'+history.val()+'</button></li>');

    getLatLon();
    
    setTimeout(getWeather,1000)
    
    
    
}

searchButton.on('click', searchFunc)