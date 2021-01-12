import React,{useState, useEffect} from 'react';
import {constants} from '../utils/constants';
import axios from 'axios';
const Ranks = (props)=>{
    const [results, setResults] = useState(null);
    useEffect(()=>{
    
        axios.get(
            constants.serverBaseUrl+constants.ranks,{
                headers:{
                    bearer:sessionStorage.token
                }
            }
        ).then(
            (response)=>{
                setResults(response.data);
            }
        ).catch((err)=>{
            alert(err.response.data.message);
        })
    },[])
    if(results){
    return(
        <div>
            <h2 className="text-center text-success">Welcome {props.name}</h2>
            <table className="table table-borderless table-dark">
                <thead className="thead-light">
                    <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody className = "table-striped">
                    {
                        results.map((result, index)=>{
                            return(
                                
                                    <tr key={result.email}>
                                        <td>{index+1}</td>
                                        <td>{result.name}</td>
                                        <td>{result.email}</td>
                                        <td>{result.score}</td>
                                    </tr>
                                
                            )
                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
    }
    else{
        return <h2 className="text-center alert-secondary">Fetching Results</h2>
    }
}
export default Ranks;