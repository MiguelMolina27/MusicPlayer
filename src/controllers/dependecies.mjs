import { LinkedList } from "../models/DoubleCircularLinkedList.mjs";
import { Track } from "../models/track.js";
import { TrackList } from "../models/TrackList.js";



export const createDoubleList =  function(){
    let newList = new LinkedList()
    return newList
}

export const createTrack = function(){
    let newTrack = new Track()
    return newTrack
}

export const createAudio = function(path){
    let newAudio = new Audio(path)
    return newAudio
}

const tracklist = new TrackList()

export {tracklist}

