import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaTelegram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaRegEnvelope,
} from 'react-icons/fa';
import favicon from '../../assets/img/favicon.png';
import dottedShape from '../../assets/img/dotted-shape.svg';

const Shapes = () => {
  return (
    <div className='shapes'>
      <img className='website-logo' src={favicon} alt='website favicon' />
      <img className='dotted-shape' src={dottedShape} alt='dotted-shape' />
    </div>
  );
};

const WebsiteLogo = () => {
  return (
    <div className='col-lg-4 col-md-6 my-3'>
      <div className='widget'>
        <Link className='logo' to='/'>
          <img className='img-fluid' src={favicon} alt='website favicon' />
        </Link>
        <p className='mt-3'>
          paperCuts is a site that lists free eBooks and online books
        </p>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  const links_arr = [
    { label: 'home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'books', href: '/books' },
    { label: 'category', href: '/category' },
  ];

  return (
    <div className='col-lg-3 col-md-6 my-3'>
      <div className='widget links mt-3'>
        <h4 className='mb-3 fw-bolder'>quick links</h4>
        <ul className='list-unstyled'>
          {links_arr.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const social_media_Arr = [
    { label: <FaTelegram />, href: '#' },
    { label: <FaGithub />, href: '#' },
    { label: <FaLinkedinIn />, href: '#' },
  ];
  return (
    <div className='col-lg-5 col-md-6 my-3'>
      <div className='widget mt-3'>
        <h4 className='mb-3 fw-bolder'>contact us</h4>
        <ul className='list-unstyled'>
          <li className='my-2'>
            <span>
              <FaMapMarkerAlt className='me-2' /> Markaz Meet Ghamr, Ad
              Daqahliyah, Egypt
            </span>
          </li>
          <li className='my-2'>
            <a href='tel:01015081861'>
              <FaPhoneAlt className='me-2' /> 01015081861
            </a>
          </li>
          <li className='my-2'>
            <a href='mailto:mohamedtaysser983@gmail.com'>
              <FaRegEnvelope className='me-2' /> mohamedtaysser983@gmail.com
            </a>
          </li>
          <li className='my-2'>
            <div className='social-media-container mt-3'>
              {social_media_Arr.map((link, index) => {
                return (
                  <a
                    href={link.href}
                    className='mx-2 d-inline-block h4'
                    key={index}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Copyright = () => {
  return (
    <div className='container'>
      <div className='copyRight py-2'>
        Copyright &copy;
        <span className='mx-1' id='js-current-year'>
          {new Date().getFullYear()}
        </span>
        <Link to='/'>paperCuts</Link>. All Rights Reserved.
      </div>
    </div>
  );
};

function Footer() {
  return (
    <footer className='pb-3 pt-5 footer'>
      <Shapes />
      <div className='container pt-3'>
        <div className='row'>
          <WebsiteLogo />
          <ContactUs />
          <QuickLinks />
        </div>
      </div>
      <hr className='' />
      <Copyright />
    </footer>
  );
}

export default Footer;
