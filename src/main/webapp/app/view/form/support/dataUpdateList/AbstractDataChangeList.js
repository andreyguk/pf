Ext.define('pf.view.form.support.dataUpdateList.AbstractDataChangeList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.abstractIssueGrid',
	layout : 'fit',
	//cls : 'move-icon',
	columnLines : true,
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		var me = this;
		this.store = me.getStore();
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
			columns : me.getColumns()
		}), me.callParent(arguments);
	},
	getStore : function() {
		return Ext.create('pf.store.IssueUser');
	},
	getColumns : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			dataIndex : 'priorityName',
			width : 22,
			renderer : function(value, metaData, record) {
				switch (value) {
				case 'URGENT':
					metaData.css = 'stateUrgent';
					break;
				case 'HIGH':
					metaData.css = 'stateHigth';
					break;
				case 'NORMAL':
					metaData.css = 'stateNormal';
					break;
				}
				return '';
			}
		}, {
			header : 'Номер',
			dataIndex : 'id',
			hidden : false,
			filter : true
		}, {
			header : 'Пріорітет',
			dataIndex : 'priorityName',
			filter : true,
			renderer : function(value, metaData, record) {
				switch (value) {
				case 'URGENT':
					value = 'Терміновий';
					break;
				case 'HIGH':
					value = 'Високий';
					break;
				case 'NORMAL':
					value = 'Нормальний';
					break;
				}
				return value
			}
		}, {
			header : "№ договору",
			dataIndex : 'contractNum',
			flex : 1,
			filter : true
		}, {
			header : "№ ФДМУ",
			dataIndex : 'fdmuNum',
			flex : 1,
			filter : true
		}, {
			header : "Статус звіту",
			dataIndex : 'ovState',
			flex : 1,
			filter : true
		}, {
			header : "Дата оцінки",
			width : 130,
			dataIndex : 'valuationdate',
			renderer : Ext.util.Format.dateRenderer('d.m.Y'),
			filter : true
		}, {
			header : "Короткий опис",
			dataIndex : 'subject',
			flex : 2,
			filter : true
		}, {
			header : "Автор заявки",
			dataIndex : 'creator',
			flex : 1,
			filter : true
		}, {
			header : "Дата створення",
			width : 130,
			dataIndex : 'createDate',
			renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
			filter : true
		}, {
			header : "Виконавець",
			dataIndex : 'executor',
			flex : 1,
			filter : true
		} ]
	}
});