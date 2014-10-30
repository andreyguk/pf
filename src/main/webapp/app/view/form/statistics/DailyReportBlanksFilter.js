Ext.define('pf.view.form.statistics.DailyReportBlanksFilter', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.dailyReportBlanksFilter',
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
							fieldLabel : 'Дата створення анкети з',
							name : 'blankCreateDateFrom',
							format : 'd.m.Y',
							itemId : 'blankCreateDateFromId',
							flex : 1
						}, {
							xtype : 'datefield',
							fieldLabel : 'Дата створення анкети по',
							name : 'blankCreateDateTo',
							format : 'd.m.Y',
							itemId : 'blankCreateDateToId',
							flex : 1
						} ]
					}, {
						xtype : 'combobox',			
						fieldLabel : 'Статус анкети',
						store : Ext.create('pf.store.common.BlankState'),
						queryMode : 'local',
						margin : '0 25 10 10',
						editable : false,
						displayField : 'name',
						valueField : 'id',
						name : 'blankState',
						itemId : 'blankStateId',
						plugins : [ {
							ptype : 'cleartrigger'
						} ],
						anchor : '40%'
					}, {
						xtype : 'combobox',			
						fieldLabel : loc.lblObjectType,
						store : Ext.create('pf.store.common.ObjectTypes'),
						itemId : 'objectTypesId',
						queryMode : 'local',
						margin : '0 25 10 10',
						editable : false,
						displayField : 'name',
						valueField : 'id',
						name : 'objectType',
						plugins : [ {
							ptype : 'cleartrigger'
						} ],
						anchor : '40%'
					}, {
						xtype : 'combobox',
						fieldLabel : loc.lblObjectSubType,
						store : Ext.create('pf.store.common.ObjectSubTypes'),
						itemId : 'objectSubTypesId',
						queryMode : 'local',
						editable : false,
						margin : '0 25 10 10',
						displayField : 'name',
						valueField : 'id',
						name : 'objectSubType',
						plugins : [ {
							ptype : 'cleartrigger'
						} ],
						lastQuery : '',
						anchor : '40%'
					}, {
						xtype : 'combobox',			
						fieldLabel : 'Створено у організації',
						store : Ext.create('pf.store.common.Organization'),
						queryMode : 'local',
						margin : '0 25 10 10',
						editable : false,
						//hidden : !(pf.LoggedInUser.inRole('SUPERVISOR')),
						value : pf.LoggedInUser.get('workplace'),
						displayField : 'name',
						valueField : 'id',
						name : 'organization',
						itemId : 'organizationId',
						plugins : [ {
							ptype : 'cleartrigger'
						} ],
						anchor : '40%'
					} ]
				} ]
			} ]
		});

		me.callParent(arguments);
	}

});