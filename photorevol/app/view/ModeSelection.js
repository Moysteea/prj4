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
                xtype: 'button',
                action: 'DistortionIS',//IS : ImageSelection
                width: 200,
                text: 'Distortion'
            },
            {
                xtype: 'button',
                action: 'MixIS',
                width: 200,
                text: 'Mix'
            }//,
//            {
//                xtype: 'button',
//                itemId: 'compostionBtn',
//                width: 200,
//                text: 'Composition'
//            }
        ]
	}
});