Ext.define('photo.view.Mix', {
	extend : 'Ext.Panel',
	xtype: 'mix',
	config : {
		style : 'background-color:blue'
	},
	destroy : function(){
		console.log('MIX destroy');
	}
});