Ext.define('photo.view.ModeSelection', {
	extend : 'Ext.Panel',
	xtype : 'modeselection',
	config : {
		layout: {
            align: 'center',
            pack: 'center',
            type: 'vbox'
        },
        items: [
            {
                xtype: 'button', action: 'Distortion', width: 200, text: 'Distortion'
            },
            {
                xtype: 'button', action: 'Mix', width: 200, text: 'Mix'
            }
        ]
	},
	destroy : function(){
		console.log('HOME destroy');
	}
});