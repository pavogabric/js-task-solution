// Pravimo GRID 10x10 I DODAJEMO GA U HTML

const gridContainer = document.querySelector('.grid-container');

const makeGrid = () => {
    
    for(let i=1; i < 101; i++) {
        let item = `${i}`
        let gridItem = document.createElement('span');
        gridItem.classList.add(`item-${i}`);
        gridItem.innerHTML = item;
        gridContainer.appendChild(gridItem);
    }
}

makeGrid();

// Pravimo funkciju selectNumber() koja uzima broj iz matrice i isti proslijeduje funkciji sum()

// *funkcija selectNumber() prvo provjera da li imamo crveno i zeleno obojena polja od prethodnog odabira
// te ukoliko ima ta polja "čisti"

const selectNumber = (e) => {
    const redNumber = gridContainer.querySelector('span.red')
    const greenNumbers = gridContainer.querySelectorAll('span.green')
        if(redNumber === null) {
            e.target.classList.add('red');
            
        } else {
            redNumber.classList.remove('red');
            greenNumbers.forEach(num => {
                num.classList.remove('green');
            })
            e.target.classList.add('red');
        }
        const selectedNum = parseInt(e.target.innerHTML)
        sum(selectedNum);
}

// Dodjeljujemo svakom broju funkciju selectNumber() koja se aktivira klikom

const items = document.getElementsByTagName('span');

    for(let i=0; i < items.length; i++) {
        items[i].addEventListener('click', (e) => {
            selectNumber(e)
        })
    }

// Kao sto smo naveli, klikom na broj aktivira se funkcija selectNumber() koja proslijeduje odabrani broj funkciji sum()

const sum = (num) => {

    const matrix = [
        [1,  2,  3,  4,  5,  6,  7,  8,  9,  10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
        [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        [91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    ];

    // Odabrani broj trazimo u matrici. Nakon pronalaska spremamo njegove "koordinate".
    let coords;

    for(let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[i].length; j++){
            if(matrix[i][j] === num){
                coords = {
                    row: i,
                    col: j
                }
            }
        }
    }
    const {row, col} = coords;

    // "Koordinate" odabranog broja proslijedujemo kako bismo, na osnovu njih, izracunali ostale vrijednosti.
    
    const center = num;
    const left = (col - 1 < 0) ? 0 : matrix[row][col - 1];
    const right = (col + 1 > matrix[row].length - 1) ? 0 : matrix[row][col + 1];
    const below = (row + 1 > matrix.length - 1) ? 0 : matrix[row + 1][col];
    const above = (row - 1 < 0) ? 0 : matrix[row - 1][col];
    const leftTop = (row - 1 < 0 || col - 1 < 0) ? 0 : matrix[row - 1][col - 1];
    const rightTop = (row - 1 < 0 || col + 1 > matrix[row].length - 1) ? 0 : matrix[row - 1][col + 1];
    const leftBottom = (row + 1 > matrix[row].length - 1 || col - 1 < 0) ? 0 : matrix[row + 1][col - 1];
    const rightBottom = (row + 1 > matrix[row].length - 1 || col + 1 > matrix[row].length - 1) ? 0 : matrix[row + 1][col + 1];

    // Nakon sto smo dobili sve vrijednoste, iste mozemo iskoristi kako bi smo ih nasli u HTML-u i obojali
    // Odabrani broj oznacavamo sa crvenom pozadinom, a brojeve koji ga okruzuju sa zelenom pozadinom.

    if(center > 0) {
        gridContainer.querySelector(`.item-${center}`).classList.add('red');
    }
    if(left > 0) {
        gridContainer.querySelector(`.item-${left}`).classList.add('green');
    }
    if(right > 0) {
        gridContainer.querySelector(`.item-${right}`).classList.add('green');
    }
    if(below > 0) {
        gridContainer.querySelector(`.item-${below}`).classList.add('green');
    }
    if(above > 0) {
        gridContainer.querySelector(`.item-${above}`).classList.add('green');
    }
    if(leftTop > 0) {
        gridContainer.querySelector(`.item-${leftTop}`).classList.add('green');
    }
    if(rightTop > 0) {
        gridContainer.querySelector(`.item-${rightTop}`).classList.add('green');
    }
    if(leftBottom > 0) {
        gridContainer.querySelector(`.item-${leftBottom}`).classList.add('green');
    }
    if(rightBottom > 0) {
        gridContainer.querySelector(`.item-${rightBottom}`).classList.add('green');
    }

    // Sve vrijednosti zbrajamo i dobijamo sumu.

    const sum = center + left + leftTop + rightTop + leftBottom + rightBottom + right + below + above;
    
    // Sumu dodajemo u HTML
    document.querySelector('.result').innerHTML = sum;
}
