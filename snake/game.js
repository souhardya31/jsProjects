import { update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersect } from "./snake.js"
import {draw as drawFood, update as updateFood} from "./food.js"
import { outsideGrid } from "./grid.js"

const gameBoard = document.getElementById('game-board')

let lastRenderTime = 0
let gameOver = false


const startGame = document.querySelector(".startGame")
let submitButtons = document.querySelectorAll('button[type="submit"]')

let snakeSpeed = 0
submitButtons[0].addEventListener('click', e => {
    e.preventDefault()
    snakeSpeed = 4
    startGame.style.display = "none"
})
submitButtons[1].addEventListener('click', e => {
    e.preventDefault()
    snakeSpeed = 8
    startGame.style.display = "none"
})
submitButtons[2].addEventListener('click', e => {
    e.preventDefault()
    snakeSpeed = 12
    startGame.style.display = "none"
})
submitButtons[3].addEventListener('click', e => {
    e.preventDefault()
    snakeSpeed = 16
    startGame.style.display = "none"
})

function main(currentTime) {
    if (gameOver) {
        if (confirm(`You lost. Press ok to restart`)) {
            window.location = '/'
        }
        return 
    }
    window.requestAnimationFrame(main)//it will automatically pass the curerntTimestamp as an argument to main function
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snakeSpeed) return
    lastRenderTime = currentTime

    
    update()
    draw() 
    
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersect()
}
