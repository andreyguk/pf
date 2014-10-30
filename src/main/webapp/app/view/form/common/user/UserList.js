Ext.define('pf.view.form.common.user.UserList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userList',
	itemId : 'gridUserList',
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
		me.store = Ext.create('pf.store.common.User');
		Ext.apply(me, {
			tbar : [ {
				text : 'Додати',
				iconCls : 'add',
				itemId : 'createUser'
			} ],
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
			}, {
				xtype : 'actioncolumn',
				header : 'Редагувати',
				items : [ {
					iconCls : 'edit',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						me.fireEvent('editUser', this, rec);
					},
					scope : this
				} ],
				width : '10px',
				align : 'center'
			}, {
				xtype : 'actioncolumn',
				header : 'Вилучити',
				items : [ {
					iconCls : 'delete',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						me.fireEvent('deleteUser', this, rec);
					},
					scope : this
				} ],
				width : '10px',
				align : 'center'
			} ]
		}), me.callParent(arguments);
		me.addEvents('editUser');
		me.addEvents('deleteUser');
	}
});