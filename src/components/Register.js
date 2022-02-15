import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInputChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordInputChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        props.onRegisterUser(email, password);
    }

    return (
        <div className="auth">
            <h1 className="auth__title">Регистрация</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <fieldset className="auth__fieldset">
                    <input
                        className="auth__input"
                        placeholder="Email"
                        type="email"
                        required
                        name="email"
                        autoComplete="on"
                        value={email}
                        onChange={handleEmailInputChange}
                    />
                    <input
                        className="auth__input"
                        placeholder="Пароль"
                        type="password"
                        minLength="2"
                        maxLength="12"
                        required
                        name="password"
                        autoComplete="on"
                        value={password}
                        onChange={handlePasswordInputChange}
                    />
                </fieldset>
                <button type="submit" className="auth__button">Зарегистрироваться</button>
            </form>
            <p className="auth__text">Уже зарегистрированы? <Link className="auth__link" to="./sign-in">
                Войти
            </Link></p>

        </div>
    )
}

export default Register;