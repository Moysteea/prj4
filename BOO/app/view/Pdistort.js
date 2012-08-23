Ext.define('BOO.view.Pdistort', {
	extend: 'Ext.Panel',
	xtype: 'pdistort',
	
	config: {
		id: 'Pdistort',
		
		items: [
		        {
                    xtype: 'panel',
                    items: [
                        {
                            xtype: 'image',
                            height: '201px',
                            margin: '20px'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    margin: 20,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margin: 10,
                            text: 'take'
                        },
                        {
                            xtype: 'button',
                            margin: 10,
                            text: 'gallery'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    id: 'distort',
                    text: 'distortion'
                }
            ]
       
	}
});