import * as React from 'react';
import { Link } from 'react-router-dom';
const styles = require('./landing.scss');

export default () => (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.header__title}>Welcome to my <span>messanger app</span></h1>
                <h2 className={styles.header__subtitle}>Awesome chat app with <span>socket.io</span> web-socket technology</h2>
                <div className={styles.header__buttons}>
                    <Link to="/signin">Sign in</Link>
                    <span>or</span>
                    <Link to="/signup">Create new account</Link>
                </div>
            </div>
            <img className={styles.picture} src="https://i.imgur.com/vmOOmlO.png" alt="Image"/>
        </div>
    </div>
)
