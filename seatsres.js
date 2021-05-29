const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')
const id = localStorage.getItem('film_id');
let miejsce =[];
fetch('http://localhost:8081/test/reservation/' + id)
    .then(resp =>resp.json())
    .then(resp =>{
      if(resp.length !== 0){
        resp.forEach(n =>{
          miejsce.push(n);
        })
        miejsce.forEach( n =>{
          console.log(n);
        })
      }
    })


//

// Event Listeners // Seat Click Event

container.addEventListener('click', function (e) {
  console.log(e.target)
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    console.log(e.target)
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
})



function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  console.log(selectedSeats)
  const selectedSeatsCount = selectedSeats.length
  console.log(selectedSeatsCount)
}