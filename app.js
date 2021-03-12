class Drumkit {
    constructor(){
        this.pads      = document.querySelectorAll('.pad');
        this.playBtn   = document.querySelectorAll('.play');    
        this.selects   = document.querySelectorAll('select');

        this.kickAudio   = document.querySelector('.kick-sound');
        this.snareAudio  = document.querySelector('.snare-sound');
        this.hihatAudio  = document.querySelector('.hihat-sound');

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
            this.playBtn[0].innerText = 'STOP';
        }
        else{
            this.playBtn[0].innerText = 'PLAY';
        }
    }

    changeMusic (e) {
        const selectName = e.target.name;
        const selectValue = e.target.value;

        switch (selectName){
            case 'kick-select':
                drumkit.kickAudio.src = selectValue;
                break;
            case 'snare-select':
                drumkit.snareAudio.src = selectValue;
                break;
            case 'hihat-select':
                drumkit.hihatAudio.src = selectValue;
                break;
        
      
        
        }
        console.log(drumkit.kickAudio)
    }
}



const drumkit = new Drumkit();

drumkit.pads.forEach( pad =>{
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

drumkit.playBtn[0].addEventListener("click", function() {
    drumkit.updateBtn();
    drumkit.start();
});

drumkit.selects.forEach( select => {
    select.addEventListener('change', function(e){
        drumkit.changeMusic(e);
    })
})