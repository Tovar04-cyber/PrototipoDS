let currentSlideAcc = 0;
const totalSlidesAcc = 3;

function showSlideAcc(index) {
  const slidesContainer = document.querySelector('#sliderAcciones .slides');
  const dots = document.querySelectorAll('#sliderAcciones .dot');
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentSlideAcc = index;
}

function prevSlideAcc() {
  currentSlideAcc = (currentSlideAcc - 1 + totalSlidesAcc) % totalSlidesAcc;
  showSlideAcc(currentSlideAcc);
}

function nextSlideAcc() {
  currentSlideAcc = (currentSlideAcc + 1) % totalSlidesAcc;
  showSlideAcc(currentSlideAcc);
}

function goToSlideAcc(index) {
  showSlideAcc(index);
}

setInterval(nextSlideAcc, 10000);
showSlideAcc(0);
