import { galleryItems } from './gallery-items.js';


const galleryMarket = document.querySelector('.gallery');

const galleryPick = galleryItems.map(({ preview, original, description }) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
`).join('');

galleryMarket.innerHTML = galleryPick;

galleryMarket.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryImage = event.target.classList.contains('gallery__image');
  
  if (!isGalleryImage) {
    return;
  }

  const largeImageUrl = event.target.dataset.source;

  openModal(largeImageUrl);
}

function openModal(imageUrl) {
  const instance = basicLightbox.create(`
    <img src="${imageUrl}">
  `);

  instance.show();

  document.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress(event) {
    if (event.key === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', onEscKeyPress);
    }
  }
}
