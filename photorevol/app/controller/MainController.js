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
        	distortionIS : 'distortionimageselection',
        	mixIS : 'miximageselection' 
        },
        control: {
            'modeselection button[action=DistortionIS]' : {
            	tap : 'onSetPage'
            },
            'modeselection button[action=MixIS]' : {
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
    	//console.log(this.getTitlebar());
    	//Ext.getCmp(this.geTitlbar()).setTitle('Changed Title');
    	this.getTitlebar().setTitle(button.action);
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