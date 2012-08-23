Ext.define('photo.view.Distortion', {
	extend : 'Ext.Panel',
	xtype: 'distortion',
	config : {
		layout : 'fit',
		items : [
			 {
				 xtype : 'toolbar',
				 docked: 'bottom',
				 items: [
				           	{ xtype: 'button',text:'camera', action: 'Camera',iconCls: 'star',iconMask: true },
				           	{ xtype: 'button',text:'album', action: 'Album',iconCls: 'action',iconMask: true },
				           	{ xtype: 'button',id:'useimage_btm', text:'useimage', action: 'UseImage', disabled:true }
			     ]
			 },
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
		    	 style : 'display:none',
		    	 height : 60,
		    	 //top: 0,
		    	 //bottom : 0,//뭔가 위치값이 틀어짐.. 툴바를 넣고나서
		    	 draggable: true,
		    	 html : [//나중에 TPL로 수정
						   '<img name="grayscale" style="width:60px; height:60px;" src="resources/images/filter/grayscale.png"></img>',
						   '<img name="brightness" style="width:60px; height:60px;" src="resources/images/filter/bright60.png"></img>',
						   '<img name="threshold" style="width:60px; height:60px;" src="resources/images/filter/threshold128.png"></img>'
						   	  
				 ].join("")
		     }
		],
		listeners : [
             {
                 fn: 'appyFilter',
                 event: 'tap',
                 delegate: '#filterpanel',
                 element : 'element'
             },
             {
            	 fn: 'useImage',
                 event: 'tap',
                 delegate: 'toolbar button[action=UseImage]',
                 element : 'element'
             }    
		]
	},
	setSrc : function(url, scope){
		url = 'resources/images/photo01.jpg';
	    if(url == '' || url ==null){
	    	return;
	    }
	    
	    var img = this.getEl('myimg');
	    	img.src = url;
	    	img.onload = scope.onloadImage(img); 
	    this.setVisible(img, false);
	    this.setVisible(this.getEl('backimg'), false);
//	    if(img.src.substring(document.URL.length, img.src.length) == url){
//	    	//alert('same image');
//	    	//img = null;
//	    	//return;
//	    	url = 'resources/images/photo02.jpg';
//	    }
		

	},
	onloadImage : function(img){
		if(this.checkFaceDetection(img)){//얼굴인식 가능
			//현재 패널에 가능한 필터 및 픽셀 데이타를 미리 세팅해놓는다.
			this.setFilter();
			this.drawFaceRectagle();
			Ext.getCmp('useimage_btm').enable();
		}else{//얼굴인식 불가능
			alert('not detect face, select picture again!!!');
		}
	},
	///////////////////////////////////////////////////////////
	setVisible : function(el, b){
		el.style.display = b? 'block' : 'none';	
	},
	getEl : function(id){
		return document.getElementById(id);
	},
	///////////////////////////////////////////////////////////
	checkFaceDetection : function(img){
		PhotoData.init('mycanvas', img.width, img.height);
		PhotoData.getContext().drawImage(img, 0, 0);
		
		//face detection //ccv.js
		var comp = ccv.detect_objects({
	        "canvas": ccv.grayscale(ccv.pre(img)),
	        "cascade": cascade,
	        "interval": 5,
	        "min_neighbors": 1
	    });
		PhotoData.setFaceDetection(comp);
		
		if(comp.length == 0){
			return false; 
		}else{
			return true;
		}
	},
	drawFaceRectagle : function(){
		PhotoData.getContext().lineWidth = 3;
		PhotoData.getContext().strokeStyle = "#f00";
	    var comp = PhotoData.getFaceDetection();
		for (var i = 0; i < comp.length; i++) {
	    	PhotoData.getContext().strokeRect(comp[i].x, comp[i].y, comp[i].width, comp[i].height);
	    }
		comp = null;
	},
	useImage : function(){
		this.setVisible(this.getEl('filterpanel'), true);
	},
	setFilter : function(){
		PhotoData.setFilter('grayscale',  Filters.filterImage(Filters['grayscale'],  PhotoData.getPixels()));
		PhotoData.setFilter('brightness', Filters.filterImage(Filters['brightness'], PhotoData.getPixels(), 60));
		PhotoData.setFilter('threshold',  Filters.filterImage(Filters['threshold'],  PhotoData.getPixels(), 128));
	},
	appyFilter : function(event){
		var id = event.target.name;
		PhotoData.getContext().putImageData(PhotoData.getFilter(id), 0, 0);
		id = null;
	},
	destroy : function(){
		console.log('DISTORTION destroy');
		this.setVisible(this.getEl('backimg'), true);
		this.setVisible(this.getEl('filterpanel'), false);
		Ext.getCmp('useimage_btm').disable();;
		if(PhotoData.getCanvas()){
			PhotoData.getContext().clearRect(0,0,PhotoData.getCanvas().width, PhotoData.getCanvas().height);
		}
	}
});