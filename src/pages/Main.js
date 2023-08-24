import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import Button from '../components/form/Button';
import Nav from '../components/layout/nav/Nav';
import Settings from '../components/layout/settings/Settings';
import Profile from '../components/layout/profile/Profile';
import Info from '../components/info/Info';

const Main = (props) => {
    const [navOpen, setNavOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith("/main/chat/") && isMobile) {
            setNavOpen(false);
        }
    }, [location.pathname])

    const toggleNav = () => {
        if (settingsOpen) {
            toggleSettings()
        } else if (profileOpen) {
            toggleProfile();
        } else {
            setNavOpen(!navOpen);
        }
    }

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    }

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    }

    return (
        <div id="LayoutContainer">
            {/* Nav toggler */}
            <Button
                icon={isMobile ? navOpen ? "bars" : "chevron-left" : navOpen ? "chevron-left" : "bars"}
                className={[
                    "nav_toggler",
                    isMobile ? "mobile" : null,
                    navOpen ? null : 'show',
                    settingsOpen || profileOpen ? 'alt' : null,
                ].join(' ')}
                onClick={toggleNav} />

            {/* Nav */}
            <Nav
                socket={props.socket}
                navOpen={navOpen}
                toggleNav={toggleNav}
                toggleSettings={toggleSettings}
                toggleProfile={toggleProfile} />

            {/* Content */}
            <main id="LayoutContent" className={[
                navOpen ? "nav_open" : null,
                isMobile ? "mobile" : null
            ].join(' ')}>
                <Outlet />
            </main>

            {/* Settings */}
            <Settings settingsOpen={settingsOpen} toggleSettings={toggleSettings} />

            {/* Profile */}
            <Profile profileOpen={profileOpen} toggleProfile={toggleProfile} />

            {/* Info */}
            <Info main />
        </div>
    );
};

export default Main;