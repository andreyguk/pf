Ext.define('pf.view.main.container.Menu', {
	extend : 'Ext.container.Container',
	alias : 'widget.menuContainer',
	region : 'west',
	layout : 'fit',
	itemId : 'menuContainerId',
	split : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(this, {

		});
		me.callParent(arguments);
	}
});
