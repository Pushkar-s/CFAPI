/*always put scrpt tag at the bottom of body*/
var x = document.getElementsByTagName("nav");
x[0].onmouseover = function() {var y = document.getElementsByTagName("main"); y[0].className = "main-class";}
x[0].onmouseout = function() {var y = document.getElementsByTagName("main"); y[0].className = "main";}