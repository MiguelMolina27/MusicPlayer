export class TrackList {
    #doublelist
    #currentTrack = undefined
    #isSelected = false
    #isPlaying = false
    #autoplay


   
    getAutoPlay(){
        return this.#autoplay
    }
        
    markNotAutoPlay(){
        this.#autoplay = false
    }
    markAutoPlay(){
        this.#autoplay = true
    }
    markNotPlaying(){
        this.#isPlaying = false
    }
    
    markSelected(){
        this.#isSelected = true
    }

    setCurrentTrack(track){
        this.#currentTrack = track
    }

    getCurrentTrack(){
        return this.#currentTrack
    }
    

    setDoubleList(doublelist){
        this.#doublelist = doublelist
    }

    getDoubleList(){
        return this.#doublelist
    }

    nextTrack(){
        if(this.#doublelist.size() > 1){
            this.#currentTrack.getData().getAudio().currentTime = 0
            this.#currentTrack.getData().getAudio().pause()
            this.#currentTrack = this.#currentTrack.next
        } else {
            return undefined
        }
        
    }

    prevTrack(){
        if(this.#doublelist.size() > 1){
            this.#currentTrack.getData().getAudio().currentTime = 0
            this.#currentTrack.getData().getAudio().pause()
            this.#currentTrack = this.#currentTrack.prev
        } else {
            return undefined
        }
        
    }

    playPauseTrack(){
        if(this.#isPlaying){
            this.pauseTrack()
            
        } else {
            this.playTrack()
        }
    }

    playTrack(){
        this.#isPlaying = true
        if(this.#isSelected && this.#currentTrack != undefined){
            this.#currentTrack.getData().getAudio().play()
        } else {
            this.#isPlaying = false
            return undefined
        }
        
    }

    pauseTrack(){
        this.#isPlaying = false
        this.#currentTrack.getData().getAudio().pause()
    }
}