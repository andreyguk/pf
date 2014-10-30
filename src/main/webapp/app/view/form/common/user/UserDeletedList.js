Ext.define('pf.view.form.common.user.UserDeletedList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userDeletedList',
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
		me.store = Ext.create('pf.store.common.UserDeleted');
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
				header : "Прізвище",
				dataIndex : 'lastName',
				flex : 1,
				filter : true
			}, {
				header : "Ім'я",
				dataIndex : 'firstName',
				flex : 1,
				filter : true
			}, {
				header : "По батькові",
				dataIndex : 'middleName',
				flex : 1,
				filter : true
			}, {
				header : 'Роль',
				dataIndex : 'roleName',
				flex : 1,
				filter : true
			}, {
				header : "Місце роботи",
				dataIndex : 'orgName',
				flex : 2,
				filter : true
			}, {
				header : 'Адреса',
				dataIndex : 'address',
				flex : 2,
				filter : true
			} ]
		}), me.callParent(arguments);

	}
});