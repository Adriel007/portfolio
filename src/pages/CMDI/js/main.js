function swapImage(){
  if (document.getElementById("darklightimg").src.endsWith('img/darkmode.png') == true)
  { 
   document.getElementById("darklightimg").src = "img/lightmode.png";

  } 
 else if (document.getElementById("darklightimg").src.endsWith('img/lightmode.png') == true) 
  { 
  document.getElementById("darklightimg").src = "img/darkmode.png"; 
  }
  document.getElementById("darklightimg").style.transition = "all 2s";
}