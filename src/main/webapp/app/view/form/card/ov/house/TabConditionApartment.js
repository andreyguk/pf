Ext.define('pf.view.form.card.ov.house.TabConditionApartment', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.house.tabConditionApartment',
	requires : [ 'Ext.selection.CellModel' ],
	initComponent : function() {
		var me = this;
		var storeOV2RoomDescription = Ext.create('pf.store.OV2RoomDescription');
		storeOV2RoomDescription.filter('objectValuation', me.ovID);

		var storeOV2AddDescription = Ext.create('pf.store.OV2AddDescription');
		storeOV2AddDescription.filter('objectValuation', me.ovID);

		var storeOV2Pictures = Ext.create('pf.store.OV2Pictures');
		storeOV2Pictures.filter('ovId', me.ovID);
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '80%',
				title : 'Стан і оснащення (будинку)',
				items : [ {
					xtype : 'container',
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
						xtype : 'label',
						html : "<span style='color:red;'>Якщо кімнат більше ніж три, то заповнюється інформація тільки для трьох кімнат, які загалом та в цілому характеризують оздоблення всього будинку<span/>"
					} ]
				}, {
					xtype : 'grid',
					store : storeOV2RoomDescription,
					selType : 'rowmodel',
					anchor : '80%',
					columnLines : true,
					itemId : 'gridOV2RoomDescription',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addOV2RoomDescription'
					}, '->', {
						html : '<b>Опис приміщень</b>'
					} ],
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeOV2RoomDescription,
						displayInfo : true
					} ],
					columns : me.buildColumns()

				}, {
					xtype : 'tbspacer',
					height : 20
				}, {
					xtype : 'grid',
					store : storeOV2AddDescription,
					selType : 'rowmodel',
					anchor : '80%',
					columnLines : true,
					itemId : 'gridOV2AddDescription',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addOV2AddDescription'
					}, '->', {
						html : '<b>Інженерне обладнання</b>'
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
				}, {
					xtype : 'container',
					anchor : '82%',
					layout : {
						type : 'hbox',
						defaultMargins : {
							top : 10,
							right : 25,
							bottom : 10,
							left : 0
						}
					},
					items : [ {
						xtype : 'combobox',
						flex : 1,
						fieldLabel : 'Загальний стан приміщень',
						store : Ext.create('pf.store.common.GeneralRoomCondition'),
						queryMode : 'remote',
						name : 'generalRoomCondition',
						pageSize : 10,
						minChars : 3,
						editable : false,
						displayField : 'name',
						valueField : 'id',
						labelAlign : 'top',
						msgTarget : 'side',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false
					}, {
						xtype : 'combobox',
						flex : 1,
						fieldLabel : 'Тип опалення',
						store : Ext.create('pf.store.common.HeatingType'),
						name : 'heatingType',
						queryMode : 'remote',
						pageSize : 10,
						minChars : 3,
						editable : false,
						displayField : 'name',
						valueField : 'id',
						labelAlign : 'top',
						msgTarget : 'side',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false
					} ]
				}, {
					xtype : 'container',
					anchor : '82%',
					layout : {
						type : 'hbox',
						defaultMargins : {
							top : 10,
							right : 25,
							bottom : 10,
							left : 0
						}
					},
					items : [ {
						xtype : 'textareafield',
						labelAlign : 'top',
						name : 'otherAutomaticSystems',
						fieldLabel : 'Інші автоматичні системи (охоронна, протипожежна, та ін.)',
						flex : 2
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
	},
	buildColumns : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'roomTypeID',
			flex : 1,
			dataIndex : 'roomType',
			hidden : true,
			hideable : false
		}, {
			text : 'Тип приміщення',
			dataIndex : 'roomTypeName',
			flex : 1
		}, {
			text : 'floorTypeID',
			flex : 1,
			dataIndex : 'floorType',
			hidden : true,
			hideable : false
		}, {
			text : 'Підлога',
			dataIndex : 'floorTypeName',
			flex : 1
		}, {
			text : 'wallsTypeID',
			flex : 1,
			dataIndex : 'wallsType',
			hidden : true,
			hideable : false
		}, {
			text : 'Стіни',
			dataIndex : 'wallsTypeName',
			flex : 1
		}, {
			text : 'ceilingTypeID',
			flex : 1,
			dataIndex : 'ceilingType',
			hidden : true,
			hideable : false
		}, {
			text : 'Стеля',
			dataIndex : 'ceilingTypeName',
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