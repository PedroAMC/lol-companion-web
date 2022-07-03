import './Home.css';
import {useEffect} from 'react';
import {searchSummoner} from "./requests.js"

const Home = () => {
    
    return (
     <div className='Home'>
        <h1 id='title'>League of Legends Companion</h1>
        <div className='searchSummoner'>
        <label for="summonerInput" id="summonerInputLabel">Summoner Name:</label>
        <input placeholder='summoner name' id='summonerInput'/>
        <label for="region" id='regionInput'>Region:</label>
        <select name="regions" id="region">
            <option value="EUW">EUW</option>
            <option value="NA">NA</option>
            <option value="KR">KR</option>
            <option value="CH">CH</option>
        </select>
        </div>
        <div id='buttonDiv'>
        <button className='summonerSearchButtons' id='profileButton' onClick={() => {}}>View Summoner Profile</button>
        <button className='summonerSearchButtons' id='matchButton' onClick={() => {}}>View Summoner Match</button>
        </div>
     </div>
    
    );
  }
  
  export default Home;