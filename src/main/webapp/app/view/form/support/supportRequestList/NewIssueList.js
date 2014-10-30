Ext.define('pf.view.form.support.supportRequestList.NewIssueList', {
	extend : 'pf.view.form.support.supportRequestList.AbstractIssueGrid',
	alias : 'widget.newIssueList',
	getStore : function() {
		return Ext.create('pf.store.supportRequest.IssueNew');
	},
	getColumns : function() {
		var me = this;
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
			header : 'Тип',
			dataIndex : 'requestTypeName',
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
			header : "№ звіту",
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
			xtype : 'actioncolumn',
			tdCls : 'move-icon-td',
			header : 'Взяти в роботу',
			items : [ {
				iconCls : 'folder-move-icon',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					me.fireEvent('takeIssue', 'takeIssueToInProcess', this, rec);
				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		} ]
	}
});
