Ext.define('pf.controller.card.OVHouse', {
	extend : 'pf.controller.card.ObjectValuation',
	views : [ 'pf.view.form.list.InProcessList', 'pf.view.form.card.ov.OVTemplate', 'pf.view.form.card.ov.OVTemplatesList', 'pf.view.form.card.ov.flat.OVFlatCard', 'pf.view.form.card.ov.land.OVLandCard', 'pf.view.form.card.ov.simple.OVSimpleCard', 'pf.view.form.card.ov.OVAbstract', 'pf.view.form.card.ov.OVToAddNum', 'pf.view.form.card.ov.OVToAddNumSimple', 'pf.view.form.card.ov.OVToAddCert', 'pf.view.form.card.ov.IssueToApplicant', 'pf.view.form.card.ov.OVHanded', 'pf.view.form.list.ToSyncList', 'pf.view.form.list.NewList', 'pf.view.form.list.FinishedList', 'pf.view.form.list.AllReportsList', 'pf.view.form.card.ov.house.OVHouseCard', 'pf.view.form.card.ov.house.TabLand', 'pf.view.form.list.AllReportsList', 'pf.view.form.card.ov.house.TabConditionApartment' ],
	refs : [ {
		ref : 'InProcessList',
		selector : '[xtype=inProcessList]'
	}, {
		ref : 'AllReportsList',
		selector : '[xtype=allReportsList]'
	}, {
		ref : 'gridOVHouse2ConstitutiveDocs',
		selector : '[xtype=ovHouseCard] grid#gridOVHouse2ConstitutiveDocs'
	}, {
		ref : 'gridOV2RoomDescription',
		selector : '[xtype=ovHouseCard] grid#gridOV2RoomDescription'
	}, {
		ref : 'gridOV2AddDescription',
		selector : '[xtype=ovHouseCard] grid#gridOV2AddDescription'
	}, {
		ref : 'gridOV2Infrastructure',
		selector : '[xtype=ovHouseCard] grid#gridOV2Infrastructure'
	}, {
		ref : 'gridOV2ExtBuildings',
		selector : '[xtype=ovHouseCard] grid#gridOV2ExtBuildings'
	}, {
		ref : 'gridBlank2ValParts',
		selector : '[xtype=ovHouseCard] grid#gridBlank2ValParts'
	}, {
		ref : 'gridOV2Analogue',
		selector : '[xtype=ovHouseCard] grid#gridOV2Analogue'
	}, {
		ref : 'gridHousePlot2Analogue',
		selector : '[xtype=ovHouseCard] grid#gridHousePlot2Analogue'
	}, {
		ref : 'OVHouseCard',
		selector : '[xtype=ovHouseCard]'
	}, {
		ref : 'buttonSave',
		selector : '[xtype=ovHouseCard] button#saveToInProcess'
	} ],
	init : function() {
		this.listen({
			component : {
				'[xtype=ovHouseCard] button#saveToInProcess' : {
					click : this.saveObject
				},
				'[xtype=ovHouseCard] button#saveToInProcessAll' : {
					click : this.saveObjectValuation
				},
				'[xtype=ovHouseCard] button#save' : {
					click : this.saveObject
				},
				'[xtype=ovHouseCard] button#saveAsTemplate' : {
					click : this.showTemplateToAdd
				},
				'[xtype=ovHouseCard] button#fillFromTemplate' : {
					click : this.showTemplatesList
				},

				'[xtype=ovHouseCard] radiogroup#radiogroupApplicant' : {
					change : this.onChangeAppOwner
				},
				'[xtype=ovSimpleCard] radiogroup#radiogroupApplicant' : {
					change : this.onChangeAppOwner
				},
				'[xtype=ovHouseCard] radiogroup#radiogroupJointOwnership' : {
					change : this.onChangeJointOwnership
				},

				'[xtype=ovHouseCard] button#calcStats' : {
					click : this.calcStats
				},
				'[xtype=ovHouseCard] button#calcValuationCost' : {
					click : this.calcValuationCost
				},
				'[xtype=inProcessList]' : {
					editOVHouse : this.editOV
				},
				'[xtype=allReportsList]' : {
					editOVHouse : this.editOV
				},
				'[xtype=ov.house.tabLand]' : {
					showListOVLand : this.showListOVLand
				},
				'[xtype=ov.house.tabConditionApartment]' : {
					deleteOVPictures : this.onDelete
				},
				'[xtype=ov.house.tabConditionApartment] grid#gridOV2PicturesId' : {
					edit : this.editOV2Pictures
				}

			},
			store : {}
		});
	},

	saveObjectValuation : function(button) {
		Ext.getBody().mask('Збереження...');
		var me = this, form = button.up('panel').down('form'), grid, store, values = form.getValues(), record = form.getRecord();

		if (button.itemId == 'saveToInProcessAll') {
			grid = me.getAllReportsList();
		} else {
			grid = me.getInProcessList();
		}
		store = grid.getStore()

		var constitutiveDocs = me.saveOVHouse2ConstitutiveDocs();
		record.set("constitutiveDocs", JSON.stringify(constitutiveDocs));

		var roomDescription = me.saveOV2RoomDescription();
		record.set("roomDescription", JSON.stringify(roomDescription));

		var otherExternalBuildings = me.saveOV2ExternalBuildings();
		record.set("otherExternalBuildings", JSON.stringify(otherExternalBuildings));

		var addDescription = me.saveOV2AddDescription();
		record.set("addDescription", JSON.stringify(addDescription));

		var infrastructure = me.saveOV2Infrastructure();
		record.set("infrastructure", JSON.stringify(infrastructure));

		var valuationParts = me.saveBlank2ValuationParts();
		record.set("valuationParts", JSON.stringify(valuationParts));

		var analogue = me.saveOV2Analogue();
		record.set("analogue", JSON.stringify(analogue));

		var housePlot2Analogue = me.saveHousePlot2Analogue();
		record.set("housePlot2Analogue", JSON.stringify(housePlot2Analogue));

		var correctionsHousePlot = me.getCorrectionsHousePlot(button);
		if (correctionsHousePlot) {
			record.set("correctionsHousePlot", JSON.stringify(correctionsHousePlot));
		}

		var corrections = me.getCorrectionsJSON(button);
		if (corrections) {
			record.set("corrections", JSON.stringify(corrections));
		}

		record.set('isManual', me.getIsManual())

		var callbacks;

		values.landLocationStreet = form.down('[name=landLocationStreet]').getValue();
		values.landLocationBuilding = form.down('[name=landLocationBuilding]').getValue();
		values.landLocationPlot = form.down('[name=landLocationPlot]').getValue();
		values.plotPurpose = form.down('[name=plotPurpose]').getValue();
		values.roadLocation = form.down('[name=roadLocation]').getValue();
		values.roadType = form.down('[name=roadType]').getValue();
		values.plotIncline = form.down('[name=plotIncline]').getValue();
		values.plotForm = form.down('[name=plotForm]').getValue();
		values.geologicalConditions = form.down('[name=geologicalConditions]').getValue();
		values.plotDescription = form.down('[name=plotDescription]').getValue();
		values.usageLimitation = form.down('[name=usageLimitation]').getValue();
		values.plotQty = form.down('[name=plotQty]').getValue();
		values.plotArea = form.down('[name=plotArea]').getValue();
		values.usedArea = form.down('[name=usedArea]').getValue();

		record.set(values);

		if (!record.dirty) {
			Ext.getBody().unmask();
			me.showInfo('Немає змін!');
			return;
		}
		callbacks = {
			success : function(records, operation) {
				var result = Ext.decode(records.operations[0].response.responseText);
				me.ovId = result.recordID
				me.showInfo(me.getMessage(result.code));
				if (me.getFinish() == 1) {
					me.sendOVToServer(result.recordID);
					button.up('panel').close();
				}
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		store.sync(callbacks);
		return me.ovId
	},
	saveHousePlot2Analogue : function() {
		var values = this.getGridHousePlot2Analogue().getStore().data.items, analogues = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				id : values[i].get('id').toString()
			};
			analogues.push(obj);
		}
		return analogues;
	},
	getCorrectionsHousePlot : function(button) {
		var form = button.up('form');
		var an1totalCorr = form.down('[itemId=an1totalCorrLand]').getValue(), an1costCorrected = form.down('[itemId=an1costCorrectedLand]').getValue();
		var an2totalCorr = form.down('[itemId=an2totalCorrLand]').getValue(), an2costCorrected = form.down('[itemId=an2costCorrectedLand]').getValue();
		var an3totalCorr = form.down('[itemId=an3totalCorrLand]').getValue(), an3costCorrected = form.down('[itemId=an3costCorrectedLand]').getValue();
		var an4totalCorr = form.down('[itemId=an4totalCorrLand]').getValue(), an4costCorrected = form.down('[itemId=an4costCorrectedLand]').getValue();

		if ((an1totalCorr == '') || (an1costCorrected == '') || (an2totalCorr == '') || (an2costCorrected == '') || (an3totalCorr == '') || (an3costCorrected == '') || (an4totalCorr == '') || (an4costCorrected == '')) {
			return corrections = [];
		}

		var corrections = [ {
			an1corrOnBargain : form.down('[itemId=an1corrOnBargainLand]').getValue(),
			an1corrOnArea : form.down('[itemId=an1corrOnAreaLand]').getValue(),
			an1corrOnLandImprovements : form.down('[itemId=an1corrOnLandImprovementsLand]').getValue(),
			an1corrOnLandRights : form.down('[itemId=an1corrOnLandRightsLand]').getValue(),
			an1corrOnLandPurpose : form.down('[itemId=an1corrOnLandPurposeLand]').getValue(),
			an1corrOnLocation : form.down('[itemId=an1corrOnLocationLand]').getValue(),
			an1corrOnLandDescr : form.down('[itemId=an1corrOnLandDescrLand]').getValue(),
			an1corrOnCom : form.down('[itemId=an1corrOnComLand]').getValue(),
			an1corrOnLandTransport : form.down('[itemId=an1corrOnLandTransportLand]').getValue(),
			an1corrOnLandEnvironment : form.down('[itemId=an1corrOnLandEnvironmentLand]').getValue(),
			an1totalCorr : form.down('[itemId=an1totalCorrLand]').getValue(),
			an1costCorrected : form.down('[itemId=an1costCorrectedLand]').getValue()
		}, {
			an2corrOnBargain : form.down('[itemId=an2corrOnBargainLand]').getValue(),
			an2corrOnArea : form.down('[itemId=an2corrOnAreaLand]').getValue(),
			an2corrOnLandImprovements : form.down('[itemId=an2corrOnLandImprovementsLand]').getValue(),
			an2corrOnLandRights : form.down('[itemId=an2corrOnLandRightsLand]').getValue(),
			an2corrOnLandPurpose : form.down('[itemId=an2corrOnLandPurposeLand]').getValue(),
			an2corrOnLocation : form.down('[itemId=an2corrOnLocationLand]').getValue(),
			an2corrOnLandDescr : form.down('[itemId=an2corrOnLandDescrLand]').getValue(),
			an2corrOnCom : form.down('[itemId=an2corrOnComLand]').getValue(),
			an2corrOnLandTransport : form.down('[itemId=an2corrOnLandTransportLand]').getValue(),
			an2corrOnLandEnvironment : form.down('[itemId=an2corrOnLandEnvironmentLand]').getValue(),
			an2totalCorr : form.down('[itemId=an2totalCorrLand]').getValue(),
			an2costCorrected : form.down('[itemId=an2costCorrectedLand]').getValue()
		}, {
			an3corrOnBargain : form.down('[itemId=an3corrOnBargainLand]').getValue(),
			an3corrOnArea : form.down('[itemId=an3corrOnAreaLand]').getValue(),
			an3corrOnLandImprovements : form.down('[itemId=an3corrOnLandImprovementsLand]').getValue(),
			an3corrOnLandRights : form.down('[itemId=an3corrOnLandRightsLand]').getValue(),
			an3corrOnLandPurpose : form.down('[itemId=an3corrOnLandPurposeLand]').getValue(),
			an3corrOnLocation : form.down('[itemId=an3corrOnLocationLand]').getValue(),
			an3corrOnLandDescr : form.down('[itemId=an3corrOnLandDescrLand]').getValue(),
			an3corrOnCom : form.down('[itemId=an3corrOnComLand]').getValue(),
			an3corrOnLandTransport : form.down('[itemId=an3corrOnLandTransportLand]').getValue(),
			an3corrOnLandEnvironment : form.down('[itemId=an3corrOnLandEnvironmentLand]').getValue(),
			an3totalCorr : form.down('[itemId=an3totalCorrLand]').getValue(),
			an3costCorrected : form.down('[itemId=an3costCorrectedLand]').getValue()
		}, {
			an4corrOnBargain : form.down('[itemId=an4corrOnBargainLand]').getValue(),
			an4corrOnArea : form.down('[itemId=an4corrOnAreaLand]').getValue(),
			an4corrOnLandImprovements : form.down('[itemId=an4corrOnLandImprovementsLand]').getValue(),
			an4corrOnLandRights : form.down('[itemId=an4corrOnLandRightsLand]').getValue(),
			an4corrOnLandPurpose : form.down('[itemId=an4corrOnLandPurposeLand]').getValue(),
			an4corrOnLocation : form.down('[itemId=an4corrOnLocationLand]').getValue(),
			an4corrOnLandDescr : form.down('[itemId=an4corrOnLandDescrLand]').getValue(),
			an4corrOnCom : form.down('[itemId=an4corrOnComLand]').getValue(),
			an4corrOnLandTransport : form.down('[itemId=an4corrOnLandTransportLand]').getValue(),
			an4corrOnLandEnvironment : form.down('[itemId=an4corrOnLandEnvironmentLand]').getValue(),
			an4totalCorr : form.down('[itemId=an4totalCorrLand]').getValue(),
			an4costCorrected : form.down('[itemId=an4costCorrectedLand]').getValue()
		} ]

		return corrections;
	},
	getDataCorrections : function(button) {
		var form = button.up('form');
		var an1totalCorr = form.down('[itemId=an1totalCorr]').getValue(), an1costCorrected = form.down('[itemId=an1costCorrected]').getValue();
		var an2totalCorr = form.down('[itemId=an2totalCorr]').getValue(), an2costCorrected = form.down('[itemId=an2costCorrected]').getValue();
		var an3totalCorr = form.down('[itemId=an3totalCorr]').getValue(), an3costCorrected = form.down('[itemId=an3costCorrected]').getValue();
		var an4totalCorr = form.down('[itemId=an4totalCorr]').getValue(), an4costCorrected = form.down('[itemId=an4costCorrected]').getValue();

		if ((an1totalCorr == '') || (an1costCorrected == '') || (an2totalCorr == '') || (an2costCorrected == '') || (an3totalCorr == '') || (an3costCorrected == '') || (an4totalCorr == '') || (an4costCorrected == '')) {
			return false;
		}
		var corrsName = [ 'corrOnBargain', 'corrOnDate', 'corrOnCondition', 'corrOnYear', 'corrOnMaterialQuality', 'corrOnArchitecture', 'corrOnReadinessRate', 'corrOnFurniture', 'corrOnAreaRatio', 'corrOnLocation', 'corrOnCom', 'corrOnConstructState', 'corrOnLandRights', 'corrOnLandCost', 'corrOther', 'costCorrected', 'totalCorr', 'plotCost' ];
		var corrValue = [];
		for ( var i = 1; i < 5; i++) {
			var corrToAnalogue = {};
			for ( var k = 0; k < corrsName.length; k++) {
				var corrName = 'an' + i + corrsName[k];
				var fld = form.down('[itemId=' + corrName + ']');
				if (fld) {
					corrToAnalogue[corrName] = fld.getValue();
				}
			}
			corrValue.push(corrToAnalogue);
		}
		return corrValue;
	},
	showListOVLand : function(rdgrp) {
		var me = this;
		var store = Ext.create('pf.store.common.OVTemplate');
		var filters = [ {
			property : 'objFuncType',
			value : '03'
		}, {
			property : 'loadHousePlot',
			value : 1
		} ];

		store.filter(filters);
		store.objFuncType = '03';
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			height : Ext.getBody().getViewSize().height * 0.7,
			width : Ext.getBody().getViewSize().width * 0.7,
			layout : 'fit',
			buttons : [ {
				xtype : 'button',
				text : loc.btnOK,
				formBind : true,
				cls : 'btnSave'
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
				xtype : 'panel',
				layout : 'border',
				items : [ {
					region : 'center',
					flex : 1,
					layout : 'fit',
					border : false,
					xtype : 'grid',
					listeners : {
						itemdblclick : function(grid, record, item, index, e, eOpts) {
							me.getLandInfo(grid, record, item, index);
							me.getLandAnalogue(grid, record, item, index);
							me.getLandCorrections(grid, record, item, index);
							this.up('.window').close();
						}
					},
					store : store,
					plugins : [ {
						ptype : 'filterbar',
						renderHidden : false,
						showShowHideButton : false,
						showClearAllButton : false
					} ],
					columnLines : true,
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						store : store,
						dock : 'bottom',
						displayInfo : true,
						plugins : [ {
							ptype : 'pageSize'
						} ]
					} ],
					columns : {
						plugins : [ {
							ptype : 'gridautoresizer'
						} ],
						items : [ {
							xtype : 'rownumberer'
						}, {
							header : 'id',
							dataIndex : 'id',
							flex : 1,
							hidden : true,
							hideable : false
						}, {
							header : "Дата </br> оцінки",
							dataIndex : 'valuationDate',
							flex : 1.5,
							filter : true,
							renderer : Ext.util.Format.dateRenderer('d.m.Y')
						}, {
							header : 'Дата </br> створення анкети',
							dataIndex : 'createDateBlank',
							renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
							flex : 1,
							hidden : true,
							filter : true
						}, {
							header : "№ </br> ФДМУ",
							dataIndex : 'fdmuNum',
							flex : 1,
							filter : true
						}, {
							header : "№ </br> договору",
							dataIndex : 'contractNum',
							flex : 1.5,
							filter : true
						}, {
							header : 'Замовник  </br> &nbsp',
							dataIndex : 'applicant',
							flex : 1.5,
							filter : true
						}, {
							header : "Назва </br> об'єкту оцінки",
							dataIndex : 'objectName',
							flex : 3,
							filter : true
						}, {
							header : "Тип </br> об'єкту",
							dataIndex : 'objectType',
							flex : 2,
							filter : true
						}, {
							header : "Вид  </br> об'єкту",
							dataIndex : 'objectSubType',
							flex : 3,
							filter : true
						}, {
							header : 'Створено у </br> організації',
							dataIndex : 'creatorOrg',
							flex : 2,
							filter : true
						}, {
							header : 'Виконавець </br> звіту',
							dataIndex : 'reportMaker',
							flex : 1.5,
							hidden : false,
							filter : true
						}, {
							header : 'Синхронізатор </br> звіту',
							dataIndex : 'synchronizer',
							flex : 1.5,
							hidden : true,
							filter : true
						}, {
							header : "Місцезнаходження </br> об'єкту (область)",
							dataIndex : 'objRegion',
							flex : 1,
							hidden : true,
							filter : true
						}, {
							header : "Місцезнаходження </br> об'єкту (район)",
							dataIndex : 'objRayon',
							flex : 1,
							hidden : true,
							filter : true
						}, {
							header : "Місцезнаходження </br> об'єкту (н. п.)",
							dataIndex : 'objCity',
							flex : 1,
							hidden : true,
							filter : true
						}, {
							header : "Статус </br> звіту",
							dataIndex : 'ovState',
							flex : 1,
							filter : true
						} ]
					}
				} ]
			} ]
		});
		win.show();
	},
	getLandInfo : function(grid, record, item, index) {
		var mask = new Ext.LoadMask(Ext.getBody(), {
			msg : "Будь ласка, зачекайте ..."
		});
		mask.show();
		var me = this, shortUrl = 'pf.proxy.manager.Read.cls';
		params = {
			classname : 'getLandInfo',
			ovId : record.get('id')
		}
		me.ajaxResponse('', params, shortUrl, me, me.setLandInfo)

	},
	getLandAnalogue : function(grid, record, item, index) {
		var mask = new Ext.LoadMask(Ext.getBody(), {
			msg : "Будь ласка, зачекайте ..."
		});
		mask.show();
		var me = this, shortUrl = 'pf.proxy.manager.Read.cls';
		var filter = [ {
			"property" : "objectValuation",
			"value" : record.get('id')
		} ];
		params = {
			classname : 'OV2Analogue',
			filter : JSON.stringify(filter),
			limit : 25,
			page : 1,
			start : 0

		}
		me.ajaxResponse('', params, shortUrl, me, me.setLandAnalogue)

	},
	getLandCorrections : function(grid, record, item, index) {
		var mask = new Ext.LoadMask(Ext.getBody(), {
			msg : "Будь ласка, зачекайте ..."
		});
		mask.show();
		var me = this, shortUrl = 'pf.proxy.manager.Read.cls';
		params = {
			classname : 'correctionsLand',
			objectValuation : record.get('id')
		}
		me.ajaxResponse('', params, shortUrl, me, me.setLandCorrections)

	},
	setLandInfo : function(button, result) {
		if (result.total === 0) {
			return;
		}
		var me = this, data = result.data[0], ovHouseCard = me.getOVHouseCard(), form = ovHouseCard.down('form');
		form.down('[name=ovLandLink]').setValue(data.id);
		form.down('[name=ovLandNum]').setValue(data.contractNum);
		form.down('[name=landLocationStreet]').setValue(data.locationStreet);
		form.down('[name=landLocationBuilding]').setValue(data.locationBuilding);
		form.down('[name=landLocationPlot]').setValue(data.locationFlat);
		form.down('[name=plotPurpose]').setValue(data.plotPurpose);
		form.down('[name=roadLocation]').setValue(data.roadLocation);
		form.down('[name=roadType]').setValue(data.roadType);
		form.down('[name=plotIncline]').setValue(data.plotIncline);
		form.down('[name=plotForm]').setValue(data.plotForm);
		form.down('[name=geologicalConditions]').setValue(data.geologicalConditions);
		form.down('[name=plotDescription]').setValue(data.plotDescription);
		form.down('[name=usageLimitation]').setValue(data.usageLimitation);
		form.down('[name=plotQty]').setValue(data.plotQty);
		form.down('[name=plotArea]').setValue(data.plotArea);
		form.down('[name=usedArea]').setValue(data.usedArea);
	},
	setLandAnalogue : function(button, result) {
		var me = this, data = result.data;
		if (result.total === 0) {
			return;
		}
		var housePlot2AnalogueStore = Ext.getStore('storeHousePlot2AnalogueId');
		if (data.length != 0) {
			housePlot2AnalogueStore.removeAll(data)
			housePlot2AnalogueStore.add(data)
		}
	},
	setLandCorrections : function(button, result) {
		var mask = new Ext.LoadMask(Ext.getBody(), {
			msg : "Будь ласка, зачекайте ..."
		});
		if (result.total === 0) {
			mask.hide();
			return;
		}
		mask.show();
		var me = this, data = result.data[0], ovHouseCard = me.getOVHouseCard(), form = ovHouseCard.down('form');
		for ( var key in data) {
			if (data.hasOwnProperty(key)) {
				var val = data[key];
				var fld = form.down('[itemId=' + key + 'Land]');
				if (fld) {
					fld.setValue(val);
				}
			}
		}
		mask.hide();
	}

});