const mainImage = document.getElementById('mainDisplayImage');
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const musicButton = document.querySelector('.detail-audio');
const deepBlueAudio = document.getElementById('deepBlueAudio');
const musicInfo = document.getElementById('musicInfo');

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

function updateProgressBar() {
  const totalThumbs = document.querySelectorAll('.thumb').length;
  const currentIndex = Array.from(document.querySelectorAll('.thumb')).findIndex(thumb => 
    thumb.classList.contains('is-active')
  );
  const progress = ((currentIndex + 1) / totalThumbs) * 100;
  document.querySelector('.progress-fill').style.width = progress + '%';
}

if (musicButton && deepBlueAudio && musicInfo) {
  const setMusicButtonLabel = (isPlaying) => {
    musicButton.textContent = isPlaying ? '❚❚ Pausar música' : '▶ Escuchar prueba de música';
    musicButton.setAttribute('aria-expanded', String(isPlaying));
  };

  const toggleMusicPanel = (show) => {
    musicInfo.classList.toggle('is-visible', show);
  };

  musicButton.addEventListener('click', async () => {
    if (!deepBlueAudio.paused && !deepBlueAudio.ended) {
      deepBlueAudio.pause();
      setMusicButtonLabel(false);
      toggleMusicPanel(false);
      return;
    }

    toggleMusicPanel(true);

    try {
      deepBlueAudio.currentTime = 0;
      await deepBlueAudio.play();
      setMusicButtonLabel(true);
    } catch (error) {
      console.error('No se pudo reproducir el audio:', error);
      toggleMusicPanel(false);
      setMusicButtonLabel(false);
    }
  });

  deepBlueAudio.addEventListener('pause', () => {
    setMusicButtonLabel(false);
    toggleMusicPanel(false);
  });

  deepBlueAudio.addEventListener('ended', () => {
    setMusicButtonLabel(false);
    toggleMusicPanel(false);
  });
}

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => updateGallery(index));
});

prevBtn?.addEventListener('click', () => updateGallery(currentIndex - 1));
nextBtn?.addEventListener('click', () => updateGallery(currentIndex + 1));

updateProgressBar();
