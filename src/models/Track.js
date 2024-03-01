export class Track {
    #name
    #path
    #audio
    
    
    setName(name){
        this.#name = name
    }

    setPath(path){
        this.#path = path
    }

    setAudio(audio){
        this.#audio = audio
    }

    getName(){
        return this.#name
    }

    getPath(){
        return this.#path
    }

    getAudio(){
        return this.#audio
    }
}