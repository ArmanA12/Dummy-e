import React from 'react'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-item'>
                    <h2>Dummy-E</h2>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad</span>
                </div>
                <div className='footer-item'>
                    <h3>Send Message</h3>
                    <form action="#">
                        <input type='email' placeholder='Enter your email address' />
                        <button type='submit'><i style={{color:"#fff"}} class="fa fa-long-arrow-right"></i></button>
                    </form>
                </div>
                <div className='footer-item'>
                    <h3>Follow Us</h3>
                    <ul className='social-media'>
                        <li>
                            <a href='#' target='_blank' rel='noreferrer'><i class="fa fa-facebook-f"></i></a>
                        </li>
                        <li>
                          <a href='#' target='_blank' rel='noreferrer'>  <i class="fa fa-twitter"></i></a>
                          </li>
                          <li>
                            <a href='#' target='_blank' rel='noreferrer'> <i class="fa fa-linkedin"></i></a>
                        </li>
                        <li>
                            <a href='#' target='_blank'  rel='noreferrer'>  <i class="fa fa-instagram"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='footer-copyright'>
                <p>&copy; Copyright 2023 Dummy-E. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

