const idade = () => {
  const data = new Date;
  const dataNasc = new Date('2005-08-20');
  let anos = data.getFullYear() - dataNasc.getFullYear();

  (
    data.getMonth() < dataNasc.getMonth() ||
    (data.getMonth() === dataNasc.getMonth() && data.getDate() < dataNasc.getDate())
  ) && anos--;

  return anos;
};

const skills = {
  value: [{
    size: 100,
    color: ["rgb(255, 165, 0)", "rgb(78, 78, 78)"] // html
  }, {
    size: 90,
    color: ["rgb(0, 191, 255)", "rgb(78, 78, 78)"] // css
  }, {
    size: 90,
    color: ["rgb(255, 215, 0)", "rgb(78, 78, 78)"] // js
  }, {
    size: 75,
    color: ["rgb(195, 177, 225)", "rgb(78, 78, 78)"] // php
  }, {
    size: 50,
    color: ["rgb(255, 0, 0)", "rgb(78, 78, 78)"] // sql
  }, {
    size: 25,
    color: ["rgb(128, 0, 128)", "rgb(78, 78, 78)"] // c#
  }, {
    size: 20,
    color: ["rgb(255, 66, 0)", "rgb(78, 78, 78)"] // java
  }, {
    size: 15,
    color: ["rgb(0, 96, 162)", "rgb(78, 78, 78)"] // c++
  }, {
    size: 10,
    color: ["rgb(255, 215, 0)", "rgb(78, 78, 78)"] // python
  }],
  index: 0,
  next() {
    if (this.index < this.value.length)
      return this.value[this.index++];
  }
};

const terminal = document.getElementsByClassName("terminal");
const images = document.getElementsByClassName("images");

let terminalStrings = [];

window.onload = render;
window.onscroll += render;

for (const element of terminal) {
  if (element.textContent.includes("@idade"))
    element.textContent = element.textContent.replace(/@idade/g, idade());
  terminalStrings.push(element.textContent);
  element.textContent = "";
}

async function render() {
  if (terminal[0].textContent == "")
    await FardoTools.typingEffect(terminal[0], "", terminalStrings[0], "_", 100, true, 500);
  for (let c = 1; c < terminal.length; c++) {
    if (terminal[c].scrollTop <= window.scrollY && terminal[c].textContent == "")
      await FardoTools.typingEffect(terminal[c], "", terminalStrings[c], "", 5, false, 500);

    if (terminal[c].className.includes("progress")) {
      const skill = skills.next();
      terminal[c].style.color = skill.color[0];
      terminal[c].title = skill.size + "%";
      let i = 0;
      const interval = setInterval(() => {
        terminal[c].style.background = `linear-gradient(90deg, ${skill.color[0].replace(")", ", .5)").replace("rgb", "rgba")} ${i}%, ${skill.color[1].replace(")", ", .5)").replace("rgb", "rgba")} ${i}%)`;
        i++;
        if (i > skill.size)
          clearInterval(interval);
      }, 10);
    }

    for (let c = 0; c < images.length; c++) {
      if (images[c].scrollTop <= window.scrollY)
        images[c].style.display = "block";
      else
        images[c].style.display = "none";
    }
  }
}

function slider(direction) {
  const all = [...document.querySelectorAll("section #slider fieldset")];
  const current = all.filter(x => getComputedStyle(x).display != "none")[0];

  const toRight = (element, opacity) => {
    element.style.tranform = "translateX(0)";
    setTimeout(() => {
      element.style.tranform = "translateX(50px)";
      element.style.opacity = opacity;
    }, 1);
  };

  const toLeft = (element, opacity) => {
    element.style.tranform = "translateX(0)";
    setTimeout(() => {
      element.style.tranform = "translateX(-50px)";
      element.style.opacity = opacity;
    }, 1);
  };

  switch (direction) {
    case "left":
      if (all.indexOf(current) > 0) {
        const newCurrent = all[all.indexOf(current) - 1];
        current.style.display = "none";
        newCurrent.style.display = "block";
        toLeft(newCurrent, 1);
        toRight(current, 0);
      }
      break;
    case "right":
      if (all.indexOf(current) < all.length - 1) {
        const newCurrent = all[all.indexOf(current) + 1];
        current.style.display = "none";
        newCurrent.style.display = "block";
        toLeft(current, 0);
        toRight(newCurrent, 1);
      }
      break;
  }
}

function viewCode(button) {
  const all = [...document.querySelectorAll("section #slider fieldset")];
  const current = all.filter(x => getComputedStyle(x).display != "none")[0];
  const path = "./src/";
  const name = current.children[1].src.split("/").pop().split(".")[0];
  const codeDiv = document.getElementsByTagName("code")[0];

  codeDiv.innerHTML = "";

  fetch(`${path}/${name}/${name}.js`)
    .then(res => res.text())
    .then(text => write(text, codeDiv, button, "javascript"));
}

async function write(code, container, button, lang) {
  button.disabled = true;
  button.title = "Aguarde o término da escritura do código";
  container.classList.add(lang);
  code = hljs.highlightAuto(code).value;
  code = code.split("</span>").map(element => element += "</span>");
  for (let fragment of code) {
    container.innerHTML += fragment;

    if (container.scrollHeight > container.clientHeight)
      container.scrollTop = container.scrollHeight - container.clientHeight;

    await FardoTools.delay(25);
  }
  button.disabled = false;
  button.title = "";
}


/*
codigo para pegar frases do pensador
let a = [];
[].slice.call(document.querySelectorAll(".frase")).forEach(x => a.push(x.textContent))
window.scrollTo(0, document.body.scrollHeight);
a;
*/

/*
ADICIONAR:
AUTOMATO CELULAR X
REDE NEURAL CLASSIFICA IMAGEM
REDE NEURAL FEEDFOWARD SIMPLES
MAZE X
MARKOV X
NAIVE BAYES CLASSIFIER
CLUSTER
IMAGEM PARA ARTE ASCII X

BOTÃO PARA VER CODIGO SENOD DIGITADO LINHA POR LINHA
*/