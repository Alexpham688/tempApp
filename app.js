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
        right: "377px"
      }, 500, function(){});
    }
  });

  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=metric&APPID=3f196ebe1a8f3f884f4a32af14171ea6',
    type:"GET",
    dataType:"json",
    async: false,
    success: function(data){
      console.log(data.main.temp.toFixed(2));
      console.log(data.weather[0].description);
      $('#minn-temp').html(data.main.temp.toFixed(1) * (9/5) + 32 + ' &#176' + " F");
      $('#minn-humid').html(data.main.humidity + " &#37");
      $('#minn-description').html(data.weather[0].description);
      if(data.weather[0].description.includes("clouds")){
          $('#container').css("background", "url('img/scattered.png')");
      }
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
          data: {limit: 6},
          success: function(data){
            console.log(data.main.temp);
            console.log(data.weather[0].description);
            $("#main-temp").html(data.main.temp.toFixed(1) * (9/5) + 32 + ' &#176' + " F");
            $('#main-humidity').html(data.main.humidity  + " &#37");
            $('#main-description').html(data.weather[0].description);

          },
          error: function(){
              alert("Enter a city!");
          }
        });
        // clears input
        $('#location').val("");

         // adds image to background depending on condition
});

  var temp = $("#minn-temp");
  var time = new Date();
  var month = time.getMonth() + 1;
  var background = "";
  var season = month;
  if(season >= 6 && season <= 8) {
    background = "url('img/summer.jpg')";
  } else if(season >= 9 && season <= 11) {
    background = 'url("img/fall.jpg")';
  } else if (season === 12 || season <= 2){
    background = 'url("img/snow.jpg")';
  } else if (season >= 3 && season <= 5) {
    background = 'url("img/spring.jpg")';
  }
  console.log(season);

  $('.city-output').css('background', background);

  if(season >= 6 && season <= 8) {
    background = "#9ECDFF";
  } else if(season >= 9 && season <= 11) {
    background = '#FF9433';
  } else if (season === 12 || season <= 2){
    background =  "";
  } else if (season >= 3 && season <= 5) {
    background = "#F7D9FF";
  }
  $('body').css('background', background);


  if($('#main-description').is(':contains("clear")')){
     $('body').css('background-image','url("img/clear.jpg")');

   }


});
