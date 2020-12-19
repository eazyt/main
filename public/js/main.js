
// Initialize and add the map
function initMap() {
    // Your location
    const loc = { lat: 59.26, lng: 25.15 };
    // centered map on location
    const map = new google.maps.Map(document.querySelector('.map'),{
        zoom: 13,
        center:loc
    });
    // the marker, positioned at location
    const marker = new google.maps.Marker({position: loc, map: map});
}

// Sticky menu background
window.addEventListener('scroll', function() {
    if (window.scrollY > 150) {
      document.querySelector('#navbar').style.opacity = 0.9;
    } else {
      document.querySelector('#navbar').style.opacity = 1;
    }
  });

// smooth Scrolling
// $('#navbar a, .btn').on('click', function(event){
//     if(this.hash !== ''){
//         event.preventDefault();
//         const hash = this.hash;

//         $('html, body').animate(
//             {
//                 scrollTop: $(hash).offset().top -100
//             },
//             800
//         );
//     }
// });
// Smooth Scrolling
$('#navbar a').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
  
      const hash = this.hash;
  
      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top - 100
        },
        800
      );
    }
  });