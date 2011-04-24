var QosN = new Object();
QosN.G = {
	version:"1.1",
	author:"willliu",
	//修改domain为上报ip
	domain:"203.184.142.183",
	idc:["http://203.184.141.221/bz.gif","http://210.59.147.103/bz.gif"],
	id:["1000","10"]
};

QosN.isIE5 = function() {
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
};

QosN.i_onload = function() {
	var img = new Image(0, 0);
	img.src = QosN.iUrl+((new Date()).getTime()-this.stime);
	//alert("onload src"+img.src);
};
/*
QosN.i_onerror = function() {
	var img = new Image(0, 0);
	img.src = QosN.iUrl+((new Date()).getTime()-this.stime);
};
*/
QosN.TestIUrl = function(url) {
	var img = document.createElement("IMG");
	img.style.display = "none";
	img.url = url.split("/")[2];
	img.onload = QosN.i_onload;
//	img.onerror = QosN.i_onerror;
	document.body.appendChild(img);
	img.stime = (new Date()).getTime();
	img.src = url+"?"+Math.random();
	//alert("src "+img.src);
};

QosN.Init = function(){
	//随机选取1/40用户做测试
	/*
	var num = Math.floor(40*Math.random());
	if (num != 1)
	{
		return;
	}
	*/
	
	var ir = Math.floor(QosN.G.idc.length*Math.random());
	QosN.iUrl = "http://"+QosN.G.domain+"/fcgi-bin/report/r.cgi?id="+QosN.G.id[ir]+"&1=";	
	//alert(ir+"numer");
	QosN.TestIUrl(QosN.G.idc[ir]);

};
if (QosN.isIE5())
{
	//alert("test");
	window.attachEvent("onload", QosN.Init);
}
