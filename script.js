let Jugador1 = true;
let GameOver = false;
let celdas = document.getElementsByClassName("celdas");
let Turno = document.getElementById("turnoJugador");

for (let i = 0; i < celdas.length; i++){
    celdas[i].addEventListener('click', movimientos);
}

function movimientos(e){
    if (GameOver) return;

    let valorCelda = e.target.innerHTML;
    if(!valorCelda.length){
        e.target.innerHTML = Jugador1 ? 'X' : 'O';
        Turno.innerHTML = Jugador1 ? 'O' : 'X';
        Jugador1 = !Jugador1;

        revisarLineas();
        if(!GameOver && Empate()){
            mostrarResultado("Empate");
            GameOver = true;
        }
    }
}

function revisarLineas(){
    revisarLinea(0, 1, 2);
    revisarLinea(3, 4, 5);
    revisarLinea(6, 7, 8);
    revisarLinea(0, 3, 6);
    revisarLinea(1, 4, 7);
    revisarLinea(2, 5, 8);
    revisarLinea(0, 4, 8);
    revisarLinea(6, 4, 2);
}

function revisarLinea(c1, c2, c3){
    if(
        celdas[c1].innerHTML.length &&
        celdas[c1].innerHTML == celdas[c2].innerHTML &&
        celdas[c2].innerHTML == celdas[c3].innerHTML
    ){
        mostrarResultado("Gana el jugador: " + celdas[c1].innerHTML);
        GameOver = true;
    }
}

function Empate(){
    for(let i = 0; i<celdas.length;i++){
        if(celdas[i].innerHTML === ""){
            return false;
        }
    }
    return true;
}

function mostrarResultado(resultado){
    let elementResultado = document.querySelector('.resultado');
    elementResultado.innerHTML = resultado;
    elementResultado.classList.add('show');
    document.getElementById('juego-nuevo').style.display = 'block';
}

function juegoNuevo() {
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].innerHTML = "";
    }
    let elementResultado = document.querySelector('.resultado');
    elementResultado.innerHTML = "";
    elementResultado.classList.remove('show'); 
    Jugador1 = true;
    GameOver = false; 
    Turno.innerHTML = 'X'; 
    document.getElementById('juego-nuevo').style.display = 'none'; 
}

document.getElementById('juego-nuevo').addEventListener('click', juegoNuevo);