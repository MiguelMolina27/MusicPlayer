import { createDoubleList, createAudio, createTrack, tracklist } from "./dependecies.mjs";

const  list = createDoubleList()
tracklist.setDoubleList(list)

const inputFile = document.getElementById("input__input-track")
inputFile.addEventListener("change",()=>{
    if (inputFile.value) {
        addToPlaylist.style.display = "block"
    } else {
        addToPlaylist.style.display = "none"
    }
})

const autoPlaySelector = document.getElementById("input__input-autoPlay")
autoPlaySelector.addEventListener("change", ()=> {
    if (autoPlaySelector.checked){
        tracklist.markAutoPlay()
    } else {
        tracklist.markNotAutoPlay()
    }
  })

const addToPlaylist = document.getElementById("button__button-addPlaylist")
addToPlaylist.addEventListener("click", () => {
    let track = createTrack()
    let path = document.getElementById("input__input-track").value
    path = path.slice(12,)
    track.setName(path)
    path = "src\\audios\\" + path
    track.setPath(path)
    let audio = createAudio(path)
    track.setAudio(audio)
    tracklist.getDoubleList().push(track)

    const trackList = document.getElementById("container__container-tracks")
    let trackRow = document.createElement("div")
    let trackName = document.createElement("p")
    trackRow.setAttribute("class", "tracks")
    trackRow.setAttribute("id", tracklist.getDoubleList().size() - 1)
    trackName.innerText = track.getName()
    trackRow.appendChild(trackName)
    trackList.appendChild(trackRow)

    const tracks = document.querySelectorAll(".tracks")
    selectTrack(tracks)

    addToPlaylist.style.display = "none"
})


const selectTrack = function (tracks) {
    tracks.forEach(function (track){
        track.addEventListener("click", () => {
            tracklist.markSelected()
            removeTrack.style.display = "block"
            if(tracklist.getCurrentTrack() != undefined){
                tracklist.getCurrentTrack().getData().getAudio().pause()
            }
            tracklist.setCurrentTrack(tracklist.getDoubleList().getElementAt(track.id))
            currentTrack(tracklist.getCurrentTrack())
        });
    });
}

const currentTrack = function (Nodetrack) {
    tracklist.getCurrentTrack().getData().getAudio().currentTime = 0
    tracklist.getCurrentTrack().getData().getAudio().pause()
    const containerCurrent = document.getElementById("container__container-currentTrack")
    clean(containerCurrent)
    let name = document.createElement("p")
    name.innerText = Nodetrack.getData().getName()
    containerCurrent.appendChild(name)
}

const clean = function (containerCurrent) {
    while (containerCurrent.firstChild) {
        containerCurrent.removeChild(containerCurrent.firstChild);
    }
}

const prevTrack = document.getElementById("button__button-controls__prev")
prevTrack.addEventListener("click", () => {
    tracklist.markNotPlaying()
    tracklist.prevTrack()
    currentTrack(tracklist.getCurrentTrack())
    if(tracklist.getAutoPlay()){
        autoPlay()
    }
})


const playTrack = document.getElementById("button__button-controls__play")
playTrack.addEventListener("click",() => {
    tracklist.playPauseTrack()
    if(tracklist.getAutoPlay()){
       autoPlay()
    }
})

const nextTrack = document.getElementById("button__button-controls__next")
nextTrack.addEventListener("click", () => {
    tracklist.markNotPlaying()
    tracklist.nextTrack()
    currentTrack(tracklist.getCurrentTrack())
    if(tracklist.getAutoPlay()){
        autoPlay()
    }
})

const autoPlay = () => {
    tracklist.getCurrentTrack().getData().getAudio().addEventListener("ended",()=>{
        tracklist.markNotPlaying()
        tracklist.nextTrack()
        currentTrack(tracklist.getCurrentTrack())
        tracklist.playPauseTrack()
    })
}

const removeTrack = document.getElementById("button__button-removeTrack")
removeTrack.addEventListener("click",()=>{
    tracklist.pauseTrack()
    if(tracklist.getDoubleList().size() == 1){
        const resetList = createDoubleList()
        tracklist.setDoubleList(resetList)
        const containerCurrent = document.getElementById("container__container-currentTrack")
        clean(containerCurrent)
    }
    
    const trackList = document.getElementById("container__container-tracks")
    clean(trackList)
    tracklist.getDoubleList().remove(tracklist.getCurrentTrack().getData())
    tracklist.setCurrentTrack(undefined)
    let track

    for(let i=0;i<tracklist.getDoubleList().size();i++){
        track = tracklist.getDoubleList().getElementAt(i).getData()
        let trackRow = document.createElement("div")
        let trackName = document.createElement("p")
        trackRow.setAttribute("class", "tracks")
        trackRow.setAttribute("id",i)
        trackName.innerText = track.getName()
        trackRow.appendChild(trackName)
        trackList.appendChild(trackRow)
    }

    const tracks = document.querySelectorAll(".tracks")
    selectTrack(tracks)
})

