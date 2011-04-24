var WebI18N={};
WebI18N.language = (navigator.browserLanguage||navigator.language).toLocaleLowerCase();
Date.prototype.format=function(format){var date=this;if(!format){format=WebI18N.shortDateFormats.defaultFormat;}
var month=date.getMonth()+1;var year=date.getFullYear();format=format.replace("MM",month.toString().padL(2,"0"));format=format.replace("M",month.toString());if(format.indexOf("yyyy")>-1){format=format.replace("yyyy",year.toString());}
else
if(format.indexOf("yy")>-1){format=format.replace("yy",year.toString().substr(2,2));}
format=format.replace("dd",date.getDate().toString().padL(2,"0"));format=format.replace("d",date.getDate().toString());var hours=date.getHours();if(format.indexOf("t")>-1){if(hours>11){format=format.replace("t","pm")}
else{format=format.replace("t","am")}}
format=format.replace("HH",hours.toString().padL(2,"0"));format=format.replace("H",hours.toString());if(format.indexOf("hh")>-1){if(hours>12){hours-=12;}
if(hours==0){hours=12;}
format=format.replace("hh",hours.toString().padL(2,"0"));}
if(format.indexOf("h")>-1){if(hours>12){hours-=12;}
if(hours==0){hours=12;}
format=format.replace("h",hours.toString());}
format=format.replace("mm",date.getMinutes().toString().padL(2,"0"));format=format.replace("m",date.getMinutes().toString());format=format.replace("ss",date.getSeconds().toString().padL(2,"0"));format=format.replace("s",date.getSeconds().toString());return format;}
String.prototype.padL=function(width,pad){if(!width||width<1){return this;}
if(!pad){pad=" ";}
var length=width-this.length
if(length<1){return this.substr(0,width);}
repeat=function(chr,count){var str="";for(var x=0;x<count;x++){str+=chr;};return str;}
return(repeat(pad,length)+this).substr(0,width);}
Date.prototype.toShortDate=function(){var language=WebI18N.language.toLowerCase();var patten=WebI18N.shortDateFormats[language]||WebI18N.shortDateFormats.defaultFormat;return this.format(patten);}
WebI18N.shortDateFormats={defaultFormat:"yyyy-MM-dd","zh-cn":"yyyy-M-d","zh-hk":"d/M/yyyy","zh-tw":"yyyy/M/d","zh-sg":"d/M/yyyy","en-us":"M/d/yyyy","vi":"dd/MM/yyyy","th":"d/M/yyyy"};
