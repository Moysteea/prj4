Ext.define('photo.view.DistortionImageSelection', {
	extend : 'Ext.Panel',
	xtype: 'distortionimageselection',
	config : {
		layout : 'fit',
		items : [
			 {
				 xtype : 'panel',
				 html : [
						   '<img id="backimg" style="width:100%; height:100%;" src="resources/images/back.jpg"></img>',
						   '<canvas id="mycanvas" style="width:100%; height:100%;">no canvas support</canvas>',
						   '<img id="myimg"></img>'    
						].join("")
			 },
		     {
		    	 id : 'filterpanel',
				 xtype : 'panel',
		    	 layout : 'hbox',
		    	 height : 60,
		    	 bottom: 0,
		    	 right : 0,
		    	 //draggable: true,
		    	 html : [//나중에 TPL로 수정
						   '<img name="grayscale" style="width:60px; height:60px;" src="resources/images/filter/grayscale.png"></img>',
						   '<img name="brightness" style="width:60px; height:60px;" src="resources/images/filter/bright60.png"></img>',
						   '<img name="threshold" style="width:60px; height:60px;" src="resources/images/filter/threshold128.png"></img>'
						   	  
				 ].join("")
		     }
		],
		listeners : [
             {
                 fn: 'setFilter',
                 event: 'tap',
                 delegate: '#filterpanel',
                 element : 'element'
             }         
		             
		]
	},
	setFilter : function(event){
		console.log(event.target.name);
		var c = document.getElementById('mycanvas');
		var ctx = c.getContext("2d");
		
		console.log('ppppp ' + ctx.getImageData(0,0, c.width, c.height))
		var pixels = ctx.getImageData(0,0, c.width, c.height);
		
			pixels = Filters.filterImage(Filters[event.target.name], pixels);
			ctx.putImageData(pixels, 0, 0);
	},
	setSrc : function(url, scope){
		var imgBack = document.getElementById('backimg');
			imgBack.style.display = 'none';
			imgBack = null;
		var img = document.getElementById('myimg');
			img.src = 'resources/images/photo02.jpg';//url;
			img.onload = scope.onloadImage(img);
			img.style.display = 'none';
			img = null;
	},
	onloadImage : function(img){
		//detect face
		var comp = ccv.detect_objects({
		        "canvas": ccv.grayscale(ccv.pre(img)),
		        "cascade": cascade,
		        "interval": 5,
		        "min_neighbors": 1
		    });
		
		//draw image in canvas
		var c = document.getElementById('mycanvas');
			c.width = img.width;
			c.height = img.height;
		var ctx = c.getContext("2d");	
			ctx.drawImage(img, 0, 0); 
		
		 	ctx.lineWidth = 3;
		    ctx.strokeStyle = "#f00";
		    console.log('comp.length ' + comp.length);//detect가 되지 않을 경우 alet라도 띄우야 된다.
		    for (var i = 0; i < comp.length; i++) {
		        ctx.strokeRect(comp[i].x, comp[i].y, comp[i].width, comp[i].height);
		    }	
	}
});