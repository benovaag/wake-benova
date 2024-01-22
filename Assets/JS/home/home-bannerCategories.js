// document.addEventListener('DOMContentLoaded', function () {
//   const carousels = document.querySelectorAll('.banner-categories__carousel');

//   carousels.forEach(function (carousel) {
//     const container = carousel.closest('.banner-categories__container');
//     const dots = container.querySelector('.carousel-dots');

//     const glider = new Glider(carousel, {
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       rewind: true,
//       duration: 0.01,
//       draggable: true,
//       dots: dots,
//       autoplay: true,
//       responsive: [
//         {
//           breakpoint: 768,
//           settings: {
//             slidesToShow: 5,
//           },
//         },
//         {
//           breakpoint: 1026,
//           settings: {
//             slidesToShow: 9,
//           },
//         },
//       ],
//     });

//     function updateDotsVisibility() {
//       var containerWidth = container.offsetWidth;
//       var gliderWidth = glider.track.offsetWidth;

//       if (gliderWidth > containerWidth) {
//         dots.style.display = 'flex';
//       } else {
//         dots.style.display = 'none';
//       }
//     }

//     updateDotsVisibility();

//     window.addEventListener('resize', updateDotsVisibility);
//   });
// });

$('.banner-categories__carousel').slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 300,
  autoplay: true,
  slidesToShow: 9,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1026,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
});
