import React,  { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {

    const [isEditAvatarPopupOpen, setIsAvatarPopupOpened] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpened] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpened] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpened] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpened] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        api.getUserInfo()
            .then(setCurrentUser)
            .catch(handleApiError);
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then(setCards)
            .catch(handleApiError);
    }, []);

    function handleDeleteButtonClick(card) {
        setSelectedCard(card);
        setIsDeletePopupOpened(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpened(true);
    }

    function handleEditAvatarClick() {
        setIsAvatarPopupOpened(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpened(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpened(true);
    }

    function closeAllPopups() {
        setIsAvatarPopupOpened(false);
        setIsEditProfilePopupOpened(false);
        setIsAddPlacePopupOpened(false);
        setIsImagePopupOpened(false);
        setIsDeletePopupOpened(false);
        setSelectedCard({});
    }

    function handleUpdateUser({name, about}) {
        setIsLoading(true);

        api.updateUserInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                handleApiError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleApiError(err) {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }

    function handleUpdateAvatar({avatar}) {
        setIsLoading(true);

        api.sendNewAvatarToServer(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                handleApiError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsLoading(true);

        api.sendCardInfoToServer(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();

            })
            .catch((err) => {
                handleApiError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
    }

    function handleCardDelete(card) {
        setIsLoading(true);

        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => {
                    if (!(c._id === card._id)) {
                        return c;
                    }
                }))
                closeAllPopups();
            })
            .catch((err) => {
                handleApiError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
            <CurrentUserContext.Provider value={currentUser}>
                <Header/>
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onDeleteButtonClick={handleDeleteButtonClick}
                      onCardLike={handleCardLike}
                      cards={cards}
                />
                <Footer/>
                <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}
                                  isLoading={isLoading}/>
                <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups}
                               onAddPlace={handleAddPlaceSubmit}
                               isLoading={isLoading}/>
                <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}
                                 isLoading={isLoading}/>
                <DeletePopup isOpened={isDeletePopupOpen} onClose={closeAllPopups}
                             onCardDelete={handleCardDelete} card={selectedCard}
                             isLoading={isLoading}/>
                <ImagePopup card={selectedCard} isOpened={isImagePopupOpen} onClose={closeAllPopups}/>
            </CurrentUserContext.Provider>
    );
}

export default App;
