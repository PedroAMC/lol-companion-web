import './Home.css';
import {useEffect, useState} from 'react';
import {searchSummoner} from "./requests.js"
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
    const [server, setServer] = useState("EUW")


    
    return (

     <div className='Home'>
        <h1 id='title'>League of Legends Companion</h1>
        <div className='searchSummoner'>
        <label for="summonerInput" id="summonerInputLabel">Summoner Name:</label>
        <input onChange={event => setName(event.target.value)} placeholder='summoner name' id='summonerInput'/>
        <label for="region" id='regionInput'>Region:</label>
        <select onChange={event => setServer(event.target.value)} name="regions" id="region">
            <option value="EUW">EUW</option>
            <option value="NA">NA</option>
            <option value="KR">KR</option>
            <option value="CH">CH</option>
        </select>
        </div>
        <div id='buttonDiv'>
        <button className='summonerSearchButtons' id='profileButton' onClick={() => {routeChangeProfile(name, server)}}>View Summoner Profile</button>
        <button className='summonerSearchButtons' id='matchButton' onClick={() => {routeChangeMatch(name, server)}}>View Summoner Match</button>
        </div>

     </div>
    
    );
  }
  
  export default Home;