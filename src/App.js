import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RoutesComponent from './routes/Routes';
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
        'menuItems': menuItems[]->,
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
        <header>
          <img src={headerData.logo} alt="Logo" />
          {/* {headerData.menuItems && headerData.menuItems.length > 0 ? (
            <ul>
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
          )} */}
          <p>Phone: {headerData.phoneNumber}</p>
          <p>Email: {headerData.email}</p>
        </header>
      )}
      <main>
        <div className="wrapper">
          <RoutesComponent />
        </div>
      </main>
      {footerData && (
        <footer>
          {footerData.links && footerData.links.length > 0 ? (
            <ul>
              {footerData.links.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          ) : null}
          {footerData.socialMedia && footerData.socialMedia.length > 0 ? (
            <ul>
              {footerData.socialMedia.map((socialLink) => (
                <li key={socialLink._key}>{socialLink.platform}</li>
              ))}
            </ul>
          ) : null}
          <p>{footerData.address}</p>
          {footerData.newsletter && <p>Newsletter is enabled</p>}
        </footer>
      )}
    </BrowserRouter>
  );
}

export default App;
