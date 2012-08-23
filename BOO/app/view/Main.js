Ext.define("BOO.view.Main", {
    extend: 'Ext.Panel',
    
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.Img'
    ],
    
    config: {
    	id: 'MainView',
    	layout: {
    		type: 'card'
    	},
    	
        items: [
            
                {
                    xtype: 'titlebar',
                    docked: 'top',
                    height: '',
                    title: 'Photo Revolution',
                    items: [
                        {
                            xtype: 'button',
                            hidden: true,
                            id: 'Back',
                            itemId: 'mybutton',
                            iconCls: 'home',
                            iconMask: true,
                            text: ''
                        },
                        {
                            xtype: 'button',
                            iconCls: 'info',
                            id: 'Info',
                            iconMask: true,
                            text: '',
                            align: 'right'
                        },

                    ]
                },
                {
                    xtype: 'panel',
                    id: 'Booth',
                    margin: '',
                    width: '',
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    modal: false,
                    items: [
                        {
                            xtype: 'button',
                            id: 'mix',
                            itemId: 'mybutton1',
                            margin: 10,
                            padding: '',
                            style: 'align:center',
                            width: '200px',
                            text: 'mix'
                        },
                        {
                            xtype: 'button',
                            id: 'distort',
                            margin: 10,
                            width: '200px',
                            text: 'distortion'
                        },
                        {
                            xtype: 'button',
                            id: 'funny',
                            margin: 10,
                            width: '200px',
                            text: 'funny camera'
                        }
                    ]
                },
                {
                	xtype: 'pmix'
                },
                {
                	xtype: 'pdistort'
                },
                {
                	xtype: 'pfunny'
                },
                {
                	xtype: 'infopanel'
                },
                {
                	xtype: 'pmixresult'
                },
        ]
    }
});
