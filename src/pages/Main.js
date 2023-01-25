import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import Nav from '../components/nav/Nav';
import Info from '../components/info/Info';
import Button from '../components/form/Button';

const Main = () => {
    const [navOpen, setNavOpen] = useState(true);

    return (
        <div id="LayoutContainer">
            {/* Nav toggler */}
            <Button
                icon={navOpen ? "chevron-left" : "bars"}
                className={["nav_toggler", isMobile ? "mobile" : null, navOpen ? null : 'show'].join(' ')}
                onClick={() => setNavOpen(!navOpen)} />

            {/* Nav */}
            <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

            {/* Content */}
            <main id="LayoutContent" className={[
                navOpen ? "nav_open" : null,
                isMobile ? "mobile" : null
            ].join(' ')}>
                <Outlet />
            </main>

            {/* Info */}
            <Info main />
        </div>
    );
};

export default Main;