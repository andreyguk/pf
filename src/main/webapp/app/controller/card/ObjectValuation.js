Ext.define('pf.controller.card.ObjectValuation', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.list.InProcessList', 'pf.view.form.card.ov.OVTemplate', 'pf.view.form.card.ov.OVTemplatesList', 'pf.view.form.card.ov.flat.OVFlatCard', 'pf.view.form.card.ov.simple.OVSimpleCard', 'pf.view.form.card.ov.OVAbstract', 'pf.view.form.card.ov.OVToAddNum', 'pf.view.form.card.ov.OVToAddNumLand', 'pf.view.form.card.ov.OVToAddNumSimple', 'pf.view.form.card.ov.OVToAddCert', 'pf.view.form.card.ov.IssueToApplicant', 'pf.view.form.card.ov.OVHanded', 'pf.view.form.list.ToSyncList', 'pf.view.form.list.NewList', 'pf.view.form.list.FinishedList', 'pf.view.form.card.ov.house.OVHouseCard', 'pf.view.form.card.ov.OVToAddNumHouse' ],
	// stores : [ 'InProcess', 'ToSync', 'Synched', 'Ready', 'Handed' ],
	finish : 0,
	isManual : '',
	refs : [ {
		ref : 'InProcessList',
		selector : '[xtype=inProcessList]'
	}, {
		ref : 'AllReportsList',
		selector : '[xtype=allReportsList]'
	}, {
		ref : 'toSyncList',
		selector : '[xtype=toSyncList]'
	}, {
		ref : 'gridOVTemplates',
		selector : '[xtype=OVTemplatesList] grid#gridOVTemplates'
	}, {
		ref : 'buttonFinishSimple',
		selector : '[xtype=ovSimpleCard] button#save'
	}, {
		ref : 'buttonAddNum',
		selector : '[xtype=OVToAddNum] button#addFDMUNum'
	}, {
		ref : 'buttonAddNumSimple',
		selector : '[xtype=OVToAddNumSimple] button#addFDMUNum'
	}, {
		ref : 'buttonAddCert',
		selector : '[xtype=OVToAddCert] button#addCertFile'
	}, {
		ref : 'buttonIssueToApp',
		selector : '[xtype=IssueToApplicant] button#btnIssueToApplicant'
	} ],
	init : function() {
		this.listen({
			component : {

				'viewport content toSyncList' : {
					itemdblclick : this.openOVToAddNum
				},
				'viewport content synchedList' : {
					itemdblclick : this.openOVToAddCert
				},
				'viewport content readyList' : {
					itemdblclick : this.openOVToIssue
				},
				'viewport content handedList' : {
					itemdblclick : this.openOVHanded
				},

				'[xtype=OVTemplate] button#btnAddOVTemplate' : {
					click : this.saveObject
				},
				'[xtype=OVTemplatesList] button#btnLoadFromTemplate' : {
					click : this.loadOVDataFromTemplate
				},
				'[xtype=ovSimpleCard] button#save' : {
					click : this.saveObject
				},
				'[xtype=OVToAddNum] button#addFDMUNum' : {
					click : this.saveObject
				},
				'[xtype=OVToAddNumHouse] button#addFDMUNum' : {
					click : this.saveObject
				},
				'[xtype=OVToAddNumLand] button#addFDMUNum' : {
					click : this.saveObject
				},
				'[xtype=OVToAddNumSimple] button#addFDMUNum' : {
					click : this.saveObject
				},
				'[xtype=OVToAddCert] button#addCertFile' : {
					click : this.saveObject
				},
				'[xtype=IssueToApplicant] button#btnIssueToApplicant' : {
					click : this.saveObject
				},
				'[xtype=createObjectValuation] button#printOV' : {
					click : this.printOV
				},

				'[xtype=ovSimpleCard] radiogroup#radiogroupApplicant' : {
					change : this.onChangeAppOwner
				},

				'[xtype=newList]' : {
					takeOV : this.takeOV
				},
				'[xtype=finishedList]' : {
					takeOV : this.takeOV
				},
				'[xtype=inProcessList]' : {
					editOVOther : this.editOV
				},
				'[xtype=allReportsList]' : {
					editOVOther : this.editOV
				},
				'[xtype=ovFlatCard] button#fillFromOV' : {
					click : this.showListOV
				},
				'[xtype=ovLandCard] button#fillFromOV' : {
					click : this.showListOV
				},
				'[xtype=ovHouseCard] button#fillFromOV' : {
					click : this.showListOV
				}

			},
			store : {}
		});
	},
	saveObject : function(button) {
		var me = this;
		switch (button.action) {
		case 'finishOVSimple':
			me.save(button, me, me.finishOVSimple);
			break;
		case 'finishObjectValuation':
			me.save(button, me, me.finishObjectValuation);
			break;
		case 'addFDMUNum':
			me.save(button, me, me.addFDMUNum);
			break;
		case 'addFDMUNumSimple':
			me.save(button, me, me.addFDMUNum);
			break;
		case 'addCertFile':
			me.save(button, me, me.addCertFile);
			break;
		case 'issueToApplicant':
			me.save(button, me, me.issueToApp);
			break;
		case 'addOVTemplate':
			me.save(button, me, me.saveOVTemplate);
			break;
		case 'saveToInProcess':
			me.save(button, me, me.saveOV);
			break;

		}
	},
	onDelete : function(grid, record) {
		var me = this;
		me.destroy(grid, record, me, me.deleteObject);
	},
	deleteObject : function(grid, record) {
		var me = this;
		var store = grid.getStore();
		store.remove(record);
		callbacks = {
			success : function(records, operation) {
				var result = Ext.decode(records.operations[0].response.responseText);
				me.showInfo(me.getMessage(result.code));
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		store.sync(callbacks);
	},
	saveOV : function(button) {
		var me = this;
		me.validationOV(button, me, me.saveObjectValuation);
	},
	validationOV : function(button, scope, callbackFn) {
		var me = this, form = button.up('panel').down('form'), values = form.getValues(), record = form.getRecord();

		if (values.statsMin == 'NaN') {
			me.showError('Будь-ласка, заповніть коректно поле "Статистичні показники-Мінімум"');
			return false;
		}
		if (values.statsMax == 'NaN') {
			me.showError('Будь-ласка, заповніть коректно поле "Статистичні показники-Максимум"');
			return false;
		}
		if (values.statsMed == 'NaN') {
			me.showError('Будь-ласка, заповніть коректно поле "Статистичні показники-Медіана"');
			return false;
		}
		if (values.statsMid == 'NaN') {
			me.showError('Будь-ласка, заповніть коректно поле "Статистичні показники-Середнє"');
			return false;
		}
		if (values.valuationCostUSD == 'NaN') {
			me.showError('Будь-ласка, заповніть коректно поле "Оціночна вартість-Доларів США"');
			return false;
		}
		if (values.valuationCostUAH == 'NaN') {
			me.showError('Будь-ласка, заповніть коректно поле "Оціночна вартість-valuationCostUAH"');
			return false;
		}

		// если все ок
		callbackFn.call(scope, button);
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

		var constitutiveDocs = me.saveOV2ConstitutiveDocs();
		record.set("constitutiveDocs", JSON.stringify(constitutiveDocs));

		var roomDescription = me.saveOV2RoomDescription();
		record.set("roomDescription", JSON.stringify(roomDescription));

		var addDescription = me.saveOV2AddDescription();
		record.set("addDescription", JSON.stringify(addDescription));

		var infrastructure = me.saveOV2Infrastructure();
		record.set("infrastructure", JSON.stringify(infrastructure));

		var analogue = me.saveOV2Analogue();
		record.set("analogue", JSON.stringify(analogue));

		var corrections = me.getCorrectionsJSON(button);
		if (corrections) {
			record.set("corrections", JSON.stringify(corrections));
		}

		record.set('isManual', me.isManual)

		var callbacks;
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
				if (me.finish == 1) {
					me.sendOVToServer(result.recordID);
					button.up('panel').close();
					Ext.getStore('InProcess').reload();
					Ext.getStore('Finished').reload();
				}
			},
			failure : function(records, operation) {
				me.finish == 0;
				store.rejectChanges();
			}
		};
		store.sync(callbacks);
		return me.ovId
	},

	finishObjectValuation : function(button, e, eOpts) {
		Ext.getBody().mask('Збереження...');
		var me = this, form = button.up('panel').down('form');
		if ((Ext.isEmpty(form.down('[name=statsMin]').getValue())) && (Ext.isEmpty(form.down('[name=statsMax]').getValue())) && (Ext.isEmpty(form.down('[name=statsMed]').getValue())) && (Ext.isEmpty(form.down('[name=statsMid]').getValue()))) {
			Ext.getBody().unmask();
			me.showError('Необхідно розрахувати "Статистичні показники"!');
			me.finish == 0;
			return;
		}

		if ((Ext.isEmpty(form.down('[name=valuationCostUSD]').getValue())) && (Ext.isEmpty(form.down('[name=valuationCostUAH]').getValue()))) {
			Ext.getBody().unmask();
			me.showError('Необхідно розрахувати "Оціночну вартість"!');
			me.finish == 0;
			return;
		}
		me.finish = 1
		me.saveObjectValuation(me.getButtonSave());
		// validation
	},

	sendOVToServer : function(ovId) {
		var me = this, url = 'pf.proxy.manager.Create.cls';
		Ext.getBody().mask('Збереження...');
		var params = {
			action : 'finishOV',
			ovId : ovId
		}
		me.ajaxRequest('', '', params, url, me, me.afterSendOVToServer)
		me.finish = 0
	},
	afterSendOVToServer : function(button) {
		var stores = [];
		if (Ext.getStore('storeInProcessId')) {
			stores.push(Ext.getStore('storeInProcessId'))
		}
		if (Ext.getStore('storeFinishedId')) {
			stores.push(Ext.getStore('storeFinishedId'))
		} else {
			Ext.create('pf.store.Finished');
		}

		this.reloadStores(stores);
	},
	finishOVSimple : function(button) {
		var me = this, form = button.up('form').getForm(), url = 'pf.proxy.manager.Create.cls', params = {
			action : 'finishOVSimple',
			isManual : me.isManual
		};
		me.formSubmit(button, form, me, url, params, me.afterFinishOVSimple);
	},
	afterFinishOVSimple : function(button) {
		var me = this, stores = [];
		if (Ext.getStore('storeInProcessId')) {
			stores.push(Ext.getStore('storeInProcessId'))
		}
		if (Ext.getStore('storeFinishedId')) {
			stores.push(Ext.getStore('storeFinishedId'))
		} else {
			Ext.create('pf.store.Finished');
		}
		button.up('panel').close();
		me.reloadStores(stores);
	},
	addFDMUNum : function(button, e, eOpts) {
		Ext.getBody().mask('Збереження...');
		var me = this, form = button.up('form'), ovId = form.getValues();
		var grid = me.getToSyncList();
		var selection = grid.getSelectionModel().getSelection()[0];
		// var num = form.getComponent('fdmuNum').getValue();
		var num = form.getComponent('contId').getComponent('fdmuNum').getValue();

		if (Ext.isEmpty(num)) {
			me.showAttention(loc.validMsg);
			return false;
		}
		var params = {
			ovId : selection.get('id'),
			fdmuNum : num,
			action : 'addFDMUNumToOV'
		}
		var url = 'pf.proxy.manager.Create.cls';
		me.formSubmit(button, form, me, url, params, me.afterAddFDMUNum);
		// me.ajaxRequest(button, form, params, url, me, me.afterAddFDMUNum);
	},
	afterAddFDMUNum : function(button) {
		switch (button.action) {
		case 'addFDMUNum':
			button.up('panel').close();
			break;
		case 'addFDMUNumSimple':
			button.up('window').close();
			break;
		}
		var stores = [];
		if (Ext.getStore('storeToSyncId')) {
			stores.push(Ext.getStore('storeToSyncId'));
		}
		if (Ext.getStore('storeSynchedId')) {
			stores.push(Ext.getStore('storeSynchedId'));
		} else {
			Ext.create('pf.store.Synched');
		}
		this.reloadStores(stores);
	},
	addCertFile : function(button, e, eOpts) {
		var me = this, form = button.up('form'), ovId = form.getValues().id, url = 'pf.proxy.manager.Create.cls'
		var params = {
			action : 'addCertFileToOV'
		};
		me.formSubmit(button, form, me, url, params, me.afterAddCertFile);
	},
	afterAddCertFile : function(button) {
		button.up('form').up('window').close();
		var stores = []
		if (Ext.getStore('storeSynchedId')) {
			stores.push(Ext.getStore('storeSynchedId'));
		}
		if (Ext.getStore('storeReadyId')) {
			stores.push(Ext.getStore('storeReadyId'));
		} else {
			Ext.create('pf.store.Ready');
		}
		this.reloadStores(stores);
	},
	issueToApp : function(button, e, eOpts) {
		var me = this, form = button.up('form'), ovId = form.getValues().id, url = 'pf.proxy.manager.Create.cls';
		var params = {
			ovId : ovId,
			action : 'issueToApp'
		}
		me.ajaxRequest(button, form, params, url, me, me.afterIssueToApp);
	},
	afterIssueToApp : function(button) {
		button.up('form').up('window').close();
		var stores = [];
		if (Ext.getStore('storeReadyId')) {
			stores.push(Ext.getStore('storeReadyId'));
		}
		if (Ext.getStore('storeHandedId')) {
			stores.push(Ext.getStore('storeHandedId'));
		} else {
			Ext.create('pf.store.Handed');
		}
		this.reloadStores(stores);
	},
	/**
	 * 
	 */
	saveOVTemplate : function(button, e, eOpts) {
		var me = this, form = button.up('form'), ovId = form.up().ovID, templateName = form.getValues().templateName;
		var url = 'pf.proxy.manager.Create.cls';
		var params = {
			ovId : ovId,
			templateName : templateName,
			action : 'saveOVTemplate'
		}
		me.ajaxRequest(button, form, params, url, me, me.afterSasveOVTemplate)
	},
	afterSaveOVTemplate : function(button) {
		button.up('form').up('window').close();
	},
	//
	loadOVDataFromTemplate : function(button, e, eOpts) {
		var me = this, form = button.up('form'), ovId = form.up().ovID;
		grid = me.getGridOVTemplates(), selection = grid.getSelectionModel().getSelection()[0], record = me.getInProcessList().getSelectionModel().getSelection()[0]
		Ext.Msg.confirm(loc.msgConfirnmActionTitle, 'Перенести дані з шаблону "' + selection.get('templateName') + '" до поточного звіту?', function(btn) {
			if (btn == 'yes') {
				Ext.Ajax.request({
					url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
					params : {
						ovId : ovId,
						templateId : selection.get('id'),
						action : 'updateOVFromTemplate'
					},
					success : function(response, options) {
						var result = Ext.decode(response.responseText);
						if (result.success) {
							me.showInfo(me.getMessage(result.code));
							button.up('form').up('window').close();
							Ext.getBody().mask('Завантаження...');
							me.loadDetail(record, me, me.showovDetailedCard);
						} else {
							me.showError(me.getMessage(result.code));
						}
					},
					failure : function(response, options) {
						me.showError('');
					}
				})
			}
		})
	},

	/**
	 * open OV for edit
	 */
	editOV : function(view, record, item, index, e, eOpts) {
		var viewreport = Ext.ComponentQuery.query('viewport')[0];
		viewreport.getComponent('contentId').setLoading('Завантаження...', true);

		var me = this;
		me.isManual = record.get('isManual');
		if ((record.get('objFuncType') == 2) || (record.get('objFuncType') == 3) || (record.get('objFuncType') == 4)) {
			if (record.$className == "pf.model.AllReports") {
				me.loadDetail(record, me, me.showovDetailedCard)
			} else {
				if (record.get('isManual') == '1') {
					// me.loadDetail(record, me, me.showovDetailedCard);
					me.loadDetail(record, me, me.showOVSimpleCard);
				} else if (record.get('isManual') == 0) {
					// me.loadDetail(record, me, me.showOVSimpleCard);
					me.loadDetail(record, me, me.showovDetailedCard);
				}
			}
		} else {
			me.loadDetail(record, me, me.showOVSimpleCard)
		}
	},
	openOVToAddNum : function(grid, record) {
		Ext.getBody().mask('Завантаження...');
		var me = this;
		me.isManual = record.get('isManual');
		if ((record.get('objFuncType') == 2) && (me.isManual == 0)) {
			me.loadOVSync(record, me, me.showOVToAddNum)
		} else if ((record.get('objFuncType') == 3) && (me.isManual == 0)) {
			me.loadOVSync(record, me, me.showOVToAddNumLand)
		} else if ((record.get('objFuncType') == 4) && (me.isManual == 0)) {
			me.loadOVSync(record, me, me.showOVToAddNumHouse)
		} else {
			me.loadOVSync(record, me, me.showOVToAddNumSimple)
		}
	},
	showOVToAddNum : function(record) {
		var grid = this.getToSyncList();
		var addDescription = record.get('addDescription').split(',');
		var title = record.get('contractNum');
		extraParams = {
			'ovID' : record.get('id'),
			'blankID' : record.get('blank'),
			'objectName' : record.get('objectName'),
			'objectSubType' : record.get('objectSubType'),
			'maintenanceYear' : record.get('maintenanceYear'),
			'buildingMainClass' : record.get('buildingMainClass'),
			'floorsQty' : record.get('floorsQty'),
			'objectFloorNum' : record.get('objectFloorNum'),
			'totalArea' : record.get('totalArea'),
			'livingArea' : record.get('livingArea'),
			'storeroomArea' : record.get('storeroomArea'),
			'kitchenArea' : record.get('kitchenArea'),
			'floorHeight' : record.get('floorHeight'),
			'cellarHeight' : record.get('cellarHeight'),
			'constructiveDimension' : record.get('constructiveDimension'),
			'materialOfWalls' : record.get('materialOfWalls'),
			'materialOfCover' : record.get('materialOfCover'),
			'heatingType' : record.get('heatingType'),
			'generalRoomCondition' : record.get('generalRoomCondition'),
			'locationTerritory' : record.get('locationTerritory'),
			'locationStreet' : record.get('locationStreet'),
			'locationBuilding' : record.get('locationBuilding'),
			'locationFlat' : record.get('locationFlat'),
			'localityCategory' : record.get('localityCategory'),
			'localityStanding' : record.get('localityStanding'),
			'localityStructure' : record.get('localityStructure'),
			'distanceFromCentre' : record.get('distanceFromCentre'),
			'distanceFromBusStop' : record.get('distanceFromBusStop'),
			'distanceFromRailway' : record.get('distanceFromRailway'),
			'distanceFromAirport' : record.get('distanceFromAirport'),
			'distanceFromSeaport' : record.get('distanceFromSeaport'),
			'isSocleFloor' : record.get('isSocleFloor'),
			'isAtticFloor' : record.get('isAtticFloor'),
			'budgetCost' : record.get('budgetCost'),
			'valuationCostUAH' : record.get('valuationCostUAH'),
			'valuationCostUSD' : record.get('valuationCostUSD'),
			'contractNum' : record.get('contractNum'),
			'orgName' : record.get('orgName'),
			'orgLocation' : record.get('orgLocation'),
			'orgAddress' : record.get('orgAddress'),
			'orgCertNumber' : record.get('orgCertNumber'),
			'orgCertDate' : record.get('orgCertDate'),
			'valuationDate' : record.get('valuationDate'),
			'valuator' : record.get('valuator'),
			code01 : ((Ext.Array.contains(addDescription, '01') ? 1 : 0)) || ((Ext.Array.contains(addDescription, '02') ? 1 : 0)),
			code03 : (Ext.Array.contains(addDescription, '03')) ? 1 : 0,
			code04 : (Ext.Array.contains(addDescription, '04')) ? 1 : 0,
			code05 : (Ext.Array.contains(addDescription, '05')) ? 1 : 0,
			code06 : (Ext.Array.contains(addDescription, '06')) ? 1 : 0,
			code07 : (Ext.Array.contains(addDescription, '07')) ? 1 : 0,
			code08 : (Ext.Array.contains(addDescription, '08')) ? 1 : 0,
			code09 : (Ext.Array.contains(addDescription, '09')) ? 1 : 0,
			code10 : (Ext.Array.contains(addDescription, '10')) ? 1 : 0,
			code015 : (Ext.Array.contains(addDescription, '15')) ? 1 : 0,
			valuatorCertNum : record.get('valuatorCertNum'),
			valuatorCertDate : record.get('valuatorCertDate'),
			attachmentDocs : record.get('attachmentDocs'),
			fdmuNum : record.get('fdmuNum')
		};
		var win = Ext.widget('OVToAddNum', extraParams)
		win.loadRecord(record)
		win.title = title;
		win.active = true;
		win.autoShow = true;
		win.closable = true;
		win.autoScroll = true;

		var tabs = grid.up('viewport').getComponent('contentId').getComponent('toSyncTabId');

		var newTab = tabs.items.findBy(function(tab) {
			return tab.title === title;
		});
		if (!newTab) {
			newTab = tabs.add({
				xtype : win
			});
		}
		tabs.setActiveTab(newTab);
		Ext.getBody().unmask();

	},
	showOVToAddNumHouse : function(record) {
		var grid = this.getToSyncList();
		var addDescription = record.get('addDescription').split(',');
		var otherExternalBuildings = record.get('otherExternalBuildings').split(',');
		var title = record.get('contractNum');
		extraParams = {
			'ovID' : record.get('id'),
			'blankID' : record.get('blank'),
			'objectName' : record.get('objectName'),
			'objectSubType' : record.get('objectSubType'),
			'maintenanceYear' : record.get('maintenanceYear'),
			'buildingMainClass' : record.get('buildingMainClass'),
			'floorsQty' : record.get('floorsQty'),
			'objectFloorNum' : record.get('objectFloorNum'),
			'totalArea' : record.get('totalArea'),
			'livingArea' : record.get('livingArea'),
			'storeroomArea' : record.get('storeroomArea'),
			'kitchenArea' : record.get('kitchenArea'),
			'floorHeight' : record.get('floorHeight'),
			'cellarHeight' : record.get('cellarHeight'),
			'constructiveDimension' : record.get('constructiveDimension'),
			'materialOfWalls' : record.get('materialOfWalls'),
			'materialOfCover' : record.get('materialOfCover'),
			'heatingType' : record.get('heatingType'),
			'generalRoomCondition' : record.get('generalRoomCondition'),
			'locationTerritory' : record.get('locationTerritory'),
			'locationStreet' : record.get('locationStreet'),
			'locationBuilding' : record.get('locationBuilding'),
			'locationFlat' : record.get('locationFlat'),
			'localityCategory' : record.get('localityCategory'),
			'localityStanding' : record.get('localityStanding'),
			'localityStructure' : record.get('localityStructure'),
			'distanceFromCentre' : record.get('distanceFromCentre'),
			'distanceFromBusStop' : record.get('distanceFromBusStop'),
			'distanceFromRailway' : record.get('distanceFromRailway'),
			'distanceFromAirport' : record.get('distanceFromAirport'),
			'distanceFromSeaport' : record.get('distanceFromSeaport'),
			'isSocleFloor' : record.get('isSocleFloor'),
			'isAtticFloor' : record.get('isAtticFloor'),
			'budgetCost' : record.get('budgetCost'),
			'valuationCostUAH' : record.get('valuationCostUAH'),
			'valuationCostUSD' : record.get('valuationCostUSD'),
			'contractNum' : record.get('contractNum'),
			'orgName' : record.get('orgName'),
			'orgLocation' : record.get('orgLocation'),
			'orgAddress' : record.get('orgAddress'),
			'orgCertNumber' : record.get('orgCertNumber'),
			'orgCertDate' : record.get('orgCertDate'),
			'valuationDate' : record.get('valuationDate'),
			'valuator' : record.get('valuator'),
			code01 : ((Ext.Array.contains(addDescription, '01') ? 1 : 0)) || ((Ext.Array.contains(addDescription, '02') ? 1 : 0)),
			code03 : (Ext.Array.contains(addDescription, '03')) ? 1 : 0,
			code04 : (Ext.Array.contains(addDescription, '04')) ? 1 : 0,
			code05 : (Ext.Array.contains(addDescription, '05')) ? 1 : 0,
			code06 : (Ext.Array.contains(addDescription, '06')) ? 1 : 0,
			code07 : (Ext.Array.contains(addDescription, '07')) ? 1 : 0,
			code08 : (Ext.Array.contains(addDescription, '08')) ? 1 : 0,
			code09 : (Ext.Array.contains(addDescription, '09')) ? 1 : 0,
			code10 : (Ext.Array.contains(addDescription, '10')) ? 1 : 0,
			code015 : (Ext.Array.contains(addDescription, '15')) ? 1 : 0,
			extBuild01 : (Ext.Array.contains(otherExternalBuildings, '01')) ? 1 : 0,
			extBuild02 : (Ext.Array.contains(otherExternalBuildings, '09')) ? 1 : 0,
			extBuild03 : (Ext.Array.contains(otherExternalBuildings, '05')) ? 1 : 0,
			extBuild04 : (Ext.Array.contains(otherExternalBuildings, '07')) ? 1 : 0,
			extBuild05 : (Ext.Array.contains(otherExternalBuildings, '06')) ? 1 : 0,
			extBuild06 : (Ext.Array.contains(otherExternalBuildings, '13')) ? 1 : 0,
			extBuild07 : (Ext.Array.contains(otherExternalBuildings, '03')) ? 1 : 0,
			extBuild08 : (Ext.Array.contains(otherExternalBuildings, '08')) ? 1 : 0,
			extBuild09 : (Ext.Array.contains(otherExternalBuildings, '12')) ? 1 : 0,
			extBuild10 : (Ext.Array.contains(otherExternalBuildings, '10')) ? 1 : 0,
			extBuild11 : (Ext.Array.contains(otherExternalBuildings, '04')) ? 1 : 0,
			valuatorCertNum : record.get('valuatorCertNum'),
			valuatorCertDate : record.get('valuatorCertDate'),
			attachmentDocs : record.get('attachmentDocs'),
			fdmuNum : record.get('fdmuNum')
		};
		var win = Ext.widget('OVToAddNumHouse', extraParams)
		win.loadRecord(record)
		win.title = title;
		win.active = true;
		win.autoShow = true;
		win.closable = true;
		win.autoScroll = true;

		var tabs = grid.up('viewport').getComponent('contentId').getComponent('toSyncTabId');

		var newTab = tabs.items.findBy(function(tab) {
			return tab.title === title;
		});
		if (!newTab) {
			newTab = tabs.add({
				xtype : win
			});
		}
		tabs.setActiveTab(newTab);
		Ext.getBody().unmask();

	},

	showOVToAddNumLand : function(record) {
		var grid = this.getToSyncList();
		var addDescription = record.get('addDescription').split(',');
		var title = record.get('contractNum');
		extraParams = {
			'ovID' : record.get('id'),
			'blankID' : record.get('blank'),
			'objectName' : record.get('objectName'),
			'totalArea' : record.get('plotArea'),
			'plotPurpose' : record.get('plotPurpose'),
			'constDocType' : record.get('constDocType'),
			'constDocNum' : record.get('constDocNum'),
			'cadastralNumber' : record.get('cadastralNumber'),
			'locationTerritory' : record.get('locationTerritory'),
			'locationStreet' : record.get('locationStreet'),
			'locationBuilding' : record.get('locationBuilding'),
			'locationFlat' : record.get('locationFlat'),
			'valuationCostUAH' : record.get('valuationCostUAH'),
			'contractNum' : record.get('contractNum'),
			'orgName' : record.get('orgName'),
			'orgLocation' : record.get('orgLocation'),
			'orgAddress' : record.get('orgAddress'),
			'orgCertNumber' : record.get('orgCertNumber'),
			'orgCertDate' : record.get('orgCertDate'),
			'valuationDate' : record.get('valuationDate'),
			'valuator' : record.get('valuator'),
			valuatorCertNum : record.get('valuatorCertNum'),
			valuatorCertDate : record.get('valuatorCertDate'),
			attachmentDocs : record.get('attachmentDocs'),
			docNumRaise : record.get('docNumRaise'),
			docDateRaise : record.get('docDateRaise')
		};
		var win = Ext.widget('OVToAddNumLand', extraParams)
		win.title = title;
		win.active = true;
		win.autoShow = true;
		win.closable = true;
		win.autoScroll = true;

		var tabs = grid.up('viewport').getComponent('contentId').getComponent('toSyncTabId');

		var newTab = tabs.items.findBy(function(tab) {
			return tab.title === title;
		});
		if (!newTab) {
			newTab = tabs.add({
				xtype : win
			});
		}
		tabs.setActiveTab(newTab);
		Ext.getBody().unmask();

	},

	showOVToAddNumSimple : function(record) {
		Ext.getBody().unmask();
		var grid = this.getToSyncList();
		var selection = grid.getSelectionModel().getSelection()[0];
		extraParams = {
			'ovID' : selection.get('id'),
			'contractNum' : selection.get('contractNum'),
			attachmentDocs : selection.get('attachmentDocs')
		};
		var win = Ext.widget('OVToAddNumSimple', extraParams);
		win.setTitle('Номер договору : ' + selection.get('contractNum'));
		win.down('form').loadRecord(selection);
		win.show();
	},

	showTemplateToAdd : function(btn) {
		var ovID = btn.up('form').ovID
		extraParams = {
			'ovID' : ovID
		};
		var win = Ext.widget('OVTemplate', extraParams);
		win.setTitle('Збереження шаблону');
		win.show();
	},

	showTemplatesList : function(btn) {
		var ovID = btn.up('form').ovID
		extraParams = {
			'ovID' : ovID
		};
		var win = Ext.widget('OVTemplatesList', extraParams);
		win.setTitle('Вибір шаблону');
		win.show();
	},

	searchApplicant : function(btn) {
		var applicantType = this.getApplicantType().getValue();
		if (!applicantType) {
			this.showError("Виберіть тип замовника!")
			return;
		}
		extraParams = {
			'applicantType' : applicantType
		};
		var win = Ext.widget('OVTemplate', extraParams);
		win.setTitle('Збереження шаблону');
		win.show();
	},

	openOVToAddCert : function(grid, record) {
		var selection = grid.getSelectionModel().getSelection()[0];
		extraParams = {
			'ovID' : selection.get('id'),
			'contractNum' : selection.get('contractNum'),
			objFuncType : selection.get('objFuncType'),
			isManual : selection.get('isManual')

		};
		var win = Ext.widget('OVToAddCert', extraParams);
		win.setTitle('Номер договору : ' + selection.get('contractNum'));
		win.down('form').loadRecord(selection);
		win.show();
	},

	openOVToIssue : function(grid, record) {
		var selection = grid.getSelectionModel().getSelection()[0];
		extraParams = {
			'ovID' : selection.get('id'),
			'contractNum' : selection.get('contractNum'),
			attachmentDocs : selection.get('attachmentDocs'),
			objFuncType : selection.get('objFuncType'),
			isManual : selection.get('isManual')

		};
		var win = Ext.widget('IssueToApplicant', extraParams);
		win.setTitle('Номер договору : ' + selection.get('contractNum'));
		win.down('form').loadRecord(selection);
		win.show();
	},

	openOVHanded : function(grid, record) {
		var selection = grid.getSelectionModel().getSelection()[0];
		extraParams = {
			'ovID' : selection.get('id'),
			'contractNum' : selection.get('contractNum'),
			attachmentDocs : selection.get('attachmentDocs'),
			objFuncType : selection.get('objFuncType'),
			isManual : selection.get('isManual')
		};
		var win = Ext.widget('OVHanded', extraParams);
		win.setTitle('Номер договору : ' + selection.get('contractNum'));
		win.down('form').loadRecord(selection);
		win.show();
	},

	showovDetailedCard : function(record) {
		var grid, tabs, cardAlias;
		this.isManual = 0;
		if (record.$className == 'pf.model.AllReports') {
			grid = this.getAllReportsList();
			tabs = grid.up('viewport').getComponent('contentId').getComponent('allTabId');
		} else {
			grid = this.getInProcessList();
			tabs = grid.up('viewport').getComponent('contentId').getComponent('inProcessTabId');
		}
		if (record.get('objFuncType') == 2) {
			cardAlias = 'ovFlatCard';
		} else if (record.get('objFuncType') == 3) {
			cardAlias = 'ovLandCard';
		} else if (record.get('objFuncType') == 4) {
			cardAlias = 'ovHouseCard';
		} else {
			cardAlias = '';
		}
		var title = record.get('contractNum');
		extraParams = {
			'ovID' : record.get('id'),
			'contractNum' : record.get('contractNum'),
			'blankID' : record.get('blank'),
			'className' : record.$className,
			attachmentDocs : record.get('attachmentDocs')
		};
		var win = Ext.widget(cardAlias, extraParams);
		form = win.down('form');
		var newTab = tabs.items.findBy(function(tab) {
			// return tab.title === title;
			if (tab.title === title) {
				tab.close();
			}

		});
		win.title = title;
		win.active = true;
		win.autoShow = true;
		win.closable = true;
		form.loadRecord(record);
		if (!newTab) {
			newTab = tabs.add({
				xtype : win
			})
		}
		tabs.setActiveTab(newTab);
		var viewreport = Ext.ComponentQuery.query('viewport')[0]
		viewreport.getComponent('contentId').setLoading(false);

	},
	showOVSimpleCard : function(record) {
		var grid, tabs;
		this.isManual = 1;
		if (record.$className == 'pf.model.AllReports') {
			grid = this.getAllReportsList();
			tabs = grid.up('viewport').getComponent('contentId').getComponent('allTabId');
		} else {
			grid = this.getInProcessList();
			tabs = grid.up('viewport').getComponent('contentId').getComponent('inProcessTabId');
		}
		var title = record.get('contractNum');
		extraParams = {
			'ovID' : record.get('id'),
			'contractNum' : record.get('contractNum'),
			'blankID' : record.get('blank'),
			attachmentDocs : record.get('attachmentDocs')
		};
		var win = Ext.widget('ovSimpleCard', extraParams);
		form = win.down('form');
		win.title = title;
		win.active = true;
		win.autoShow = true;
		win.closable = true;
		form.loadRecord(record);
		// var tabs =
		// grid.up('viewport').getComponent('contentId').getComponent('inProcessTabId');

		var newTab = tabs.items.findBy(function(tab) {
			return tab.title === title;
		});
		if (!newTab) {
			newTab = tabs.add({
				xtype : win
			});
		}
		tabs.setActiveTab(newTab);
		var viewreport = Ext.ComponentQuery.query('viewport')[0]
		viewreport.getComponent('contentId').setLoading(false);

	},
	addInfrastructure : function() {
		var me = this, store = Ext.create('pf.store.common.Infrastructure'), selModel = Ext.create('Ext.selection.CheckboxModel');
		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			height : Ext.getBody().getViewSize().height * 0.6,
			width : Ext.getBody().getViewSize().width * 0.4,
			layout : 'fit',
			items : [ {
				xtype : 'grid',
				itemId : 'gridInfrastructure',
				selModel : selModel,
				columnLines : true,
				store : store,
				dockedItems : [ {
					xtype : 'pagingtoolbar',
					store : store,
					dock : 'bottom',
					displayInfo : true
				} ],
				columns : [ {
					xtype : 'rownumberer'
				}, {
					header : 'id',
					dataIndex : 'infrastructureId',
					flex : 1,
					hidden : true,
					hideable : false
				}, {
					header : 'Код',
					dataIndex : 'code'
				}, {
					header : "Найменування",
					dataIndex : 'name',
					flex : 1
				} ]
			} ],
			buttons : [ {
				xtype : 'button',
				text : loc.btnOK,
				formBind : true,
				itemId : 'acceptPayment',
				cls : 'btnSave',
				handler : this.test
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
	test : function(btn) {
		var grid = btn.up('window').getComponent('gridInfrastructure'), selections = grid.getSelectionModel().getSelection();
		var storeOV2InfrastructureId = Ext.getStore('storeOV2InfrastructureId');
		storeOV2InfrastructureId.removeAll();
		storeOV2InfrastructureId.add(selections);
		this.up('.window').close();

	},
	printOV : function() {
		var id = 1;
		var params = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
		var url = 'pf.proxy.PrintPage.cls?objId=' + id
		window.open(url, "Документ", params)
	},
	saveOV2ConstitutiveDocs : function() {
		var values = this.getGridOV2ConstitutiveDocs().getStore().data.items, constitutiveDocs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				docTypeID : values[i].get('docType') + '',
				docDescription : values[i].get('docDescription') + ''
			};
			constitutiveDocs.push(obj);
		}
		return constitutiveDocs;
	},
	saveOVHouse2ConstitutiveDocs : function() {
		var values = this.getGridOVHouse2ConstitutiveDocs().getStore().data.items, constitutiveDocs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				docTypeID : values[i].get('docType') + '',
				docBelongingID : values[i].get('docBelonging') + '',
				docDescription : values[i].get('docDescription') + ''
			};
			constitutiveDocs.push(obj);
		}
		return constitutiveDocs;
	},
	saveBlank2ValuationParts : function() {
		var values = this.getGridBlank2ValParts().getStore().data.items, valParts = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				ownerFio : values[i].get('ownerFio') + '',
				valuationPartNumer : values[i].get('valuationPartNumer') + '',
				valuationPartDenom : values[i].get('valuationPartDenom') + ''
			};
			valParts.push(obj);
		}
		return valParts;
	},
	saveOV2RoomDescription : function() {
		var values = this.getGridOV2RoomDescription().getStore().data.items, constitutiveDocs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				roomType : values[i].get('roomType') + "",
				floorType : values[i].get('floorType') + "",
				wallsType : values[i].get('wallsType') + "",
				ceilingType : values[i].get('ceilingType') + ""
			};
			constitutiveDocs.push(obj);
		}
		return constitutiveDocs;
	},
	saveOV2Analogue : function() {
		var values = this.getGridOV2Analogue().getStore().data.items, analogues = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				id : values[i].get('id') + '',
				rayon : values[i].get('rayon') + '',
				address : values[i].get('address') + '',
				origin : values[i].get('origin') + '',
				contacts : values[i].get('contacts') + '',
				object : values[i].get('object') + '',
				description : values[i].get('description') + '',
				area : values[i].get('area') + '',
				costAll : values[i].get('costAll') + '',
				costMetre : values[i].get('costMetre') + '',
				proposeDate : values[i].get('proposeDate') + '',
				totalCorr : values[i].get('totalCorr') + '',
				costCorrected : values[i].get('costCorrected') + '',
				// corrs : values[i].get('corrs')
				corrs : JSON.stringify(values[i].get('corrs'))

			};
			analogues.push(obj);
		}
		return analogues;
	},
	saveOV2AddDescription : function() {
		var values = this.getGridOV2AddDescription().getStore().data.items, constitutiveDocs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				addDescriptionID : values[i].get('addDescriptionID') + ''
			};
			constitutiveDocs.push(obj);
		}
		return constitutiveDocs;
	},
	saveOV2ExternalBuildings : function() {
		var values = this.getGridOV2ExtBuildings().getStore().data.items, constitutiveDocs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				buildingId : values[i].get('buildingId') + ''
			};
			constitutiveDocs.push(obj);
		}
		return constitutiveDocs;
	},
	saveOV2Infrastructure : function() {
		var values = this.getGridOV2Infrastructure().getStore().data.items, constitutiveDocs = [];
		for ( var i = 0; i <= values.length - 1; i++) {
			obj = {
				infrastructureID : values[i].get('infrastructureID') + ''
			};
			constitutiveDocs.push(obj);
		}
		return constitutiveDocs;
	},
	onChangeAppOwner : function(rdGrp, newVal, oldval) {
		var me = this, form = rdGrp.up('form'); // grid = me.getInProcessList(),
		// store = grid.getStore();
		var values = form.getValues();
		record = form.getRecord();

		if (newVal.isAppOwner) {
			rdGrp.up().getComponent('ownerTypeId').setValue(rdGrp.up().getComponent('applicantTypeID').getValue() + '');
			rdGrp.up().getComponent('ownerTypeId').setReadOnly(true);

			var physicalCont = rdGrp.up().getComponent('physicalCont');
			for ( var i = 0; i <= physicalCont.items.length - 1; i++) {
				physicalCont.items.items[i].setReadOnly(true);
			}
			var juridicalCont = rdGrp.up().getComponent('juridicalCont');
			for ( var i = 0; i <= juridicalCont.items.length - 1; i++) {
				juridicalCont.items.items[i].setReadOnly(true);
			}

			physicalCont.getComponent('ownerLastNameId').setRawValue(record.get('appPersonLastName'));
			physicalCont.getComponent('ownerFirstNameId').setRawValue(record.get('appPersonFirstName'));
			physicalCont.getComponent('ownerMiddleNameId').setRawValue(record.get('appPersonMiddleName'));
			juridicalCont.getComponent('ownerCompanyNameId').setRawValue(record.get('appCompanyName'));

			rdGrp.up('fieldset').getComponent('cntrOwnerAttorneyId').getComponent('ownerAttorneyNumberId').setRawValue('');
			rdGrp.up('fieldset').getComponent('cntrOwnerAttorneyId').getComponent('ownerAttorneyDateId').setValue('');

			rdGrp.up().getComponent('cntrOwnerAttorneyId').hide();
			// rdGrp.up().getComponent('otherOwnersId').show();
			// rdGrp.up().getComponent('otherOwnersId').setRawValue(record.get('otherOwners'));

		} else {
			rdGrp.up().getComponent('ownerTypeId').setReadOnly(false);

			var physicalCont = rdGrp.up().getComponent('physicalCont');
			for ( var i = 0; i <= physicalCont.items.length - 1; i++) {
				physicalCont.items.items[i].setReadOnly(false);
			}
			var juridicalCont = rdGrp.up().getComponent('juridicalCont');
			for ( var i = 0; i <= juridicalCont.items.length - 1; i++) {
				juridicalCont.items.items[i].setReadOnly(false);
			}

			rdGrp.up().getComponent('ownerTypeId').setValue('');
			physicalCont.getComponent('ownerLastNameId').setRawValue('');
			physicalCont.getComponent('ownerFirstNameId').setRawValue('');
			physicalCont.getComponent('ownerMiddleNameId').setRawValue('');
			juridicalCont.getComponent('ownerCompanyNameId').setRawValue('');

			rdGrp.up('fieldset').getComponent('cntrOwnerAttorneyId').show();

			// rdGrp.up().getComponent('otherOwnersId').hide();
			// rdGrp.up().getComponent('otherOwnersId').setRawValue('');
		}

	},

	onChangeJointOwnership : function(rdGrp, newVal, oldval) {
		var me = this, form = rdGrp.up('form');
		var gridBlank2ValParts = form.queryById('gridBlank2ValParts');
		var partValFieldset = form.queryById('partValContain');
		var otherOwnersField = form.queryById('otherOwnersField');
		if (newVal.isJointOwnership) {
			for ( var i = 0; i <= partValFieldset.items.items.length - 1; i++) {
				partValFieldset.items.items[i].setDisabled(true);
			}
			gridBlank2ValParts.setDisabled(true);
			gridBlank2ValParts.getStore().removeAll();
			otherOwnersField.show();
		}
		if (!newVal.isJointOwnership) {

			for ( var i = 0; i <= partValFieldset.items.items.length - 1; i++) {

				partValFieldset.items.items[i].setDisabled(false);
			}
			gridBlank2ValParts.setDisabled(false);
			otherOwnersField.setValue('');
			otherOwnersField.hide();

		}

	},

	calcStats : function(button) {
		var form = button.up('container')
		var values = this.getGridOV2Analogue().getStore().data.items, cost = [];
		midCost = 0;
		medCost = 0;
		if (values.length < 4) {
			this.showError(validMsg.calcStatsAnalogueCountError);
			return;
		}

		for ( var i = 0; i <= values.length - 1; i++) {
			costCorrected = parseFloat(values[i].get('costCorrected'));
			midCost = midCost + costCorrected;
			if (i == 0) {
				maxCost = costCorrected;
				minCost = costCorrected;
				maxIndex = i;
				minIndex = i
			}
			cost.push(costCorrected);
			if (maxCost < costCorrected) {
				maxCost = costCorrected;
				maxIndex = i
			}
			;
			if (minCost > costCorrected) {
				minCost = costCorrected;
				minIndex = i
			}
			;

		}
		for ( var i = 0; i <= values.length - 1; i++) {
			if ((i != maxIndex) && (i != minIndex)) {
				medCost = medCost + cost[i]
			}
			;
		}
		form.getComponent('statsMidId').setRawValue((midCost / 4).toFixed(2));
		form.getComponent('statsMedId').setRawValue((medCost / 2).toFixed(2));
		form.getComponent('statsMinId').setRawValue(minCost);
		form.getComponent('statsMaxId').setRawValue(maxCost);

	},

	calcValuationCost : function(button) {
		var container = button.up('container'), form = button.up('form');
		if ((Ext.isEmpty(form.down('[name=statsMin]').getValue())) && (Ext.isEmpty(form.down('[name=statsMax]').getValue())) && (Ext.isEmpty(form.down('[name=statsMed]').getValue())) && (Ext.isEmpty(form.down('[name=statsMid]').getValue()))) {
			Ext.getBody().unmask();
			this.showError('Необхідно розрахувати "Розрахувати статистичні показники"!');
			return;
		}
		if ((Ext.isEmpty(form.down('[name=areaAll]').getValue()))) {
			Ext.getBody().unmask();
			this.showError('Заповніть поле "Загальна площа"!');
			return;
		}
		if ((Ext.isEmpty(form.down('[name=currencyRate]').getValue()))) {
			Ext.getBody().unmask();
			this.showError('Заповніть поле "Курс грн./дол."!');
			return;
		}

		var maxVal = 0, values = form.getValues(), statsMed = parseFloat(values.statsMed), statsMid = parseFloat(values.statsMid);
		if (statsMed > statsMid) {
			maxVal = statsMed
		} else {
			maxVal = statsMid
		}
		area = parseFloat(container.getComponent('areaAllId').getValue());
		rate = parseFloat(container.getComponent('currencyRateId').getValue());
		container.getComponent('valuationCostUAHId').setRawValue((area * rate * maxVal).toFixed(2));
		container.getComponent('valuationCostUSDId').setRawValue((area * maxVal).toFixed(2));
	},
	/**
	 * takeOV
	 */
	takeOV : function(action, grid, record) {
		var me = this;
		Ext.Msg.confirm(loc.msgConfirnmActionTitle, loc.msgConfirnmActionText, function(btn) {
			if (btn == 'yes') {
				ovId = record.get('id');
				var url = 'pf.proxy.manager.Create.cls';
				var params = {
					action : action,
					ovId : ovId
				}
				me.ajaxRequest(action, '', params, url, me, me.afterTakeOV);
			}
		});
	},
	afterTakeOV : function(action) {
		var stores = [];
		if (action == 'takeOVInProcess') {
			if (Ext.getStore('storeInProcessId')) {
				stores.push(Ext.getStore('storeInProcessId'));
			} else {
				Ext.create('pf.store.InProcess');
			}
			if (Ext.getStore('storeNewId')) {
				stores.push(Ext.getStore('storeNewId'));
			}

		} else if (action == 'takeOVToAddNum') {
			if (Ext.getStore('storeToSyncId')) {
				stores.push(Ext.getStore('storeToSyncId'));
			} else {
				Ext.create('pf.store.ToSync');
			}
			if (Ext.getStore('storeFinishedId')) {
				stores.push(Ext.getStore('storeFinishedId'));
			}
		}
		this.reloadStores(stores);
	},
	/**
	 * saveOVCorrections
	 */
	getCorrectionsJSON : function(button) {
		return this.getDataCorrections(button);
	},
	// end
	getColumnsImageTable : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			flex : 1,
			hidden : true,
			hideable : false
		}, {
			header : "Дата </br> оцінки </br> &nbsp",
			dataIndex : 'valuationDate',
			flex : 1.5,
			filter : true,
			renderer : Ext.util.Format.dateRenderer('d.m.Y')
		}, {
			header : "№ </br> договору </br> &nbsp",
			dataIndex : 'contractNum',
			flex : 1.5,
			filter : true
		}, {
			header : 'Населений </br> пункт </br> &nbsp',
			dataIndex : 'objCity',
			flex : 2,
			filter : true
		}, {
			header : "Район </br> &nbsp </br> &nbsp",
			dataIndex : 'objRayon',
			flex : 2,
			filter : true
		}, {
			header : 'Область  </br> &nbsp </br> &nbsp',
			dataIndex : 'objRegion',
			flex : 2,
			filter : true
		}, {
			header : 'Адреса </br> &nbsp </br> &nbsp',
			dataIndex : 'address',
			flex : 2,
			filter : true
		}, {
			header : "Площа </br> кв.м. </br> &nbsp",
			dataIndex : 'totalArea',
			flex : 1,
			filter : true
		} ]
	},
	showListOV : function(button) {
		var me = this, objFuncType = '';
		var originalRecord = button.up('panel').down('form').getRecord();
		var cardAlias = button.up('form').alias[0], cardName = cardAlias.substring(7, cardAlias.length), columns = me.getColumnsImageTable();
		var store = Ext.create('pf.store.common.OVTemplate');
		switch (cardName) {
		case 'ovFlatCard':
			store.objFuncType = '02';
			columns.push({
				header : "Кількість </br> кімнат </br> &nbsp",
				dataIndex : 'roomQty',
				flex : 1,
				filter : true
			}, {
				header : 'Номер </br> поверху </br> &nbsp',
				dataIndex : 'objectFloorNum',
				flex : 1,
				filter : true
			}, {
				header : 'Кіл-сть п-в </br> (в буд) </br> &nbsp',
				dataIndex : 'floorsQty',
				flex : 1,
				filter : true
			}, {
				header : 'Тип </br>  будівлі </br> &nbsp',
				dataIndex : 'buildingType',
				flex : 2,
				filter : true
			}, {
				header : "Загальний </br> стан </br> квартири",
				dataIndex : 'generalRoomCondition',
				flex : 1,
				filter : true
			}, {
				header : "Середнє загальне </br> коригування",
				dataIndex : 'totalCorr',
				flex : 1,
				filter : false
			}, {
				header : "Вартість </br>  дол./ кв.м.",
				dataIndex : 'costMetre',
				flex : 1,
				filter : false
			}, {
				header : "Вартість дол.",
				dataIndex : 'valuationCostUSD',
				flex : 1,
				filter : false
			});
			break;
		case 'ovLandCard':
			store.objFuncType = '03'
			columns.push({
				header : 'Цільове </br> призначення </br> &nbsp',
				dataIndex : 'plotPurpose',
				flex : 2,
				filter : true
			}, {
				header : "Середнє загальне </br> коригування",
				dataIndex : 'totalCorr',
				flex : 1,
				filter : false
			}, {
				header : "Вартість </br>  дол./ кв.м.",
				dataIndex : 'costMetre',
				flex : 1,
				filter : false
			}, {
				header : "Вартість дол.",
				dataIndex : 'valuationCostUSD',
				flex : 1,
				filter : false
			});
			break;
		case 'ovHouseCard':
			store.objFuncType = '04';
			columns.push({
				header : 'Кіл-сть п-в </br> (в буд) </br> &nbsp',
				dataIndex : 'floorsQty',
				flex : 1,
				filter : true
			}, {
				header : "Середнє загальне </br> коригування",
				dataIndex : 'totalCorr',
				flex : 1,
				filter : false
			}, {
				header : 'Приватизована </br> земельна </br> ділянка',
				dataIndex : 'isPrivateLand',
				flex : 1,
				renderer : function(value, metaData, record, row, col, store, gridView) {
					var value = (value) ? 'Так' : 'Ні';
					return value
				}
			}, {
				header : "Площа земельної </br> ділянки",
				dataIndex : 'plotArea',
				flex : 1,
				filter : false
			}, {
				header : "Вартість дол./кв.м. </br> (зем. д-ки)",
				dataIndex : 'costMetrePlot',
				flex : 1,
				filter : false
			}, {
				header : "Вартість дол./кв.м. </br> (будинку)",
				dataIndex : 'costMetre',
				flex : 1,
				filter : false
			}, {
				header : "Вартість дол.",
				dataIndex : 'valuationCostUSD',
				flex : 1,
				filter : false
			});
			break;
		}

		var win = Ext.create('Ext.window.Window', {
			autoScroll : true,
			plain : true,
			modal : true,
			closable : false,
			buttonAlign : 'center',
			border : false,
			autoShow : false,
			titleCollapse : false,
			height : Ext.getBody().getViewSize().height * 0.9,
			width : Ext.getBody().getViewSize().width * 0.95,
			layout : 'fit',
			title : 'Сформовані звіти',
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
							me.copyOVData(button.up('form').ovID, originalRecord, grid, record, item, index);
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
						items : columns
					}
				} ]
			} ]
		});
		win.show();
	},
	copyOVData : function(originalOVId, originalRecord, grid, record, item, index) {
		var mask = new Ext.LoadMask(Ext.getBody(), {
			msg : "Будь ласка, зачекайте ..."
		});
		mask.show();
		var me = this, shortUrl = 'pf.proxy.manager.Create.cls';
		params = {
			action : 'copyOVData',
			imageOVId : record.get('id'),
			ovId : originalOVId
		}
		Ext.Ajax.request({
			url : shortUrl,
			params : params,
			success : function(response, options) {
				var result = Ext.decode(response.responseText);
				if (result.success) {
					me.afterCopyOVData(originalRecord)
				} else {
					me.showError(result.message + '' + result.code + '<br/>' + result.data);
				}
			},
			failure : function(response, options) {
				var result = Ext.decode(response.responseText);
				me.showError(result.message + '_' + result.code + '<br/>' + result.data);
			}
		});

	},
	editOV2Pictures : function(editor, obj) {
		if (obj.record.dirty) {
			Ext.getBody().mask('Збереження...');
			var data = obj.record.data;
			var params = {
				action : 'editOV2Pictures',
				data : JSON.stringify(data)
			}
			this.ajaxRequest('', '', params, 'pf.proxy.manager.Create.cls');

		}
	},
	afterCopyOVData : function(record) {
		var me = this;
		me.loadDetail(record, me, me.showovDetailedCard);
	},

	getIsManual : function() {
		return this.isManual;
	},
	getFinish : function() {
		return this.finish;
	}
});