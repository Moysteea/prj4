/*
 * 1. 외곡 필터 적용
 * 2. 사진 두장 선택 적용 - 캔버스 하나에 - ui를 어떻게 해야되는지 고민....-.-;;-- 유아이 인터랙션 정의를 먼저하자....-
 * 3. 카메라 연동 사진 불러올때 뭔가 하다보면 안될ㄷ가 있다..
 * 
 */
Ext.define("photo.view.Main", {
    extend: 'Ext.Panel',
    xtype : 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
    	layout: 'card',
        items: [
           {
        	   xtype : 'titlebar',
        	   docked: 'top',
        	   title : 'PhotoRevolution',
        	   items: [ 
        	            { xtype: 'button',action: 'Home',iconCls: 'home',iconMask: true } 
        	   ]
           },
//           {
//        	   xtype : 'toolbar',
//        	   docked: 'bottom',
//        	   items: [
//        	           	{ xtype: 'button',text:'camera', action: 'Camera',iconCls: 'star',iconMask: true },
//        	           	{ xtype: 'button',text:'album', action: 'Album',iconCls: 'action',iconMask: true },
//        	           	{ xtype: 'button',text:'useimage', action: 'UseImage', disabled:true }
//               ]
//           },
           { xtype : 'modeselection'},
           { xtype : 'distortion'},
           { xtype : 'mix'}
        ]
    }
});
