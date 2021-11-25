import styled from 'styled-components'
import {useEffect, useState} from "react";

export default function Button(){

    const [status, setStatus] = useState("Notifications are off")
    const [subscribed, setSubscribed] = useState(false)
    const CleverPush = window.CleverPush || [];

    const handleClick = event => {
        CleverPush.push(['isSubscribed', function(result) {
            console.log('CleverPush isSubscribed result', result); // true or false
            setSubscribed(result)
          }])
        console.log(subscribed)
        if (subscribed) {
            console.log("1")
            CleverPush.push(['unsubscribe']);
            setStatus("Notifications are off")
        }
        else {
            console.log("2")
            CleverPush.push(['triggerOptIn', true, function(err, subscriptionId) {
                if (err) {
                    console.error(err);
                } else {
                    console.log('successfully subscribed with id', subscriptionId);
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