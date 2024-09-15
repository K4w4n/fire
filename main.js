const table = document.getElementById('table');

const width = 59;
const height = 56;

const colorsIntensity = [
    '#000000',
    '#500F01',
    '#CF4C02',
    '#FF9C3A',
    '#FBE47C',
    '#FEFCE8',
    '#FBFEF9',
    '#FFFFFF',
];

const generateRandomIntensity = () => Math.round(Math.random() * (colorsIntensity.length - 1))

let matrix = Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));

const generateRandomMatrix = () => {
    return Array(height)
        .fill(0)
        .map(() => Array(width).fill(0).map(generateRandomIntensity));
}
function updateMatrix() {

    for (let x = 0; x < width; x++) {

        for (let y = 0; y < height; y++) {

            const isFirstLine = y === (height - 1);
            const isLastColumn = x === (width - 1);

            if (isFirstLine) {
                const randomBoolean = Math.random() > 0.1;
                matrix[y][x] = randomBoolean ? 7 : 6;
            } else {
                const decay = Math.floor(Math.random() *3);
                const windstorm = Math.random() < 0.2;
                matrix[y][x] = Math.max(0, matrix[y + 1][x] - decay);
                matrix[y][x] = windstorm ? (isLastColumn ? matrix[y][x] : Math.max(matrix[y][x], matrix[y][x + 1])) : matrix[y][x];
            }

            // matrix[y][x] = Math.max(0, colorsIntensity.length - 1 - Math.max(0, height - y - 1));

        }
    }

    console.log(new Set([...matrix.flat()]))
    // matrix = generateRandomMatrix();
}

function drawTable(table) {
    table.innerHTML = '';

    for (let row = 0; row < height; row++) {

        const rowElement = document.createElement('div');
        rowElement.classList.add('table-row');

        for (let col = 0; col < width; col++) {
            const cell = document.createElement('div');
            const intensity = matrix[row][col]

            cell.style.backgroundColor = colorsIntensity[intensity];
            cell.style.color = intensity >= 4 ? '#000000' : '#ffffff';
            // cell.textContent = intensity;
            cell.classList.add('cell');

            rowElement.appendChild(cell);
        }

        table.appendChild(rowElement);
    }
}

setInterval(() => {
    updateMatrix();
    drawTable(table);
}, 100);