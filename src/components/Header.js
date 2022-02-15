import headerLogo from '../images/header__logo.svg';
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

function Header(props) {

    const location = useLocation();

    const [isMenuOpen, setMenuIsOpened] = useState(false);

    function handleMenuClick() {
        if (isMenuOpen) {
            setMenuIsOpened(false);
        } else {
            setMenuIsOpened(true);
        }
    }

    function handleSignOutClick() {
        if (isMenuOpen) {
            setMenuIsOpened(false);
        }

        props.onSignOut();
    }

    return (
        <header className="header page__header">
            <div className={`header__menu ${isMenuOpen ? 'header__menu_active' : ''} `}>
                <p className="header__text">{props.email ? props.email : ''}</p>
                <Link className="header__link header__link_brightness_dark" onClick={handleSignOutClick}>Выйти</Link>
            </div>
            <div className="header__wrapper">
                <img
                    src={headerLogo}
                    alt="Логотип проекта Mesto"
                    className="header__logo logo"
                />
                {location.pathname === "/" &&
                <button type="button"
                        className={`header__button ${isMenuOpen ? 'header__button_type_cross' : 'header__button_type_menu'} `}
                        onClick={handleMenuClick}/>}
                <div className={`header__container ${(location.pathname === "/") ? 'header__container_invisible' : ''} `}>
                    <p className="header__text">{props.email ? props.email : ''}</p>
                    {location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link ">Войти</Link>}
                    {location.pathname === "/sign-in" &&
                    <Link to="/sign-up" className="header__link">Регистрация</Link>}
                    {location.pathname === "/" &&
                    <Link className="header__link header__link_brightness_dark header__link_invisible"
                          onClick={props.onSignOut}>Выйти</Link>}
                </div>
            </div>

        </header>
    );
}

export default Header;