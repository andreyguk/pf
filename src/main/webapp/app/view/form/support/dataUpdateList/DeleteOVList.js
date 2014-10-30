Ext.define('pf.view.form.support.dataUpdateList.DeleteOVList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.deleteOVList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.DeleteOV');
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
		}, {
			xtype : 'actioncolumn',
			header : 'Видалити звіт',
			items : [ {
				iconCls : 'delete',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					this.fireEvent('deleteOV', 'deleteOV', this, rec);
				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		}]
	}
});