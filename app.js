const mainImage = document.getElementById('mainDisplayImage');
const thumbs = Array.from(document.querySelectorAll('.thumb'));
const prevBtn = document.querySelector('.gallery-nav.prev');
const nextBtn = document.querySelector('.gallery-nav.next');
const musicButton = document.querySelector('.detail-audio');
const deepBlueAudio = document.getElementById('deepBlueAudio');
const musicInfo = document.getElementById('musicInfo');
const musicSlides = Array.from(document.querySelectorAll('.music-slide'));
const prevMusicBtn = document.querySelector('.music-prev');
const nextMusicBtn = document.querySelector('.music-next');

let currentIndex = 0;
let currentMusicIndex = 0;
let activeVideo = null;

function updateGallery(index) {
  if (!mainImage || thumbs.length === 0) return;

  // Detener video activo anterior
  if (activeVideo) {
    activeVideo.pause();
    activeVideo.currentTime = 0;
  }

  currentIndex = (index + thumbs.length) % thumbs.length;
  const selectedThumb = thumbs[currentIndex];
  const thumbVideo = selectedThumb.querySelector('video');
  const thumbImg = selectedThumb.querySelector('img');
  const mainShell = mainImage.parentElement;

  mainImage.style.opacity = '0.35';
  mainImage.style.transform = 'scale(1.02)';

  setTimeout(() => {
    // Limpiar cualquier video previo en mainShell
    const existingVideo = mainShell.querySelector('video');
    if (existingVideo && existingVideo !== thumbVideo) {
      existingVideo.remove();
    }

    // Si el thumbnail contiene video
    if (thumbVideo) {
      activeVideo = thumbVideo;
      mainImage.classList.remove('is-visible');
      mainImage.style.display = 'none';
      
      // Clonar el video al main-image-shell
      let videoClone = mainShell.querySelector('video');
      if (!videoClone) {
        videoClone = thumbVideo.cloneNode(true);
        videoClone.classList.add('is-visible');
        videoClone.style.display = 'block';
        videoClone.style.opacity = '1';
        videoClone.style.transform = 'scale(1)';
        mainShell.appendChild(videoClone);
      } else {
        videoClone.classList.add('is-visible');
        videoClone.style.display = 'block';
        videoClone.style.opacity = '1';
        videoClone.style.transform = 'scale(1)';
      }
    } else if (thumbImg) {
      // Si es una imagen
      activeVideo = null;
      mainImage.classList.add('is-visible');
      mainImage.style.display = 'block';
      mainImage.src = thumbImg.src;
      mainImage.alt = thumbImg.alt || 'Imagen del juego';
      
      // Remover video si existe
      const existingVideo = mainShell.querySelector('video');
      if (existingVideo) {
        existingVideo.remove();
      }
    }
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

function updateMusicCarousel(index) {
  if (!musicSlides.length) return;

  currentMusicIndex = (index + musicSlides.length) % musicSlides.length;

  musicSlides.forEach((slide, slideIndex) => {
    const offset = (slideIndex - currentMusicIndex + musicSlides.length) % musicSlides.length;
    slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');

    if (offset === 0) {
      slide.classList.add('is-active');
    } else if (offset === musicSlides.length - 1) {
      slide.classList.add('is-prev');
    } else if (offset === 1) {
      slide.classList.add('is-next');
    } else {
      slide.classList.add('is-hidden');
    }
  });

  const activeSlide = musicSlides[currentMusicIndex];
  const nextAudio = activeSlide.dataset.audio;

  if (deepBlueAudio && nextAudio) {
    const wasPlaying = !deepBlueAudio.paused && !deepBlueAudio.ended;
    deepBlueAudio.src = nextAudio;
    deepBlueAudio.load();

    if (wasPlaying) {
      deepBlueAudio.currentTime = 0;
      deepBlueAudio.play().catch(() => {});
    }
  }
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
    const shouldPlay = !deepBlueAudio.paused && !deepBlueAudio.ended;

    if (shouldPlay) {
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

prevMusicBtn?.addEventListener('click', () => updateMusicCarousel(currentMusicIndex - 1));
nextMusicBtn?.addEventListener('click', () => updateMusicCarousel(currentMusicIndex + 1));

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    updateGallery(index);
    // Si el thumb tiene video, reproducirlo en el área principal al hacer clic
    const thumbVideo = thumb.querySelector('video');
    if (thumbVideo) {
      const mainShell = mainImage.parentElement;
      setTimeout(() => {
        const mainVideo = mainShell.querySelector('video');
        if (mainVideo) {
          mainVideo.currentTime = 0;
          mainVideo.play().catch(() => {});
        }
      }, 160);
    }
  });
});

prevBtn?.addEventListener('click', () => updateGallery(currentIndex - 1));
nextBtn?.addEventListener('click', () => updateGallery(currentIndex + 1));

updateProgressBar();
updateMusicCarousel(0);

// Inicializar la galería mostrando el primer elemento (que puede ser video)
if (thumbs.length > 0) {
  const firstThumb = thumbs[0];
  const firstVideo = firstThumb.querySelector('video');
  if (firstVideo) {
    activeVideo = firstVideo;
    mainImage.classList.remove('is-visible');
    mainImage.style.display = 'none';
    const mainShell = mainImage.parentElement;
    const videoClone = firstVideo.cloneNode(true);
    videoClone.classList.add('is-visible');
    videoClone.style.display = 'block';
    videoClone.style.opacity = '1';
    videoClone.style.transform = 'scale(1)';
    mainShell.appendChild(videoClone);
    // Auto-reproducir el video inicial
    setTimeout(() => {
      videoClone.play().catch(() => {});
    }, 100);
  } else {
    mainImage.classList.add('is-visible');
    mainImage.style.display = 'block';
  }
}
