import React, { Component } from 'react';
import Header from './nav';
import Footer from './footer';

class TenantView extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="page-container">
                <div className="content-wrap">
                    <Header />
                    <div>
                    <button className="btn btn-secondary" type="button">
                        VIEW
                    </button>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
 
export default TenantView;