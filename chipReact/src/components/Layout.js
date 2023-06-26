import React, { useState } from 'react';
import MySideNav from './MySideNav';

const Layout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ display: "flex" }}>
            <MySideNav onToggle={handleToggle} isOpen={isOpen} />
            <div style={{ marginLeft: isOpen ? '240px' : '64px', transition: 'margin-left 0.3s ease', padding: '15px' }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;

