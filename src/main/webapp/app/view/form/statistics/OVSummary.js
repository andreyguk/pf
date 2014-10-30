Ext.define('pf.view.form.statistics.OVSummary', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ovSummary',
	//layout : 'fit',
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
							itemId : 'runOVSummary',
							cls : 'btnSave',
							iconCls : 'save',
							margin : '18 0 10 10'
						} ]
					}, {
						xtype : 'grid',
						store : Ext.create('pf.store.statistics.OVSummary'),
						selType : 'rowmodel',
						anchor : '50%',
						itemId : 'gridOVSummary',
						columnLines : true,
						plugins : [ {
							ptype : 'exportToExcel',
						    reportName : 'Кількість створених звітів у розрізі статусів'
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
		text : 'Статус',
		dataIndex : 'state',
		flex : 3
	}, {
		text : 'Кількість',
		dataIndex : 'qty',
		flex : 1
	} ];
}

});