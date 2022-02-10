import React, {useContext} from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {


    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content page__container">
            <section className="profile content__profile">
                <div className="profile__content">
                    <div className="profile__wrapper" onClick={props.onEditAvatar}>
                        <img
                            src={currentUser.avatar}
                            alt="Жак-Ив Кусто"
                            className="profile__avatar-image"
                        />
                    </div>
                    <div className="profile__info">
                        <div className="profile__text-content">
                            <h1 className="profile__name-field">{currentUser.name}</h1>
                            <p className="profile__description-field">{currentUser.about}</p>
                        </div>
                        <button type="button" className="profile__edit-button button" onClick={props.onEditProfile}>
                        </button>
                    </div>
                </div>
                <button type="button" className="profile__add-button button" onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="cards content__cards">
                {props.cards.map((card) => (<Card onCardClick={props.onCardClick} data={card} key={card._id}
                                  onDeleteButtonClick={props.onDeleteButtonClick}
                                  onCardLike={props.onCardLike}/>)
                )}
            </section>
        </main>
    );
}


export default Main;