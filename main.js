/**
 * Created by seanriordan08 on 12/19/15.
 */

$(document).ready(function(){
  format_fb();

  var about = $('#about');
  var menu = $('#menu');
  var hours = $('.hours');
  var map = $('#map');
  var order = $('#order');
  var cater = $('#cater');
  var social = $('#social');

  // Initial state
  social.hide();
  map.hide();

  $(".button_wrapper").on( "click", function() {
    var menuWrapper = $(".menu-wrapper");
    var menuWidth = menuWrapper.width();

    $(this).toggleClass( "active" );          //Menu Icon Button Boundary
    $(".button").toggleClass( "active" );     //Menu Icon Button

    if (menuWidth == 0){
      menuWrapper.css("width", "25%");
      about.css({padding: "5px 2% 10px 27%"});
      menu.css({padding: "5px 2% 10px 27%"});
      hours.css({padding: "5px 2% 10px 27%"});
      order.css({padding: "5px 2% 10px 27%"});
      cater.css({padding: "5px 2% 10px 27%"});
      social.fadeIn();
      $('.gmnoprint').find("div:contains('Map')").parent().css({visibility: "hidden"});
      $(".sidebar-content").fadeIn();
    }
    else {
      $(".sidebar-content").fadeOut();
      menuWrapper.css("width", "0");
      about.css({padding: "5px 20px"});
      menu.css({padding: "5px 20px"});
      hours.css({padding: "5px 20px"});
      order.css({padding: "5px 20px"});
      cater.css({padding: "5px 20px"});
      social.fadeOut();
      $('.gmnoprint').find("div:contains('Map')").parent().css({visibility: "hidden"});
    }
  });

  $('li.nav').on("click", function(){
    var selection = $(this).text();

    about.hide();
    menu.hide();
    hours.hide();
    map.hide();
    order.hide();
    //cater.hide();

    if (selection == "About"){
      about.fadeIn();
    }
    else if (selection == "Menu"){
      menu.fadeIn();
    }
    else if (selection == "Hours"){
      getNow();
      hours.fadeIn();
    }
    else if (selection == "Map"){
      map.fadeIn();
      initMap();
    }
    else if (selection == "Order/Cater"){
      order.fadeIn();
    }
    //else if (selection == "Cater"){
    //  cater.fadeIn();
    //}

  });

  $(".image_bubble_holder img").mouseenter(function(){
    $("#bubble_title").hide().text($(this).attr("alt")).fadeIn(100);
  });

  $(".image_bubble_holder img").mouseleave(function(){
    $("#bubble_title").fadeOut(100);
  });

  $('.download_menu').click(function() {
    var a = $("<a>")
      .attr("href", "Brown_Bag_Menu_Feb_2015.pdf")
      .attr("download", "BBSC_Menu.pdf")
      .appendTo("body");
    a[0].click();
    a.remove();
  });

  $('.download_orderForm').click(function() {
    var a = $("<a>")
      .attr("href", "Brochure_Catering.pdf")
      .attr("download", "BBSC_Order_Form.pdf")
      .appendTo("body");
    a[0].click();
    a.remove();
  });

  $('#fb_link').on("click", function(){
    window.open('https://www.facebook.com/brownbagsandwichcompany/', '_blank')
  });

  $('#ig_link').on("click", function(){
    window.open('https://www.instagram.com/brownbagsandwichco/', '_blank')
  });

  window.addEventListener('resize', function(){
    format_fb();
  }, true);

  function format_fb() {
    if($(document).width() < "650") {
      $('.fb-like').attr("data-layout", "box_count");
      try{
        FB.XFBML.parse();
      }catch(ex){}
    } else {
      $('.fb-like').attr("data-layout", "button_count");
      try{
        FB.XFBML.parse();
      }catch(ex){}
    }
  }
});

function getNow(){
  var newDate = new Date();
  var now = moment(newDate).format('dddd, h:mma');
  var green_open = "<span style='color:#2c800d'>we're totally open!</span>";
  var red_closed = "<span style='color:#a00000'>closed</span>";

  if (checkHours(newDate) == true)
  {
    $('.hours span').html("It\'s " + now + "<br>" + green_open + "</br>");
  } else {
    $('.hours span').html("It\'s " + now + "<br> we are " + red_closed + ". For now.");
  }
}

function checkHours(checkDate){
  var day_now = moment(checkDate).format('dddd'); // "Friday"
  var hours_now = moment(checkDate).format('HH'); // 24 hr format
  var regular_hours = ((2 < hours_now) && (hours_now > 10 ));

  if ((day_now == "Saturday") && (2 < hours_now) && (hours_now < 11 )){
    return true;
  }
  else if ((day_now == "Sunday") && (2 < hours_now) && (hours_now < 11 )){
    return true;
  }
  else if ((day_now != "Saturday") && (day_now != "Sunday")){
    return regular_hours;
  }
}