const width = 320, height = 160, pixelSize = 6

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight*1.5;

const numberOfPixels = width*height;

// Define the frame rate
var frameRate = 60;
var interval = 500 / frameRate;
var lastScrollTop = 100;

// Black background
canvas.style.backgroundColor = 'black';

 // Update the canvas position on scroll
 window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    canvas.style.top = scrollY + 'px';

    handleScroll();
  });

// Scrolling Handle ------------------------------------------------

  document.addEventListener('wheel', function(){
    if (event.deltaY > 0) {
        for (var i = 0; i < 5; i++) {
            routine();
            }
    }
  });

// Scrolling Mobile Handle -----------------------------------------
var startY;

    function handleTouchStart(event) {
      startY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
      var deltaY = event.touches[0].clientY - startY;

      if (deltaY < 0) {
        routine();
        routine();
        routine();
        // Your code here
      }

      startY = event.touches[0].clientY;
    }

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

// Array to store circle information (x, y, radius)
const circles = [];

// Routine
function routine(){

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    animateBackground();
}


// Function to generate and animate white circles
function animateBackground() {

    // We want to decide with a probability for every frame if it is possible to create a circle.
    let probability = getRandomBoolean(100);

    if(probability){

         // Circle radius
        let circleSize = getRandomNumberBetween(1,5);

        // Circle vertical coordinates on screen
        let x = getRandomNumberBetween(0,canvas.width);

        if (circleSize == 1) {
            if (getRandomBoolean(90))
            circles.push({ x, y: canvas.height+2,radius:0.2})
        }
        if (circleSize == 2) {
            if (getRandomBoolean(70))
            circles.push({ x, y: canvas.height+2,radius:0.5})
        }
        else if (circleSize == 3) {
            if (getRandomBoolean(20))
            circles.push({ x, y: canvas.height+4, radius:1})
        }
        else {
            if (getRandomBoolean(7))
            circles.push({ x, y: canvas.height+7, radius:2})
        }

    }

    // Iterate through all circles and update their positions
    for (let i = 0; i < circles.length; i++) {

        const circle = circles[i];

        // Generate Circle
        createCircle(circle.x, circle.y+circle.radius, circle.radius,false);

        // Speed for every circle based on size 
        if (circle.radius == 0.2){
            circle.y -= 0.5;
        }
        if (circle.radius == 0.5){
            circle.y -= 1;
        }
        if (circle.radius == 1){
            circle.y -= 2;
        }
        if (circle.radius == 2){
            circle.y -= 3;
        }

        if(circle.y < canvas.height-2000){
            circles.splice(i, 1);
        }
    }
}

function main() {

    // Repeat with the given interval
    setInterval(routine,interval);
}
  
// Call main()
main();



// $$$$$$$$\                              $$\     $$\                               
// $$  _____|                             $$ |    \__|                              
// $$ |   $$\   $$\ $$$$$$$\   $$$$$$$\ $$$$$$\   $$\  $$$$$$\  $$$$$$$\   $$$$$$$\ 
// $$$$$\ $$ |  $$ |$$  __$$\ $$  _____|\_$$  _|  $$ |$$  __$$\ $$  __$$\ $$  _____|
// $$  __|$$ |  $$ |$$ |  $$ |$$ /        $$ |    $$ |$$ |  $$ |$$ |  $$ |\$$$$$$\  
// $$ |   $$ |  $$ |$$ |  $$ |$$ |        $$ |$$\ $$ |$$ |  $$ |$$ |  $$ | \____$$\ 
// $$ |   \$$$$$$  |$$ |  $$ |\$$$$$$$\   \$$$$  |$$ |\$$$$$$  |$$ |  $$ |$$$$$$$  |
// \__|    \______/ \__|  \__| \_______|   \____/ \__| \______/ \__|  \__|\_______/ 


// Usage: getRandomNumberBetween(0,10)
function getRandomNumberBetween(x, y) {
    // Check if x and y are valid numbers
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Both x and y must be numbers');
    }
  
    // Ensure x is less than or equal to y
    if (x > y) {
      throw new Error('x must be less than or equal to y');
    }
  
    // Calculate the random number between x and y
    const randomNumber = Math.random() * (y - x) + x;
  
    // Use Math.floor() to round down to the nearest integer
    return Math.floor(randomNumber);
  }

// Usage: createCircle(10,10,100)
function createCircle(x,y,radius,isShadowOn) {


    if (isShadowOn) {
            // Set shadow properties
        ctx.shadowColor = "rgba(255, 187, 0, 0.7)"; // Shadow color (yellow with 100% transparency)
        ctx.shadowBlur = 40; // Shadow blur radius
        ctx.shadowOffsetX = 0; // Horizontal shadow offset
        ctx.shadowOffsetY = 0; // Vertical shadow offset
    }

    ctx.beginPath();
    // Create a circle using arc method
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    // Color style
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Usage: getRandomBoolean(15) with 15 being the percentage of probability
function getRandomBoolean(probability) {
    if (typeof probability !== 'number' || probability < 0 || probability > 100) {
      throw new Error('Probability must be a number between 0 and 100');
    }
  
    const randomPercentage = Math.random() * 100; // Generate a random number between 0 and 100
  
    return randomPercentage <= probability;
}
  
