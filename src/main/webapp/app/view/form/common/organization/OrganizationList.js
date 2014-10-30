Ext.define('pf.view.form.common.organization.OrganizationList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.organizationList',
	itemId : 'gridOrganizationList',

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
		me.store = Ext.create('pf.store.common.Organization');
		Ext.apply(me, {
			tbar : [ {
				text : 'Додати',
				iconCls : 'add',
				itemId : 'createOrg'
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
			}, {
				xtype : 'actioncolumn',
				header : 'Редагувати',
				items : [ {
					iconCls : 'edit',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						me.fireEvent('editOrg', this, rec);
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
						me.fireEvent('deleteOrg', this, rec);
					},
					scope : this
				} ],
				width : '10px',
				align : 'center'
			} ]
		}), me.callParent(arguments);
		me.addEvents('editOrg');
		me.addEvents('deleteOrg');
	}
});