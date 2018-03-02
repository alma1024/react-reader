import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/reactlogo.png';
import adimage from './images/adimage.jpg';
import fantasy from './images/fantasy.png';
import coatard from './images/coatard.png';
import city from './images/city.png';
import history from './images/history.png';
import webgame from './images/webgame.png';
import Swipe from './swipe.js';
import data from '../data.json';

const bgimg1 = {
	background:'url('+fantasy+')',
	backgroundSize:'24px 24px'
};
const bgimg2 = {
	background:'url('+coatard+') no-repeat',
	backgroundSize:'24px 24px'
};
const bgimg3 = {
	background:'url('+city+') no-repeat',
	backgroundSize:'24px 24px'
};
const bgimg4 = {
	background:'url('+history+') no-repeat',
	backgroundSize:'24px 24px'
};
const bgimg5 = {
	background:'url('+webgame+') no-repeat',
	backgroundSize:'24px 24px'
};

export default class Home extends React.Component{
	constructor(props) {
		super(props);
    	this.state = {
    		secondsElapsed: 864000,
    	};
	}

	tick() {
	  this.setState((prevState) => ({
	    secondsElapsed: prevState.secondsElapsed - 1
	  }));
	}

	componentDidMount() {
	  this.interval = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
	  clearInterval(this.interval);
	}

	render() {		
    	let booktypes = [{"typeid":1,"booktype":"玄幻",
    					"bgimg":bgimg1
    						},
	    				 {"typeid":2,"booktype":"修真",
    					"bgimg":bgimg2
    						},
	    				 {"typeid":3,"booktype":"都市",
    					"bgimg":bgimg3
    						},
	    				 {"typeid":4,"booktype":"历史",
    					"bgimg":bgimg4
    						},
	    				 {"typeid":5,"booktype":"网游",
    					"bgimg":bgimg5
    						}
    				  	];
    	var timing = this.state.secondsElapsed;
		//days:
		var days = Math.floor(timing/86400);
		var hours = Math.floor(timing%86400/3600);
		var mins = Math.floor(timing%86400%3600/60);
		var ad = 1;
    	let thisbook = data.books[ad];

		return (
			<div className="home">
				<div className="nav">
					<img src={logo} className="logo" alt="logo"/>
					{/*<img src={user} className="user" alt="user"/>*/}
				</div>
				<section className="advertising">
					<Link to={'/bookinfo/'+thisbook.id}>
						<img className="ad-item" src={adimage} alt="advertising"/>
					</Link>
				</section>
				<section className="types">												
	            	{
	            		booktypes.map(function(type){
	            			return (
	            				<div className="type-item" key={type.typeid}>
		        					<Link to={'/stylelist/'+type.typeid}>										 				
										<span className="icon" style={type.bgimg}></span>
										<span className="typename">{type.booktype}</span>
		             				</Link>
	             				</div>
	            			)
	            		})	
	    			}					
				</section>
				<div className="divider"></div>
				<section className="ranking">
					<div className="title">
						<span className="colorbar"></span>
						<h1>排行榜</h1>
					</div>
					<div className="content">						
						<Swipe></Swipe>
					</div>
				</section>
				<div className="divider"></div>
				<section className="free">
					<div className="title">
						<span className="colorbar"></span>
						<h1>限时免费</h1>
						<span className="timer">剩余：{days}天{hours}小时{mins}分</span>
					</div>
					<div className="content">
						<Swipe></Swipe>
					</div>
				</section>
			</div>
		);
	}
};