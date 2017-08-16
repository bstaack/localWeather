

$(document).ready(function() {

  var x = document.getElementById("details");
  var key = "933fbed2f0fa9be8a6020f856e2f91c8";

  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;

      $.getJSON("https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?callback=?", function(json){

      weatherDetails = "";
      iconDetails = "";
      buttonDetails = "";
      summary = json.currently.summary;
      temp = json.currently.temperature;
      fahrenheit = Math.round(temp);
      tempC = 0.55*(fahrenheit - 32);
      celsius = Math.round(tempC);
      icon = json.currently.icon;

     weatherDetails += "<p id='details'>" + summary + " and <span id='fahToggle' style='display: initial'>" + fahrenheit + " F</span>" + "<span id='celsiusToggle' style='display: none'>" + celsius + " C</span></p>";

      $("#details").html(weatherDetails);

      iconDetails += "<i class='" + changeIcon(icon) + "' style='display: inline; font-size: 4em;' aria-hidden='true'></i>";

      $("#icon").html(iconDetails);

      buttonDetails += "<a id='temptBtn' class='waves-effect waves-light btn'>switch to <span id='celsiusToggle' style='display: initial'>celsius</span><span id='fahToggle' style='display: none'>fahrenheit</span></a>";

      $("#button").html(buttonDetails);

      $("#temptBtn").click(function(){
        $("#fahToggle, #celsiusToggle").toggle();
      });

//switch statement / function to determine what icon to display
      function changeIcon(input){

        switch (input){
          case 'clear-day':
          case 'clear':
            return "fa fa-sun-o"
          case 'clear-night':
            return "fa fa-moon-o";
          case 'cloudy':
          case 'partly-cloudy-day':
          case 'partly-cloudy-night':
            return "fa fa-cloud"
          case 'snow':
          case 'sleet':
            return "fa fa-snowflake-o";
          case 'rain':
          case 'Drizzle':
            return "fa fa-tint";
          case 'wind':
            return "fa fa-superpowers";
          case 'fog':
            return "fa fa-bath";
        }

      }

    });
  }

});
