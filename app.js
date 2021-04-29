class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play')
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hi-hat-sound');
        this.clapAudio = document.querySelector('.clap-sound');
        this.select = document.querySelectorAll('select');
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempoNr = document.querySelector('.tempo-nr');
        this.isPlaying = 1;
        this.index = 0;
        this.bpm = 120;
    }

    active() {
        this.classList.toggle('active');
    }

    repeat() {
        let step = this.index % 8;
        const activeBeat = document.querySelectorAll(`.b${step}`);
        activeBeat.forEach(activePad => {
            activePad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
        });
        this.playMusic(activeBeat);
        this.index++;
    }

    start() {
        if (this.isPlaying === 1) {
            const tempo = (60 / this.bpm) * 1000;
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, tempo);
        } else {
            clearInterval(this.isPlaying);
            this.isPlaying = 1;
        }
    }

    updateBtn() {
        if (this.playBtn.children[0].classList.contains('fa-play')) {
            this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.playBtn.classList.remove('active');
        }
    }

    playMusic(activeBeat) {
        activeBeat.forEach(pad => {
            if (pad.classList.contains('active')) {
                if (pad.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (pad.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (pad.classList.contains('hi-hat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (pad.classList.contains('clap-pad')) {
                    this.clapAudio.currentTime = 0;
                    this.clapAudio.play();
                }
            }
        });
    }

    mute(e) {
        e.target.classList.toggle('active');
        if (e.target.classList.contains('active')) {
            e.target.innerHTML = '<i class="fas fa-volume-mute"></i>';
            switch (true) {
                case e.target.classList.contains('kick-volume'):
                    drumKit.kickAudio.volume = 0;
                    break;
                case e.target.classList.contains('snare-volume'):
                    drumKit.snareAudio.volume = 0;
                    break;
                case e.target.classList.contains('hi-hat-volume'):
                    drumKit.hihatAudio.volume = 0;
                    break;
                case e.target.classList.contains('clap-volume'):
                    drumKit.clapAudio.volume = 0;
                    break;
            }
        } else {
            e.target.innerHTML = '<i class="material-icons">volume_up</i>';
            switch (true) {
                case e.target.classList.contains('kick-volume'):
                    drumKit.kickAudio.volume = 1;
                    break;
                case e.target.classList.contains('snare-volume'):
                    drumKit.snareAudio.volume = 1;
                    break;
                case e.target.classList.contains('hi-hat-volume'):
                    drumKit.hihatAudio.volume = 1;
                    break;
                case e.target.classList.contains('clap-volume'):
                    drumKit.clapAudio.volume = 1;
                    break;
            }
        }
    }

    changeSound(e) {
        let selectionValue = e.target.value;
        const selectionName = e.target.name;
        console.log(selectionName);
        switch (selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hi-hat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    changeTempo() {
        this.tempoNr.textContent = this.tempoSlider.value;
        this.bpm = this.tempoSlider.value;
    }

    updateTempo() {
        clearInterval(this.isPlaying);
        this.isPlaying = 1;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {

            drumKit.start();
        }
    }
}
const drumKit = new DrumKit();
drumKit.playBtn.addEventListener('click',function (){
    drumKit.updateBtn();
    drumKit.start();
});
drumKit.muteBtn.forEach(mute => {
    mute.addEventListener('click', function (e){
    drumKit.mute(e);
   });
})
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.active);
    pad.addEventListener('animationend', function(){
    this.style.animation = '';
 });
});
drumKit.select.forEach(select => {
   select.addEventListener('change', function(e){
       drumKit.changeSound(e);
    });
});
drumKit.tempoSlider.addEventListener('input', function (){
   drumKit.changeTempo();
});

drumKit.tempoSlider.addEventListener('change', function (){
    drumKit.updateTempo();
});


