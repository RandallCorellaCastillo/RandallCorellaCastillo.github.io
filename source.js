matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]
points = 0;
var terminado = false;
Valores = [2, 4]
movements = 0;
var iniciar = true;

//cronometro
tiempoRef = Date.now()
acumulado = 0



set();
set();
drawMatrix();
drawPoints();

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }

    isFull();
    if (terminado){
      end("Game over");
      return;
    }
    let myAudio = document.querySelector('#audio')
    myAudio.play()
    cronometer();
    switch (event.key) {
      case "ArrowDown":
        // code for "down arrow" key press.
        movements++;
        fixDown();
        fixDown();
        fixDown();
        fixDown();
        set();
        drawMatrix();
        drawPoints();
        drawMovements();
        break;
      case "ArrowUp":
        // code for "up arrow" key press.
        movements++;
        fixUp();
        fixUp();
        fixUp();
        fixUp();
        set();
        drawMatrix();
        drawPoints();
        drawMovements();
        break;
      case "ArrowLeft":
        // code for "left arrow" key press.
        movements++;
        fixLeft();
        fixLeft();
        fixLeft();
        fixLeft();
        set();
        drawMatrix();
        drawPoints();
        drawMovements();
        break;
      case "ArrowRight":
        movements++;
        fixRight();
        fixRight();
        fixRight();
        fixRight();
        set();
        drawMatrix();
        drawPoints();
        drawMovements();
        // code for "right arrow" key press.
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    if (ifWin()) {
      //
      terminado = true;
      end("Win");
      return;
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

   
//set matrix in html
function drawMatrix() {
  //console.log(matrix)
  var count = 1;
  for (let x in matrix) {
    for (let y in matrix) {
      var text =  matrix[x][y];
      if (text != 0) {
        document.getElementById(count).innerHTML = text;
      } else {
        document.getElementById(count).innerHTML = "";
      }
      count++;
    }
  }
}

function drawPoints() {
  document.getElementById(0).innerHTML = points;
}

function drawMovements() {
  document.getElementById("move").innerHTML = movements;
}

function functionReset() {
  clear();
  set();
  set();
  drawPoints();
  drawMatrix();
  movements = 0;
  drawMovements();
  acumulado = 0;
  iniciar = false;
}

function end(text) {
  if (terminado) {
    
    var timeX = document.getElementById("tiempo").textContent;
    var resF = text + "\n" + "Time:" + timeX +"\nMovements: " +  movements + "   Count of pieces: " + countTotal();
    document.getElementById("stats").innerHTML = resF;
    
    this.document.getElementById("Game Over").style.display = "block";

    /*
    fillMatrixInit();
    drawMatrix();
    */
    var gameOver = document.getElementById("Game Over");
    window.onclick = function(event) {
      if (event.target == gameOver) {
        gameOver.style.display = "none";
        clear();
        set();
        set();
        drawMatrix();
        terminado = false;
        movements = 0;
        drawMovements();
        iniciar = false;
      }
    }
  }
}


// set numbers in empty boxes
function set() {
  switchCondition = true;
  count = 0;
  while (switchCondition) {
    firstN = randomNumber(4);
    secondN = randomNumber(4);
    number = Valores[randomNumber(2)];
    if (matrix[firstN][secondN] == 0) {
      switchCondition = false;
      matrix[firstN][secondN] = number;
    }
    for (let x in matrix) {
      for (let y in matrix) {
        if (matrix[x][y] == 0) {
          count++;
        }
      }
    }
    if (count == 0) {
      switchCondition = false;
    }
  }
}

function isFull() {
  count = 0;
  for (x = 0; x<4; x++) {
    for (y = 0; y<4; y++) {
      if (x < 3) {
        if (parseInt(matrix[x][y]) == parseInt(matrix[x+1][y])) {
          count++;
        }
        if (parseInt(matrix[x][y]) == parseInt(matrix[x][y+1])) {
          count++;
        }
      }
      if (matrix[x][y] == 0) {
        count++;
      }
      if (y > 0) {
        if (parseInt(matrix[x][y]) == parseInt(matrix[x][y-1])) {
          count++;
        }
      }
      if (y == 3 && x != 3) {
        if (parseInt(matrix[x][y]) == parseInt(matrix[x+1][y])) {
          count++;
        } 
      }
    }
  }
  if (count == 0) {
    terminado = true;
    console.log("No movements");
  }
}

//create a rand number.
function randomNumber(max) {
  let value = Math.random() * max;
  var valueF = Math.floor(value);
  return valueF;
}
//fill matrix start game
function clear() {
  for (let x in matrix) {
    for (let y in matrix) {
      matrix[x][y] = 0;
    }
  }
  document.getElementById(0).innerHTML = 0;
  points = 0;
  acumulado = 0;
}

//finish game 
function ifWin() {
  switchW = false;
  for (let x in matrix) {
    for (let y in matrix) {
      if (matrix[x][y] == 2048) {
        switchW = true;
      }
    }
   }
  return switchW;
}

//Count boxes 
function countTotal() {
  count = 0;
  for (let x in matrix) {
    for (let y in matrix) {
      count += matrix[x][y]; 
    }
   }
  return count;
}

// fix the up option
function fixUp() {
  for (let x in matrix) {
    for (let y in matrix) {
      var text =  matrix[x][y];
      if (text != 0) { // if the position of matrix is not null
        //if find a number
        var switchW = true;
        count = 1;
        while(switchW) { //cicle of movements
          if (x - count >= 0) { //if not index
            if (matrix[x - count][y] != 0) { //if position is not null
              
              if (matrix[x - count][y] == matrix[x - count + 1][y]) {
                matrix[x - count][y] = (matrix[x - count + 1][y]) * 2;
                points += (matrix[x - count + 1][y]) * 2;//count of points
                matrix[x - count + 1][y] = 0;
                count++;
                //
              } else {
                //close cicle
                switchW = false;

              }
              
            } else { //if the position is null.
              matrix[x - count][y] = matrix[x - count + 1][y];
              matrix[(x - count) + 1][y] = 0;
              count++;
            }
          } else{ // if the position is ocuped.
            switchW = false;
          }
        }
      }
    }
  }
}
//fix down option+
function fixDown() {
  for (let x in matrix) {
    for (let y in matrix) {
      var text =  matrix[x][y];
      if (text != 0) { // if the position of matrix is not null
        //if find a number
        var switchW = true;
        countD = 1;
        while(switchW) { //cicle of movements

          res = parseInt(countD, 10) + parseInt(x, 10);

          if (res < 4) { //if not index
            if (matrix[res][y] != 0) { //if position is not null
              
              if (matrix[res][y] == matrix[res - 1][y]) {
                matrix[res][y] = (matrix[res - 1][y]) * 2;
                points += (matrix[res - 1][y]) * 2; //count of points
                matrix[res - 1][y] = 0;
                countD++;
              } else {
                //close cicle
                switchW = false;
              }
              
              countD++;
            } else { //if the position is null.
              matrix[res][y] = matrix[res - 1][y];
              matrix[res - 1][y] = 0;
              countD++;
            }
          } else{ // if the position is ocuped.
            switchW = false;
          }
        }
      }
    }
  }
}

//fix right option+
function fixRight() {
  for (let x in matrix) {
    for (let y in matrix) {
      var text =  matrix[x][y];
      if (text != 0) { // if the position of matrix is not null
        //if find a number
        var switchW = true;
        countD = 1;
        while(switchW) { //cicle of movements

          res = parseInt(countD, 10) + parseInt(y, 10);

          if (res < 4) { //if not index
            if (matrix[x][res] != 0) { //if position is not null
              
              if (matrix[x][res] == matrix[x][res - 1]) {
                matrix[x][res] = (matrix[x][res - 1]) * 2;
                points += (matrix[x][res - 1]) * 2;
                matrix[x][res - 1] = 0;
                countD++;
              } else {
                //close cicle
                switchW = false;
              }
              
              countD++;
            } else { //if the position is null.
              matrix[x][res] = matrix[x][res - 1];
              matrix[x][res - 1] = 0;
              countD++;
            }
          } else{ // if the position is ocuped.
            switchW = false;
          }
        }
      }
    }
  }
}

//fix left option+
function fixLeft() {
  for (let x in matrix) {
    for (let y in matrix) {
      var text =  matrix[x][y];
      if (text != 0) { // if the position of matrix is not null
        //if find a number
        var switchW = true;
        countD = 1;
        while(switchW) { //cicle of movements

          res = parseInt(y, 10) - parseInt(countD, 10);
          if (res >= 0) { //if not index
            if (matrix[x][res] != 0) { //if position is not null
              if (matrix[x][res] == matrix[x][res + 1]) {
                matrix[x][res] = (matrix[x][res + 1]) * 2;
                points += (matrix[x][res + 1]) * 2;
                matrix[x][res + 1] = 0;
                countD++;
              } else {
                //close cicle
                switchW = false;
              }
              
              countD++;
            } else { //if the position is null.
              matrix[x][res] = matrix[x][res + 1];
              matrix[x][res + 1] = 0;
              countD++;
            }
          } else{ // if the position is ocuped.
            switchW = false;
          }
        }
      }
    }
  }
}

//creditos:  https://www.youtube.com/watch?v=EkS5AIqednw&t=243s
function cronometer() {
  iniciar = true;
  setInterval(() => {
    tiempo = document.getElementById("tiempo")
    if (iniciar) {
        acumulado += Date.now() - tiempoRef
    }
    tiempoRef = Date.now()
    tiempo.innerHTML = formatear(acumulado)
  }, 1000/60)

  function formatear(tiempo_ms) {
    MS = tiempo_ms % 1000    
    St = Math.floor(((tiempo_ms - MS) / 1000))
    S = St%60
    M = Math.floor((St / 60) % 60)
    H = Math.floor((St/60 / 60))
    Number.prototype.ceros = function (n) {
        return (this + "").padStart(n, 0)
    }

    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2)
        + "." + MS.ceros(3)
  }

}