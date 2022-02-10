import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.data.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`card__delete-button ${!isOwn && 'card__delete-button_invisible'}`);

    const isLiked = props.data.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

    function handleClick() {
        props.onCardClick(props.data);
    }

    function handleLikeClick() {
        props.onCardLike(props.data);
    }

    function handleDeleteButtonClick() {
        props.onDeleteButtonClick(props.data);
    }

    return (
        <div className="card">
            <img alt={props.data.name} className="card__image" src={props.data.link} onClick={handleClick}/>
            <button type="button" className={cardDeleteButtonClassName}
                    onClick={handleDeleteButtonClick}/>
            <div className="card__caption">
                <h2 className="card__title">{props.data.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <h3 className="card__counter">{props.data.likes.length}</h3>
                </div>
            </div>
        </div>);
}

export default Card;