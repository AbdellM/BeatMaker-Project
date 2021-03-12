class Drumkit {
    constructor(){
        this.pads    = document.querySelectorAll('.pad');   
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.muted');

        this.playBtn = document.querySelector('.play'); 
        this.speed    = document.querySelector('.speed-slider');

        this.kickAudio  = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');

        this.currentKick  = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";

        this.index     = 0;
        this.bpm       = 150;
        this.isPlaying = null;
    }

    activePad () {
        this.classList.toggle('active');
    }

    repeat () {
        let step = this.index % 8;
        const activeBar = document.querySelectorAll(`.b${step}`);
 
        activeBar.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`; 

            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }

    start () {
        const interval = (60 / this.bpm) * 1000;

        if (!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
        else{
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn () {
        if (!this.isPlaying){
            this.playBtn.innerText = 'STOP';
            this.playBtn.classList.add("active");
        }
        else{
            this.playBtn.innerText = 'PLAY';
            this.playBtn.classList.remove("active");
        }
    }

    changeMusic (e) {
        const selectName = e.target.name;
        const selectValue = e.target.value;

        switch (selectName){
            case 'kick-select':
                this.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectValue;
                break;
        }
    }

    mute (e) {
        const muteName = e.target.classList[1];
        e.target.classList.toggle('active');

        if (e.target.classList.contains('active'))
            switch (muteName){
                case 'kick-muted':
                    this.kickAudio.volume = 0;
                    break;
                case 'snare-muted':
                    this.snareAudio.volume = 0;
                    break;
                case 'hihat-muted':
                    this.hihatAudio.volume = 0;
                    break;
            }
        else
            switch (muteName){
                case 'kick-muted':
                    this.kickAudio.volume = 1;
                    break;
                case 'snare-muted':
                    this.snareAudio.volume = 1;
                    break;
                case 'hihat-muted':
                    this.hihatAudio.volume = 1;
                    break;
            }
    }

    changeSpeed (e) {
        const speedText = document.querySelector('.speed-nr');
        speedText.innerText = e.target.value;
    }

    updateSpeed (e) {
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;

        if (this.playBtn.classList.contains("active"))
            this.start();
    }
}


const drumkit = new Drumkit();

drumkit.pads.forEach( pad =>{
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

drumkit.playBtn.addEventListener("click", function() {
    drumkit.updateBtn();
    drumkit.start();
});

drumkit.selects.forEach( select => {
    select.addEventListener('change', function(e){
        drumkit.changeMusic(e);
    });
});

drumkit.muteBtn.forEach( mute => {
    mute.addEventListener('click', function(e){
    drumkit.mute(e);
    });
});

drumkit.speed.addEventListener('input', function(e){
    drumkit.changeSpeed(e);
});

drumkit.speed.addEventListener('change', function(e){
    drumkit.updateSpeed(e);
});