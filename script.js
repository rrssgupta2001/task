function openSynopsisModal() {
    const modal = document.getElementById('synopsis-modal');
    modal.style.display = 'block';
}

function closeSynopsisModal() {
    const modal = document.getElementById('synopsis-modal');
    modal.style.display = 'none';
}

let isSpeaking = false;

function textToSpeech() {
    const modal = document.getElementById('synopsis-modal');
    const synopsisText = document.getElementById('synopsis-text').innerText;
    if (isSpeaking) {
        responsiveVoice.cancel();
        isSpeaking = false;
        return;
    }
    const voiceOptions = {
        rate: 1,
        pitch: 1,
        volume: 5,
        onend: () => {
            isSpeaking = false;
        },
    };
    responsiveVoice.speak(synopsisText, 'UK English Male', voiceOptions);
    isSpeaking = true;
}

function closeSynopsisModal() {
    const modal = document.getElementById('synopsis-modal');
    modal.style.display = 'none';
    responsiveVoice.cancel();
    isSpeaking = false;
}

function submitReview() {
    const username = document.getElementById('username').value;
    const reviewText = document.getElementById('review').value;
    if (username.trim() === '' || reviewText.trim() === '') {
        showModal('Please enter your name and review.');
        return;
    }
    const reviewContainer = document.getElementById('reviews-container');
    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.innerHTML = `<strong>${username}:</strong> ${reviewText}`;
    reviewContainer.appendChild(newReview);
    document.getElementById('username').value = '';
    document.getElementById('review').value = '';
}

function showModal(message) {
    const modal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    modal.style.display = 'none';
}

function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    body.classList.toggle('dark-mode');
    darkModeToggle.classList.toggle('clicked');
    if (darkModeToggle.classList.contains('clicked')) {
        darkModeToggle.innerHTML = '☀️';
    } else {
        darkModeToggle.innerHTML = '🌙';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 1;
    let slideshowTimeout;

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }

    function automaticSlides() {
        plusSlides(1);
        slideshowTimeout = setTimeout(automaticSlides, 6000);
    }

    automaticSlides();

    const prevArrow = document.querySelector(".prev");
    const nextArrow = document.querySelector(".next");

    prevArrow.addEventListener("click", function () {
        plusSlides(-1);
    });

    nextArrow.addEventListener("click", function () {
        plusSlides(1);
    });

    const video = document.querySelector('video');

    video.addEventListener('play', function () {
        clearTimeout(slideshowTimeout);
    });

    video.addEventListener('pause', function () {
        automaticSlides();
    });
});
