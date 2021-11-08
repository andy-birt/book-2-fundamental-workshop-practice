let foods = [];

export const getFoods = () => {
  return fetch('http://localhost:8088/foods')
  .then(res => res.json())
  .then(data => foods = data);
}

export const useFoods = () => {
  return foods.slice();
}