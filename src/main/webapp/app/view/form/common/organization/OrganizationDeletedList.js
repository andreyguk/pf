Ext.define('pf.view.form.common.organization.OrganizationDeletedList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.organizationDeletedList',
	// store : Ext.create('pf.store.common.OrganizationDeleted'),
	layout : 'fit',
	columnLines : true,
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		var me = this;
		this.store = Ext.create('pf.store.common.OrganizationDeleted');
		Ext.apply(me, {
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				store : this.store,
				dock : 'bottom',
				displayInfo : true
			} ],
			columns : [ {
				xtype : 'rownumberer'
			}, {
				header : 'id',
				dataIndex : 'id',
				flex : 1,
				hidden : true,
				hideable : false

			}, {
				header : "Найменування",
				dataIndex : 'name',
				flex : 1,
				filter : true
			}, {
				header : "orgTypeId",
				dataIndex : 'orgTypeId',
				hidden : true,
				hideable : false
			}, {
				header : "Тип організації",
				dataIndex : 'orgTypeName',
				flex : 1,
				filter : true
			}, {
				header : 'Керівник',
				dataIndex : 'organHead',
				flex : 1,
				filter : true
			}, {
				header : "Адреса",
				dataIndex : 'address',
				flex : 2,
				filter : true
			} ]
		}), me.callParent(arguments);
	}
});