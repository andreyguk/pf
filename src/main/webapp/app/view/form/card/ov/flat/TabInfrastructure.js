Ext.define('pf.view.form.card.ov.flat.TabInfrastructure', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.flat.tabInfrastructure',
	initComponent : function() {
		var me = this;
		var storeOV2Infrastructure = Ext.create('pf.store.OV2Infrastructure');
		storeOV2Infrastructure.filter('objectValuation', me.ovID);
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '70%',
				title : 'Інфраструктура (наявність і відстань в км)',
				items : [ {
					xtype : 'container',
					anchor : '100%',
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						emptyText : '0.00',
						vtype : 'isIntFloat'
					},
					layout : {
						type : 'hbox',
						defaultMargins : {
							top : 0,
							right : 25,
							bottom : 10,
							left : 0
						}
					},
					items : [ {
						fieldLabel : 'До центру <br/> населеного пункту',
						name : 'distanceFromCentre'
					}, {
						fieldLabel : 'До найближчої <br/> автомагістралі',
						name : 'distanceFromHighway'
					}, {
						fieldLabel : 'До зупинки <br/> гр. транспорту',
						name : 'distanceFromBusStop'
					}, {
						fieldLabel : '<br/>До водойми',
						name : 'distanceFromRiver'
					} ]
				}, {
					xtype : 'container',
					anchor : '100%',
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						vtype : 'isIntFloat',
						emptyText : '0.00'
					},
					layout : {
						type : 'hbox',
						defaultMargins : {
							top : 0,
							right : 25,
							bottom : 10,
							left : 0
						}
					},
					items : [ {
						fieldLabel : 'До з/д вокзалу',
						name : 'distanceFromRailway'
					}, {
						fieldLabel : 'До аеропорту',
						name : 'distanceFromAirport'
					}, {
						fieldLabel : 'До р/м порту',
						name : 'distanceFromSeaport'
					} ]

				}, {
					xtype : 'grid',
					store : storeOV2Infrastructure,
					selType : 'rowmodel',
					anchor : '46.5%',
					columnLines : true,
					itemId : 'gridOV2Infrastructure',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addOV2Infrastructure'
					}, '->', {
						html : '<b>Наявність інфраструктури</b>'
					} ],
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeOV2Infrastructure,
						displayInfo : true
					} ],
					columns : me.getOV2Infrastructure()

				} ]
			} ]
		});
		me.callParent(arguments);
	},
	getOV2Infrastructure : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'infrastructureID',
			flex : 1,
			dataIndex : 'infrastructureID',
			hidden : true,
			hideable : false
		}, {
			text : 'Найменування',
			dataIndex : 'infrastructureName',
			flex : 1
		}, {
			xtype : 'actioncolumn',
			items : [ {
				iconCls : 'delete',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex), store = grid.getStore();
					store.remove(rec);
				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		} ];
	}
})