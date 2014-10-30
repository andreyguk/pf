Ext.define('pf.view.form.list.AllReportsList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.allReportsList',
	itemId : 'gridAllReportsList',
	layout : 'fit',
	columnLines : true,
	listeners : {
		itemdblclick : function(grid, record, item, index, e, eOpts) {
			var me = this;
			if (record.get('objFuncType') == 2) {
				// flat
				me.fireEvent('editOVFlat', this, record);
			} else if (record.get('objFuncType') == 3) {
				// land
				me.fireEvent('editOVLand', this, record);
			} else {
				// other
				me.fireEvent('editOVOther', this, record);
			}
		}
	},
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		this.store = Ext.create('pf.store.AllReports');
		Ext.apply(this, {
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
			columns : {
				plugins : [ {
					ptype : 'gridautoresizer'
				} ],
				items : [ {
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
					flex : 1.5,
					filter : true,
					renderer : Ext.util.Format.dateRenderer('d.m.Y')
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
					// hidden : true,
					filter : true
				}, {
					header : "№ </br> договору",
					dataIndex : 'contractNum',
					flex : 1.5,
					filter : true
				}, {
					header : 'Замовник  </br> &nbsp',
					dataIndex : 'applicant',
					flex : 1.5,
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
					flex : 1.5,
					hidden : false,
					filter : true
				}, {
					header : 'Синхронізатор </br> звіту',
					dataIndex : 'synchronizer',
					flex : 1.5,
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
					header : "Статус </br> звіту",
					dataIndex : 'ovState',
					flex : 1,
					filter : true
				} ]
			}
		}),

		this.callParent(arguments);

	}
});