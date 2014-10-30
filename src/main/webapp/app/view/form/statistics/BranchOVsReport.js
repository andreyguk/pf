Ext.define('pf.view.form.statistics.BranchOVsReport', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.branchOVsReport',
	// layout : 'fit',
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			items : [ {
				xtype : 'form',
				bodyPadding : 10,
				autoScroll : true,
				frame : false,
				buttonAlign : 'center',
				items : [ {
					xtype : 'fieldset',
					title : loc.lblReportFilters,
					defaults : {
						anchor : '100%',
						labelAlign : 'top'
					},
					items : [ {
						xtype : 'container',
						anchor : '50%',
						layout : {
							type : 'hbox'
						},
						defaults : {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							margin : '0 0 10 10'
						},
						items : [ {
							xtype : 'datefield',
							fieldLabel : 'Дата створення анкети з',
							name : 'blankCreateDateFrom',
							format : 'd.m.Y',
							itemId : 'blankCreateDateFromId',
							value : new Date(),
							flex : 1
						}, {
							xtype : 'datefield',
							fieldLabel : 'Дата створення анкети по',
							name : 'blankCreateDateTo',
							itemId : 'blankCreateDateToId',
							format : 'd.m.Y',
							value : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
							flex : 1
						}, {
							xtype : 'button',
							text : loc.btnRunReport,
							itemId : 'runBranchOVsReport',
							cls : 'btnSave',
							iconCls : 'save',
							margin : '18 0 10 10'
						} ]
					}, {
						xtype : 'grid',
						store : Ext.create('pf.store.statistics.BranchOVsReport'),
						selType : 'rowmodel',
						anchor : '70%',
						itemId : 'gridBranchOVsReport',
						columnLines : true,
						plugins : [ {
							ptype : 'exportToExcel',
							reportName : 'Кількість створених звітів у розрізі статусів по представництвах'
						} ],
						columns : me.buildColumns()
					} ]
				} ]
			} ]
		});

		me.callParent(arguments);
	},

	buildColumns : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			text : 'Організація',
			dataIndex : 'org',
			flex : 3
		}, {
			text : 'Усього',
			dataIndex : 'allqty',
			flex : 1
		}, {
			text : 'Нові',
			dataIndex : 'news',
			flex : 1
		}, {
			text : 'В роботі',
			dataIndex : 'inproc',
			flex : 1
		}, {
			text : 'Завершені',
			dataIndex : 'finish',
			flex : 1
		}, {
			text : 'На синхронізації',
			dataIndex : 'addnum',
			flex : 1
		}, {
			text : 'Синхронізовані',
			dataIndex : 'numadded',
			flex : 1
		}, {
			text : 'Очікують видачі',
			dataIndex : 'ready',
			flex : 1
		}, {
			text : 'Видані',
			dataIndex : 'handed',
			flex : 1
		}, {
			text : 'Видалені',
			dataIndex : 'deleted',
			flex : 1
		} ];
	}

});