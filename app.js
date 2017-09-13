$(document).ready(function(){

  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=metric&APPID=3f196ebe1a8f3f884f4a32af14171ea6',
    type:"GET",
    dataType:"json",
    async: false,
    success: function(data){
      console.log(data.main.temp);
      $('#minn-temp').html(data.main.temp + ' &#176' + " C");
      $('#minn-humid').html(data.main.humidity + " &#37")
    }
  });
  //focus event
  var button = $("#weather-location");
  var search = $('#location');
  $(search).on("focus", function() {
    $(this).animate({
      width: "100%"
    }, 400);
    $(button).animate({
    right: '10px'
  }, 400);
  });
  //blur event
  $(search).on("blur", function() {
    if(search.val() === "") {
      $(search).animate({
      width: "45%"
    }, 400, function(){
      $(button).animate({
        right: "360px"
      }, 400, function(){});

    });
    }
  });



  $('button').on("click", function(){
      var location = $('#location').val();
      $("#location").val("");
      $("#show-weather").html("The city you chose is " + location + ".");
        $.ajax({
          url:'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=metric&APPID=3f196ebe1a8f3f884f4a32af14171ea6',
          type:"GET",
          dataType: "json",
          async: true,
          success: function(data){
            console.log(data.main.temp);
            $("#main-temp").html(data.main.temp + ' &#176' + " C");
            $('#main-humidity').html(data.main.humidity + " &#37");
          },
          error: function(){
              $('#error').html("ERROR!");
          }
        });
});
});
