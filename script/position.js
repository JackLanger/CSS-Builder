
window.addEventListener('load',repositionbBox);
window.addEventListener('resize',repositionbBox)
function repositionbBox(){

    let box = document.querySelector('.box');
    let content = document.querySelector('.content');
    let boxrect = box.getBoundingClientRect();
    box.style.left = window.innerWidth/2 -boxrect.width/2 +"px";
    content.style.left = window.innerWidth/2-content.getBoundingClientRect().width/2 +"px";
}