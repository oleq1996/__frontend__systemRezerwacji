console.log("dupcia");
const repertuarFilm = document.getElementById('repertuarFilm');
const selectDay = document.querySelectorAll(".kwadrat");

selectDay.forEach(n => {
    n.addEventListener('click', function () {
        wybrane(n.getAttribute('id'));
    })
})

fetch('http://localhost:8081/test/videos')
    .then(resp => resp.json())
    .then(resp => {
        if (resp.length !== 0) {
            let seans = [];
            console.log(resp);
            resp.forEach(n => {
                seans.push(n);
            })
            resp = seans;
            for (let i = 0; i < seans.length; i++) {
                console.log(seans[i]);
                repertuarFilm.innerHTML += '<div class="opisfilmu">\n' +
                    '    <div class="zdj">\n' +
                    '        <img class="plakat " src="' + resp[i].url_poster + '">' +
                    '    </div>\n' +
                    '\n' +
                    '    <div class="informacje">\n' +
                    '        <div class="tytul">\n' +
                    '            <h1> ' + resp[i].title + ' </h1>\n' +
                    '        </div>\n' +
                    '        <div class="time">\n' +
                    '            <h1> ' + resp[i].duration + '</h1>\n' +
                    '        </div>\n' +
                    '        <div class="info" >\n' +
                    '            <h1> ' + resp[i].description + '</h1>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
                // repertuarFilm.innerHTML += '<h1 class="title">' + resp[i].title + '</h1>';
                // repertuarFilm.innerHTML += '<h3 class="czas" id="szczegoly">' + resp[i].duration + '</h3>';
                // repertuarFilm.innerHTML +=  '<img  class="plakat" src="' + resp[i].url_poster + '"></img>';
                // repertuarFilm.innerHTML += '<h4 class="opis">' + resp[i].description + '</h4>';
            }
        }
    })

function wybrane(data) {
    let seans = [];
    let seans2 =[];
    let seanseDzisiaj = [];
    repertuarFilm.innerHTML = '';
    console.log('gandi dupcia');
    fetch('http://localhost:8081/test/videos')
        .then(resp => resp.json())
        .then(resp => {
            if (resp.length !== 0) {
                console.log(resp, 'help');
                resp.forEach(n => {
                    seans.push(n);
                })
                resp = seans;



                fetch('http://localhost:8081/test/playing')
                    .then(resp2 => resp2.json())
                    .then(resp2 =>{
                        if(resp2.length !== 0){
                            console.log(resp2,'coto ');
                            resp2.forEach(n2 =>{
                                seans2.push(n2);
                            })
                            resp2 =seans2;
                        }
                        console.log(seans, 'check next ');
                        console.log(seans2, 'cycki');

                        for (let i=0;  seans2.length > i; i++){
                            if(seans2[i].date === data){
                                seanseDzisiaj.push(seans2[i]);
                            }
                        }
                        if(seanseDzisiaj.length === 0) {
                            repertuarFilm.innerHTML += '<h1>Dziś nic nie gramy</h1>';
                        }

                        for (let i= 0; i<seanseDzisiaj.length; i++) {

                            let cos = seanseDzisiaj[i].video_id;
                            console.log(seans[cos].title);
                            repertuarFilm.innerHTML += '<div class="opisfilmu">\n' +
                                '    <div class="zdj">\n' +
                                '        <img class="plakat" src="' + seans[cos].url_poster +'">' +
                                '    </div>\n' +
                                '\n' +
                                '    <div class="informacje">\n' +
                                '        <div class="tytul">\n' +
                                '            <h1> ' + seans[cos].title + ' </h1>\n' +
                                '        </div>\n' +
                                '        <div class="time">\n' +
                                '            <h1> ' + seans[cos].duration + '</h1>\n' +
                                '        </div>\n' +
                                '        <div class="info" >\n' +
                                '            <h1> ' + seans[cos].description + '</h1>\n' +
                                '        </div>\n' +
                                '        <a href="reservation.html"><button class="cycuszki" id="'+seanseDzisiaj[i].video_id+'" type="button">DUPCIA</button></a>' //zmienic potem :D
                                '    </div>\n' +
                                '</div>';

                        }
                        const rezerw = document.querySelectorAll('.cycuszki');
                        rezerw.forEach(n =>{
                            n.addEventListener('click', function (){
                                localStorage.clear();
                                localStorage.setItem('film_id', n.getAttribute('id'));
                                console.log(n.getAttribute('id'));

                            });
                        })

                    })

            }
        })
}
