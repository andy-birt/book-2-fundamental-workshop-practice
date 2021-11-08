import { Guest } from "./Guest.js";
import { getGuests, useGuests } from "./GuestDataProvider.js";

export const GuestList = (filterByType, filterValue) => {
  let guestHTML = '<h1>Guests</h1>';
  
  getGuests().then(() => {
    guestHTML += "<ul>";
    let guests = useGuests();
    if (filterByType === 'name' || filterByType === 'favoriteDish') {
      guests = useGuests().filter(g => g[filterByType].toLowerCase().includes(filterValue.toLowerCase()));
    }

    guests.forEach(g => guestHTML += `<li>${Guest(g)}</li>`);
    guestHTML += "</ul>";
    document.getElementById('container').innerHTML = guestHTML;
  });
}
