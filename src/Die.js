import React from "react"

export default function Die(props){
    return (
        <div className="dieFace">
            {props.value}
        </div>
    )
}