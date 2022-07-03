import './Profile.css';
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react';
import {searchSummoner, verifySummoner} from "./requests.js"
const axios = require('axios').default;
const config = require("./config.json");

const key = config.RIOT_API_KEY;
const apiKey= "api_key=" + key




function Profile(){
    const { name, region } = useParams()

   
    const [playerData, setPlayerData] = useState({})

    const searchSummoner = (summonerName, region) => {
        axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?${apiKey}`).then(function(response){
        //success
        console.log(response.data)
        setPlayerData(response.data)            
            
            
    }
        ).catch(function (error){
        //error

        })
    }

    useEffect(() => {
        searchSummoner(name, region)

    }, [])



    
    if(JSON.stringify(playerData) != "{}")  {
        return ( 
            <div className='profile'>
            
            <h1 id='playerName'> {name} </h1>
            <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <h1 className='playerInfo'>Player Level: {playerData.summonerLevel}</h1>
            
            </div>
        ) 

    } else return (

        <h1 id="playerName">This summoner doesn't exist</h1>

            
        )
    
    

}

export default Profile;