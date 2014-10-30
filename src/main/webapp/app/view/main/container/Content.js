Ext.define('pf.view.main.container.Content', {
	extend : 'Ext.container.Container',
	alias : 'widget.content',
	itemId : 'contentId',
	region : 'center',
	layout : 'fit',
	split : false,
	cls:'containerBody',

	// requires : [ 'erdr.view.main.menu.InfoMenu' ],
	initComponent : function() {
		Ext.applyIf(this, {
			items : [ {
				xtype : 'panel'
			} ]
		});
		this.callParent(arguments);
	}
});