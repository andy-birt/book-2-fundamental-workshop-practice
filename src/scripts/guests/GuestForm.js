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

export const GuestForm = () => {
  return `
    <form action="/">
      <label>Name:</label><br>
      <input id="guest_name" type="text"><br>
      <label>Age:</label><br>
      <input id="guest_age" type="text"><br>
      <label>Favorite Dish:</label><br>
      <div id="food-select-container"></div>
      <label>Right Handed:</label>
      <input id="guest_right-handed" type="checkbox" value="false"><br>
      <label>Image URL:</label><br>
      <div class="guest_images">
        <input id="guest_image-url-1" class="guest_image" type="text"><br>
      </div>
      <button id="add-image">Add Image</button><br>
      <input id="save-guest" type="submit" value="Save Guest" disabled>
    </form>
  `;
}

// Add image
document.getElementById('form-container').addEventListener('click', e => {
  if (e.target.id === 'add-image') {
    e.preventDefault();
    const imageCount = document.querySelectorAll('.guest_image').length + 1;
    const newImageInput = document.createElement('input');
    newImageInput.id = `guest_image-url-${imageCount}`;
    newImageInput.className = 'guest_image';
    newImageInput.type = 'text';
    document.querySelector('.guest_images').append(newImageInput);
  }
});

// Disable Submit
document.getElementById('form-container').addEventListener('change', e => {
  if ( 
    document.getElementById('guest_name').value                                 === '' || 
    document.getElementById('guest_age').value                                  === '' ||
    document.getElementById('guest_favorite-dish').selectedOptions[0].text      === 'Select Favorite Dish' ||
    Array.from(document.querySelectorAll('.guest_image')).filter(gi => gi.value === '').length
  ) {
    document.getElementById('save-guest').disabled = true;
  } else {
    document.getElementById('save-guest').disabled = false;
  }
});

// Form Submit
document.getElementById('form-container').addEventListener('click', e => {
  if (e.target.id.startsWith('save')) {
    e.preventDefault();

    const formBody = {
      name: document.getElementById('guest_name').value,
      age: document.getElementById('guest_age').value,
      favoriteDish: document.getElementById('guest_favorite-dish').selectedOptions[0].text,
      rightHanded: document.getElementById('guest_right-handed').checked,
      imageUrl: Array.from(document.querySelectorAll('.guest_image')).map(gi => gi.value)
    }

    document.getElementById('guest_name').value = '';
    document.getElementById('guest_age').value = '';
    document.getElementById('guest_favorite-dish').value = '';
    document.getElementById('guest_right-handed').checked = false;
    document.querySelector('.guest_images').innerHTML = '<input id="guest_image-url-1" class="guest_image" type="text"><br>';

    saveGuest(formBody)
    .then(GuestList);
  }
});