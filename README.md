# Data-Internship-Project
Speech to Sign Language Convertor [ Deployed link : https://aditingale-hash.github.io/Data-Internship-Project/]
System Workflow:

Step-by-Step Flow:

User Interaction:
User clicks "Start Recording" to enable the microphone.
Speech input is captured.

Speech Recognition:
Uses Web Speech API to process the audio and generate text.

Text Processing:
Filters and splits the recognized text into words or individual letters.

Sign Language Translation:
Matches words/letters with corresponding sign language videos in the sign/ directory.
Plays the videos sequentially in the video container.

Output:
Displays the transcription alongside the sign language videos.

