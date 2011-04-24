$.fn.imageSwitcher = function(config){
	var opacity = config.smallImageOpacity || 0.8;
	var fadeTime = config.fadeTime || 300;
	var autoSwitch = config.autoSwitch;
	$(this).css("position", "relative").each(function(){
		var switicher = $(this);
	    switicher.find(".small-panel img[@class!='small-image-indicator']").wrap("<div class='small-image-wrapper'></div>").addClass("small-image");
		switicher.find(".small-panel .small-image-wrapper").click(function(){
			var index = $(this).parent(".small-panel").find(".small-image-wrapper").index($(this)[0]);
			switicher.find(".big-panel .image-active").fadeOut(fadeTime,function(){
				switicher.find(".big-panel img:eq("+index+")").fadeIn(fadeTime).addClass("image-active");
			}).removeClass("image-active");
			switicher.find(".extra-panel .image-active").hide().removeClass("image-active");
			switicher.find(".extra-panel").each(function(){
				$(this).find(".extra-item:eq("+index+")").fadeIn().addClass("image-active");
			});
			switicher.find(".small-panel .image-active").removeClass("image-active").css("opacity", opacity);
			$(this).addClass("image-active").css("opacity", 1).append(switicher.find(".small-image-indicator"));
			if(autoSwitch){
				var switcherInterval = switicher.data("switcherInterval");
				if(switcherInterval && switcherInterval != null){
					clearInterval(switcherInterval);
				}
				switcherInterval = setInterval(function(){
					var switchers = switicher.find(".small-panel .small-image-wrapper");
					if(switchers.length == (index+1)){
						switchers.eq(0).click();
					}else{
						switchers.eq(index+1).click();
					}
				},autoSwitch);
				switicher.data("switcherInterval", switcherInterval);
			}
		}).css("opacity", opacity).css("cursor", "pointer");
		switicher.find(".big-panel img:eq(0),.big-panel a:eq(0)").addClass("image-active");
		switicher.find(".small-panel .small-image-wrapper:eq(0)").click();
		switicher.show();
		
		if (autoSwitch) {
			switicher.hover(function(){
				var switcherInterval = $(this).data("switcherInterval");
				if (switcherInterval && switcherInterval != null) {
					clearInterval(switcherInterval);
				}
				autoSwitch = false;
			}, function(){
				autoSwitch = config.autoSwitch;
				window.setTimeout(function(){
					var switchers = switicher.find(".small-panel .small-image-wrapper");
					var index = switchers.index($(".small-panel .image-active")[0]);
					if(switchers.length == (index+1)){
						switchers.eq(0).click();
					}else{
						switchers.eq(index+1).click();
					}
				}, autoSwitch);
			});
		}
	});
}


