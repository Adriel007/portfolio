function swapImage(){
  if (document.getElementById("darklightimg").src.endsWith('darkmode.png') == true)
  { 
   document.getElementById("darklightimg").src = "lightmode.png";

  } 
 else if (document.getElementById("darklightimg").src.endsWith('lightmode.png') == true) 
  { 
  document.getElementById("darklightimg").src = "darkmode.png"; 
  }
  document.getElementById("darklightimg").style.transition = "all 2s";
}