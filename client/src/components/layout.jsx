import React from 'react';
import Nav from './nav';

const Layout = props => ({
  render() {
    return (
        <div>
            <Nav></Nav>
                <div className="content">
                    <main>{props.children}</main>
                </div>
        </div>
    );
  }
});

export default Layout;