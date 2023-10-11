const temperatureField = document.querySelector(".weather1 span");
const cityField = document.querySelector(".weather p");
const dataField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const timeField = document.querySelector(".weather2 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");
 
let target = "Agartala";

const fetchData = async (target) => {
    try {
        const url = `
    https://api.weatherapi.com/v1/current.json?key=ed93dcb669744ae7913170944231010&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    const {
        current: {temp_c, 
        condition: {text, icon}},
        location: {name, localtime_epoch
        },
    }  = data;


    console.log(data);
    updateDom(temp_c, name, icon, text, localtime_epoch);
    
    } catch (error) {
        alert("location not found");
    }
};

function updateDom(temperature, city, emoji, text, time){
    temperatureField.innerText = temperature;
    cityField.innerText = city;
    emojiField.src = emoji;
    weatherField.innerText = text;
    const date = (new Date(time*1000))
    .toLocaleString()
    .replaceAll("/", "-");
    const day = getDay((new Date(time*1000)).getDay());
    console.log(day);
    timeField.innerText = `${day} ${date}`;
    console.log(date);
}

function getDay(num) {
    switch (num) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        
    }
    
}

fetchData(target);

const search = (e) => {
    e.preventDefault();
    target = searchField.value;
    fetchData(target);

}

form.addEventListener("submit", search)



