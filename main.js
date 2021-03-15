// grab the canvas
let circle = document.getElementById('canvas')

// create a 2d object to draw
let ctx = circle.getContext('2d')

// calculate the radius
let radius = circle.height / 2

// placing the object start point to the center
ctx.translate(radius, radius)

// convert the radius into small value=270
radius = radius * 0.90


// calling the function
setInterval(drawClock, 1000)

function drawClock() {
    // here radius=270
    drawFace(ctx, radius)
    drawNumber(ctx, radius)
    drawTime(ctx, radius)
}

// drawFace function
function drawFace(ctx, radius) {
    let grad

    // create a path to draw
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()

    // creating the border style using radial gradient
    // r1=256.5 || r2=283.5
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
    // set the background color of gradient
    grad.addColorStop(0, '#333')
    grad.addColorStop(0.5, '#fff')
    grad.addColorStop(1, '#333')

    // passing the gradient as a stroke/border in the circle
    ctx.strokeStyle = grad
    // lineWidth=27px
    ctx.lineWidth = radius * 0.1
    // set the value of stroke
    ctx.stroke()

    // create a new path to colorize the number and the center point
    ctx.beginPath()
    // creating the center circle
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
    ctx.fillStyle = '#333'
    ctx.fill()
}

// drawNumber function
function drawNumber(ctx, radius) {
    let angle
    let num

    // setting the font size and style of the number>>> fSize=40.5px
    ctx.font = radius * 0.15 + "px arial"
    // positioning the numbers
    ctx.textBaseline = "middle"
    ctx.textAlign = "center"

    // printing all the numbers
    for (num = 1; num < 13; num++) {
        // num*0.5236
        angle = num * Math.PI / 6
        ctx.rotate(angle)
        ctx.translate(0, -radius * 0.85) //0 to -229.5 px
        ctx.rotate(-angle)
        ctx.fillText(num.toString(), 0, 0)
        ctx.rotate(angle)
        ctx.translate(0, radius * 0.85) //0 to -229.5 px
        ctx.rotate(-angle)
    }

}

// drawTime function
function drawTime(ctx, radius) {

    let presentTime = new Date()
    let hour = presentTime.getHours()
    let min = presentTime.getMinutes()
    let sec = presentTime.getSeconds()

    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (min * Math.PI / (6 * 60)) + (sec * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    min = (min * Math.PI / 30) + (sec * Math.PI / (30 * 60));
    drawHand(ctx, min, radius * 0.8, radius * 0.07);
    // second
    sec = (sec * Math.PI / 30);
    drawHand(ctx, sec, radius * 0.9, radius * 0.02);
}

// creating the drawHand funciton
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}