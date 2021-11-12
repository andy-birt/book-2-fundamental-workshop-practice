// Guest
// "id": 1,
// "name": "John Stamos",
// "age": 58,
// "favoriteDish": "Sweet Potatoes" ,
// "rightHanded": true,
// "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswV8rkX_9XlysOOUTijtVzzLvvpGHynHcQQ&usqp=CAU"

import { FoodSelect } from "../favoriteFoods/FoodSelect.js";
import { saveGuest } from "./GuestDataProvider.js";
import { GuestList } from "./GuestList.js";

const addImageUrlAssets = (image = '') => {
  // Initialize a counter for each guest image
  const imageCount = document.querySelectorAll('.guest_image').length + 1;
  // Create an input for each image url
  const newImageInput = document.createElement('input');
  // An option to remove the image since there's an add button
  const removeImageButton = document.createElement('button');
  // Allow the inputs to stack
  const lineBreak = document.createElement('br');

  // Set attributes and value for image input
  newImageInput.id = `guest_image-url-${imageCount}`;
  newImageInput.className = 'guest_image';
  newImageInput.type = 'text';
  newImageInput.value = image;

  // Give the remove button some context
  removeImageButton.textContent = 'X';

  // Append the new elements to the .guest_images tag
  document.querySelector('.guest_images').append(newImageInput, removeImageButton, lineBreak);
  // Take user back to the form section...
  // Don't want to scroll back manually...
  // That would be lame
  window.scrollTo(0, 0);
  // Finally, add a listener that will remove these elements
  // if the user decides to delete image url
  removeImageButton.addEventListener('click', e => {
    e.preventDefault();
    newImageInput.remove();
    removeImageButton.remove();
    lineBreak.remove();
  });
}

const submitHandler = (e) => {
  if (e.target.id === 'save-guest') {
    e.preventDefault();
    const newGuest = getGuestFormFields();

    setGuestFormFields({ id: '', name: '', age: '', favoriteDish: '0', rightHanded: false, imageUrl: ['']});

    saveGuest(newGuest)
    .then(GuestList);
  }

  // Not sure why I had to add this here
  // I had to add this to make the form 
  // work the way I want it to without
  // creating an invalid guest after editing one
  if (e.target.id === 'edit-guest') {
    e.target.id = 'save-guest';
    e.target.value = 'Save Guest';
  }
}

export const setGuestFormFields = (guest) => {
  // id=guest_id type="number"
  document.querySelector('#guest_id').value = guest.id;
  // id=guest_name type="text"
  document.querySelector('#guest_name').value = guest.name;
  // id=guest_age type="number"
  document.querySelector('#guest_age').value = guest.age;
  // id=guest_favorite-dish type="select"
  document.querySelector(`#guest_favorite-dish option[value="${guest.favoriteDish}"]`).selected = true;
  // id=guest_right-handed type="checkbox"
  document.querySelector('#guest_right-handed').checked = guest.rightHanded;
  
  // For images we'll clear the innerHTML and just populate
  // according to the values within the db
  document.querySelector('.guest_images').innerHTML = '';
  // <div class="guest_images">
  //   <input id="guest_image-url-1" class="guest_image" type="text"><br>
  // </div>
  guest.imageUrl.forEach( image => addImageUrlAssets(image));
}

export const getGuestFormFields = () => {
  // Return values in a similar fashon like was done in glassdale
  // I did this in my journal and it works well
  // I do this to avoid rerendering the form
  // I didn't need to in this project but I think its good practice
  return {
    id: document.querySelector('#guest_id').value,
    name: document.querySelector('#guest_name').value,
    age: document.querySelector('#guest_age').value,
    favoriteDish: document.querySelector('#guest_favorite-dish').value,
    rightHanded: document.querySelector('#guest_right-handed').checked,
    imageUrl: Array.from(document.querySelectorAll('.guest_image')).map( element => element.value )
  }
}

export const GuestForm = () => {
  return `
    <form action="/">
      <label>Name:</label><br>
      <input id="guest_name" type="text"><br>
      <label>Age:</label><br>
      <input id="guest_age" type="number"><br>
      <label>Favorite Dish:</label><br>
      <div id="food-select-container"></div>
      <label>Right Handed:</label>
      <input id="guest_right-handed" type="checkbox" value="false"><br>
      <label>Image URL:</label><br>
      <div class="guest_images">
        <input id="guest_image-url-1" class="guest_image" type="text"><br>
      </div>
      <input id="guest_id" type="number" value="" hidden>
      <button id="add-image">Add Image</button><br>
      <input id="save-guest" type="submit" value="Save Guest" disabled>
    </form>
  `;
}

// Add image button event listener
document.getElementById('form-container').addEventListener('click', e => {
  if (e.target.id === 'add-image') {
    e.preventDefault();
    addImageUrlAssets();
  }
});

// Disable Submit if fields have invalid values
document.getElementById('form-container').addEventListener('change', e => {
  const availableActionElement = document.getElementById('save-guest') ? document.getElementById('save-guest') : document.getElementById('edit-guest');
  
  if ( 
    document.getElementById('guest_name').value                                 === '' || 
    document.getElementById('guest_age').value                                  === '' ||
    document.getElementById('guest_favorite-dish').selectedOptions[0].text      === 'Select Favorite Dish' ||
    Array.from(document.querySelectorAll('.guest_image')).filter(gi => gi.value === '').length
  ) {
    availableActionElement.disabled = true;
  } else {
    availableActionElement.disabled = false;
  }
});

// Form Submit
document.getElementById('form-container').addEventListener('click', submitHandler);