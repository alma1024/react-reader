import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import './swiper.css';
import data from '../data.json';

class Example extends React.Component {
  render() {
    const params = {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            clickable: true,
        }
    };
 
    return(
      <Swiper {...params}>      
        <Link to={'/bookinfo/'+data.books[0].id} className="book">
          <div className="book">
            <img src={data.books[0].coverimg} alt="bookimg"/>
            <span className="booktitle">{data.books[0].title}</span>
            <span className="author">{data.books[0].author}</span>
          </div>
        </Link>     
        <Link to={'/bookinfo/'+data.books[1].id} className="book">
          <div className="book">
            <img src={data.books[1].coverimg} alt="bookimg"/>
            <span className="booktitle">{data.books[1].title}</span>
            <span className="author">{data.books[1].author}</span>
          </div>
        </Link>   
        <Link to={'/bookinfo/'+data.books[2].id} className="book">
          <div className="book">
            <img src={data.books[2].coverimg} alt="bookimg"/>
            <span className="booktitle">{data.books[2].title}</span>
            <span className="author">{data.books[2].author}</span>
          </div>
        </Link>   
        <Link to={'/bookinfo/'+data.books[3].id} className="book">
          <div className="book">
            <img src={data.books[3].coverimg} alt="bookimg"/>
            <span className="booktitle">{data.books[3].title}</span>
            <span className="author">{data.books[3].author}</span>
          </div>
        </Link>   
        <Link to={'/bookinfo/'+data.books[4].id} className="book">
          <div className="book">
            <img src={data.books[4].coverimg} alt="bookimg"/>
            <span className="booktitle">{data.books[4].title}</span>
            <span className="author">{data.books[4].author}</span>
          </div>
        </Link>
      </Swiper>
    )
  }
}
 
export default Example;