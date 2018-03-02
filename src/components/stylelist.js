import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import '../App.css';
import back from './images/back.png';
import usericon from './images/usericon.png';

const bgback = {
	background:'url('+back+') no-repeat',
	backgroundSize:'20px 20px'
};
const useri = {	
	background:'url('+usericon+') no-repeat',
	backgroundSize:'16px 16px'
}

var url;
export default class Type extends React.Component{ 
	
    render() {
    	window.scrollTo(0,0);
    	let books = data.books;
    	const type = this.props.location.pathname;
    	//获取上一页的链接名主要内容：
    	const lastpage = type.split('/')[1];
    	console.log(lastpage);
    	const typeId = type.split('/')[2];
    	let booktypes = [{"typename":"玄幻"},{"typename":"修真"},{"typename":"都市"},{"typename":"历史"},{"typename":"网游"}];
        return (        	
            <div className="stylelist">
		        <div className="back">
		        	<Link to='/'>
						<span className="icon" style={bgback}></span>
						<span className="typename">{booktypes[typeId-1].typename}</span>
					</Link>
				</div>
				<div className="divider"></div>
				<ul className="list">
	            	{
	            		books.map(function(book){
	            			if(book.typeid[0]==typeId||book.typeid[1]==typeId){
	            				return (  
		            				<li className="book" key={book.id}>
		            					<Link to={"/bookinfo/"+book.id}>
		            						<img src={book.coverimg} alt="bookimg"/>
		            					</Link>
		            					<div className="info">
		            						<Link to={"/styletobookinfo/"+typeId+'/'+book.id}>
												<span className="title">{book.title}</span>
												<p className="describe">{book.discribe}</p>
											</Link>
											<i style={useri}></i>
											<span className="listauthor">{book.author}</span>
											<span className="tip count">{book.wordcount}万</span>
											<span className="tip state">{book.updatestate===1?'完结':'连载'}</span>
											<span className="tip booktype">{book.type[0]}</span>
		            					</div>
		            				</li>
		            			)
	            			}       			
	            		})	
	    			}  
				</ul>
            </div>
        )
    }
}