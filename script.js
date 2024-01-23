document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||
        evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            move("w");
        } else {
            move("e");
        }
    } else if (yDiff > 0) {
        move("n");
    } else {
        move("s");
    }
    xDown = null;
    yDown = null;
};
function move(direction) {
    let board = [];

    for (let r = 0; r < 4; r++) {
        let row = [];
        for (let c = 0; c < 4; c++) {
            let v = document.getElementById((4 * r + c).toString()).textContent;
            row.push(v == ""? 0:parseInt(v));
        }
        board.push(row);
    }

    let newboard = board;

    if ((direction == "e") || (direction == "w")) {
        for (let r = 0; r < 4; r++) {
            let row = [];
            for (let c = 0; c < 4; c++) {
                row.push(newboard[r][c]);
            };
            newboard[r] = compress(direction, row);
        };
    } else {
        for (let r = 0; r < 4; r++) {
            let row = [];
            for (let c = 0; c < 4; c++) {
                row.push(newboard[c][r])
            };
            let compressed = compress(direction, row);
            for (let i = 0; i < 4; i++) {
                newboard[i][r] = compressed[i]
            };
        };
    };

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let element = document.getElementById((4 * r + c).toString());

            element.innerHTML = newboard[r][c];
            updateColors(element, newboard[r][c].toString())
        }
    };
    genRandomNumber(newboard);

    const totalMovesElement = document.getElementById("total-moves");
    totalMovesElement.textContent = (parseInt(totalMovesElement.textContent, 10) + 1).toString();

    const sum = newboard.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const scoreElement = document.getElementById("total-score");
    scoreElement.textContent = sum;
}

function updateColors(element, newValue) {
    element.classList.remove(...element.classList);

    console.log(newValue);
    switch (newValue) {
        case "2":
            element.classList.add("value2");
            element.classList.add("game-tile");
            break;
        case "4":
            element.classList.add("value4");
            element.classList.add("game-tile");
            break;
        case "8":
            element.classList.add("value8");
            element.classList.add("game-tile");
            break;
        case "16":
            element.classList.add("value16");
            element.classList.add("game-tile");
            break;
        case "32":
            element.classList.add("value32");
            element.classList.add("game-tile");
            break;
        case "64":
            element.classList.add("value64");
            element.classList.add("game-tile");
            break;
        case "128":
            element.classList.add("value128");
            element.classList.add("game-tile");
            break;
        case "265":
            element.classList.add("value265");
            element.classList.add("game-tile");
            break;
        case "512":
            element.classList.add("value512");
            element.classList.add("game-tile");
            break;
        case "1024":
            element.classList.add("value1024");
            element.classList.add("game-tile");
            break;
        case "2048":
            element.classList.add("value2048");
            element.classList.add("game-tile");
            break;
        default:
            element.classList.add("game-tile");
            element.classList.add("game-tile");
            break;
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRandomNumber(board) {    
    let availableIndexes = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == 0) {
                availableIndexes.push([r, c]);
            }
        }
    }

    let idx = availableIndexes[getRandomInt(0, availableIndexes.length)];
    let chance = getRandomInt(0, 10);
    let number = chance < 9 ? 2: 4;
    let j = 4 * idx[0] + idx[1];
    let element = document.getElementById((j).toString());

    let currentNumber = element.textContent;
    if (currentNumber == "0") {
        element.innerHTML = number;
        updateColors(element, number.toString());
    }
}

function compress(direction, row) {
    let compressed = [];
    const array = row.map(element => parseInt(element));
    let zeroless = array.filter(element => element !== 0);

    if ((direction == "e") || (direction == "s")) {
        let i = 0;
        while (i < zeroless.length) {
            if ((i + 1 < zeroless.length) && (zeroless[i] == zeroless[i + 1])) {
                compressed.push(zeroless[i] * 2);
                i++;
            } else {
                compressed.push(zeroless[i]);
            }
            i++;
        }
    } else {
        let i = zeroless.length - 1;
        while (i >= 0) {
            if ((i > 0) && (zeroless[i] == zeroless[i - 1])) {
                compressed.push(zeroless[i] * 2);
                i--;
            } else {
                compressed.push(zeroless[i]);
            }
            i--;
        }
    }

    while (compressed.length != row.length) {
        if ((direction == "e") || direction == "s") {
            compressed.unshift(0);
        } else {
            compressed.push(0);
        }
    }
    return compressed;
}

function handleKeyPress(event) {
    if (event.key === 'ArrowDown') {
        move('s');
    } else if (event.key === 'ArrowUp') {
        move('n');
    } else if (event.key === 'ArrowLeft') {
        move('w');
    } else if (event.key === 'ArrowRight') {
        move('e');
    }
}

document.addEventListener('keydown', handleKeyPress);