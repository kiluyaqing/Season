var QosS = new Object();
QosS.Configure = {
	version:"1.0",
	author:"willliu",
	domain:"203.184.142.183/",
	site:"default"
};
QosS.isIE5 = function() {
	var b = false;
		var v;
		var agt = navigator.userAgent.toLowerCase();
		var i = agt.indexOf("msie ");
		if(i >= 0)
		{
			v = parseInt(agt.substring(i + 5));
			b = (v >= 5);
		}
		return b;
	}

QosS.Global = {
	spTimer:null,
	sUrl:"",
	startTime:(new Date().getTime()),
	imgBegin:(new Date().getTime()),
	jsBegin:(new Date().getTime()),
	headSpan:0,topSpan:0,imgSpan:0,img2Span:0,jsSpan:0,js2Span:0,
	imgFlag:false,img2Flag:false,jsFlag:false,js2Flag:false,endFlag:false,
	img1:[],img2:[],js1:[],js2:[]
};

QosS.isAllLoaded = function(obj){
	for(var i = 0; i < obj.length; i++)
	{
		// if(!obj[i].src || (obj[i].tagName=="IMG" && obj[i].src.indexOf("adping.qq.com") != -1))
		// {
			// continue;
		// }
		if(obj[i].readyState != "loaded" && obj[i].readyState != "complete" )
		{			
			return false;
		}
	}
	return true;
};
QosS.checkLoad = function(){
	// if(!this.Global.imgFlag && this.isAllLoaded(this.Global.img1))
	// {
		// this.Global.imgSpan = (new Date().getTime() - this.Global.imgBegin);		
		// this.Global.imgFlag=true;
	// }
	
	if(!this.Global.img2Flag && this.isAllLoaded(this.Global.img2))
	{
		this.Global.img2Span = (new Date().getTime() - this.Global.imgBegin);		
		this.Global.img2Flag=true;
	}
	
	// if(!this.Global.jsFlag && this.isAllLoaded(this.Global.js1))
	// {
		// this.Global.jsSpan = (new Date().getTime() - this.Global.jsBegin);		
		// this.Global.jsFlag=true;
	// }
	
	if(!this.Global.js2Flag && this.isAllLoaded(this.Global.js2))
	{
		this.Global.js2Span = (new Date().getTime() - this.Global.jsBegin);		
		this.Global.js2Flag=true;
	}
	
	if(this.Global.img2Flag && this.Global.js2Flag && this.Global.endFlag)
	{
		clearTimeout(this.Global.spTimer);
		var t=(new Date().getTime()-this.Global.startTime);
		img=new Image(0,0);
		img.src=this.Global.sUrl+"&1="+this.Global.topSpan+"&2="+t;
		//img.src="http://www.sina.com.cn?"+"&1="+this.Global.topSpan+"&2="+t+"&3="+this.Global.img2Span+"&4="+this.Global.js2Span;
		return;
	}

	this.Global.spTimer = setTimeout("QosS.checkLoad()", 100);
};

QosS.topSpan = function(id){
if(QosS.isIE5()){
//	QosS.Configure.site = site;
//	QosS.Global.sUrl = "http://"+QosS.Configure.domain+"/collect?type=1&name="+QosS.Configure.site;
//	http://172.20.6.77:8080/fcgi-bin/report/r.cgi?id=1&1=234&2=4502
	QosS.Global.sUrl = "http://"+QosS.Configure.domain+"fcgi-bin/report/r.cgi?id="+id;
	this.Global.topSpan=new Date().getTime()-this.Global.startTime;
	//alert(this.Global.topSpan);
	}
};


QosS.killTimer = function(){
	if(this.Global.spTimer)
	{
		this.Global.imgFlag=this.Global.jsFlag=this.Global.img2Flag=this.Global.js2Flag=this.Global.endFlag=true;		
		return;
	}
};

QosS.endCheck = function(){		
if(QosS.isIE5()){
	// var num = parseInt(50*Math.random())
	// if(num!=1)
	// {
		// return;
	// }
	setTimeout("QosS.killTimer()",1000*60*2);
	this.Global.endFlag=true;
	
	var o=document.images;
	for(var i=0;i<o.length;++i)
	{
		this.Global.img2.push(o[i]);
	}
	if (typeof(document.scripts) != "undefined")
	{
		o=document.scripts;
		for(var i=0;i<o.length;++i)
		{
			// if(o[i].src.indexOf("adsfile.qq.com") != -1 || o[i].src.indexOf("adsrich.qq.com") != -1)
			// {
				// this.Global.js2.push(o[i]);
			// }
			// else 
			// {
				// this.Global.js1.push(o[i]);
			// }
			this.Global.js2.push(o[i]);
		}
	}

	QosS.checkLoad();
	}
};
