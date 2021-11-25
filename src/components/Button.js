import styled from 'styled-components'
import {useEffect, useState} from "react";

export default function Button(){

    const [status, setStatus] = useState("Notifications are off")
    const [subscribed, setSubscribed] = useState(false)
    const [compatibleBrowser, setCompatibleBrowser] = useState(false);
    const CleverPush = window.CleverPush || [];
    CleverPush.push(['unsubscribe']);
  
    
    useEffect(() => {
        console.log("useeffect")
        document.getElementById('#cleverpush-button').style.display = 'none';
    
        var showPushOptIn = function() {
            document.getElementById('#cleverpush-button').style.display = 'block';
        }
        
        if (!window.CleverPush || !window.CleverPush.initialized) {
            window.cleverPushInitCallback = function(err) {
                if (err) {
                    console.error('Init callback error:', err);
                } else {
                    showPushOptIn();
                    setCompatibleBrowser(true)
                }
            };
        } else {
            showPushOptIn();
            setCompatibleBrowser(true)
        }
      });


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

    if (compatibleBrowser) {
        return(
            <BigButton onClick = {handleClick} id = "#cleverpush-button">
                {status}
            </BigButton>
        )
    }
    else {
        return (
            <div>
                <p id = "#cleverpush-button"></p>

                <p>
                Your browser is not compatible with push notifications
            </p>
            </div>
            
        )
    }
    
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