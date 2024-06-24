import axios from "axios"

const url = "http://localhost:3305/webplayer"

export interface IPlaylistInfo{
    name: string;
    id: string;
    images: [
        {
            height: any,
            url: string,
            width: any
        }
    ]
}

export interface ITrackNameArtistPreviewUrl{
    trackNameAndArtist: string;
    previewUrl: string
  }

export interface ICountries{
    value: number; label: string
}

export async function getPlaylistInfo(country:string): Promise<IPlaylistInfo>{
    try{
        const result = await axios.get(`${url}/getplaylistinfo/${country}`);
        const playlistInfo = result.data;
        return playlistInfo;
    }catch(error){
        console.error(error);
        return { name: "", id: "", images: [{ height: null, url: "", width: null }] };
    }
}

export async function getPlaylistTracks(playlistId:string): Promise<ITrackNameArtistPreviewUrl[]>{
    try{
        const result = await axios.get(`${url}/getplaylisttracks/${playlistId}`);
        const playlistTracks = result.data;
        return playlistTracks;
    }catch(error){
        console.error(error);
        return [];
    }
}


export async function getCountries(): Promise<ICountries[]>{
    try{
        const result = await axios.get(`${url}/getcountries`);
        const countries = result.data;
        return countries;
    }catch(error){
        console.error(error);
        return [];
    }
}