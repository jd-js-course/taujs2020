var ringModulator = new Pizzicato.Effects.RingModulator({
    speed: 30,
    distortion: 1,
    mix: 0.5
});

var delay = new Pizzicato.Effects.Delay({
    feedback: 0.6,
    time: 0.4,
    mix: 0.5
});

var distortion = new Pizzicato.Effects.Distortion({
    gain: 0.4
});

let sound;
function selectFile(file){
    if(sound !== undefined){
        sound.stop();
    }
    sound = new Pizzicato.Sound({
        source: 'file',
        options: {
            path: file,
            loop: true
        }
    }, function() {
        // Sound loaded!
        sound.play();
    });
}
(function() {
    const ul = document.getElementsByTagName('ul')[0];
    fetch('/list')
        .then(response => response.json())
        .then(files => {
            for(let file of files){
                const li = document.createElement('li');
                const fileName = file.split('/')[2]
                const time = fileName.split('-')[1].split('.')[0];
                const date = new Date(parseInt(time));
                li.innerText = date.toLocaleString();
                const btn = document.createElement('button');
                btn.innerText = "Select";
                btn.addEventListener('click', function (ev) {
                    selectFile(file);
                });
                li.appendChild(btn);
                ul.appendChild(li);
            }
        });
})();