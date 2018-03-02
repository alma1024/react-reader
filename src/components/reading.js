import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';
import '../App.css';
import back from './images/back.png';
import list from './images/list.png';
import aa from './images/aa.png';
import sun from './images/sun.png';
import moon from './images/moon.png';
import cookie from 'react-cookies'

const bgback = {
	background:'url('+back+') no-repeat left center',
	backgroundSize:'20px 20px'
};

let readingbg = 'color1';

const bgcontents = {
	background:'url('+list+') no-repeat',
	backgroundSize:'16px 16px'
};
const bgfontsize = {
	background:'url('+aa+') no-repeat',
	backgroundSize:'16px 16px'
};
const bgmode1 = {
	background:'url('+sun+') no-repeat 0 0/16px 16px',
};
const bgmode2 = {
	background:'url('+moon+') no-repeat 0 0/16px 16px',
};

var obj,iconindex,bgmode,read,chapindex,readindex,progress;

var path,bookId,position;
export default class Reading extends React.Component{  
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this);
	    this.handleClickmini = this.handleClickmini.bind(this);
	    this.fontSizeplus = this.fontSizeplus.bind(this);
	    this.fontSizeminus = this.fontSizeminus.bind(this);
	    this.handleClickmode = this.handleClickmode.bind(this);
	    this.handleClicklist = this.handleClicklist.bind(this);
	    this.orderScroll = this.orderScroll.bind(this);
	    // this.some = this.some.bind(this);
	    this.state = {
	    	controlerShow: false,
		    chooseShow:false,
		    mode:true,
		    closelist: false,
		    fontSize:16,//默认字号
		    index:0,//6个彩色小圈的序号
		    chapindex:0,//初始章节
	    };
		path = this.props.location.pathname;
		bookId = parseInt(path.split('/')[2]-1);
  }

  componentWillMount(){
    //存储文章内容的字号用的变量：
	var nowfontsize = cookie.load('fontSize') || 16;
  	obj = Object.assign({},this.state,{fontSize:parseInt(nowfontsize)}) ;

  	//存储背景色模式用的变量：
  	var nowmode = cookie.load('mode');
  	var nowiconindex = parseInt(cookie.load('index'))+1;
  	bgmode = Object.assign({},this.state,{mode:nowmode});  

  	//存储所选背景色序号用的变量：
  	var nowiconindex = cookie.load('index');
	iconindex = Object.assign({},this.state,{index:parseInt(nowiconindex)});
  	if(nowmode==='true'){
  		readingbg = 'color'+(parseInt(nowiconindex)+1);
  	}else{
  		readingbg = 'darkcolor'+(parseInt(nowiconindex)+1);
  	}
  	
    //存储阅读进度用的变量：
	//下面四行是为了获得该书的章节列表：
	const path = this.props.location.pathname;
    const bookId = path.split('/')[2];
	let thisbook = data.books[bookId-1];
	let chapters = thisbook.chapterlist;
    //先取到现有的cookie：
    read = cookie.load('read') || {};
    // console.log(read,'00');
    //判断：是否有cookie
	if(Object.keys(read).length===0){
		chapindex = 0;
		progress = 0;
		//为cookie组成一个对象：
		read[bookId] = {chapindex:chapindex,progress:progress};
	}else if(typeof(read[bookId])==='undefined'){
		chapindex = 0;
		progress = 0;
		//为cookie组成一个对象：
		read[bookId] = {chapindex:chapindex,progress:progress};
	}
	chapindex = read[bookId].chapindex;
	progress = read[bookId].progress;
	//滚至上次看到的地方（如果没有记录，从头开始）
	//据说要先让浏览器滚动好，然后再作这个偏移:
	setTimeout(function() {
		window.scrollTo(0,progress);
	}, 100);      
    //添加监听事件：
    window.addEventListener('scroll',this.orderScroll);
  }

	componentWillUnmount() {
		//移除这个监听，否则滚动页面会报错说undifined
		window.removeEventListener('scroll', this.orderScroll);
	}

    //滚动条监听事件设置：
	orderScroll() {
		//下面四行是为了获得该书的章节列表：
    	const path = this.props.location.pathname;
    	const bookId = path.split('/')[2];
    	let thisbook = data.books[bookId-1];
    	let chapters = thisbook.chapterlist;
		//找到内容区
		var content = this.refs.content;
		if(content){
			//获取现在的阅读位置
			var position = document.documentElement.scrollTop,
			//计算全文高度
				totalHeight = content.clientHeight,
			//计算已读的进度
				progress = position/totalHeight;
		}
		//创建一个数组，用来储存{书号:{阅读进度}}：
		var newread = {};
		newread[bookId] = {chapindex:chapindex,progress:position};	
		var newCookie = Object.assign(read,newread);
		//保存cookie:
		cookie.save('read', newCookie, { path: '/' });

		//计算已读至第几章，并在目录列表中高亮显示：
		var state = this.state;
		var mydom = this.refs;
		setTimeout(function() {
			for (var i = 0; i < chapters.length; i++) {
				//从某章开始算：
				var startnum = 'chap'+(i+1);
				//找到某一章节所在的span:
				var startdom = document.getElementById(startnum);
				//找到全文，计算高度:
				var total = content.clientHeight;
				//计算该章节的起始高度：
				var domtop = startdom.offsetTop;
				//获取该章节的长度：
				var domheight = startdom.offsetHeight;
				//计算该章节结束的高度：
				var domend = domtop+domheight;
				if(position>=domtop && position<domend){
					//创建一个数组，用来储存{书号，阅读章节进度}：
					var newread = {};
					newread[bookId] = {chapindex:i,progress:position};
					chapindex = i;
					var newCookie = Object.assign(read,newread);
					//保存cookie:
					cookie.save('read', newCookie, { path: '/' });
				}
			}
		}, 200);
	}


  // 控制顶部和底部主浮层的显隐：
  handleClick() {
    this.setState({
      controlerShow: !this.state.controlerShow,
      chooseShow:false
    });
  } 
  // 控制字号和背景色浮层的显隐：
  handleClickmini() {
    this.setState({
      chooseShow:!this.state.chooseShow,
    });
  }

  // 改变字号的按钮：
  fontSizeplus(){
	var nowfontsize = cookie.load('fontSize') || this.state.fontSize;
  	if(nowfontsize<=30){
  		var fsize = parseInt(nowfontsize?nowfontsize:this.state.fontSize)+2;
    	cookie.save('fontSize', fsize, { path: '/' });
    	this.setState({
    		fontSize:fsize,
    	});
	  	obj = Object.assign({},this.state,{fontSize:fsize});
  	}
  }
  fontSizeminus(){
	var nowfontsize = cookie.load('fontSize') || this.state.fontSize;
  	if(nowfontsize>=18){
  		var fsize = parseInt(nowfontsize?nowfontsize:this.state.fontSize)-2;
    	cookie.save('fontSize', fsize, { path: '/' });
    	this.setState({
    		fontSize:fsize,
    	});
	  	obj = Object.assign({},this.state,{fontSize:fsize});
  	}
  }

  //点击按扭，改变背景色，并在按钮上加小红圈：
  changebg(index){
  	this.setState({
  		mode:true
  	});  	
  	var realindex = index+1;
  	readingbg = 'color'+(realindex);
  	cookie.save('index', index, { path: '/' });
  	cookie.save('mode', true, { path: '/' });
  	iconindex = Object.assign({},this.state,{index:index});
  	bgmode = Object.assign({},this.state,{mode:true});
  }

  // 控制阅读模式切换,并把背景色调暗、字色调亮： 
  handleClickmode() {
  	var bgindex,newmode;
  	var nowmode = cookie.load('mode');
  	var nowiconindex = parseInt(cookie.load('index'))+1;
  	if(nowmode==='true'){  		
  		readingbg = 'darkcolor'+nowiconindex;
  		newmode = 'false';
  		// console.log(readingbg,nowiconindex,1,nowmode);
  	}else{
  		readingbg = 'color'+nowiconindex;
  		newmode = 'true';
  		// console.log(readingbg,nowiconindex,2,nowmode);
  	}
  	cookie.save('mode', newmode, { path: '/' });
    this.setState({
      mode:!this.state.mode,
    });
  } 
  getModeStyle(){
  	let modestyle;
  	var nowmode = cookie.load('mode');
  	if(nowmode==='true'){
  		modestyle = bgmode1;	
  	}else{
  		modestyle=bgmode2; 
  	}
  	return modestyle;
  }

  //高亮显示所在章节,点击后，跳转至目标章节，并收起所有浮层:
  chooseChapter(chapindex){
  	this.setState({
  		chapindex,
  		closelist: !this.state.closelist,
      	controlerShow: !this.state.controlerShow,
  	})
  	let target = 'chap'+(chapindex+1);
  	let targetElement = document.getElementById(target);
  	targetElement.scrollIntoView();
  }

  // 控制目录显示或隐藏：  
  handleClicklist() {
    this.setState({
	  closelist: !this.state.closelist,	  
    });
  }

    render() {
    	let bgitems = [{"id":1,"class":"color1"},
    				   {"id":2,"class":"color2"},
    				   {"id":3,"class":"color3"},
    				   {"id":4,"class":"color4"},
    				   {"id":5,"class":"color5"},
    				   {"id":6,"class":"color6"}
    				  ];
    	
    	let thisbook = data.books[bookId];
    	let content = thisbook.content;
    	let chapters = thisbook.chapterlist;
        return (  
        	<div className={"reading "+readingbg}>
				<div className="contentlist" style={{display:this.state.closelist?'block':'none'}}>
					<div className="contentbody">	
						<div className="close">			
							<span className="title"><span className="bkicon" style={bgback} onClick={this.handleClicklist}></span>目录</span>	
						</div>
						<ul className="chapterlist">							
			            	{
			            		chapters.map(function(chapter,index){
			            			var highlight;
									highlight = chapindex===index ? 'listactive' : '';
			            			return (
			            				<a key={index} onClick={this.chooseChapter.bind(this,index)}>
				        					<li ref={index+1} className={'chaptertitle '+highlight}>
												 {index+1}.{chapter}
				             				</li>
			             				</a>
			            			)
			            		},this)	
			    			}
						</ul>
					</div>
	        	</div>
        		<p id="content" className="content" onClick={this.handleClick} style={obj} ref="content">
					{thisbook.title}<br/>
					by:{thisbook.author}<br/>
					----------------------------------<br/>
					{
						content.map(function(chapter,index){
							return (
								<a id={'chap'+(index+1)} key={'chap'+(index+1)} ref={'chap'+(index+1)}>
									<span>
										{chapter}<br/>
									</span>
								</a>
							)
						},this)
					}
				</p>
				<div className="back" style={{ display: this.state.controlerShow ? 'block' : 'none' }}>
					<Link to={'/bookinfo/'+thisbook.id}>
						<span className="icon" style={bgback}></span>
						<span className="tohome">返回</span>				
					</Link>
				</div>
				<div className="controler" style={{ display: this.state.controlerShow ? 'block' : 'none' }}>
					<div className="choose" style={{ display: this.state.chooseShow ? 'block' : 'none' }}>
						<div className="fontsize">
							<span className="title">字号</span>
							<span className="button" onClick={this.fontSizeplus}>大</span>
							<span className="button" onClick={this.fontSizeminus}>小</span>
						</div>
						<div className="background">
							<span className="title">背景</span>
							<ul>
				            	{
				            		bgitems.map(function(bgitem,index){
				            			return (
				            				<li className={'color '+(index===parseInt(cookie.load('index')) ? 'active' : '')} key={bgitem.id} onClick={this.changebg.bind(this,index)}>
												<span className={bgitem.class}></span>
				            				</li>
				            			)
				            		},this)	
				    			}
							</ul>
						</div>						
					</div>
					<div className="connav">
						<div className="contents" onClick={this.handleClicklist}>
							<i style={bgcontents}></i>
							<span className="title">目录</span>
						</div>
						<div className="navfontsize" onClick={this.handleClickmini}>
							<i style={bgfontsize}></i>
							<span className="title">字号</span>
						</div>
						<div className="mode" onClick={this.handleClickmode}>
							<i style={this.getModeStyle()}></i>
							<span className="title">模式</span>
						</div>
					</div>
				</div>
        	</div>
        )
    }
}