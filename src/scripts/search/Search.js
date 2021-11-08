import { GuestList } from "../guests/GuestList.js";

export const Search = () => {
  return `<input type="search" placeholder="Search for a guest...">`;
}

document.getElementById('search-bar').addEventListener('search', e => {
  GuestList('name', e.target.value);
});