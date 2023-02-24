import React from "react"

export default function Die(props){
    const dieStyle = {
        backgroundColor: props.isHeld? "#4B77BE" : ""
    }
    return (
        <div className="dieFace" style={dieStyle} onClick={props.freezeDie}>
            {props.value}
        </div>
    )
}