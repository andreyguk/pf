Ext.define('pf.view.form.list.FinishedList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.finishedList',
	itemId : 'gridFinishedList',
	cls : 'move-icon',
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
		me.store = Ext.create('pf.store.Finished');
		Ext.apply(me, {
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				store : this.store,
				// store : Ext.create('pf.store.ToSync'),
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
				filter : true
			}, {
				header : 'Дата  створення анкети',
				dataIndex : 'createDateBlank',
				renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
				hidden : true,
				filter : true
			}, {
				header : "№ </br> ФДМУ",
				dataIndex : 'fdmuNum',
				flex : 1,
				filter : true
			}, {
				header : "№ </br> договору",
				dataIndex : 'contractNum',
				flex : 1.3,
				filter : true
			}, {
				header : 'Замовник  </br> &nbsp',
				dataIndex : 'applicant',
				flex : 2,
				filter : true
			}, {
				header : "Назва </br> об'єкту оцінки",
				dataIndex : 'objectName',
				flex : 3,
				filter : true
			}, {
				header : "Тип </br> об'єкту",
				dataIndex : 'objectType',
				flex : 2,
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
				header : 'Виконавець </br> звіту',
				dataIndex : 'reportMaker',
				flex : 2,
				hidden : true,
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
				header : 'Взяти </br> на синхронізацію',
				items : [ {
					iconCls : 'folder-move-icon',
					handler : function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						var rec = grid.getStore().getAt(rowIndex);
						me.fireEvent('takeOV', 'takeOVToAddNum', this, rec);

						/*
						 * ovId = rec.get('id'); Ext.Ajax.request({ url :
						 * pf.system.Settings.protocol + pf.system.Settings.port +
						 * pf.system.Settings.ns +
						 * 'pf.proxy.manager.Create.cls', params : { action :
						 * 'takeOVToAddNum', ovId : ovId }, success :
						 * function(response, options) { var result =
						 * Ext.decode(response.responseText); if
						 * (result.success) { Ext.getStore('Finished').reload();
						 * Ext.getStore('ToSync').reload(); } } })
						 */
					},
					scope : this
				} ],
				width : '10px',
				align : 'center'
			} ]
		}),

		me.callParent(arguments);
		me.addEvents('takeOV');

	}
});