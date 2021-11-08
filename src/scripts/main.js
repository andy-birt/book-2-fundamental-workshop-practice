import { FoodSelect } from "./favoriteFoods/FoodSelect.js";
import { GuestForm } from "./guests/GuestForm.js";
import { GuestList } from "./guests/GuestList.js";
import { Search } from "./search/Search.js";


document.getElementById('form-container').innerHTML = GuestForm();
GuestList();
FoodSelect();
document.getElementById('search-bar').innerHTML = Search();