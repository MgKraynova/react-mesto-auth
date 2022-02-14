import React, {useState, useEffect} from "react";
import {Route, Switch, Redirect, useHistory} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import {registerNewUser, loginUser, getContent} from "../utils/Auth";
import failImage from '../images/InfoTooltip__fail.svg';
import successImage from '../images/InfoTooltip__success.svg';


function App() {

    const history = useHistory();

    const [isEditAvatarPopupOpen, setIsAvatarPopupOpened] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpened] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpened] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpened] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpened] = useState(false);
    const [isSuccessInfoTooltipOpen, setIsSuccessInfoTooltipOpened] = useState(false);
    const [isFailInfoTooltipOpen, setIsFailInfoTooltipOpened] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkToken();
    }, []);


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
        setIsSuccessInfoTooltipOpened(false);
        setIsFailInfoTooltipOpened(false);
        setSelectedCard({});
    }

    function handleApiError(err) {
        console.log('Ошибка. Запрос не выполнен: ', err);
    }

    function handleRegisterUser(email, password) {

        registerNewUser(email, password)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    setIsFailInfoTooltipOpened(true);
                    if (res.status === 400) {
                        return Promise.reject(`Ошибка: ${res.status} - некорректно заполнено одно из полей`);
                    } else {
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                }
            })
            .then((res) => {
                setIsSuccessInfoTooltipOpened(true);
                history.push("/sign-in");
            })
            .catch((err) => {
                handleApiError(err);
            })
    }

    function handleLoginUser(email, password) {

        loginUser(email, password)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    setIsFailInfoTooltipOpened(true);
                    if (res.status === 400) {
                        return Promise.reject(`Ошибка: ${res.status} - не передано одно из полей`);
                    } else if (res.status === 401) {
                        return Promise.reject(`Ошибка: ${res.status} - пользователь с email не найден`);
                    } else {
                        return Promise.reject(`Ошибка: ${res.status}`);
                    }
                }
            })
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true);
                    setUserEmail(email);
                    history.push('/');
                }
            })
            .catch((err) => {
                handleApiError(err);
            })
    }

    function checkToken() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            getContent(token)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        if (res.status === 400) {
                            return Promise.reject(`Ошибка: ${res.status} - Токен не передан или передан не в том формате`);
                        } else if (res.status === 401) {
                            return Promise.reject(`Ошибка: ${res.status} -  Переданный токен некорректен`);
                        } else {
                            return Promise.reject(`Ошибка: ${res.status}`);
                        }
                    }
                })
                .then((res) => {
                    setLoggedIn(true);
                    setUserEmail(res.data.email);
                    history.push('/');
                })
                .catch((err) => {
                    handleApiError(err);
                });
        }
    }

    function signOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setUserEmail('');
        history.push('/sign-in');
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
            <Header email={userEmail} onSignOut={signOut}/>
            <Switch>
                <ProtectedRoute
                    exact path="/"
                    loggedIn={loggedIn}
                    component={Main}

                    onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onDeleteButtonClick={handleDeleteButtonClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                />
                <Route path="/sign-up">
                    <Register onRegisterUser={handleRegisterUser}/>
                </Route>
                <Route path="/sign-in">
                    <Login onLoginUser={handleLoginUser}/>
                </Route>
                <Route>
                    <Redirect to="/"/>
                </Route>
            </Switch>

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
            <InfoTooltip isOpened={isSuccessInfoTooltipOpen} onClose={closeAllPopups}
                         title={'Вы успешно зарегистрировались!'} imgSrc={successImage}
                         imgAlt={'Success'}
            />
            <InfoTooltip isOpened={isFailInfoTooltipOpen} onClose={closeAllPopups}
                         title={'Что-то пошло не так! Попробуйте ещё раз.'} imgSrc={failImage}
                         imgAlt={'Fail'}
            />

        </CurrentUserContext.Provider>
    );
}

export default App;
