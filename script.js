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
            board.push(element.textContent);
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

        if (element != "0") {
            e.innerHTML = element;
        } else {
            e.innerHTML = null;
        }

        e.classList.remove(...e.classList);
        switch (element) {
            case "2":
                e.classList.add("value2");
                break;
            case "4":
                e.classList.add("value4");
                break;
            case "8":
                e.classList.add("value8");
                break;
            case "16":
                e.classList.add("value16");
                break;
            case "32":
                e.classList.add("value32");
                break;
            case "64":
                e.classList.add("value64");
                break;
            case "128":
                e.classList.add("value128");
                break;
            case "265":
                e.classList.add("value265");
                break;
            case "512":
                e.classList.add("value512");
                break;
            case "1024":
                e.classList.add("value1024");
                break;
            case "2048":
                e.classList.add("value2048");
                break;
            default:
                e.classList.add("game-tile");
                break;
        }
    }
    genRandomNumber();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRandomNumber() {
    while (true) {
        let idx = getRandomInt(0, 15);
        let chance = getRandomInt(1, 10);
        let number = chance < 9 ? 2 : 4;

        let currentNumber = document.getElementById(idx.toString()).textContent;
        if (currentNumber == "") {
            document.getElementById(idx.toString()).innerHTML = number;
            break;
        }
    }
}

function compress(direction, row) {
    let compressed = [];
    let i = 0;

    while (i < row.length) {
        if ((i + 1 < row.length) && (row[i] == row[i + 1]) && (row[i] != 0)) {
            compressed.push(row[i] * 2);
            i += 1;
        } else if (row[i] != 0) {
            compressed.push(row[i]);
        }
        i += 1;
    }
    while (compressed.length != 4) {
        if (direction == 'w' || direction == 'n') {
            compressed.push(0);
        } else {
            compressed.unshift(0);
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