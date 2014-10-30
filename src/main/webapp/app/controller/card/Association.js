Ext.define('pf.controller.card.Association', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.card.ov.flat.TabJuridicalInfo', 'pf.view.form.card.ov.flat.OVFlatCard', 'pf.view.form.card.ov.land.OVLandCard', 'pf.view.form.card.ov.OVAbstract', 'pf.view.form.cardAssociation.OV2Analogue', 'pf.view.form.list.AnalogueList', 'pf.view.form.common.user.UserCard', 'pf.view.form.common.organization.OrganizationCard', 'pf.view.form.card.ov.house.OVHouseCard' ],
	refs : [ {
		ref : 'gridOV2ConstitutiveDocs',
		selector : '[xtype=ovFlatCard] grid#gridOV2ConstitutiveDocs'
	}, {
		ref : 'lnkTotalCorr',
		selector : '[xtype=OV2Analogue] textfield#totalCorrId'
	}, {
		ref : 'lnkCostCorrected',
		selector : '[xtype=OV2Analogue] textfield#costCorrectedId'
	}, {
		ref : 'lnkCostMetre',
		selector : '[xtype=OV2Analogue] textfield#costMetreId'
	}, {
		ref : 'gridAnalogueList',
		selector : '[xtype=analogueList] grid#gridAnalogueListId'
	}, {
		ref : 'gridAnalogue2Corr',
		selector : '[xtype=OV2Analogue] grid#gridAnalogue2Corr'
	}, {
		ref : 'btnAddOV2Analogue',
		selector : '[xtype=ovFlatCard] button#addOVFlat2Analogue'
	}, {
		ref : 'locationTerritoryFlat',
		selector : '[xtype=ovFlatCard] combobox[name=locationTerritory]'
	}, {
		ref : 'locationTerritoryLand',
		selector : '[xtype=ovLandCard] combobox[name=locationTerritory]'
	}, {
		ref : 'locationTerritoryHouse',
		selector : '[xtype=ovHouseCard] combobox[name=locationTerritory]'
	}, {
		ref : 'analogueList',
		selector : '[xtype=analogueList]'
	} ],
	init : function() {
		this.listen({
			component : {
				'[xtype=ovFlatCard] button#addOV2ConstitutiveDocs' : {
					click : this.newOV2ConstitutiveDocs
				},
				'[xtype=ovFlatCard] button#addOV2RoomDescription' : {
					click : this.newOV2RoomDescription
				},
				'[xtype=ovFlatCard] button#addOV2AddDescription' : {
					click : this.newOV2AddDescription
				},
				'[xtype=ovFlatCard] button#addOV2Infrastructure' : {
					click : this.newOV2Infrastructure
				},
				'[xtype=ovFlatCard] button#addBlank2ValParts' : {
					click : this.newBlank2ValParts
				},
				'[xtype=ovFlatCard] button#addOVFlat2Analogue' : {
					click : this.addOV2Analogue
				},
				'[xtype=ovFlatCard] grid#gridOV2Analogue' : {
					itemdblclick : this.editOV2Analogue
				},
				'[xtype=ovLandCard] button#addOV2ConstitutiveDocs' : {
					click : this.newOV2ConstitutiveDocs
				},
				'[xtype=ovLandCard] button#addOV2AddDescription' : {
					click : this.newOV2AddDescriptionLand
				},
				'[xtype=ovLandCard] button#addBlank2ValParts' : {
					click : this.newBlank2ValParts
				},
				'[xtype=ovLandCard] button#addOVLand2Analogue' : {
					click : this.addOV2Analogue
				},
				'[xtype=ovLandCard] grid#gridOV2Analogue' : {
					itemdblclick : this.editOV2Analogue
				},
				'[xtype=ovHouseCard] button#addOVHouse2ConstitutiveDocs' : {
					click : this.newOVHouse2ConstitutiveDocs
				},
				'[xtype=ovHouseCard] button#addOV2RoomDescription' : {
					click : this.newOV2RoomDescription
				},
				'[xtype=ovHouseCard] button#addOV2AddDescription' : {
					click : this.newOV2AddDescription
				},
				'[xtype=ovHouseCard] button#addOV2Infrastructure' : {
					click : this.newOV2Infrastructure
				},
				'[xtype=ovHouseCard] button#addOV2ExtBuildings' : {
					click : this.newOV2ExtBuildings
				},
				'[xtype=ovHouseCard] button#addBlank2ValParts' : {
					click : this.newBlank2ValParts
				},
				'[xtype=ovHouseCard] button#addHousePlot2Analogue' : {
					click : this.addOV2Analogue
				},
				'[xtype=ovHouseCard] grid#gridHousePlot2Analogue' : {
					itemdblclick : this.editOV2Analogue
				},
				'[xtype=ovHouseCard] button#addOVHouse2Analogue' : {
					click : this.addOV2Analogue
				},
				'[xtype=ovHouseCard] grid#gridOV2Analogue' : {
					itemdblclick : this.editOV2Analogue
				},
				'[xtype=OV2Analogue] button#save' : {
					click : this.saveOV2Analogue
				},
				'[xtype=OV2Analogue]' : {
					onDeleteAnalogue2Corr : this.calcCorrectedValue
				},
				'[xtype=OV2Analogue] button#update' : {
					click : this.saveOV2Analogue
				},
				'[xtype=OV2Analogue] button#addAnalogue2Corr' : {
					click : this.addCorr
				},
				/*
				 * '[xtype=analogueList] grid#gridAnalogueListId' : {
				 * itemdblclick : this.selectAnalogue },
				 */
				'[xtype=analogueList] button#newAnalogue' : {
					click : this.newOV2Analogue
				},
				'[xtype=analogueList] button#selectedRecors' : {
					click : this.selectAnalogue
				},
				'[xtype=userCard] button#addUserDocs' : {
					click : this.addDocs
				},
				'[xtype=userCard]' : {
					deleteUserDocs : this.deleteDocs,
					editUserDocs : this.onEditDocs
				},
				'[xtype=userCard] grid' : {
					itemdblclick : this.onEditDocs
				},
				'[xtype=organizationCard] button#addOrganizationDocs' : {
					click : this.addDocs
				},
				'[xtype=organizationCard]' : {
					deleteOrgDocs : this.deleteDocs,
					editOrgDocs : this.onEditDocs,
					itemdblclick : this.onEditDocs
				},
				'[xtype=organizationCard] grid' : {
					itemdblclick : this.onEditDocs
				}

			}
		});
	},
	/**
	 * OV2ConstitutiveDocs
	 */
	newOV2ConstitutiveDocs : function(button) {
		var me = this;
		var funcTypeId = button.up('form').getRecord().get('objFuncType');
		var storeDocs = Ext.create('pf.store.common.ConstitutiveDocType');
		storeDocs.filter('funcTypeId',funcTypeId)
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Дані правовстановлюючих документів',
			height : Ext.getBody().getViewSize().height * 0.3,
			width : Ext.getBody().getViewSize().width * 0.4,
			layout : 'fit',
			items : [ {
				xtype : 'form',
				bodyPadding : 10,
				buttons : [ {
					xtype : 'button',
					text : loc.btnOK,
					formBind : true,
					cls : 'btnSave',
					handler : this.saveOV2ConstitutiveDocs
				}, {
					xtype : 'button',
					text : loc.btnExit,
					cls : 'btnExit',
					iconCls : 'exit',
					handler : function() {
						this.up('.window').close();
					}
				} ],
				items : [ {
					xtype : 'combobox',
					itemId : 'docTypeId',
					anchor : '50%',
					labelAlign : 'top',
					fieldLabel : 'Тип правовстанавлюючого документа',
					//store : Ext.create('pf.store.common.ConstitutiveDocType'),
					store : storeDocs,
					name : 'docType',
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false
				}, {
					xtype : 'textareafield',
					grow : true,
					labelAlign : 'top',
					cols : 114,
					name : 'docDescription',
					fieldLabel : 'Дані правовстановлюючого документа',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false
				} ]
			} ]
		});
		win.show();
	},
	saveOV2ConstitutiveDocs : function(btn) {
		var values = btn.up('window').down('form').getValues(), store = Ext.getStore('storeOV2ConstitutiveDocsId');
		var record = Ext.create('pf.model.OV2ConstitutiveDocs', {
			docType : values.docType,
			docTypeName : btn.up('window').down('form').getComponent('docTypeId').getRawValue(),
			docDescription : values.docDescription
		});
		store.add(record);
		btn.up('.window').close();

	},

	newOVHouse2ConstitutiveDocs : function() {
		var me = this, docStore = Ext.create('pf.store.common.ConstitutiveDocType');
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Дані правовстановлюючих документів',
			height : Ext.getBody().getViewSize().height * 0.33,
			width : Ext.getBody().getViewSize().width * 0.4,
			layout : 'fit',
			items : [ {
				xtype : 'form',
				bodyPadding : 10,
				buttons : [ {
					xtype : 'button',
					text : loc.btnOK,
					formBind : true,
					cls : 'btnSave',
					handler : this.saveOVHouse2ConstitutiveDocs
				}, {
					xtype : 'button',
					text : loc.btnExit,
					cls : 'btnExit',
					iconCls : 'exit',
					handler : function() {
						this.up('.window').close();
					}
				} ],
				items : [ {
					xtype : 'combobox',
					itemId : 'docBelongingId',
					anchor : '50%',
					labelAlign : 'top',
					fieldLabel : 'Належність документа',
					store : Ext.create('pf.store.common.DocBelonging'),
					name : 'docBelonging',
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					listeners : {
						change : function (combo) {
							var docBelongingId = combo.getValue()+1;
							docStore.filter('funcTypeId',docBelongingId)
						}
					}
				}, {
					xtype : 'combobox',
					itemId : 'docTypeId',
					anchor : '50%',
					labelAlign : 'top',
					fieldLabel : 'Тип правовстанавлюючого документа',
					//store : Ext.create('pf.store.common.ConstitutiveDocType'),
					store : docStore,
					name : 'docType',
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false
				}, {
					xtype : 'textareafield',
					grow : true,
					labelAlign : 'top',
					cols : 114,
					name : 'docDescription',
					fieldLabel : 'Дані правовстановлюючого документа',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false
				} ]
			} ]
		});
		win.show();
	},
	saveOVHouse2ConstitutiveDocs : function(btn) {
		var values = btn.up('window').down('form').getValues(), store = Ext.getStore('storeOVHouse2ConstitutiveDocsId');
		var record = Ext.create('pf.model.OVHouse2ConstitutiveDocs', {
			docType : values.docType,
			docTypeName : btn.up('window').down('form').getComponent('docTypeId').getRawValue(),
			docBelonging : values.docBelonging,
			docBelongingName : btn.up('window').down('form').getComponent('docBelongingId').getRawValue(),
			docDescription : values.docDescription
		});
		store.add(record);
		btn.up('.window').close();

	},
	// end OV2ConstitutiveDocs
	newOV2RoomDescription : function() {
		var me = this;
		var win = Ext.create('Ext.window.Window', {
			plain : true,
			modal : true,
			layout : 'fit',
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			autoScroll : true,
			titleCollapse : false,
			title : 'Опис приміщень',
			height : Ext.getBody().getViewSize().height * 0.4,
			width : Ext.getBody().getViewSize().width * 0.2,

			items : [ {
				xtype : 'form',
				bodyPadding : 10,
				anchor : '100%',
				dockedItems : [ {
					xtype : 'toolbar',
					dock : 'bottom',
					items : [ '->', {
						xtype : 'button',
						text : loc.btnOK,
						formBind : true,
						cls : 'btnSave',
						handler : this.saveOV2RoomDescription
					}, {
						xtype : 'button',
						text : loc.btnExit,
						cls : 'btnExit',
						iconCls : 'exit',
						handler : function() {
							this.up('.window').close();
						}
					} ]
				} ],
				items : [ {
					xtype : 'container',
					defaults : {
						xtype : 'combobox',
						anchor : '100%',
						labelAlign : 'top',
						msgTarget : 'side',
						queryMode : 'local',
						minChars : 3,
						editable : false,
						displayField : 'name',
						valueField : 'id',
						allowBlank : false,
						afterLabelTextTpl : pf.utils.Validation.required
					},
					layout : {
						type : 'anchor',
						defaultMargins : {
							top : 0,
							right : 25,
							bottom : 10,
							left : 0
						}
					},
					items : [ {
						fieldLabel : 'Тип приміщення',
						store : Ext.create('pf.store.common.RoomType'),
						name : 'roomType',
						itemId : 'roomTypeId'
					}, {
						fieldLabel : 'Підлога',
						store : Ext.create('pf.store.common.FloorType'),
						name : 'floorType',
						itemId : 'floorTypeId'
					}, {
						fieldLabel : 'Стіни',
						store : Ext.create('pf.store.common.WallsType'),
						name : 'wallsType',
						itemId : 'wallsTypeId'
					}, {
						fieldLabel : 'Стеля',
						store : Ext.create('pf.store.common.CeilingType'),
						name : 'ceilingType',
						itemId : 'ceilingTypeId'
					} ]
				} ]
			} ]
		});
		win.show();
	},
	saveOV2RoomDescription : function(btn) {
		var values = btn.up('window').down('form').getValues(), store = Ext.getStore('storeOV2RoomDescriptionId');
		var record = Ext.create('pf.model.OV2RoomDescription', {
			roomType : values.roomType,
			roomTypeName : btn.up('window').down('form').down('container').getComponent('roomTypeId').getRawValue(),
			floorType : values.floorType,
			floorTypeName : btn.up('window').down('form').down('container').getComponent('floorTypeId').getRawValue(),
			wallsType : values.wallsType,
			wallsTypeName : btn.up('window').down('form').down('container').getComponent('wallsTypeId').getRawValue(),
			ceilingType : values.ceilingType,
			ceilingTypeName : btn.up('window').down('form').down('container').getComponent('ceilingTypeId').getRawValue()
		});
		store.add(record);
		btn.up('.window').close();
	},
	selectAnalogue : function(btn) {
		var me = this;
		var storeOV2Analogue = Ext.getStore('storeOV2AnalogueId');
		var gridAnalogueList = me.getGridAnalogueList(), selections = gridAnalogueList.getPlugin('selectedBar').getSelections();
		if (btn.up('.window').ovName == "pf.view.form.card.ov.house.TabLand") {
			storeOV2Analogue = Ext.getStore('storeHousePlot2AnalogueId');
		}
		var items = storeOV2Analogue.data.items
		if ((selections.length > 4) || (items.length > 4) || ((selections.length + items.length) > 4)) {
			me.showError("Не можливо обрати більше 4-х аналогів!");
			return;
		}
		// add new records to the store
		for ( var i = 0; i <= selections.length - 1; i++) {
			if (!storeOV2Analogue.findRecord('id', selections[i].get('id'))) {
				storeOV2Analogue.add(selections[i]);
			}
		}
		btn.up('.window').close();

	},
	addOV2Analogue : function(btn) {
		var ovName, store = Ext.getStore('storeOV2AnalogueId');
		var objTerritory = btn.up('form').down('[name=locationTerritory]').getValue();
		switch (btn.itemId) {
		case 'addHousePlot2Analogue':
			ovName = 'pf.view.form.card.ov.house.TabLand';
			store = Ext.getStore('storeHousePlot2AnalogueId');
			break;
		case 'addOVFlat2Analogue':
			ovName = 'pf.view.form.card.ov.flat.TabAdditionalInfo';
			break;
		case 'addOVLand2Analogue':
			ovName = 'pf.view.form.card.ov.land.TabAdditionalInfo';
			break;
		case 'addOVHouse2Analogue':
			ovName = 'pf.view.form.card.ov.house.TabAdditionalInfo';
			break;
		}
		if (store.count() >= 4) {
			this.showError('Неможливо додати більше 4-х аналогів!')
			return;
		}
		extraParam = {
			objTerritory : objTerritory,
			ovName : ovName
		}
		var win = Ext.widget('analogueList', extraParam);
		win.show();
	},
	newOV2Analogue : function(btn) {
		var locationTerritory, ovFuncType;

		if (btn.up('window').ovName == 'pf.view.form.card.ov.land.TabAdditionalInfo') {
			locationTerritory = this.getLocationTerritoryLand().getValue();
			ovFuncType = 'LAND';
		} else if (btn.up('window').ovName == 'pf.view.form.card.ov.flat.TabAdditionalInfo') {
			locationTerritory = this.getLocationTerritoryFlat().getValue();
			ovFuncType = 'FLAT';
		} else if (btn.up('window').ovName == 'pf.view.form.card.ov.house.TabLand') {
			locationTerritory = this.getLocationTerritoryHouse().getValue();
			ovFuncType = 'HOUSEPLOT';
		} else if (btn.up('window').ovName == 'pf.view.form.card.ov.house.TabAdditionalInfo') {
			locationTerritory = this.getLocationTerritoryHouse().getValue();
			ovFuncType = 'HOUSE';
		}
		var record = Ext.create('pf.model.common.Analogue');
		extraParams = {
			'action' : 'add',
			locationTerritory : locationTerritory,
			ovFuncType : ovFuncType
		};
		var win = Ext.widget('OV2Analogue', extraParams);
		win.down('form').loadRecord(record);
		win.show();
	},
	editOV2Analogue : function(grid, record) {
		var ovFuncType;
		
		if (grid.up('form').up().up().$className == 'pf.view.form.card.ov.land.OVLandCard') {
			locationTerritory = this.getLocationTerritoryLand().getValue();
			ovFuncType = 'LAND';
		} else if (grid.up('form').up().up().$className == 'pf.view.form.card.ov.flat.OVFlatCard') {
			locationTerritory = this.getLocationTerritoryFlat().getValue();
			ovFuncType = 'FLAT';
		} else if (grid.up('form').up().up().$className == 'pf.view.form.card.ov.house.OVHouseCard') {
			locationTerritory = this.getLocationTerritoryHouse().getValue();
			ovFuncType = 'HOUSE';
			if (grid.up().itemId == 'gridHousePlot2Analogue') {
				ovFuncType = 'HOUSEPLOT';
			}

		}
		extraParams = {
			'action' : 'edit',
			'analogueId' : record.get('id'),
			ovFuncType : ovFuncType,
			'isScreenExist':record.get('isScreenExist')
		};
		var selection = grid.getSelectionModel().getSelection()[0];
		Ext.create('pf.store.common.Analogue');
		var win = Ext.widget('OV2Analogue', extraParams);
		win.down('form').loadRecord(record);
		win.show();
	},
	saveOV2Analogue : function(button) {
		var me = this, win = button.up('window'), form = win.down('form'), values = form.getValues();
		var ovFunctionType = win.ovFuncType;

		if ((values.isPrivateLand == 1) && (values.plotArea == 0) && (values.plotAreaIsUndefined == 0)) {
			me.showError('Необхідно вказати площу земельної ділянки!')
			return;
		}

		var analogueLoc = form.down('[itemId=locationId]');
		if (analogueLoc.getValue() == analogueLoc.getRawValue()) {
			me.showError('Виберіть населений пункт зі списку!')
			return false;
		}

		if (ovFunctionType == 'LAND') {
			form.down('[name=objFuncType]').setValue('03');
			form.down('[name=roomQty]').setValue(0);
			form.down('[name=floorNum]').setRawValue(0);
			form.down('[name=floorsQty]').setValue(0);
		} else if (ovFunctionType == 'FLAT') {
			form.down('[name=objFuncType]').setValue('02');
		} else if (ovFunctionType == 'HOUSE') {
			form.down('[name=objFuncType]').setValue('04');
			form.down('[name=roomQty]').setValue(0);
			form.down('[name=floorNum]').setRawValue(0);
			form.down('[name=floorsQty]').setValue(0);
		} else if (ovFunctionType == 'HOUSEPLOT') {
			form.down('[name=objFuncType]').setValue('03');
			form.down('[name=roomQty]').setValue(0);
			form.down('[name=floorNum]').setRawValue(0);
			form.down('[name=floorsQty]').setValue(0);
		}
		var shortUrl = 'pf.proxy.manager.Create.cls';
		var params = {
			classname : 'analogue'
		}
		if (button.itemId === 'save') {
			if (form.isValid()) {
				form.submit({
					url : shortUrl,
					params : params,
					waitMsg : 'Збереження',
					success : function(request, options) {
						var result = Ext.decode(options.response.responseText);
						if (result.success) {
							var recordID = result.recordID;
							var values = button.up('form').getValues();
							values['id'] = recordID;
							values['location'] = form.down('[itemId=locationId]').getRawValue();
							values['plotPurposeName'] = form.down('[itemId=plotPurposeId]').getRawValue();
							
							var record = button.up('form').getRecord();
							record.set(values);
							record.set("isScreenExist",1);
							var store = Ext.getStore('storeOV2AnalogueId');
							if (ovFunctionType == 'HOUSEPLOT') {
								store = Ext.getStore('storeHousePlot2AnalogueId');
							}
							store.add(record);
							win.close();
							me.getAnalogueList().close()
						} else {

						}
					},
					failure : function(response, options) {
						var result = Ext.decode(options.response.responseText);
						me.showError(result.message + '_' + result.code + '<br/>' + result.data);
					}
				});
			}

		} else if (button.itemId === 'update') {
			var values = form.getValues();
			values.location = form.down('[name=locationId]').getRawValue();
			if (form.isValid()) {
				form.submit({
					url : shortUrl,
					params : params,
					waitMsg : 'Збереження',
					success : function(request, options) {
						var result = Ext.decode(options.response.responseText);
						if (result.success) {
							var recordID = result.recordID;
							values['id'] = recordID;
							if (ovFunctionType == 'HOUSE') {
								if (!values.plotArea) {
									values['plotArea'] = '';
								}
								if (!values.plotAreaIsUndefined) {
									values['plotAreaIsUndefined'] = 0;
								}
							}
							var storeOV2AnalogueRecord = form.getRecord();
							storeOV2AnalogueRecord.set(values);
							button.up('.window').close()

						} else {

						}
					},
					failure : function(response, options) {
						var result = Ext.decode(options.response.responseText);
						me.showError(result.message + '_' + result.code + '<br/>' + result.data);
					}
				});
			}
		}
	},
	addCorrsToAnalogue : function() {
		var values = this.getGridAnalogue2Corr().getStore().data.items, corrs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				correctionType : values[i].get('correctionType'),
				correctionValue : values[i].get('correctionValue'),
				correctionDescr : values[i].get('correctionDescr')
			}
			corrs.push(obj);
		}
		return corrs
	},

	/**
	 * OV2AddDescription
	 */
	newOV2AddDescription : function() {
		var me = this;
		var storeAdditionalDescription = Ext.create('pf.store.common.AdditionalDescription');
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Додаткові характеристики',
			height : Ext.getBody().getViewSize().height * 0.5,
			width : Ext.getBody().getViewSize().width * 0.3,
			layout : 'anchor',
			items : [ {
				xtype : 'grid',
				itemId : 'gridAdditionalDescription',
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				columnLines : true,
				store : storeAdditionalDescription,
				dockedItems : [ {
					xtype : 'pagingtoolbar',
					store : storeAdditionalDescription,
					dock : 'bottom',
					displayInfo : true
				} ],
				columns : [ {
					xtype : 'rownumberer'
				}, {
					header : 'id',
					dataIndex : 'addDescriptionID',
					flex : 1,
					hidden : true,
					hideable : false
				}, {
					header : "Найменування",
					dataIndex : 'addDescriptionName',
					flex : 1
				} ]
			} ],
			buttons : [ {
				xtype : 'button',
				text : loc.btnOK,
				formBind : true,
				cls : 'btnSave',
				handler : this.saveOV2AddDescription
			}, {
				xtype : 'button',
				text : loc.btnExit,
				cls : 'btnExit',
				iconCls : 'exit',
				handler : function() {
					this.up('.window').close();
				}
			} ]
		});
		win.show();
	},
	saveOV2AddDescription : function(btn) {
		var grid = btn.up('window').getComponent('gridAdditionalDescription'), selections = grid.getSelectionModel().getSelection();
		var storeOV2AddDescriptionId = Ext.getStore('storeOV2AddDescriptionId');
		storeOV2AddDescriptionId.removeAll();
		storeOV2AddDescriptionId.add(selections);
		this.up('.window').close();
	},
	// end OV2AddDescription

	newBlank2ValParts : function() {
		var me = this;
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Дані власників часток майна, що оцінюється',
			height : Ext.getBody().getViewSize().height * 0.3,
			width : Ext.getBody().getViewSize().width * 0.3,
			layout : 'fit',
			items : [ {
				xtype : 'form',
				bodyPadding : 10,
				defaults : {
					xtype : 'textfield',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					labelAlign : 'top'
				},
				buttons : [ {
					xtype : 'button',
					text : loc.btnOK,
					formBind : true,
					cls : 'btnSave',
					handler : this.saveBlank2ValParts
				}, {
					xtype : 'button',
					text : loc.btnExit,
					cls : 'btnExit',
					iconCls : 'exit',
					handler : function() {
						this.up('.window').close();
					}
				} ],
				items : [ {
					fieldLabel : 'П.І.Б. власника',
					name : 'ownerFio',
					anchor : '100%'
				}, {
					fieldLabel : 'Частка, що оцінюється (чисельник)',
					name : 'valuationPartNumer',
					value : 1,
					anchor : '100%',
					vtype : 'isInt',
					msgTarget : 'under'
				}, {
					fieldLabel : 'Частка, що оцінюється (знаменник)',
					name : 'valuationPartDenom',
					value : 1,
					anchor : '100%',
					vtype : 'isInt',
					msgTarget : 'under'
				} ]
			} ]
		});
		win.show();
	},
	saveBlank2ValParts : function(btn) {
		var values = btn.up('window').down('form').getValues(), store = Ext.getStore('storeBlank2ValuationPartsId');
		var record = Ext.create('pf.model.Blank2ValuationParts', {
			ownerFio : values.ownerFio,
			valuationPartNumer : values.valuationPartNumer,
			valuationPartDenom : values.valuationPartDenom
		});
		store.add(record);
		btn.up('.window').close();

	},

	/**
	 * OV2AddDescriptionLand
	 */
	newOV2AddDescriptionLand : function() {
		var me = this;
		var storeAdditionalDescription = Ext.create('pf.store.common.AdditionalDescriptionLand');
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Додаткові характеристики',
			height : Ext.getBody().getViewSize().height * 0.5,
			width : Ext.getBody().getViewSize().width * 0.3,
			layout : 'anchor',
			items : [ {
				xtype : 'grid',
				itemId : 'gridAdditionalDescription',
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				columnLines : true,
				store : storeAdditionalDescription,
				dockedItems : [ {
					xtype : 'pagingtoolbar',
					store : storeAdditionalDescription,
					dock : 'bottom',
					displayInfo : true
				} ],
				columns : [ {
					xtype : 'rownumberer'
				}, {
					header : 'id',
					dataIndex : 'addDescriptionID',
					flex : 1,
					hidden : true,
					hideable : false
				}, {
					header : "Найменування",
					dataIndex : 'addDescriptionName',
					flex : 1
				} ]
			} ],
			buttons : [ {
				xtype : 'button',
				text : loc.btnOK,
				formBind : true,
				cls : 'btnSave',
				handler : this.saveOV2AddDescriptionLand
			}, {
				xtype : 'button',
				text : loc.btnExit,
				cls : 'btnExit',
				iconCls : 'exit',
				handler : function() {
					this.up('.window').close();
				}
			} ]
		});
		win.show();
	},
	saveOV2AddDescriptionLand : function(btn) {
		var grid = btn.up('window').getComponent('gridAdditionalDescription'), selections = grid.getSelectionModel().getSelection();
		var storeOV2AddDescriptionId = Ext.getStore('storeOV2AddDescriptionLandId');
		storeOV2AddDescriptionId.removeAll();
		storeOV2AddDescriptionId.add(selections);
		this.up('.window').close();
	},
	// end OV2AddDescriptionLand

	/**
	 * OV2Infrastructure
	 */
	newOV2Infrastructure : function() {
		var me = this;
		var storeInfrastructure = Ext.create('pf.store.common.Infrastructure');
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Інфраструктура',
			height : Ext.getBody().getViewSize().height * 0.5,
			width : Ext.getBody().getViewSize().width * 0.3,
			layout : 'anchor',
			items : [ {
				xtype : 'grid',
				itemId : 'gridInfrastructure',
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				columnLines : true,
				store : storeInfrastructure,
				dockedItems : [ {
					xtype : 'pagingtoolbar',
					store : storeInfrastructure,
					dock : 'bottom',
					displayInfo : true
				} ],
				columns : [ {
					xtype : 'rownumberer'
				}, {
					header : 'id',
					dataIndex : 'infrastructureID',
					flex : 1,
					hidden : true,
					hideable : false
				}, {
					header : "Найменування",
					dataIndex : 'infrastructureName',
					flex : 1
				} ]
			} ],
			buttons : [ {
				xtype : 'button',
				text : loc.btnOK,
				formBind : true,
				cls : 'btnSave',
				handler : this.saveOV2Infrastructure
			}, {
				xtype : 'button',
				text : loc.btnExit,
				cls : 'btnExit',
				iconCls : 'exit',
				handler : function() {
					this.up('.window').close();
				}
			} ]
		});
		win.show();
	},
	saveOV2Infrastructure : function(btn) {
		var grid = btn.up('window').getComponent('gridInfrastructure'), selections = grid.getSelectionModel().getSelection();
		var storeOV2InfrastructureId = Ext.getStore('storeOV2InfrastructureId');
		storeOV2InfrastructureId.removeAll();
		storeOV2InfrastructureId.add(selections);
		this.up('.window').close();
	},

	newOV2ExtBuildings : function() {
		var me = this;
		var storeInfrastructure = Ext.create('pf.store.common.OtherExternalBuildings');
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Інші надвірні будівлі та споруди',
			height : Ext.getBody().getViewSize().height * 0.5,
			width : Ext.getBody().getViewSize().width * 0.3,
			layout : 'anchor',
			items : [ {
				xtype : 'grid',
				itemId : 'gridExtBuildings',
				selModel : Ext.create('Ext.selection.CheckboxModel'),
				columnLines : true,
				store : storeInfrastructure,
				dockedItems : [ {
					xtype : 'pagingtoolbar',
					store : storeInfrastructure,
					dock : 'bottom',
					displayInfo : true
				} ],
				columns : [ {
					xtype : 'rownumberer'
				}, {
					header : 'id',
					dataIndex : 'buildingId',
					flex : 1,
					hidden : true,
					hideable : false
				}, {
					header : "Найменування",
					dataIndex : 'buildingName',
					flex : 1
				} ]
			} ],
			buttons : [ {
				xtype : 'button',
				text : loc.btnOK,
				formBind : true,
				cls : 'btnSave',
				handler : this.saveOV2ExtBuildings
			}, {
				xtype : 'button',
				text : loc.btnExit,
				cls : 'btnExit',
				iconCls : 'exit',
				handler : function() {
					this.up('.window').close();
				}
			} ]
		});
		win.show();
	},
	saveOV2ExtBuildings : function(btn) {
		var grid = btn.up('window').getComponent('gridExtBuildings'), selections = grid.getSelectionModel().getSelection();
		var storeOV2ExtBuildings = Ext.getStore('storeOV2ExtBuildingsId');
		storeOV2ExtBuildings.removeAll();
		storeOV2ExtBuildings.add(selections);
		this.up('.window').close();
	},
	// end OV2Infrastructure
	addCorr : function() {
		var me = this;
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			title : 'Коефіціенти коригування',
			height : 210,
			width : 300,
			layout : 'fit',
			items : [ {
				xtype : 'form',
				buttonAlign : 'center',
				frame : false,
				bodyPadding : 10,
				buttons : [ {
					xtype : 'button',
					text : loc.btnOK,
					formBind : true,
					cls : 'btnSave',
					handler : function() {
						me.saveCorr(this, me)
					}
				}, {
					xtype : 'button',
					text : loc.btnExit,
					cls : 'btnExit',
					iconCls : 'exit',
					handler : function() {
						this.up('.window').close();
					}
				} ],
				items : [ {
					xtype : 'combobox',
					itemId : 'correctionTypeId',
					anchor : '100%',
					labelAlign : 'top',
					fieldLabel : 'Тип коригування',
					store : Ext.create('pf.store.common.CorrectionType'),
					name : 'correctionType',
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					listeners : {
						'change' : function(combo, value) {
							if (combo.getStore().findRecord('id', value).get('code') == 11) {
								combo.up('form').getComponent('correctionDescr').show()
							} else {
								combo.up('form').getComponent('correctionDescr').hide()
							}
						}
					}
				}, {
					xtype : 'textfield',
					hidden : true,
					itemId : 'correctionDescr',
					fieldLabel : 'Опис коригування',
					name : 'correctionDescr',
					anchor : '100%',
					labelAlign : 'top'
				}, {
					xtype : 'textfield',
					emptyText : '0.00',
					fieldLabel : 'Коефіціент коригування',
					name : 'correctionValue',
					anchor : '100%',
					labelAlign : 'top',
					vtype : 'isIntFloat'
				} ]
			} ]
		});
		win.show();
	},
	saveCorr : function(btn, me) {
		var values = btn.up('window').down('form').getValues(), store = Ext.getStore('storeAnalogue2CorrId');
		var correctionDescr = values.correctionDescr, correctionTypeName = btn.up('window').down('form').getComponent('correctionTypeId').getRawValue()
		var record = Ext.create('pf.model.Analogue2Corr', {
			correctionType : values.correctionType,
			correctionTypeName : btn.up('window').down('form').getComponent('correctionTypeId').getRawValue(),
			correctionValue : values.correctionValue,
			correctionDescr : values.correctionDescr
		});
		store.add(record);
		me.calcCorrectedValue();
		btn.up('.window').close();
	},
	calcCorrectedValue : function() {
		var me = this, store = Ext.getStore('storeAnalogue2CorrId'), totalCorr = 1;
		var items = store.data.items, totalCorr = 1;
		for ( var i = 0; i <= items.length - 1; i++) {
			totalCorr = totalCorr * parseFloat(items[i].get('correctionValue'));
		}
		me.getLnkTotalCorr().setValue(totalCorr.toFixed(2));
		var cost = parseFloat(me.getLnkCostMetre().getValue());
		me.getLnkCostCorrected().setValue((cost.toFixed(2) * totalCorr.toFixed(2)).toFixed(2));
	},
	addDocs : function(button) {
		var me = this;
		var objectType = (button.itemId == 'addUserDocs') ? 'User' : 'Organization'
		var objId = button.up('form').up().id;
		var store = Ext.create('pf.store.common.UserDocType');
		store.filter('objectType', objectType)
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			titleCollapse : false,
			title : 'Картка прикріплення додаткової інформацї',
			height : Ext.getBody().getViewSize().height * 0.3,
			width : Ext.getBody().getViewSize().width * 0.35,
			layout : 'fit',
			items : [ {
				xtype : 'form',
				autoScroll : true,
				bodyPadding : 10,
				defaults : {
					xtype : 'textfield',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					labelAlign : 'top'
				},
				buttons : [ {
					xtype : 'button',
					text : loc.btnOK,
					formBind : true,
					cls : 'btnSave',
					handler : function(button) {
						me.saveDocs(button, me, objectType)
					}
				}, {
					xtype : 'button',
					text : loc.btnExit,
					cls : 'btnExit',
					iconCls : 'exit',
					handler : function() {
						this.up('.window').close();
					}
				} ],
				items : [ {
					xtype : 'hiddenfield',
					name : 'objId',
					value : objId
				}, {
					xtype : 'combobox',
					itemId : 'docTypeId',
					anchor : '100%',
					labelAlign : 'top',
					fieldLabel : 'Тип документу',
					store : store,
					name : 'docType',
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					margin : '0 10 0 0'
				}, {
					xtype : 'container',
					flex : 1,
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						msgTarget : 'side',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false
					},
					layout : {
						type : 'hbox',
						defaultMargins : {
							top : 10,
							right : 10,
							bottom : 15,
							left : 0
						}
					},
					items : [ {
						flex : 1,
						fieldLabel : 'Номер (та серія)',
						name : 'docNumber'
					}, {
						xtype : 'datefield',
						fieldLabel : 'Дата видачі',
						name : 'docDate',
						format : 'd.m.Y'
					}, {
						xtype : 'datefield',
						fieldLabel : 'Дійсний до',
						name : 'endDate',
						afterLabelTextTpl : '',
						allowBlank : true,
						format : 'd.m.Y'
					} ]
				}, {
					xtype : 'filefield',
					margin : '0 10 0 0',
					itemId : 'fileId',
					name : 'file',
					anchor : '100%',
					buttonText : 'Оберіть файл'
				} ]
			} ]
		});
		win.show();
	},
	saveDocs : function(button, me, objectType) {
		var form = button.up('form'), shortUrl = "pf.proxy.common.Create.cls";
		var params = {
			action : 'save' + objectType + 'Docs'
		}
		me.formSubmit([ button, objectType ], form, me, shortUrl, params, me.afterSaveUserDocs);
	},
	afterSaveUserDocs : function(params) {
		var store = (params[1] == 'User') ? Ext.getStore('storeCertUserId') : Ext.getStore('storeCertSODId')
		store.reload();
		params[0].up('window').close()
	},
	deleteDocs : function(form, record) {
		var me = this;
		me.destroy(form, record, me, me.deleteObject);
	},
	deleteObject : function(form, record) {
		var me = this, store = record.store;
		store.remove(record);
		callbacks = {
			success : function(records, operation) {
				var result = Ext.decode(records.operations[0].response.responseText);
				me.showInfo(me.getMessage(result.code));
				store.reload();
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		store.sync(callbacks);
	},
	onEditDocs : function(grid, record) {
		var me = this;
		var objectType = (record.$className == 'pf.model.common.CertUser') ? 'User' : 'Organization'
		var store = Ext.create('pf.store.common.UserDocType');
		store.filter('objectType', objectType)
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			titleCollapse : false,
			title : 'Картка прикріплення додаткової інформацї',
			height : Ext.getBody().getViewSize().height * 0.3,
			width : Ext.getBody().getViewSize().width * 0.35,
			layout : 'fit',
			items : [ {
				xtype : 'form',
				autoScroll : true,
				bodyPadding : 10,
				defaults : {
					xtype : 'textfield',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					labelAlign : 'top'
				},
				buttons : [ {
					xtype : 'button',
					text : loc.btnOK,
					formBind : true,
					cls : 'btnSave',
					handler : function(button) {
						me.editDocs(button, me, objectType)
					}
				}, {
					xtype : 'button',
					text : loc.btnExit,
					cls : 'btnExit',
					iconCls : 'exit',
					handler : function() {
						this.up('.window').close();
					}
				} ],
				items : [ {
					xtype : 'hiddenfield',
					name : 'id'
				}, {
					xtype : 'combobox',
					itemId : 'docTypeId',
					anchor : '100%',
					labelAlign : 'top',
					fieldLabel : 'Тип документу',
					store : store,
					name : 'docType',
					queryMode : 'local',
					minChars : 3,
					editable : false,
					displayField : 'name',
					valueField : 'id',
					afterLabelTextTpl : pf.utils.Validation.required,
					allowBlank : false,
					margin : '0 10 0 0'
				}, {
					xtype : 'container',
					flex : 1,
					defaults : {
						xtype : 'textfield',
						labelAlign : 'top',
						msgTarget : 'side',
						afterLabelTextTpl : pf.utils.Validation.required,
						allowBlank : false
					},
					layout : {
						type : 'hbox',
						defaultMargins : {
							top : 10,
							right : 10,
							bottom : 15,
							left : 0
						}
					},
					items : [ {
						flex : 1,
						fieldLabel : 'Номер (та серія)',
						name : 'docNumber'
					}, {
						xtype : 'datefield',
						fieldLabel : 'Дата видачі',
						name : 'docDate',
						format : 'd.m.Y'
					}, {
						xtype : 'datefield',
						fieldLabel : 'Дійсний до',
						name : 'endDate',
						afterLabelTextTpl : '',
						allowBlank : true,
						format : 'd.m.Y'
					} ]
				}, {
					xtype : 'filefield',
					margin : '0 10 0 0',
					itemId : 'fileId',
					name : 'file',
					anchor : '100%',
					buttonText : 'Оберіть файл',
					allowBlank : true
				} ]
			} ]
		});
		win.show();
		win.down('form').loadRecord(record);
	},
	editDocs : function(button, me, objectType) {
		var form = button.up('form'), shortUrl = "pf.proxy.common.Create.cls";
		var params = {
			action : 'edit' + objectType + 'Docs'
		}
		me.formSubmit([ button, objectType ], form, me, shortUrl, params, me.afterEditUserDocs);
	},
	afterEditUserDocs : function(params) {
		var store = (params[1] == 'User') ? Ext.getStore('storeCertUserId') : Ext.getStore('storeCertSODId')
		store.reload();
		params[0].up('window').close()
	}
});