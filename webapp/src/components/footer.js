import React, { Component } from 'react';

class Footer extends Component {
    state = {  }
    /**
     * Bootstrap footer for app
     */
    render() { 
        return ( 
            <div className="main-footer">
                <div className="container">
                    <div className="row">
                        {/* COl 1 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>SUPPORT</h4>
                            <ul className="list-unstyled">
                                <li>Account</li>
                                <li>Mailbox</li>
                                <li>User Guide</li>
                                <li>Favourites</li>
                            </ul>
                        </div>
                        {/* COl 2*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>CONTACT</h4>
                            <ul className="list-unstyled">
                                <li className="fas fa-home mr-3">Boston, MA</li>
                                <li className="fas fa-envelope mr-3">info@example.com</li>
                                <li className="fas fa-phone mr-3">+ 01 234 567 88</li>
                                <li className="fas fa-print mr-3">+ 01 234 567 89</li>
                            </ul>
                        </div>
                        {/* COl 3 */}
                        <div className="col-md-3 col-sm-6">
                            <h4>QUICK LINKS</h4>
                            <ul className="list-unstyled">
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                        </div>
                    </div>
                    {/* Footer Bottom */ }
                    <hr />
                    <div className="footer-bottom">
                        <p className="text-xs-center">
                            &copy;{new Date().getFullYear()} La Cabana - All Rights Reserved
                        </p>
                    </div>
                </div>
            </div> 
        );
    }
}
 
export default Footer;