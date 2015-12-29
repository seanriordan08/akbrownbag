
var map;
var myLatLng = {lat: 61.219600, lng: -149.893200};
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 17
  });

  var customMapType = new google.maps.StyledMapType([
    {
      stylers: [
        {hue: '#ff0000'},
        {visibility: 'simplified'},
        {saturation: -100},
        {lightness: -10},
        {gamma: 0.5},
        {weight: 4.5}
      ]
    },
    {
      elementType: 'labels',
      stylers: [{visibility: 'on'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#935c37'}]
    },
    {
      featureType: 'water',
      stylers: [{color: '#353535'}]
    }
  ], {
    name: 'Custom Style'
  });
  var customMapTypeId = 'custom_style';
  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);

  var contentString = '<div id="content">'+
    '<div id="siteNotice"></div>'+
    '<h1 id="firstHeading" class="firstHeading">New Brown Bag Sandwich Co-ordinates</h1>'+
    '<div id="bodyContent">'+
    '<p>The <b>Brown Bag Sandwich Co.</b>, also referred to as <b>BBSC</b>, outgrew its shell '+
    'and found a more suitable place to call it\'s digs. '+
    'We\'re back in business, and exited to exceed the high standards of quality '+
    'and convenience our customers have come to expect and <3'+
    '</div>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Brown Bag Sandwich Co.'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
