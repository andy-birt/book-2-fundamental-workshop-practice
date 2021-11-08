import { GuestList } from "../guests/GuestList.js";
import { getFoods } from "./FavoriteFoodsDataProvider.js";

const FoodOptions = f => {
  return f.map( dish => `<option value="${f.id}">${dish.name}</option>`);
}

export const FoodSelect = () => {
  
  getFoods().then(foods => {
    // Render FoodSelect in the Form
    document.getElementById('food-select-container').innerHTML = render(foods);

    // Render FoodSelect in the Filter Container
    document.getElementById('food-filter-container').innerHTML = render(foods);
  });

}

const render = foods => {
  return `
    <select id="guest_favorite-dish">
      <option value="0">Select Favorite Dish</option>
      ${FoodOptions(foods)}
    </select>
  `;
}

document.getElementById('food-filter-container').addEventListener('change', e => {
  if (e.target.id === 'guest_favorite-dish') {
    GuestList('favoriteDish', e.target.selectedOptions[0].text);
  }
});