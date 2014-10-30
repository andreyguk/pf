Ext.define('pf.view.main.container.MainToolBar', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.mainToolBarContainer',
	region : 'north',
	border : false,
	split : false,
	initComponent : function() {
		Ext.applyIf(this, {
			items : [ {
				xtype : 'mainToolBar'
			} ]
		});
		this.callParent(arguments);
	}
});