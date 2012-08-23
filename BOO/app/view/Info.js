Ext.define('BOO.view.Info', {
	extend: 'Ext.Panel',
	xtype: 'infopanel',
	
	config: {
		title: 'Infomation',
		iconCls: 'info',
		
		items: [
		    {
		    	xtype: 'panel',
		    	html: 'info!!!!!'
		    }
		]

	}
});