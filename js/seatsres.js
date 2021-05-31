const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const id = localStorage.getItem('film_id');
let miejsce =[];
let miejsce2 =[];
let rezerwujmiejsce =[];
fetch('http://localhost:8081/cinema/reservations/' + id)
    .then(resp =>resp.json())
    .then(resp =>{
      if(resp.length !== 0){
        resp.forEach(n =>{
          miejsce.push(n);
        })
        miejsce.forEach( n =>{
          document.getElementById(n.id).classList.add('occupied');
        })
      }
    })

const przycisk = document.querySelector('.przyciskzagłady');

przycisk.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('Test wypisywania miejsc')
    for (let i=0;i<rezerwujmiejsce.length;i++){
      console.log(rezerwujmiejsce[i])
    }

    let formularz_email = document.forms['formularz']['email'].value;


    console.log(formularz_email , id , rezerwujmiejsce[0]);
    let list = [];
    rezerwujmiejsce.forEach(n =>{
      list.push({
        "email": formularz_email,
        "playing_id": id,
        "seat_id": n});
        })


  $.ajax({
    url: 'http://localhost:8081/cinema/reservations',
    type: 'POST',
    data: JSON.stringify(
        list),
    contentType: 'application/json; charset=utf-8',
     success: function (link){
    console.log('Udałlo sie kupic bilet');
         alert('Udało Ci się zarezerwować bilet');

    },
    error: function (){
      fetch('http://localhost:8081/cinema/seats')
          .then(resp => resp.json())
          .then(resp => {
            console.log('wystapił bład');
              alert('Nie udało Ci się zarezerwować bilet');
          });
    }
  });

})

// Event Listeners // Seat Click Event

container.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
})

function updateSelectedCount() {
  let selectedSeats = document.querySelectorAll('.row .seat.selected');
  //console.log(selectedSeats);
  rezerwujmiejsce =[];
  for (let i=0;i<selectedSeats.length;i++){
    console.log(selectedSeats[i].getAttribute('id'));
    rezerwujmiejsce.push(selectedSeats[i].getAttribute('id'));
  }
}


