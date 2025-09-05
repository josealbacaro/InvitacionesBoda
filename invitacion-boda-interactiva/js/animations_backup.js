const particlesJS = particlesJS.load('particles-js', 'assets/animations/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  const coupleImage = document.querySelector('.couple-image');
  const decorations = document.querySelectorAll('.decoration');

  anime({
    targets: title,
    translateY: [-50, 0],
    opacity: [0, 1],
    duration: 1500,
    easing: 'easeOutExpo',
  });

  anime({
    targets: coupleImage,
    scale: [0.5, 1],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutExpo',
  });

  decorations.forEach((decoration, index) => {
    anime({
      targets: decoration,
      translateY: [anime.random(-50, 50), 0],
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(200, { start: index * 100 }),
      easing: 'easeOutExpo',
    });
  });
});