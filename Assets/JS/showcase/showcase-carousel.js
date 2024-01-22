document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.showcase-carousel');

  carousels.forEach(function (carousel) {
    const container = carousel.closest('.showcase-container');
    const prevArrow = container.querySelector('.carousel-arrow.carousel-prev');
    const nextArrow = container.querySelector('.carousel-arrow.carousel-next');

    new Glider(carousel, {
      slidesToShow: 1,
      slidesToScroll: 1,
      rewind: true,
      duration: 0.01,
      draggable: true,
      arrows: {
        prev: prevArrow,
        next: nextArrow,
      },
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 901,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            dots: false,
          },
        },
      ],
    });
  });
});
