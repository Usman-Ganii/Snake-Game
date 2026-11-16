function init() {

    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 600;
    pen = canvas.getContext("2d");
    let input = prompt(" Enter your name : ");
    alert(`Usman is welcoming you.\nHello ${input}. Welcome to my game, hope you will enjoy..!`);
    cs = 35;
    gameOver = false;
    food_img = new Image();
    foods_image = [{ src: "apple.png", name: "apple" }, { src: "mango.png", name: "mango" }, { src: "orange.png", name: "orange" }, { src: "papaya.png", name: "papaya" }, { src: "watermelon.jpg", name: "watermelon" }];
    random_img = Math.floor(Math.random() * foods_image.length);
    food_img.src = foods_image[random_img].src;
    score_img = new Image();
    score_img.src = "trophy.jpg";
    score = 1;
    food = getRandomFood();

    snake = {
        init_len: 5,
        color: "darkgreen",
        cells: [],
        direction: "right",

        createSnake: function () {
            for (let i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 })
            }
        },
        drawSnake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3);
            }
        },
        updateSnake: function () {
            console.log("Updating Snake");
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y) {
                console.log("Food eaten");
                score++;
                food = getRandomFood();
                changeFood();
            }
            else {
                this.cells.pop();
            }

            var nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });
            lastX = Math.round(W / cs);
            lastY = Math.round(H / cs);
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY) {
                gameOver = true;
            }


        }


    };
    snake.createSnake();
    function keyPressed(e) {
        console.log("key pressed", e.key);
        if (e.key == "ArrowRight") {
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = "left";
        }
        else if (e.key == "ArrowDown") {
            snake.direction = "down";
        }
        else {
            snake.direction = "up";
        }
    }
    document.addEventListener('keydown', keyPressed);
}

function changeFood() {
    food_img = new Image();
    foods_image = [{ src: "apple.png", name: "apple" }, { src: "mango.jpeg", name: "mango" }], { src: "orange.jpeg", name: "orange" };
    random_img = Math.floor(Math.random() * foods_image.length);
    food_img.src = foods_image[random_img].src;
}

function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.color;

    pen.drawImage(food_img, food.x * cs, food.y * cs, cs + 2, cs + 2);
    pen.drawImage(score_img, 10, 20, cs, cs);
    pen.fillText(score, 50, 50);
    pen.font = "240% arial";
}


function update() {
    snake.updateSnake();


}
function getRandomFood() {
    foodX = Math.round(Math.random() * (W - cs) / cs);
    foodY = Math.round(Math.random() * (H - cs) / cs);
    food = {
        x: foodX,
        y: foodY,
        color: "black",
    }
    return food;
}

function gameLoop() {
    if (gameOver == true) {
        clearInterval(f);
        alert("Game Over! First go and learn how to play.\nBetter luck next time.!");
    }
    draw();
    update();


}
init();
let f = setInterval(gameLoop, 250);
