Ext.define('pf.view.form.list.InProcessList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.inProcessList',
	itemId : 'gridInProcessList',
	store : 'InProcess',
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
			} else if (record.get('objFuncType') == 4) {
				// house
				me.fireEvent('editOVHouse', this, record);
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
		this.store = Ext.create('pf.store.InProcess');
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
				header : "№ </br> договору",
				dataIndex : 'contractNum',
				flex : 1.3,
				filter : true
			}, {
				header : 'Дата створення анкети',
				dataIndex : 'createDateBlank',
				renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
				hidden : true,
				filter : true
			}, {
				header : 'Замовник </br> &nbsp',
				dataIndex : 'applicant',
				flex : 1,
				filter : true
			}, {
				header : "Назва </br> об'єкту оцінки",
				dataIndex : 'objectName',
				flex : 3,
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
				flex : 1.3,
				filter : true
			}, {
				header : "Місцезнаходження </br> об'єкту (район)",
				dataIndex : 'objRayon',
				flex : 1.3,
				filter : true
			}, {
				header : "Місцезнаходження </br> об'єкту (н. п.)",
				dataIndex : 'objCity',
				flex : 1.3,
				filter : true
			} ]
		}),

		this.callParent(arguments);
	}
});