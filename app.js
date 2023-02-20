'use strict';

var numberOfTries = 0,
    selectedImages = [],
    waitTime = 500,
    statusArea;

function randomSort() {
    return 0.5 - Math.random();
}

function initElement() {
    statusArea = document.getElementById('status-area');

    var imageCards = [
        'leafers-seed',
        'leafers-seedling',
        'leafers-sapling',
        'leafers-tree',
        'leafers-ultimate',
        'marcimus',
        'mr-pants',
        'mr-pink',
        'old-spice-man',
        'robot_female_1'
    ];

    imageCards = imageCards.concat(imageCards); // make double the card array

    imageCards.sort(randomSort);

    var fragment = document.createDocumentFragment();

    for (var index = 0, length = imageCards.length; index < length; index++) {
        var current = imageCards[index];
        var newImageCard = document.createElement('img');
        newImageCard.src = 'img/' + current + '.png';
        newImageCard.title = current;
        newImageCard.alt = current;
        newImageCard.addEventListener('click', check);
        fragment.appendChild(newImageCard);
    }

    document.getElementById('game-area').appendChild(fragment);
}

function init() {
    initElement();

    setTimeout(function () {
        for (var index = 0, length = document.images.length; index < length; index++) {
            var current = document.images[index];
            current.src = 'img/leaf-green.png';
            current.title = 'leaf-green';
        }
    }, waitTime * 4);
}

function check() {
    if (this.title != 'leaf-green' || this.title == 'open') return;

    if (selectedImages.length > 1) return;

    selectedImages.push(this);

    this.src = 'img/' + this.alt + '.png';
    this.title = 'open';

    if (selectedImages.length != 2) return;

    if (selectedImages[0].alt === selectedImages[1].alt) {
        selectedImages[0].removeEventListener('click', check);
        selectedImages[1].removeEventListener('click', check);
        selectedImages = [];
    } else {
        setTimeout(function () {
            selectedImages[0].src = 'img/leaf-green.png';
            selectedImages[0].title = 'leaf-green';
            selectedImages[1].src = 'img/leaf-green.png';
            selectedImages[1].title = 'leaf-green';
            selectedImages = [];
        }, waitTime);

        numberOfTries++;
        statusArea.innerText = 'Tried ' + numberOfTries + ' times.';
    }
}

window.addEventListener('DOMContentLoaded', init);
