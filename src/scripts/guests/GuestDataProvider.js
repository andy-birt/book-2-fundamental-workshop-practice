let guests = [];

export const saveGuest = formBody => {
  return fetch('http://localhost:8088/guests', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formBody)
  }).then(getGuests)
}

export const getGuests = () => {
  return fetch('http://localhost:8088/guests')
  .then(res => res.json())
  .then(data => guests = data);
}

export const useGuests = () => {
  return guests.slice();
}