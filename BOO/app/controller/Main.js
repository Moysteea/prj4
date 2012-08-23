Ext.define('BOO.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            mainView : '#MainView',
            mixButton: '#mix',
            backButton: '#Back',
            infoButton: '#Info',
            img1Area: '#img1st',
            img2Area: '#img2nd',
            mixTakeButton: '#mixtake',
            mixGalleryButton: '#mixgallery',
            pMixView: '#Pmix',
            pMixButton: '#pmixbutton',
            distortButton: '#distort',
            funnyButton: '#funny'
            
        },
        control: {
            "#mix": {
            	tap: 'onMixButtonTap'	
            },
        	"#Back": {
        		tap: 'onBackButtonTap'
        	},
        	"#Info": {
        		tap: 'onInfoButtonTap'
        	},
        	"#mixtake": {
        		tap: 'onMixtakeButtonTap'
        	},
        	"#mixgallery": {
        		tap: 'onMixGalleryButtonTap'
        	},
        	'img2Area':{
        		load:'imageLoadComplete',
        	},
        	'pMixButton': {
        		tap: 'onPmixButtonTap'
        	},
        	'distortButton': {
        		tap: 'onDistortButtonTap'
        	},
        	'funnyButton' : {
        		tap: 'onFunnyButtonTap'
        	}
        	
        	
        }
        
        
    },
    
    onMixButtonTap: function(button, e, options) {
    	
    	this.getBackButton().show();
//    	this.getMainView().animateActiveItem(4, {type: 'slide', direction: 'left'});
    	this.getMainView().animateActiveItem(1, {type: 'slide', direction: 'left'});
    	this.getInfoButton().hide();
    	this.getPMixView().reset();
    },
    
    onDistortButtonTap: function(button, e, options) {
    	
    	this.getBackButton().show();
//    	this.getMainView().animateActiveItem(4, {type: 'slide', direction: 'left'});
    	this.getMainView().animateActiveItem(2, {type: 'slide', direction: 'left'});
    	this.getInfoButton().hide();
    	
    },
    
    onFunnyButtonTap: function(button, e, options) {
    	
    	this.getBackButton().show();
//    	this.getMainView().animateActiveItem(4, {type: 'slide', direction: 'left'});
    	this.getMainView().animateActiveItem(3, {type: 'slide', direction: 'left'});
    	this.getInfoButton().hide();
    	
    },
    
    onBackButtonTap: function(button, e, options) {
        button.hide();
    	this.getInfoButton().show();
        this.getMainView().animateActiveItem(0, { type: "slide",  direction: "right" });
    },
    
    onInfoButtonTap: function(button, e, options) {
    	this.getBackButton().show();
    	this.getInfoButton().hide();
    	this.getMainView().animateActiveItem(4, {type: 'slide', direction: 'left'});

    },
    
    onMixtakeButtonTap: function(button, e, options) {
    	this.getImg1Area().setSrc('resources/images/klee.png');
    },
    
    onMixGalleryButtonTap: function(button, e, options) {
    	this.getImg2Area().setSrc('resources/images/klee.png');
    },
    
    imageLoadComplete: function(img, e, options) {
    	this.getPMixButton().show();
    },
    
    onPmixButtonTap: function(button, e, options) {
    	this.getMainView().animateActiveItem(5, {type: 'slide', direction: 'left'});
    }
});