import './Match.css';
import {useParams} from 'react-router-dom'
import { useEffect} from 'react';
import {searchSummoner} from "./requests.js"

function Match(){

    const { name, region } = useParams()

    return(

        <div>
        
            <h1>{name} - {region}</h1>
        </div>


    )

}

export default Match;