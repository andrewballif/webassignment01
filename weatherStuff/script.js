const weather0 = document.getElementById('weather0');
const temp0 = document.getElementById('temp0');
const weather1 = document.getElementById('weather1');
const temp1 = document.getElementById('temp1');
const today = document.getElementById('today');
const forecast = document.getElementById('forecast');

// Let setup some variables
const api = 'c0260e1711423fec4361ff8ae35f614c';
let city = 'Salt Lake City, UT';
let country = 'US';


// This line sets up the url we are going to call with the values above
// It uses string interpolation rather than concantenation. Isn't it so clean!
let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api}&units=imperial`;

// This is an example of a javascript promise
// Promises are a handy way of handling asynchronous calls in js
// It fetches the url, and when the request completes calls the then functions
// If an error happens, the catch method is called
fetch(url)
  .then(response => response.json()) // This takes the response and converts the json into an actual javascript object
  .then(data => { // Here is where we can actually do something with the returned data
    console.log(data);

    weather0.innerHTML = data.list[0].weather[0].description;
    temp0.innerHTML = data.list[0].main.temp + ' &deg;F';
    weather1.innerHTML = data.list[8].weather[0].description;
    temp1.innerHTML = data.list[8].main.temp + ' &deg;F';
  })
  .catch(e => console.log(e)); // Something bad happened



const main = data => {
    console.log(data);
    let now = `
    <h2>Current</h2>
    <p>
    Temp: ${data.current.temp}&deg;F <br />
    Weather: ${data.current.weather[0].description}
    </p>
    `;
    today.innerHTML = now;
    
    let date = new Date();

    let otherDays = '';
    for(let i=0; i<=2; i++) {
        the_day = new Date(date.setDate(date.getDate() + 1));
        otherDays += `
        <h2>${the_day.getMonth()+1}/${the_day.getDate()}</h2>
        <p>
        Temp: ${data.daily[i].temp.day}
        </p>
        `;
    }
    forecast.innerHTML = otherDays;
};


fetch(url)
    .then(response => response.json())
    .then(fiveDay_threeHour_data => {
        let lon = fiveDay_threeHour_data.city.coord.lon;
        let lat = fiveDay_threeHour_data.city.coord.lat;
        let new_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api}`
        fetch(new_url)
            .then(response => response.json())
            .then(data => {
                main(data);
            });
    });

