const images = [
  "images/ironman.jpg",
  "images/AoU_Hulk_01 (1).jpg",
  "images/blackwidow.png",
  "images/Captain-America-AOU-Render.jpg",
  "images/Hawkeye_Marvel.jpg",
  "images/Thor_Marvel.jpg",
];

const thumbNailImage = "/images/0e5ff160c652d000ebb409a754653d23.jpg";

const gameCards = document.getElementsByClassName("game-container__card");

const maxImageCount = 2;

const selectedImages = {};

const points = document.getElementsByClassName("points-value")[0];

const winMessage = document.getElementsByClassName('win-message')[0];

let pointsCounter = 0;

let imagesSelected = 0;

let swatchSelected = [];

let selectedCardImages = [];

let clickEnabled = true;

for (const gameCard of gameCards) {
  const cardImage = gameCard.querySelector("img");

  cardImage.setAttribute("data-value", getRandomImage());
}

for (const gameCard of gameCards) {
  gameCard.addEventListener("click", () => {

    if (!clickEnabled) {
      return; 
    }

    const cardImage = gameCard.querySelector("img");

    const swatchImage = cardImage.getAttribute("data-value");

    selectedCardImages.push(cardImage);

    cardImage.src = swatchImage;
    
    swatchSelected.push(swatchImage);

    imagesSelected++;

    if (imagesSelected === 2) {
      clickEnabled = false;
      if (swatchSelected[0] !== swatchSelected[1]) {

        for (let i = 0; i < selectedCardImages.length; i++) {

          const cardImageToUpdate = selectedCardImages[i];

          setTimeout(() => {
            cardImageToUpdate.src = thumbNailImage;
            clickEnabled = true;
          }, 1000);
        }
        imagesSelected = 0;

        swatchSelected = [];

        selectedCardImages = [];

      } else {
        pointsCounter++;

        points.innerHTML = pointsCounter;

        imagesSelected = 0;

        swatchSelected = [];

        selectedCardImages = [];

        clickEnabled = true;

        if (pointsCounter === 6) {
          winMessage.classList.replace('hide', 'show');
        }
      }
    }
  });
}


function getRandomImage() {
  const remainingImages = images.filter(

    (image) => !selectedImages[image] || selectedImages[image] < maxImageCount
  );

  const randomIndex = Math.floor(Math.random() * remainingImages.length);

  const selectedImage = remainingImages[randomIndex];

  if (!selectedImages[selectedImage]) {

    selectedImages[selectedImage] = 1;

  } else {
    selectedImages[selectedImage]++;
  }

  return selectedImage;
}

function reset() {
  location.reload();
}

