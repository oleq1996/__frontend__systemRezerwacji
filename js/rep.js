
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
                    '            <h1>'  + resp[i].title + ' </h1>\n' +
                    '        </div>\n' +
                    '        <div class="time">\n' +
                    '            <h1>Czas trwania: ' + resp[i].duration + '</h1>\n' +
                    '        </div>\n' +
                    '       <div class="premiera" >\n' +
                    '            <h1>' + resp[i].genre+ ' | Od lat: ' + resp[i].age_restriction+ '</h1>\n' +
                    '        </div>\n' +
                    '       <div class="premiera" >\n' +
                    '            <h1> Data premiery:  ' + resp[i].premiere_year + '</h1>\n' +
                    '        </div>\n' +
                    '       <div class="premiera" >\n' +
                    '            <h1> Język:  ' + resp[i].language + '</h1>\n' +
                    '        </div>\n' +
                    '        <div class="info" >\n' +
                    '            <h1> Opis filmu:  ' + resp[i].description + '</h1>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';

            }
        }
    })

function wybrane(data) {
    let seans = [];
    let seans2 =[];
    let seanseDzisiaj = [];
    repertuarFilm.innerHTML = '';
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
                                '            <h1>'  + seans[cos].title + ' </h1>\n' +
                                '        </div>\n' +
                                '        <div class="time">\n' +
                                '            <h1>Czas trwania: ' + seans[cos].duration + '</h1>\n' +
                                '        </div>\n' +
                                 '       <div class="lata" >\n' +
                                '            <h1>' + seans[cos].genre+ ' | Od lat: ' + seans[cos].age_restriction+ '</h1>\n' +
                                            '        </div>\n' +
                                '       <div class="premiera" >\n' +
                                '            <h1> Data premiery:  ' + seans[cos].premiere_year + '</h1>\n' +
                                '        </div>\n' +
                                '       <div class="jezyk" >\n' +
                                '            <h1> Język:  ' + seans[cos].language + '</h1>\n' +
                                '        </div>\n' +
                                '        <div class="info" >\n' +
                                '            <h1> Opis filmu:  ' + seans[cos].description + '</h1>\n' +
                                '        </div>\n' +
                                '        <div class="info" >\n' +
                                '            <h1> Godzina rozpoczecia seansu:  ' + seanseDzisiaj[i].time+ '</h1>\n' +
                                '        </div>\n' +
                                '        <a href="reservation.html"><button class="rezer" id="'+seanseDzisiaj[i].id+'" type="button">Zarezerwuj</button></a>'
                                '    </div>\n' +
                                '</div>';

                        }
                        const rezerw = document.querySelectorAll('.rezer');
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
