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
    const [rankInfo, setRankInfo] = useState({})
    const [masteryInfo, setMasteryInfo] = useState({})

    const getSummonerObject = (summonerName, region) => {
        axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?${apiKey}`).then(function(response){
        //success
        console.log(response.data)
        setPlayerData(response.data)
        let id = response.data.id
        axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?${apiKey}`).then(function(response){
            //success
            console.log(response.data)
            setMasteryInfo(response.data)     
            axios.get(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?${apiKey}`).then(function(response){
            //success
            console.log(response.data)
            setRankInfo(response.data)            
                
                
        }
            ).catch(function (error){
            //error
    
            })        
                
                
        }
            ).catch(function (error){
            //error
    
            })   
        
            
            
    }
        ).catch(function (error){
        //error

        })
            
    }






    
    if(JSON.stringify(playerData) != "{}" && JSON.stringify(rankInfo) != "{}")  {
        return ( 
            <div className='profile'>
            <h1 id='playerName'> {name} </h1>
            <div class="container-1">

                
            <div className='box-1'>
                <h1 className='playerInfo'>Player Icon:</h1>
                <img id="playerIcon" width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            </div>
            <div className='box-2'>
                <h1 className='playerInfo' id='playerLevel'>Player Level: {playerData.summonerLevel}</h1>
            </div>
            {rankInfo[1] != undefined ? (<div><div className='box-3'>
                <h1 className='playerInfo'>Solo Queue Rank: {rankInfo[1].tier} {rankInfo[1].rank} </h1>
            </div><div className='box-5'>
                <h1 className='playerInfo'>Solo Queue Wins: {rankInfo[1].wins}</h1>
            </div>
            <div className='box-6'>
                <h1 className='playerInfo'>Solo Queue Losses: {rankInfo[1].losses}</h1>
            </div></div>) : (<div> </div>)}
            
            {rankInfo[0] != undefined ? (<div><div className='box-4'>
                <h1 className='playerInfo'>Flex Queue Rank: {rankInfo[0].tier} {rankInfo[0].rank} </h1>
            </div><div className='box-5'>
                <h1 className='playerInfo'>Flex Queue Wins: {rankInfo[0].wins}</h1>
            </div>
            <div className='box-6'>
                <h1 className='playerInfo'>Flex Queue Losses: {rankInfo[0].losses}</h1>
            </div></div>) : (<div> </div>)}
            

            </div>
            </div>
        ) 

    } else return (

        <h1 id="playerName">This summoner doesn't exist</h1>

            
        )
    
    

}

export default Profile;