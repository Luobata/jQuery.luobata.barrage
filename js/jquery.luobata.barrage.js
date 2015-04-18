;(function($){
	$.Barrage = function(el,options){
		var self = this;
		var element = $(el);

		//插件初始化
		self.init = function() {

			//设置定时器.定时获得弹幕
			if(element.width() < options.min_width || element.height() < options.min_height){
				alert("该图片过小,不符合弹幕条件");
				return;
			}
			setInterval(self.getResource,5000);
			self.getResource();
			self.createmask();
		};
		
		//创建弹幕浮层
		self.createmask = function() {
			var $mask = $('<div></div');

			$mask.css({
				'width': element.width(),
				'height': element.height(),
				'position': 'absolute',
				'top': '0px',
				'background-color' : 'rgba(237, 227, 226, 0.7)'
			});

			element.after($mask);
		};

		//拼装弹幕
		self.formateBarrage = function(barrage) {
			$(barrage).each(function(index,el){
				var size = el.length;
				el._font_size = options.font_size;
				el._color = self.getColor();
				el._loc = self.getloc();
				self.trans(el);
			});
		};

		//ajax获取弹幕资源
		self.getResource = function() {
			var coments = null;
			$.ajax({
				url: 'getResource.php',
				type: 'POST',
				dataType: 'json',
				success : function(e){
					coments = e;
					self.formateBarrage(coments);
				}
			});
		};

		//计算弹幕出现位置
		self.getloc = function() {
			var top = parseInt(Math.random() * element.height()+1 ,10),
				left = parseInt(element.width() ,10),
				loc;
			this._top = top;
			this._left = left;
			return this;
		};

		//计算弹幕颜色
		self.getColor = function() {
			var random = parseInt(Math.random()*3,10);
			return options.color[random];
		};

		//计算弹幕移动动画
		self.trans = function(el) {
			var barrages = element.next().find('.barrages');
			//节省dom,寻找页面上有没有可回收dom
			var barrage;
			var p;
			if (barrages.size()) {
				//存在可回收的节点,只需要改变弹幕内容
				barrage = barrages.eq(0).text(el.barrage);
				p = barrage.parent('p');
				barrage.removeClass('barrages');
			} else {
				//不存在可回收节点,创造dom节点,拼装
				barrage = $('<span>'+el.barrage+'</span>');
				p = $('<p></p>');
				p.append(barrage);
				element.next().append(p);
			}
			barrage.css({
				"left" : el._loc._left ,
				"top" : el._loc._top ,
				"color" : el._color ,
				"font-size" : el._font_size
			});
			//添加动画样式,统一绑定回调
			barrage.addClass('barrage');
			self.callback(p,el);
		};

		//弹幕回调渲染接口
		self.callback = function(barrage,el) {
			if($.browser.webkit){
				console.log(111);
				barrage.bind('webkitAnimationEnd', function(event) {
					$(this).find("span").removeClass('barrage').addClass('barrages');
				});
			} else if($.browser.mozilla){
				console.log(222);
				barrage.bind('animationend', function(event) {
					$(this).find("span").removeClass('barrage').addClass('barrages');
				});
			} else{
				console.log(333);
				barrage.bind('oanimationend', function(event) {
					$(this).find("span").removeClass('barrage').addClass('barrages');
				});
			}
		};

		self.init();

	};

	$.fn.barrage = function(option) {
		var defaults = {
			min_width : 200 ,
			min_height : 100 ,
			color : ["red", "green", "yellow"] ,
			font_size : 14
		};
		var options = $.extend(defaults,option);
		var self = $(this);

		return self.each(function(index,el) {
			return $.Barrage(el,options);
		});

	};
})(jQuery);