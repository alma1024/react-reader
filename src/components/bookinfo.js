import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import '../App.css';
import back from './images/back.png';
import Swipe from './swipe.js';

const bgback = {
	background:'url('+back+') no-repeat',
	backgroundSize:'20px 20px'
};
var show;//描述内容是否全部显示
export default class Bookinfo extends React.Component{ 
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	    this.state = {
	    	discribe: false,//描述内容是否全部显示：默认－否
	    };
  }  
	// 控制描述内容是否全部显示：  
	handleClick() {
	    this.setState({
		  discribe: !this.state.discribe,	  
	    });
	}

    render() {
    	console.log(this.state.discribe);
    	window.scrollTo(0,0);
    	const path = this.props.location.pathname;
    	var backurl,bookId;
    	var first = path.split('/')[1].slice(0,5);
    	if(first==='style'){
    		var typeId = path.split('/')[2];
    		backurl = '/stylelist/'+typeId;
    		bookId = path.split('/')[3];
    	}else{
    		backurl = '/';
    		bookId = path.split('/')[2];
    	}
    	let thisbook = data.books[bookId-1];

        return (  
        	<div className="bookinfo">
        		<div className="back">
		        	<Link to={backurl}>
						<span className="icon" style={bgback}></span>
						<span className="bookname">{thisbook.title}</span>				
					</Link>	
				</div>
				<div className="divider"></div>
				<div className="content">
					<div className="thisbook">
						<img src={thisbook.coverimg} alt="bookimg"/>
						<div className="info">
							<p className="thistitle">{thisbook.title}</p>
							<p className="author">{thisbook.author}</p>
							<p className="booktype">{thisbook.type[0]}{thisbook.type[1]?('/'+thisbook.type[1]):''}</p>
							<p className="countandstate">{(thisbook.wordcount/10000).toFixed(1)}万字 | {thisbook.updatestate===1?'完结':'连载'}</p>
						</div>			
					</div>
					<div className="buttons">
						<Link className="button" to={"/reading/"+thisbook.id}>
							<span className="free">免费试读</span>
						</Link>
					</div>
					<p className="describe" onClick={this.handleClick} style={show}>{thisbook.discribe}</p>
					<div className="else">
						<h1 className="title">猜你喜欢</h1>
						<ul className="elselist">
			            	<Swipe></Swipe>
						</ul>
					</div>
				</div>
        	</div>
        )
    }
}    	