Ext.define('pf.view.form.card.issue.IssuesList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.issuesList',
	itemId : 'gridIssuesList',
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
		this.store = Ext.create('pf.store.IssueUser')
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
				dataIndex : 'stateName',
				width : 22,
				renderer : function(value, metaData, record) {
					switch (value) {
					case 'IN_PROCESS':
						metaData.css = 'processInProsecc';
						break;
					case 'RESOLVED':
						metaData.css = 'processAccepted';
						break;
					case 'REJECTED':
						metaData.css = 'processRejected';
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
				header : 'Статус',
				dataIndex : 'stateName',
				filter : true,
				renderer : function(value, metaData, record) {
					switch (value) {
					case 'NEW':
						value = 'Нова';
						break;
					case 'IN_PROCESS':
						value = 'В роботі';
						break;
					case 'RESOLVED':
						value = 'Виконана';
						break;
					case 'REJECTED':
						value = 'Відхилена';
						break;
					}
					return value
				}
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
			} ]
		}), me.callParent(arguments);
		me.addEvents('takeIssue');
	}
});