import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RoutesComponent from './routes/Routes';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

import client from './client';

import './App.css';

function App() {
  const [headerData, setHeaderData] = useState(null);
  const [footerData, setFooterData] = useState(null);

useEffect(() => {
  const fetchHeaderData = async () => {
    try {
      const query = `*[_type == "header"]{
        'logo':logo.asset->url,
        menuItems,
        phoneNumber,
        email
      }[0]`;

      const result = await client.fetch(query);
      console.log('Header Data:', result); // Log the header data to inspect

      setHeaderData(result);
    } catch (error) {
      console.error(error);
    }
  };

  fetchHeaderData();
}, []);

useEffect(() => {
  const fetchFooterData = async () => {
    try {
      const query = `*[_type == "footer"]{
        socialMedia,
        address,
        newsletter
      }[0]`;

      const result = await client.fetch(query);
      console.log('Footer Data:', result); // Log the footer data to inspect

      setFooterData(result);
    } catch (error) {
      console.error(error);
    }
  };

  fetchFooterData();
}, []);

  return (
    <BrowserRouter>
      {headerData && (
        <header className="header-container">
          <div className="wrapper">
          <a className="logo" href='/'>
          <img src={headerData.logo} alt="Logo" />
          </a>
          {headerData.menuItems && headerData.menuItems.length > 0 ? (
            <ul className="menu-items">
              {headerData.menuItems.map((menuItem) => (
                <li key={menuItem._key}>
                  {menuItem.url ? (
                    <a href={menuItem.url}>{menuItem.title}</a>
                  ) : (
                    <span>{menuItem.title}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items found.</p>
          )}
          <div className="phone-email">
            <AiOutlinePhone className="phone-icon" />
            <a href={'tel:'+headerData.phoneNumber} title={headerData.phoneNumber}>{headerData.phoneNumber}</a>
          </div>
          <div className="phone-email">
            <AiOutlineMail className="email-icon" />
            <a href={'mailto:'+headerData.email} title={headerData.email}>{headerData.email}</a>
          </div>
          </div>
        </header>
      )}
      <main>
        <div className="wrapper">
          <RoutesComponent />
        </div>
      </main>
      {footerData && (
        <footer className="footer-container">
          <div className="wrapper">
          <div className='footer-top'>
          {footerData.links && footerData.links.length > 0 ? (
            <ul className="links">
              {footerData.links.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          ) : null}
          {footerData.socialMedia && footerData.socialMedia.length > 0 ? (
            <ul className="social-media">
        {footerData.socialMedia.map((socialLink) => (
          <li key={socialLink._key}>
            <a href={socialLink.url} title="opens in a new window" rel="noopener noreferrer" target="_blank">
              {socialLink.platform === 'facebook' && <FaFacebook size={32}/>}
              {socialLink.platform === 'twitter' && <FaTwitter size={32} />}
            </a>
          </li>
        ))}
      </ul>
          ) : null}
          <p className="address">{footerData.address}</p>
          {footerData.newsletter && <p className="newsletter">Newsletter is enabled</p>}
          </div>
          <div className='footer-bottom'>
          &copy; {new Date().getFullYear()}. All rights reserved &res;
          </div>
          </div>
        </footer>
      )}
    </BrowserRouter>
  );
}

export default App;
