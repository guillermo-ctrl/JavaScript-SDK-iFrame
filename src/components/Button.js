import styled from 'styled-components'

let Status = "Push notifications off"

export default function TheButton(){
    return(
        <BigButton>
            {Status}
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