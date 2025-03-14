const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const transcriptElement = document.getElementById('transcript');
const signLanguageContainer = document.getElementById('signLanguageContainer');

let recognition;

// Check for browser compatibility
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
} else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
} else {
    alert("Your browser does not support speech recognition.");
}

recognition.continuous = true; //The API listens continuously for speech input.
recognition.interimResults = true; //Displays partial transcriptions while the user is speaking.
recognition.lang = 'en-US'; //Set to English (en-US).

recognition.onresult = (event) => {  //onresult: Processes speech recognition results and extracts the final transcript
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        }
    }

    if (finalTranscript) {
        transcriptElement.innerHTML = finalTranscript;
        displaySignLanguage(finalTranscript.trim());
    }
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};

recognition.onend = () => { //Re-enables the start button when recognition ends
    startButton.disabled = false;
    stopButton.disabled = true;
};

// Start and stop buttons
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    recognition.start();
});

stopButton.addEventListener('click', () => {
    recognition.stop();
});

// Function to display sign language videos for words and individual letters only if available
async function displaySignLanguage(text) {
    // Clear any existing video in the container
    signLanguageContainer.innerHTML = '';

    // Split the text into unique words/numbers, removing punctuation
    const uniqueItems = Array.from(new Set(text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ')));

    for (const item of uniqueItems) {
        if (!item) continue;

        if (item.length === 1) {
            // Display video for single alphabet letters if they exist
            const letterVideoPath = `sign/${item}.mp4`;
            const letterSuccess = await displayVideo(letterVideoPath);
            if (!letterSuccess) {
                console.log(`Letter video for '${item}' not found.`);
            }
        } else {
            // Try displaying the full word video, skip if not found
            const itemVideoPath = `sign/${item}.mp4`;
            const wordSuccess = await displayVideo(itemVideoPath);
            if (!wordSuccess) {
                console.log(`Word video for '${item}' not found, skipping.`);
            }
        }
    }
}

// Helper function to display a video and wait until it finishes playing
function displayVideo(src) {
    return new Promise((resolve) => {
        
        signLanguageContainer.innerHTML = ''; // Clear the container for a new video Ensures only one video is displayed at a time

        const video = document.createElement('video');
        video.src = src;
        video.classList.add('sign-video');
        video.autoplay = true;
        video.loop = false; // Play only once
        video.muted = true;

        video.onended = () => resolve(true); // Resolve when video finishes playing
        video.onerror = () => resolve(false); // Resolve as false if video fails to load

        signLanguageContainer.appendChild(video);
    });
}
