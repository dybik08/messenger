import * as React from 'react';
import { connect } from 'react-redux';
import { signOut } from 'services/auth/auth.actions';
import { IState as IUsersState } from 'services/users/users.constants';
import { IState as IAuthState } from 'services/auth/auth.constants';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import classnames from 'classnames';

const styles = require('./navbar.scss');

interface IProps {
    location: any,
    auth: IAuthState,
    users: IUsersState,
    signOut(): any
}

const routes = [
    { to: '/', icon: 'fas fa-comments', text: 'Chat' },
    { to: '/profile', icon: 'fas fa-user', text: 'Profile' },
    { to: '/settings', icon: 'fas fa-cogs', text: 'Settings' }
];

export function Navbar(props: IProps) {
    const menuItems = routes.map((route, index) => {
        const classNames = classnames(styles.menu__item, {
            [styles.menu__item_active]: route.to === props.location.pathname
        });
        return (
            <li key={index}>
                <Link className={classNames} to={route.to}>
                    <span className={`${styles.icon} ${route.icon}`}></span><span className={styles.text}>{route.text}</span>
                </Link>
            </li>
        )
    });

    const user = props.users.users && props.users.users[props.auth.user._id];
    const firstname = user && user.firstname ? user.firstname : '';
    const lastname = user && user.lastname ? user.lastname : '';
    const username = user && user.username ? user.username : 'unnamed';
    const avatar = user && user.avatar ? user.avatar : '/gfx/users/placeholder.svg';

    return (
        <nav className={styles.nav}>
            <div className={styles.header}>
                <img className={styles.avatar} src={avatar} alt="Avatar"/>
                {
                    <h1 className={styles.title}>{firstname} {lastname}</h1>
                }
                <h2 className={styles.subtitle}>@{username}</h2>
            </div>
            <ul className={styles.menu}>
                { menuItems }
            </ul>
            <div className={styles.footer}>
                <div className={styles.signout} onClick={props.signOut}>
                    <span className={`${styles.signout_icon} fas fa-sign-out-alt`}></span>
                    <span className={styles.signout_text}>Sign out</span>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps =
    ({ auth, users }: { auth: any, users: any }) =>
        ({ auth, users });

export default withRouter<any>(connect(mapStateToProps, { signOut })(Navbar));
