var gol;
window.onload= function(){
    gol= new Gameoflife();
    window.requestAnimationFrame(d)
}

function d(){
    gol.draw()
    window.requestAnimationFrame(d)
}
