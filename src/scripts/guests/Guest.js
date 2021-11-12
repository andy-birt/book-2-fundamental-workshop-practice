// Guest
// "id": 1,
// "name": "John Stamos",
// "age": 58,
// "favoriteDish": "Sweet Potatoes" ,
// "rightHanded": true,
// "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswV8rkX_9XlysOOUTijtVzzLvvpGHynHcQQ&usqp=CAU"

import { deleteGuest, editGuest, useGuests } from "./GuestDataProvider.js";
import { setGuestFormFields, getGuestFormFields} from "./GuestForm.js";
import { GuestList } from "./GuestList.js";

const Images = images => {
  return images.map(image => `<img src=${image}/>`).join('');
}

export const Guest = (g) => {

  const guestHandedness = g.rightHanded ? "Right Handed" : "Left Handed";

  return `
    <div class="guest-info">
      ${Images(g.imageUrl)}
      <h3>${g.name}</h3>
      <div>Age: ${g.age}</div>
      <div>Favorite Dish: ${g.favoriteDish}</div>
      <div>Handedness: ${guestHandedness}</div>
      <button id="edit--${g.id}">Edit</button>
      <button id="delete--${g.id}">Delete</button>
    </div>
  `;
}

const handleGuestEdit = (e) => {
  if (e.target.id.startsWith('edit')) {
    e.preventDefault();
    const guest = getGuestFormFields();
    editGuest(guest).then(GuestList);
    setGuestFormFields({ id: '', name: '', age: '', favoriteDish: '0', rightHanded: false, imageUrl: ['']});
  }
}

const editGuestForm = (el) => {
  const guestToEdit = useGuests().find( guest => guest.id.toString() === el.id.split('--')[1]);
  setGuestFormFields(guestToEdit);
  document.querySelector('#edit-guest').addEventListener('click', handleGuestEdit);
}

const deleteGuestEvent = (el) => {
  const [,guestId] = el.id.split('--');
  deleteGuest(guestId).then(GuestList);
}

document.querySelector('#container').addEventListener('click', e => {
  if (e.target.id.startsWith('edit--')) {
    const availableActionElement = document.getElementById('save-guest') ? document.getElementById('save-guest') : document.getElementById('edit-guest');
    availableActionElement.value = 'Edit Guest';
    availableActionElement.id = 'edit-guest';
    editGuestForm(e.target);
  }

  if (e.target.id.startsWith('delete--')) {
    if(confirm('Are you sure you want to delete guest?')) {
      deleteGuestEvent(e.target);
    }
  }
});