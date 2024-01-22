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
                /* right swipe */
                move("w");
            } else {
                /* left swipe */
                move("e");
            }
        }
    else if (yDiff > 0) {
                /* down swipe */
                move("n");
            }
    else {
                /* up swipe */
                move("s");
            }
    /* reset values */
    xDown = null;
    yDown = null;
};
function move(direction) {
    let board = [];

    for (let i = 0; i < 16; i++) {
        let element = document.getElementById(i.toString());

        if (element) {
            board.push(element.textContent == ""? 0:element.textContent);
        }
    }

    for (let c = 0; c < 4; c++) {
        let col = [];

        for (let n = 0; n < 4; n++) {
            let idx = 0;
            if (direction == 'w' || direction == 'e') {
                idx = 4 * c + n;
            } else {
                idx = 4 * n + c;
            }
            col.push(board[idx]);
        }
        let compressed_column = compress(direction, col);
        for (let n = 0; n < 4; n++) {
            let idx = 0;
            if (direction == 'w' || direction == 'e') {
                idx = 4 * c + n;
            } else {
                idx = 4 * n + c;
            }
            board[idx] = compressed_column[n];
        }
    }

    for (let i = 0; i < board.length; i++) {
        const element = board[i];
        let e = document.getElementById(i.toString());
        if (element == "2048") {
            alert("U won !");
        }

        if (element != "0") {
            e.innerHTML = element;
        } else {
            e.innerHTML = null;
        }

        updateColors(e, element.toString());
    }
    genRandomNumber();
}

function updateColors(element, newValue) {
    element.classList.remove(...element.classList);
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

function genRandomNumber() {
    while (true) {
        let idx = getRandomInt(0, 15);
        let chance = getRandomInt(1, 10);
        let number = chance < 9 ? 2 : 4;
        let element = document.getElementById(idx.toString());

        let currentNumber = element.textContent;
        if (currentNumber == "") {
            element.innerHTML = number;
            updateColors(element, number.toString());
            break;
        }
    }
}

function compress(direction, row) {
    let compressed = [];
    const array = row.map(element => parseInt(element));
    let zeroless = array.filter(element => element !== 0);

    if ((direction == "w") || (direction == "n")) {
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