Ext.define('BOO.view.Pmix', {
	extend: 'Ext.Panel',
	xtype: 'pmix',
    
	requires: [
	           	'Ext.Img'
              ],
	
	config: {
		
		id: 'Pmix',
		
		items: [
		 {
            xtype: 'panel',
            margin: 20,
            layout: {
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'image',
                    height: 201,
                    margin: 10,
                    ui: '',
                    width: '',
                    flex: 1,
                    id:'img1st'
                },
                {
                    xtype: 'image',
                    height: 201,
                    margin: 10,
                    flex: 1,
                    id: 'img2nd'
                }
            ]
        },
        {
            xtype: 'panel',
            margin: '',
            layout: {
                align: 'start',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    margin: 20,
                    iconAlign: 'top',
                    iconCls: 'star',
                    iconMask: true,
                    text: 'take',
                    id:'mixtake'
                },
                {
                    xtype: 'button',
                    margin: 20,
                    iconAlign: 'top',
                    iconCls: 'maps',
                    iconMask: true,
                    text: 'gallery',
                    id:'mixgallery'
                }
            ]
        },
        {
            xtype: 'button',
            text: 'mix',
            hidden: true,
            id: 'pmixbutton'
        }
    
			 ]
	}
});