console.log("Some The Fun Begins With JavaScript");

let currentSong = new Audio();
let songs;
let currFolder;
let index;
// let songInfo = document.querySelector(".songinfo");

function secondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs(folder){
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/Spotify_clone/${folder}/`);
    let response = await a.text();
    //console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    songs = [];
    for(let index = 0;index<as.length;index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    let songUrl = document.querySelector('.songList').getElementsByTagName('ul')[0];
    //console.log(songUrl);
    songUrl.innerHTML = "";
    for(const song of songs){
        // song = song.replace("%20","");
        // console.log("*");
        // console.log(songUrl);
        songUrl.innerHTML = songUrl.innerHTML + `<li>
        <img class="invert" src="/Spotify_clone/svg_folder/music.svg">
        <div class="info">
            <div>${song.replaceAll("%20","")}</div>
            <div>(ILLUMINATI)</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img src="/Spotify_clone/svg_folder/headphone.svg">
        </div>
    </li>`;

    // console.log(songUrl);

    }
    
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener('click',element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            // document.querySelector(".songinfo").innerHTML = e.querySelector(".info").firstElementChild.innerHTML;
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        });      
    });
    
    return songs;
}

const playMusic = (track,pause=false) => {
    // let audio = new Audio(`/Spotify_clone/songs/${track}`);
    // console.log(track);
    currentSong.src = `/Spotify_clone/${currFolder}/` + track;
    if(!pause){
        currentSong.play();
        play.src = "/Spotify_clone/svg_folder/pause.svg";
    }

    //These two MUST BE ADDED to let the playbar show the song name and the starting 00:00 as the time.
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

//     // script.js
//     //const currentSong = new Audio(); // Your audio element
//     const playbar = document.querySelector('.playbar');

//     currentSong.addEventListener('timeupdate', updatePlaybar);

//     function updatePlaybar() {
//         const currentTime = currentSong.currentTime;
//         const duration = currentSong.duration;

//     if (!isNaN(duration)) {
//         const percentage = (currentTime / duration) * 100;
//         playbar.style.width = percentage + '%';
//     }
// }

}

async function displayAlbums(){
    let a = await fetch(`/Spotify_clone/songs/`);
    let response = await a.text();
    //console.log(response);
    let div = document.createElement('div');
    div.innerHTML = response;
    let anchors = div.getElementsByTagName('a')
    let cardContainer = document.querySelector(".card-container");
    let array = Array.from(anchors);
    for(let index = 0 ; index<array.length ; index++){
        const e = array[index];
        if(e.href.includes('/songs')){
            let folder = (e.href.split('/').slice(-2)[0]);

            let a = await fetch(`/Spotify_clone/songs/${folder}/info.json`);
            let response = await a.json();
            console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
            <div class="play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#00FF00" stroke-width="1.5" fill="#00FF00"/>
                    <path d="M15.4531 12.3948C15.3016 13.0215 14.5857 13.4644 13.1539 14.3502C11.7697 15.2064 11.0777 15.6346 10.5199 15.4625C10.2893 15.3913 10.0793 15.2562 9.90982 15.07C9.5 14.6198 9.5 13.7465 9.5 12C9.5 10.2535 9.5 9.38018 9.90982 8.92995C10.0793 8.74381 10.2893 8.60868 10.5199 8.53753C11.0777 8.36544 11.7697 8.79357 13.1539 9.64983C14.5857 10.5356 15.3016 10.9785 15.4531 11.6052C15.5156 11.8639 15.5156 12.1361 15.4531 12.3948Z" stroke="#000000" stroke-width="1.5" stroke-linejoin="round" fill="#000000"/>
                </svg>                      
            </div>
            <img src="songs/${folder}/cover.jpeg">
            <h3>${response.title}</h3>
            <p>${response.desscription}</p>
        </div>`;
        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0]);
        });
    });
}

async function main(){

    await getSongs("songs/first");
    playMusic(songs[0],true);

    //display all the albums
    displayAlbums();

    let songUrl = document.querySelector('.songList').getElementsByTagName('ul')[0];
    //console.log(songUrl);
    for(const song of songs){
        // song = song.replace("%20","");
        // console.log("*");
        // console.log(songUrl);
        songUrl.innerHTML = songUrl.innerHTML + `<li>
        <img class="invert" src="/Spotify_clone/svg_folder/music.svg">
        <div class="info">
            <div>${song.replaceAll("%20","")}</div>
            <div>(ILLUMINATI)</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img src="/Spotify_clone/svg_folder/headphone.svg">
        </div>
    </li>`;

    // console.log(songUrl);

    }
    
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener('click',element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            // document.querySelector(".songinfo").innerHTML = e.querySelector(".info").firstElementChild.innerHTML;
            playMusic(e.querySelector(".info").firstElementChild.innerHTML);
        });      
    });
    

    //Attaching the eventListber to each song
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "/Spotify_clone/svg_folder/pause.svg";
        }else{
            currentSong.pause();
            play.src = "/Spotify_clone/svg_folder/playbutton.svg";
        }
    })

    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime , currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}
        /${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + '%';
    });

    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration*percent)/100;
        if(currentSong.currentTime == currentSong.duration){
            if(index+1 < songs.length){

                playMusic(songs[index+1]);
            }
        }
    });

    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0";
        document.querySelector(".close").style.visibility = "visible";
    })

    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-120%";
        document.querySelector(".close").style.visibility = "hidden";
    })

    previous.addEventListener("click",()=>{
        console.log("previous");
        let index = songs.indexOf(currentSong.src.split('/').slice(-1)[0]);
        if((index - 1 ) >= 0){
            playMusic(songs[index-1]);
        }
        // console.log(songs,index);
    });
    
    next.addEventListener("click",()=>{
        currentSong.pause();
        console.log("next");
        index = songs.indexOf(currentSong.src.split('/').slice(-1)[0]);
        if((index + 1 ) < songs.length){
            playMusic(songs[index+1]);
        }
        // console.log(songs,index);
        });

        document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
            console.log(e);
            currentSong.volume = parseInt(e.target.value)/100;
        });

        document.querySelector(".volume>img").addEventListener("click",(e)=>{
            if(e.target.src.includes("/Spotify_clone/svg_folder/volume.svg")){
                e.target.src= e.target.src.replace("/Spotify_clone/svg_folder/volume.svg","/Spotify_clone/svg_folder/mute.svg");
                currentSong.volume = 0;
                document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            }else{
                e.target.src=e.target.src.replace("/Spotify_clone/svg_folder/mute.svg","/Spotify_clone/svg_folder/volume.svg");
                currentSong.volume = "0.1";
                document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
            }
        });

        
}

main();
