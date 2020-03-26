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

