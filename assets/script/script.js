let searchButton = $('#searchButton');
let searchBar = $('#searchBar');
let city = [];
let searchHistory = $('#searchHistory');


function searchFunc(event){
    event.stopPropagation();
    event.preventDefault();
    
    
    city.push(searchBar.val());

    for (i=0;i<city.length;i++){
        let history = $('<p>');
        history.text(city[i]);
        searchHistory.append('<li><button>'+history.text()+'</button></li>');
    }

}

searchButton.on('click', searchFunc)