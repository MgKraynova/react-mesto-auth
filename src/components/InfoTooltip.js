import React from "react";
import Popup from "./Popup";

function InfoTooltip(props) {
    return (

        <Popup name="infoTooltip" isOpened={props.isOpened} onClose={props.onClose} divPopupClassName={'popup__wrapper'}>
            <img className="popup__image" alt={props.imgAlt} src={props.imgSrc}/>
            <h2 className="popup__subtitle">{props.title}</h2>
        </Popup>
    )
}

export default InfoTooltip;