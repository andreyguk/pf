Ext.define('pf.view.form.card.ov.land.TabInfrastructure', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.land.tabInfrastructure',
	requires : [ 'Ext.selection.CellModel' ],
	initComponent : function() {
		var me = this;
		var storeOV2AddDescription = Ext.create('pf.store.OV2AddDescriptionLand');
		storeOV2AddDescription.filter('objectValuation', me.ovID);
		var storeOV2Pictures = Ext.create('pf.store.OV2Pictures');
		storeOV2Pictures.filter('ovId', me.ovID);
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
						fieldLabel : 'До  адміністративного/<br/>громадського центру',
						name : 'distanceFromRegCentre'
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
						fieldLabel : 'До автовокзалу',
						name : 'distanceFromBusStation'
					}, {
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
					store : storeOV2AddDescription,
					selType : 'rowmodel',
					anchor : '60%',
					columnLines : true,
					itemId : 'gridOV2AddDescription',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addOV2AddDescription'
					}, '->', {
						html : '<b>Будівлі, споруди, поліпшення</b>'
					} ],
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeOV2AddDescription,
						displayInfo : true
					} ],
					columns : me.getColumnsOV2AddDescription()

				}, {
					xtype : 'tbspacer',
					height : 20
				}, {
					xtype : 'grid',
					itemId : 'gridOV2PicturesId',
					plugins : [ Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit : 1
					}) ],
					selModel : {
						selType : 'cellmodel'
					},
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addPrimaryDocs',
						handler : function() {
							var extraParams = {
								title : 'Картка завантаження файлу(ів)',
								fieldLabel : 'Обрані файли',
								buttonText : 'Виберіть файл(и)',
								btnUpload : 'Завантажити',
								name : 'OVPictures',
								btnCancel : 'Вихід',
								submitParams : {
									url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
									waitMsg : 'Збереження',
									params : {
										action : 'uploadOVPictures',
										ovId : me.ovID
									}
								},
								callbackFnParams : {
									scope : me,
									callbackFn : me.loadUploadedFiles
								}

							}
							Ext.widget('uploadmultifilewin', extraParams)
						}
					}, '->', {
						text : 'Фотофіксація'
					} ],
					store : storeOV2Pictures,
					selType : 'rowmodel',
					anchor : '80%',
					columnLines : true,
					columns : [ {
						xtype : 'rownumberer'
					}, {
						header : 'id',
						dataIndex : 'id',
						hidden : true,
						hideable : false
					}, {
						text : 'Назва файлу',
						flex : 1,
						dataIndex : 'fileName',
						renderer : function(value, metaData, record, row, col, store, gridView) {
							value = '<a href="pf.proxy.manager.FileManager.cls?objType=OV_PICTURES&attId=' + record.get('id') + '">' + record.get('fileName') + '</b>' + '</a>'
							return value
						}
					}, {
						text : 'Опис файлу',
						flex : 1,
						dataIndex : 'description',
						editor : {
							allowBlank : true
						}
					}, {
						xtype : 'actioncolumn',
						items : [ {
							iconCls : 'delete',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								me.fireEvent('deleteOVPictures', grid, rec);
							},
							scope : this
						} ],
						width : '5px',
						align : 'center'
					} ]
				} ]
			} ]
		});
		me.callParent(arguments);
	},
	loadUploadedFiles : function(options) {
		Ext.getStore('storeOV2PicturesId').reload();
	},
	getColumnsOV2AddDescription : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'addDescriptionID',
			flex : 1,
			dataIndex : 'addDescriptionID',
			hidden : true,
			hideable : false
		}, {
			text : 'Найменування',
			dataIndex : 'addDescriptionName',
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