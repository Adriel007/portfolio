//commit 8
const data = new Date;
const idade = () => {
    let anos = data.getFullYear() - 2005;
    if (data.getDate() < 20 && data.getMonth() <= 7) anos--;
    return anos
};
const terminal = document.getElementsByClassName("terminal");
const images = document.getElementsByClassName("images");

var terminalStrings = [];

window.onload = render;
window.onscroll += render;

for (let element of terminal) {
    if (element.textContent.includes("@idade")) element.textContent = element.textContent.replace(/@idade/g, idade());
    terminalStrings.push(element.textContent);
    element.textContent = "";
}

async function render() {
    if (terminal[0].textContent == "") await FardoTools.typingEffect(terminal[0], "", terminalStrings[0], "_", 100, true, 500);
    for (let c = 1; c < terminal.length; c++) {
        if (terminal[c].scrollTop <= window.scrollY && terminal[c].textContent == "") await FardoTools.typingEffect(terminal[c], "", terminalStrings[c], "", 5, false, 500);
        if (terminal[c].textContent.includes("HTML")) terminal[c].style.color = "orange";
        else if (terminal[c].textContent.includes("CSS")) terminal[c].style.color = "deepSkyBlue";
        else if (terminal[c].textContent.includes("JS")) terminal[c].style.color = "gold";
        else if (terminal[c].textContent.includes("PHP")) terminal[c].style.color = "#C3B1E1";
        else if (terminal[c].textContent.includes("SQL")) terminal[c].style.color = "red";
        for (let c = 0; c < images.length; c++) {
            if (images[c].scrollTop <= window.scrollY) images[c].style.display = "block";
            else images[c].style.display = "none";
        }
    }
}