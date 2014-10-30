Ext.define('pf.view.form.list.HandedList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.handedList',
	itemId : 'gridHandedList',
	layout : 'fit',
	columnLines : true,
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		this.store = Ext.create('pf.store.Handed');
		Ext.apply(this, {
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
				renderer : Ext.util.Format.dateRenderer('d.m.Y'),
				flex : 1,
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
				// hidden : true,
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
				header : 'Синхронізатор </br> &nbsp',
				dataIndex : 'synchronizer',
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
			} ]
		}),

		this.callParent(arguments);

	}
});