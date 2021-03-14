let audioIN = { audio: true };
//  audio is true, for recording
// Access the permission for use
// the microphone
navigator.mediaDevices.getUserMedia(audioIN)
    // 'then()' method returns a Promise
    .then(function (mediaStreamObj) {

        // Connect the media stream to the
        // first audio element
        //returns the recorded audio via 'audio' tag
        let audio = document.querySelector('audio');
        let audioData;

        let playWrapper = document.querySelector('.play-wrapper');
        let saveRecordBtn = document.getElementById('saveRecord');
        saveRecordBtn.addEventListener('click', function (ev) {
            //on click save - push to server
            const form = new FormData();
            const audioFile = new File([audioData], "name");
            form.append("audioFile", audioFile);
            var request = new XMLHttpRequest();
            var async = true;
            request.open("POST", "upload", async);
            if (async) {
                request.onreadystatechange = function() {
                    if(request.readyState === 4 && request.status === 200) {
                        var response = null;
                        try {
                            response = JSON.parse(request.responseText);
                        } catch (e) {
                            response = request.responseText;
                        }
                        window.location.href = 'list.html';
                    } else {
                        console.log('error');
                    }
                }
            }
            request.send(form);
        });

        // 'srcObject' is a property which
        // takes the media object
        // This is supported in the newer browsers
        if ("srcObject" in audio) {
            audio.srcObject = mediaStreamObj;
        }
        else {   // Old version
            audio.src = window.URL
                .createObjectURL(mediaStreamObj);
        }

        // It will play the audio
        audio.onloadedmetadata = function (ev) {

            // Play the audio in the 2nd audio
            // element what is being recorded
            audio.play();
        };

        // Start record
        let start = document.getElementById('btnStart');

        // Stop record
        let stop = document.getElementById('btnStop');

        // 2nd audio tag for play the audio
        let playAudio = document.getElementById('audioPlay');

        // This is the main thing to recorde
        // the audio 'MediaRecorder' API
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        // Pass the audio stream

        // Start event
        start.addEventListener('click', function (ev) {
            mediaRecorder.start();
            playWrapper.style.display = 'none';
        })

        // Stop event
        stop.addEventListener('click', function (ev) {
            mediaRecorder.stop();
            playWrapper.style.display = 'block';
        });

        // If audio data available then push
        // it to the chunk array
        mediaRecorder.ondataavailable = function (ev) {
            dataArray.push(ev.data);
        }

        // Chunk array to store the audio data
        let dataArray = [];

        // Convert the audio data in to blob
        // after stopping the recording
        mediaRecorder.onstop = function (ev) {

            // blob of type mp3
            audioData = new Blob(dataArray,
                { 'type': 'audio/mp3;' });

            // After fill up the chunk
            // array make it empty
            dataArray = [];

            // Creating audio url with reference
            // of created blob named 'audioData'
            let audioSrc = window.URL
                .createObjectURL(audioData);

            // Pass the audio url to the 2nd video tag
            playAudio.src = audioSrc;
        }
    })

    // If any error occurs then handles the error
    .catch(function (err) {
        console.log(err.name, err.message);
    });