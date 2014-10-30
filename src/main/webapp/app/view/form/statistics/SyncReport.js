Ext.define('pf.view.form.statistics.SyncReport', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.syncReport',
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
				buttons : [ {
					xtype : 'button',
					text : loc.btnRunReport,
					itemId : 'runReport',
					cls : 'btnSave',
					iconCls : 'save'
				} ],
				items : [ {
					xtype : 'fieldset',
					title : loc.lblReportFilters,
					defaults : {
						anchor : '100%',
						labelAlign : 'top'
					},
					items : [ {
						xtype : 'container',
						anchor : '40%',
						layout : {
							type : 'hbox'
						},
						defaults : {
							xtype : 'textfield',
							labelAlign : 'top',
							msgTarget : 'side',
							margin : '0 25 10 10'
						},
						items : [ {
							xtype : 'datefield',
							fieldLabel : 'Дата синхронізації з',
							name : 'syncDateFrom',
							format : 'd.m.Y',
							itemId : 'syncDateFromId',
							value : new Date(),
							flex : 1
						}, {
							xtype : 'datefield',
							fieldLabel : 'Дата синхронізації по',
							name : 'syncDateTo',
							itemId : 'syncDateToId',
							format : 'd.m.Y',
							value : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
							flex : 1
						} ]
					}, {
						xtype : 'combobox',			
						fieldLabel : 'Синхронізатор',
						store : Ext.create('pf.store.common.Synchronizer'),
						queryMode : 'local',
						margin : '0 25 10 10',
						editable : false,
						displayField : 'shortFio',
						valueField : 'id',
						name : 'synchronizer',
						itemId : 'synchronizerId',
						anchor : '40%'
					} ]
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});