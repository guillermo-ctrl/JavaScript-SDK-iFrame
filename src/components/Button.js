import styled from 'styled-components'
import {useEffect, useState} from "react";

export default function Button(){

    const [status, setStatus] = useState("Notifications are off")
    const [subscribed, setSubscribed] = useState(false)
    const CleverPush = window.CleverPush || [];
    CleverPush.push(['unsubscribe']);
  
    

    const handleClick = event => {

        CleverPush.push(['isSubscribed', function(result) {
            console.log('CleverPush isSubscribed result', result); 
            setSubscribed(result)
          }])

        if (subscribed) {
            CleverPush.push(['unsubscribe']);
            setStatus("Notifications are off")
            setSubscribed(false)
        }
        else {
            CleverPush.push(['triggerOptIn', true, function(err, subscriptionId) {
                if (err) {
                    console.error(err);
                    alert("There was an error, please try again");
                } else {
                    console.log('successfully subscribed with id', subscriptionId);
                    setSubscribed(true)
                    setStatus("Notifications are on")
                }
            }]);
            
        }
        
    }

    return(
        <BigButton onClick = {handleClick}>
            {status}
        </BigButton>
    )
}


const BigButton = styled.button`
    color: white;
    padding: 30px 10px;
    background: #1338a0;
    margin: 1em auto;
    font-size: 29px;
    display: block;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    border-radius: 5px;
    padding: 12.5px 25px;
    line-height: 1;
    margin: 0;

`