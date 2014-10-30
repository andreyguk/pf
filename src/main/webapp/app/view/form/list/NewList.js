Ext.define('pf.view.form.list.NewList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.newList',
	itemId : 'gridNewList',
	layout : 'fit',
	cls : 'move-icon',
	columnLines : true,
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		var me = this;
		this.store = Ext.create('pf.store.New');
		Ext.apply(me, {
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				store : this.store,
				dock : 'bottom',
				displayInfo : true,
				plugins : [ {
					ptype : 'pageSize'
				} ]
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
				header : "Дата </br> оцінки",
				dataIndex : 'valuationDate',
				flex : 1,
				renderer : Ext.util.Format.dateRenderer('d.m.Y'),
				hidden : true,
				filter : true
			}, {
				header : 'Дата створення анкети',
				dataIndex : 'createDateBlank',
				renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
				hidden : true,
				filter : true
			}, {
				header : "№ </br> ФДМУ",
				dataIndex : 'fdmuNum',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : "№ </br> договору",
				dataIndex : 'contractNum',
				flex : 1.3,
				filter : true
			}, {
				header : 'Замовник </br> &nbsp',
				dataIndex : 'applicant',
				flex : 1,
				filter : true
			}, {
				header : "Назва </br> об'єкту оцінки",
				dataIndex : 'objectName',
				flex : 2,
				filter : true
			}, {
				header : "Тип </br> об'єкту",
				dataIndex : 'objectType',
				flex : 1,
				filter : true
			}, {
				header : "Вид  </br> об'єкту",
				dataIndex : 'objectSubType',
				flex : 3,
				filter : true
			}, {
				header : 'Створено у </br> організації',
				dataIndex : 'creatorOrg',
				flex : 2,
				filter : true
			}, {
				header : "Місцезнаходження </br> об'єкту (область)",
				dataIndex : 'objRegion',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : "Місцезнаходження </br> об'єкту (район)",
				dataIndex : 'objRayon',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : "Місцезнаходження </br> об'єкту (н. п.)",
				dataIndex : 'objCity',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				xtype : 'actioncolumn',
				tdCls : 'move-icon-td',
				header : 'Взяти в роботу',
				items : [ {
					iconCls : 'folder-move-icon',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						me.fireEvent('takeOV', 'takeOVInProcess', this, rec);
					},
					scope : this
				} ],
				width : '10px',
				align : 'center'
			} ]
		}), me.callParent(arguments);
		me.addEvents('takeOV');
	}
});