import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

const isExternalLink = href =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

const NavLink = ({ href, className, children, ...rest }) =>
    href && !isExternalLink(href) ? (
        <Link to={href} className={className} {...rest}>{children}</Link>
    ) : (
        <a href={href} className={className} {...rest}>{children}</a>
    );

const pad = n => String(n).padStart(2, '0');

const useClock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
};

const Navbar = ({
    logo,
    logoAlt = 'Logo',
    items,
    activeHref,
    className = '',
    onMobileMenuClick,
}) => {
    const { isAuthenticated, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const clock = useClock();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(open => !open);
        onMobileMenuClick?.();
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className={`ind-nav ${className}`}>
            <nav className="ind-nav__bar" aria-label="Primary">
                <NavLink href={items?.[0]?.href || '/'} className="ind-nav__logo" aria-label="Home">
                    <img src={logo} alt={logoAlt} />
                </NavLink>

                <ul className="ind-nav__list desktop-only" role="menubar">
                    {items.map((item, i) => (
                        <li key={item.href || `item-${i}`} role="none">
                            <NavLink
                                role="menuitem"
                                href={item.href}
                                className={`ind-nav__link${activeHref === item.href ? ' is-active' : ''}`}
                                aria-label={item.ariaLabel || item.label}
                                aria-current={activeHref === item.href ? 'page' : undefined}
                            >
                                <span className="ind-nav__index">{pad(i + 1)}</span>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <>
                            <li role="none">
                                <Link role="menuitem" to="/admin" className="ind-nav__link">
                                    <span className="ind-nav__index">SYS</span>
                                    Admin
                                </Link>
                            </li>
                            <li role="none">
                                <button onClick={logout} role="menuitem" className="ind-nav__link ind-nav__link--alert">
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                <div className="ind-nav__status desktop-only" aria-hidden="true">
                    <span className="ind-nav__dot" />
                    <span>MLG / ID</span>
                    <time>{clock}</time>
                </div>

                <button
                    className="ind-nav__toggle mobile-only"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}
                </button>
            </nav>

            {isMobileMenuOpen && (
                <ul className="ind-nav__mobile mobile-only">
                    {items.map((item, i) => (
                        <li key={item.href || `mobile-item-${i}`}>
                            <NavLink
                                href={item.href}
                                className={`ind-nav__mobile-link${activeHref === item.href ? ' is-active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                <span className="ind-nav__index">{pad(i + 1)}</span>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <>
                            <li>
                                <Link to="/admin" className="ind-nav__mobile-link" onClick={closeMobileMenu}>
                                    <span className="ind-nav__index">SYS</span>
                                    Admin
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMobileMenu();
                                    }}
                                    className="ind-nav__mobile-link ind-nav__link--alert w-full text-left"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </header>
    );
};

export default Navbar;
