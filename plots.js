var xmlhttp = new XMLHttpRequest();
var url = "mydata.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        var totalnumber = {
                      x: myArr.dates,
                      y: myArr.numbers,
                      mode: 'lines+markers',
                      name: 'Confirmed'
        };
        var totalincrement = {
                      x: myArr.dates,
                      y: myArr.growth,
                      mode: 'lines+markers',
                      name: 'Increment'
        };
        var speedofgrowth = {
                      x: myArr.dates,
                      y: myArr.speed,
                      mode: 'lines+markers',
                      name: 'Exponent Coefficient'
        };


        var layout = {
          title:'Total Confirmed Number of Cases of COVID-19 in Israel'
        };
        
        var speedexponent = {
          title:'Coefficient of Exponent'
        };
        
        var exponentialRegression = regression('exponential', myArr.regressiondata);
        
        var forecast = {
                      x: [],
                      y: [],
                      mode: 'lines',
                      name: 'Exponential Regression'
        };
        for (var j = 0; j < myArr.dates.length; j++) {
            forecast.x[j] = myArr.dates[j];
            forecast.y[j] = exponentialRegression.equation[0] * Math.pow(Math.E, exponentialRegression.equation[1] * j);
        }
        
        document.getElementById("tomorrow").innerHTML = Math.round(exponentialRegression.equation[0] * Math.pow(Math.E, exponentialRegression.equation[1] * (j+1)));
        
        document.getElementById("dayaftertomorrow").innerHTML = Math.round(exponentialRegression.equation[0] * Math.pow(Math.E, exponentialRegression.equation[1] * (j+2)));
        
        document.getElementById("inthreedays").innerHTML = Math.round(exponentialRegression.equation[0] * Math.pow(Math.E, exponentialRegression.equation[1] * (j+3)));
        
        var data = [ totalnumber, totalincrement, forecast];
        var growthspeed = [ speedofgrowth ];
        
        Plotly.newPlot('totalcases', data, layout);
        Plotly.newPlot('growthspeed', growthspeed, speedexponent);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();


Plotly.d3.csv('csvfinalMar26.csv',
  function(err, rows){function unpack(rows, key) {return rows.map(function(row){ return row[key];
})};

var data = [{
  lon: unpack(rows, 'x'), lat: unpack(rows, 'y'), radius:20,
  z: unpack(rows, 'Hours'), type: "densitymapbox", coloraxis: 'coloraxis',
  hoverinfo: 'skip'}];
                      


var layout = {
    mapbox: {center: {lon: 34.804733, lat: 31.828284}, style: "outdoors", zoom: 8},
    coloraxis: {colorscale: "Viridis"}, title: {text: "Exposure of Confirmed Coronavirus Patients (most recent 14 days)"},
    width: window.innerWidth, height: 600, margin: {t: 50, b: 50}};

var config = {mapboxAccessToken: 'pk.eyJ1IjoidHlvdGFrdWtpIiwiYSI6ImNrN2o0anFoazAybWgzbm83MnRsaW93aGgifQ.RUlPKLHV5_2JXPPVr8gLgw'};

Plotly.newPlot('myDiv', data, layout, config);
})


Plotly.d3.csv('newerflights.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });}

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    var data = [];
    var startLongitude = unpack(rows, 'Starty');
    var endLongitude = unpack(rows, 'Endy');
    var startLat = unpack(rows, 'Startx');
    var endLat = unpack(rows, 'Endx');

    for ( var i = 0 ; i < startLongitude.length; i++ ) {
        var opacityValue = 0.2;

        var result = {
            type: 'scattergeo',
            lon: [ startLongitude[i] , endLongitude[i] ],
            lat: [ startLat[i] , endLat[i] ],
            mode: 'lines',
            line: {
                width: 2,
                color: 'red'
            },
            opacity: opacityValue
        };

        data.push(result);
    };

    var layout = {
        title: 'Importing Flights Announced After 20-Mar-2020',
        showlegend: false,
        geo:{
            scope: 'north america + europe',
            projection: {
                type: 'azimuthal equal area'
            },
            showland: true,
            landcolor: 'rgb(243,243,243)',
            countrycolor: 'rgb(204,204,204)'
        },
        width: window.innerWidth,
        height: 600
    };

    Plotly.newPlot("myGeo1", data, layout, {showLink: false});

});

Plotly.d3.csv('olderflights.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });}

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    var data = [];
    var startLongitude = unpack(rows, 'Starty');
    var endLongitude = unpack(rows, 'Endy');
    var startLat = unpack(rows, 'Startx');
    var endLat = unpack(rows, 'Endx');

    for ( var i = 0 ; i < startLongitude.length; i++ ) {
        var opacityValue = 0.2;

        var result = {
            type: 'scattergeo',
            lon: [ startLongitude[i] , endLongitude[i] ],
            lat: [ startLat[i] , endLat[i] ],
            mode: 'lines',
            line: {
                width: 2,
                color: 'red'
            },
            opacity: opacityValue
        };

        data.push(result);
    };

    var layout = {
        title: 'Importing Flights Announced Before 20-Mar-2020',
        showlegend: false,
        geo:{
            scope: 'north america + europe',
            projection: {
                type: 'azimuthal equal area'
            },
            showland: true,
            landcolor: 'rgb(243,243,243)',
            countrycolor: 'rgb(204,204,204)'
        },
        width: window.innerWidth,
        height: 600
    };

    Plotly.newPlot("myGeo2", data, layout, {showLink: false});

});
