
//
$(document).ready(function () {
	$('#fullpage').fullpage({
		'verticalCentered': false,
		'scrollingSpeed': 600,
		'autoScrolling': false,
		'css3': true,
		'navigation': true,
		'navigationPosition': 'right',
		'fitToSection': false,
	});
});

// wow
$(function () {
	new WOW().init();
	$(".rotate").textrotator();
})

//

const projects = [
	'./projects/automate-cells/automate-cells.html',
	'./projects/img-ascii/img-ascii.html',
	'./projects/maze/maze.html',
	'./projects/text-gen/text-gen.html'
];
const projectIframe = document.getElementById('projectIframe');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let currentProjectIndex = 0;

function navigateProject(offset) {
	currentProjectIndex += offset;
	if (currentProjectIndex < 0) {
		currentProjectIndex = projects.length - 1;
	} else if (currentProjectIndex >= projects.length) {
		currentProjectIndex = 0;
	}
	projectIframe.src = projects[currentProjectIndex];
}

// Initially load the first project
projectIframe.src = projects[currentProjectIndex];