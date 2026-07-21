window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("splashScreen").style.opacity="0";

setTimeout(()=>{

document.getElementById("splashScreen").remove();

},450);

},900);

});