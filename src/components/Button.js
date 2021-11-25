import styled from 'styled-components'
import {useEffect, useState} from "react";

export default function Button(){

    const [buttonText, setButtonText] = useState("Notifications are off")
    const [subscribed, setSubscribed] = useState(false)
    const [compatibleBrowser, setCompatibleBrowser] = useState(false);
    const CleverPush = window.CleverPush || [];
    CleverPush.push(['unsubscribe']);
  
    
    useEffect(() => {
        const button = document.getElementById('#cleverpush-button')
        const text = document.getElementById('#non-compatible-message')
        
        button.style.display = 'none';
        text.style.display = 'none';

        var showPushOptIn = function() {
            button.style.display = 'block';
            text.style.display = 'none';
        }

        var hidePushOptin = function() {
            button.style.display = 'none';
            text.style.display = 'block';
        }
        
        if (!window.CleverPush || !window.CleverPush.initialized) {
            window.cleverPushInitCallback = function(err) {
                if (err) {
                    console.error('Init callback error:', err);
                    hidePushOptin();
                } else {
                    showPushOptIn();
                }
            };
        } else {
            showPushOptIn();
        }
      });


    const handleClick = event => {
        CleverPush.push(['isSubscribed', function(result) {
            setSubscribed(result)
          }])

        if (subscribed) {
            CleverPush.push(['unsubscribe']);
            setButtonText("Notifications are off")
            setSubscribed(false)
        }
        else {
            CleverPush.push(['triggerOptIn', true, function(err, subscriptionId) {
                if (err) {
                    console.error(err);
                    alert("There was an error, please try again");
                } else {
                    setSubscribed(true)
                    setButtonText("Notifications are on")
                }
            }]);
        }
    }

    return(
        <div>
            <OptinButton onClick = {handleClick} id = "#cleverpush-button">
                {buttonText}
            </OptinButton>
            <p id = "#non-compatible-message">
                Your browser is not compatible with push notifications
            </p>
        </div>
    )
}

const OptinButton = styled.button`
    color: white;
    background: #1338a0;
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