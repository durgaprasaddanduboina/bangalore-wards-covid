import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Navbar(props) {
  const [view, setView] = useState('Home');

  // HTML Properties for each of the links in UI
  const navLinkProps = (path, animationDelay) => ({
    className: `fadeInUp ${window.location.pathname === path ? 'focused' : ''}`,
    style: {
      animationDelay: `${animationDelay}s`
    }
  });

  if (window.location.pathname !== '/summary') {
    return (
      <div
        className="Navbar"
        style={{
          animationDelay: '0.5s',
          height: view === 'Clusters' ? '2.5rem' : '',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <img
          className="fadeInUp logo"
          alt="India COVID-19 Tracker"
          src="/icon.png"
          style={{
            animationDelay: '0.0s',
            width: view === 'Clusters' ? '1.5rem' : '',
            height: view === 'Clusters' ? '1.5rem' : '',
            transition: 'all 0.3s ease-in-out'
          }}
        />

        <div className="navbar-left">
          <Link
            to="/"
            onClick={() => {
              setView('Home');
            }}
          >
            <span {...navLinkProps('/', 0.2)}>Home</span>
          </Link>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Navbar;
