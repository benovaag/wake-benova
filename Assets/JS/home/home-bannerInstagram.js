document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.banner-instagram__carousel');

  carousels.forEach(function (carousel) {
    const container = carousel.closest('.banner-instagram__container');

    const glider = new Glider(carousel, {
      slidesToShow: 1,
      slidesToScroll: 1,
      rewind: true,
      duration: 0.01,
      draggable: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1026,
          settings: {
            slidesToShow: 4,
          },
        },
      ],
    });

    function updateDotsVisibility() {
      var containerWidth = container.offsetWidth;
      var gliderWidth = glider.track.offsetWidth;

      if (gliderWidth > containerWidth) {
        dots.style.display = 'flex';
      } else {
        dots.style.display = 'none';
      }
    }

    updateDotsVisibility();

    window.addEventListener('resize', updateDotsVisibility);
  });
});
