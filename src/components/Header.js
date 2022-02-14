import headerLogo from '../images/header__logo.svg';
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";

function Header(props) {

    const location = useLocation();

    return (
        <header className="header page__header">
            <img
                src={headerLogo}
                alt="Логотип проекта Mesto"
                className="header__logo logo"
            />
            <div className="header__container">
                <p className="header__text">{props.email ? props.email : ''}</p>
                {location.pathname === "/sign-up" && <Link to="/sign-in" className="header__link">Войти</Link>}
                {location.pathname === "/sign-in" && <Link to="/sign-up" className="header__link">Регистрация</Link>}
                {location.pathname === "/" &&
                <Link className="header__link header__link_brightness_dark" onClick={props.onSignOut}>Выйти</Link>}
            </div>
        </header>
    );
}

export default Header;