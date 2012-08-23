Ext.define('photo.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires : [
        'Ext.device.Device',
        'Ext.device.Camera'
    ],
    config: {
        refs: {
        	main : 'main',
        	titlebar : 'titlebar',
        	home : 'modeselection',
        	distortion : 'distortion',
        	mix : 'mix' 
        },
        control: {
            'modeselection button[action=Distortion]' : {
            	tap : 'onSetPage'
            },
            'modeselection button[action=Mix]' : {
            	tap : 'onSetPage'
            },
            'titlebar button[action=Home]' : {
            	tap : 'onSetPage'
            },
            'toolbar button[action=Camera]' : {
            	tap : 'onClickCamera'
            },
            'toolbar button[action=Album]' : {
            	tap : 'onClickAlbum'
            }
        }
    },
    onSetPage: function(button, e) {
    	this.getMain().getActiveItem().destroy();
    	this.getTitlebar().setTitle(button._text);
    	this.getMain().setActiveItem( this["get" + button.action]() );
    },
    onClickCamera: function(button, e) {
        this.onNativeCamera('camera', 'file');
    },
    onClickAlbum: function(button, e) {
    	 this.onNativeCamera('album', 'file');
    },
    onNativeCamera : function(source, destination){
    	var view = this.getMain().getActiveItem();
        Ext.device.Camera.capture({
            success: function(image) {
            	view.setSrc(image, view);
            },
            quality: 75,
            source : source,
            destination: destination
        });
    }
});