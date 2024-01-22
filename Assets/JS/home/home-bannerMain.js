// document.addEventListener('DOMContentLoaded', function () {
//   const carousels = document.querySelectorAll('.banner-main__carousel');

//   carousels.forEach(function (carousel) {
//     const container = carousel.closest('.banner-main__container');
//     const prevArrow = container.querySelector(
//       '.banner-main .carousel-arrow.carousel-prev',
//     );
//     const nextArrow = container.querySelector(
//       '.banner-main .carousel-arrow.carousel-next',
//     );

//     new Glider(carousel, {
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       rewind: true,
//       duration: 0.01,
//       draggable: true,
//       autoplay: true,
//       arrows: {
//         prev: prevArrow,
//         next: nextArrow,
//       },
//     });
//   });
// });

$('.banner-main__carousel').slick({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 300,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1026,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
