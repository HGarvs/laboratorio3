const mainImage = document.getElementById('mainDisplayImage');
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');

let currentIndex = 0;

function updateGallery(index) {
  if (!mainImage || thumbs.length === 0) return;

  currentIndex = (index + thumbs.length) % thumbs.length;
  const selectedThumb = thumbs[currentIndex];
  const nextSrc = selectedThumb.dataset.image;

  mainImage.style.opacity = '0.35';
  mainImage.style.transform = 'scale(1.02)';

  setTimeout(() => {
    mainImage.src = nextSrc;
    mainImage.alt = selectedThumb.querySelector('img')?.alt || 'Imagen del juego';
    mainImage.style.opacity = '1';
    mainImage.style.transform = 'scale(1)';
  }, 150);

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle('active', thumbIndex === currentIndex);
    thumb.classList.toggle('is-active', thumbIndex === currentIndex);
  });
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => updateGallery(index));
});

prevBtn?.addEventListener('click', () => updateGallery(currentIndex - 1));
nextBtn?.addEventListener('click', () => updateGallery(currentIndex + 1));
