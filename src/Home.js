import './Home.css';
import {useEffect, useState} from 'react';
import {searchSummoner , verifySummoner} from "./requests.js"
import { useNavigate } from "react-router-dom";

const Home = () => {

    let navigate = useNavigate(); 
    const routeChangeMatch = (name, region) =>{ 
        let path = `/match/${name}/${region}`; 
        navigate(path);
      }

    const routeChangeProfile = (name, region) =>{ 
        let path = `/profile/${name}/${region}`; 
        navigate(path);
      }
      
    const [name, setName] = useState("PAMC03")
    const [server, setServer] = useState("euw1")


    
    return (

     <div className='home'>
        <h1 id='title'>League of Legends Companion</h1>
        <div className='searchSummoner'>
        <label for="summonerInput" id="summonerInputLabel">Summoner Name:</label>
        <input onChange={event => setName(event.target.value)} placeholder='summoner name' id='summonerInput'/>
        <label for="region" id='regionInput'>Region:</label>
        <select onChange={event => setServer(event.target.value)} name="regions" id="region">
            <option value="euw1">EUW</option>
            <option value="na1">NA</option>
            <option value="eun1">EUNE</option>
            <option value="kr">KR</option>
        </select>
        </div>
        <div id='buttonDiv'>
        <button className='summonerSearchButtons' id='profileButton' onClick={() => {routeChangeProfile(name, server)}}>View Summoner Profile</button>
        <button className='summonerSearchButtons' id='matchButton' onClick={() => {routeChangeMatch(name, server)}} disabled>View Summoner Match</button>
        </div>
        
        <h4 id='disclaimer'>Note: If the website isn't showing all of the information, the api request limit might have been surpassed  (100 requests every 2 minutes), please wait before trying again.</h4>
     </div>
    
    );
  }
  
  export default Home;