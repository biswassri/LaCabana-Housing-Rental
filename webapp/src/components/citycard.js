import React, { Component } from 'react';
import { Link } from "react-router-dom";


class CityCards extends Component {
    state = { cities:[
        { name: 'Boston', image: '/assets/citycard/Boston.jpeg'},
        { name: 'New york',image: '/assets/citycard/NewYork.jpg'},
        { name: 'Delhi', image: '/assets/citycard/Delhi.jpg'},
        { name: 'Dublin', image: '/assets/citycard/Dublin.jpg'},
        { name: 'London', image: '/assets/citycard/London.jpg'},
        { name: 'Los Angeles', image: '/assets/citycard/LosAngeles.jpg'},
        { name: 'Mumbai', image: '/assets/citycard/Mumbai.jpg'},
        { name: 'San Fransisco', image: '/assets/citycard/SanFransisco.jpg'},
        { name: 'Sydney', image: '/assets/citycard/Sydney.jpg'},
    ] }
    render() { 

        /**
         * City card on Landing page to create flip box
         */
        const { cities = []} = this.state
        return ( 
        <div className="container">
            <div className="row">
                {
                    cities.map( (data,key) => {
                         return <div key={key} className="box-item col-md-4">
                            <div className="flip-box">
                                <div className="flip-box-front text-center img-card" style={{backgroundImage: `url(${data.image})`}}>
                                    <div className="inner color-white">
                                        <h3 className="flip-box-header">{ data.name}</h3>
                                    </div>
                                </div>
                                <div className="flip-box-back text-center img-card" style={{backgroundImage: `url(${data.image})`}}>
                                    <div className="inner color-white">
                                        <h3 className="flip-box-header">{ data.name }</h3>
                                        <Link to={`/room`} href={`/room`}><button className="flip-box-button">Search</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>   
        </div> 
        );
    }
}
 
export default CityCards;