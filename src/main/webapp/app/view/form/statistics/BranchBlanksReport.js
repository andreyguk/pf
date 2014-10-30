Ext.define('pf.view.form.statistics.BranchBlanksReport', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.branchBlanksReport',
	layout : 'fit',
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
							itemId : 'runBranchBlanksReport',
							cls : 'btnSave',
							iconCls : 'save',
							margin : '18 0 10 10'
						} ]
					}, {
						xtype : 'grid',
						store : Ext.create('pf.store.statistics.BranchBlanksReport'),
						selType : 'rowmodel',
						anchor : '60%',
						itemId : 'gridBranchBlanksReport',
						columnLines : true,
						plugins : [ {
							ptype : 'exportToExcel',
							reportName : 'Кількість створених анкет у розрізі статусів по представництвах'
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
			text : 'Неоплачені',
			dataIndex : 'unpaid',
			flex : 1
		}, {
			text : 'Оплачені',
			dataIndex : 'paid',
			flex : 1
		}, {
			text : 'Проведені',
			dataIndex : 'accounted',
			flex : 1
		}, {
			text : 'Видалені',
			dataIndex : 'deleted',
			flex : 1
		} ];
	}

});