import './Profile.css';
import {useParams} from 'react-router-dom'
import {useEffect} from 'react';
import {searchSummoner} from "./requests.js"

function Profile(){
    
    const { name, region } = useParams()

    return(

        <div>
            <h1>{name} - {region}</h1>
        </div>


    )

}

export default Profile;