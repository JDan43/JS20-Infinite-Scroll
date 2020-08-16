const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'q4PtJy-KDLb2vpOdXte3aRB8CD1iUOK_tq4VrEKiBl4';
const secretKey = 'E6gTCLR8QflsO1ndx4trbN3OqlJkw2TVeLXHxQwMlLQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper Function to Set Attributes on DOM Events
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    //item.setAttribute('href', photo.links.html);
    //item.setAttribute('target', '_blank'); // open in new tab
    // Refactor above 2 items
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    //img.setAttribute('src', photo.urls.regular);
    //img.setAttribute('alt', photo.alt_description);
    //img.setAttribute('title', photo.alt_description);
    // Refactor above 3 items
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished Loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error here
  }
}

// Check to see of scrolling is near bottom of page.
// If so, Load more photos
// window.innerHeight = total height of browser window
//    Is constant unless window is re-sized
// window.scrollY = Distance from top of page user has scrolled
window.addEventListener('scroll', () => {
  // 1000 pixels is normally less than window height
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
