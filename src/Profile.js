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
    const version = "12.12.1"
   
    const [playerData, setPlayerData] = useState({})
    const [rankInfo, setRankInfo] = useState({})
    const [masteryInfo, setMasteryInfo] = useState({})
    const [champion1, setChampion1] = useState("")
    const [champion2, setChampion2] = useState("")
    const [champion3, setChampion3] = useState("")

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
                console.log(error)
            })        
                
                
        }
            ).catch(function (error){
            //error
            console.log(error)
            })   
        
            
            
    }
        ).catch(function (error){
        //error
        console.log(error)
        })
            
    }

    const getChampion = (id, id2, id3) => {
        axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`).then(function(response){
            //success
            console.log(response.data) 
            //let list = JSON.parse(response.data);
            let championList = response.data.data;   

            for (var i in championList) {

                if (championList[i].key == id) {
                    setChampion1(championList[i].id)
                } else if (championList[i].key == id2){
                    setChampion2(championList[i].id)
                } else if (championList[i].key == id3){
                    setChampion3(championList[i].id)
                }
          
                //console.log(championList[i].id + " | " + championList[i].key);
              }
                
        }
            ).catch(function (error){
            //error
                console.log(error)
            })        


    } 

    useEffect(() => {
        getSummonerObject(name, region)
    

    }, [])



    
    if(JSON.stringify(playerData) != "{}" && JSON.stringify(rankInfo) != "{}" && JSON.stringify(masteryInfo) != "{}")  {
        return (
             
            
            <div className='profile'>
            {getChampion(masteryInfo[0].championId, masteryInfo[1].championId, masteryInfo[2].championId)}
            <h1 id='playerName'> {name} </h1>
            <div class="container-1">

            
            <div className='box-1'>
                <h1 className='playerInfo'>Player Icon:</h1>
                <img id="playerIcon" width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/` + playerData.profileIconId + ".png"}></img>
                <div className='champion'>
                <h2 className='playerInfo'>{champion1} - Mastery {masteryInfo[0].championLevel} {masteryInfo[0].championPoints} Points</h2>
                <img className="championIcon" width="50" height="50" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/` + champion1 + ".png"}></img>
                </div>
                <div className='champion'>
                <h2 className='playerInfo'>{champion2} - Mastery {masteryInfo[1].championLevel} {masteryInfo[1].championPoints} Points</h2>
                <img className="championIcon" width="50" height="50" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/` + champion2 + ".png"}></img>
                </div>  
                <div className='champion'>
                <h2 className='playerInfo'>{champion3} - Mastery {masteryInfo[1].championLevel} {masteryInfo[1].championPoints} Points</h2>
                <img className="championIcon" width="50" height="50" src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/` + champion3 + ".png"}></img>
                </div>       
                
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