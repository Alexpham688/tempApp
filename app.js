$(document).ready(function(){


  //focus event
  var button = $("#weather-location");
  var search = $('#location');
  $(search).on("focus", function() {
    $(this).animate({
      width: "100%"
    }, 500);
    $(button).animate({
    right: '10px'
  }, 500);
 });

  //blur event
  $(search).on("blur", function() {
    if(search.val() === "") {
      $(search).animate({
      width: "45%"
    }, 500, function(){});
      $(button).animate({
        right: "374px"
      }, 500, function(){});
    }
  });

  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=metric&APPID=3f196ebe1a8f3f884f4a32af14171ea6',
    type:"GET",
    dataType:"json",
    async: false,
    success: function(data){
      console.log(data.main.temp);
      console.log(data.weather[0].description);
      $('#minn-temp').html(data.main.temp * (9/5) + 32 + ' &#176' + " F");
      $('#minn-humid').html(data.main.humidity + " &#37");
      $('#minn-description').html(data.weather[0].description);
    }
  });



  $('button').on("click", function(){
      var location = $('#location').val();

      $("#show-weather").html("Temperature & Humidity for " + location + ".");
        $.ajax({
          url:'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=3f196ebe1a8f3f884f4a32af14171ea6',
          type:"GET",
          dataType: "json",
          async: true,
          data: {limit:6},
          success: function(data){
            console.log(data.main.temp);
            $("#main-temp").html(data.main.temp * (9/5) + 32 + ' &#176' + " F");
            $('#main-humidity').html(data.main.humidity  + " &#37");
            $('#main-description').html(data.weather[0].description);

          },
          error: function(){
              alert("Enter a city!");
          }
        });
        $('#location').val("");

      });
});
