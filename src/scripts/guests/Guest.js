// Guest
// "id": 1,
// "name": "John Stamos",
// "age": 58,
// "favoriteDish": "Sweet Potatoes" ,
// "rightHanded": true,
// "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswV8rkX_9XlysOOUTijtVzzLvvpGHynHcQQ&usqp=CAU"

const Images = images => {
  return images.map(image => `<img src=${image}/>`);
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
    </div>
  `;
}