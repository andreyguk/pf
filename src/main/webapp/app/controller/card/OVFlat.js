Ext.define('pf.controller.card.OVFlat', {
	extend : 'pf.controller.card.ObjectValuation',
	views : [ 'pf.view.form.list.InProcessList', 'pf.view.form.card.ov.OVTemplate', 'pf.view.form.card.ov.OVTemplatesList', 'pf.view.form.card.ov.flat.OVFlatCard', 'pf.view.form.card.ov.simple.OVSimpleCard', 'pf.view.form.card.ov.OVAbstract', 'pf.view.form.card.ov.OVToAddNum', 'pf.view.form.card.ov.OVToAddNumSimple', 'pf.view.form.card.ov.OVToAddCert', 'pf.view.form.card.ov.IssueToApplicant', 'pf.view.form.card.ov.OVHanded', 'pf.view.form.list.ToSyncList', 'pf.view.form.list.NewList', 'pf.view.form.list.FinishedList', 'pf.view.form.list.AllReportsList', 'pf.view.form.card.ov.flat.TabConditionApartment' ],
	refs : [ {
		ref : 'InProcessList',
		selector : '[xtype=inProcessList]'
	}, {
		ref : 'AllReportsList',
		selector : '[xtype=allReportsList]'
	}, {
		ref : 'ovFlatCard',
		selector : '[xtype=ovFlatCard]'
	}, {
		ref : 'gridOV2ConstitutiveDocs',
		selector : '[xtype=ovFlatCard] grid#gridOV2ConstitutiveDocs'
	}, {
		ref : 'gridOV2RoomDescription',
		selector : '[xtype=ovFlatCard] grid#gridOV2RoomDescription'
	}, {
		ref : 'gridOV2AddDescription',
		selector : '[xtype=ovFlatCard] grid#gridOV2AddDescription'
	}, {
		ref : 'gridOV2Infrastructure',
		selector : '[xtype=ovFlatCard] grid#gridOV2Infrastructure'
	}, {
		ref : 'gridBlank2ValParts',
		selector : '[xtype=ovFlatCard] grid#gridBlank2ValParts'
	}, {
		ref : 'gridOV2Analogue',
		selector : '[xtype=ovFlatCard] grid#gridOV2Analogue'
	}, {
		ref : 'buttonSave',
		selector : '[xtype=ovFlatCard] button#saveToInProcess'
	}, {
		ref : 'buttonFinish',
		selector : '[xtype=ovFlatCard] button#save'
	} ],
	init : function() {
		this.listen({
			component : {
				'[xtype=ovFlatCard] button#saveToInProcess' : {
					click : this.saveObject
				},
				'[xtype=ovFlatCard] button#saveToInProcessAll' : {
					click : this.saveObjectValuation
				},
				'[xtype=ovFlatCard] button#save' : {
					click : this.saveObject
				},
				'[xtype=ovFlatCard] button#saveAsTemplate' : {
					click : this.showTemplateToAdd
				},
				'[xtype=ovFlatCard] button#fillFromTemplate' : {
					click : this.showTemplatesList
				},
				'[xtype=ovFlatCard] radiogroup#radiogroupApplicant' : {
					change : this.onChangeAppOwner
				},
				'[xtype=ovFlatCard] radiogroup#radiogroupJointOwnership' : {
					change : this.onChangeJointOwnership
				},
				'[xtype=ovSimpleCard] radiogroup#radiogroupApplicant' : {
					change : this.onChangeAppOwner
				},
				'[xtype=ovFlatCard] button#calcStats' : {
					click : this.calcStats
				},
				'[xtype=ovFlatCard] button#calcValuationCost' : {
					click : this.calcValuationCost
				},
				'[xtype=inProcessList]' : {
					editOVFlat : this.editOV
				},
				'[xtype=allReportsList]' : {
					editOVFlat : this.editOV
				},
				'[xtype=ov.flat.tabConditionApartment]' : {
					deleteOVPictures : this.onDelete
				},
				'[xtype=ov.flat.tabConditionApartment] grid#gridOV2PicturesId' : {
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

		var constitutiveDocs = me.saveOV2ConstitutiveDocs();
		record.set("constitutiveDocs", JSON.stringify(constitutiveDocs));

		var roomDescription = me.saveOV2RoomDescription();
		record.set("roomDescription", JSON.stringify(roomDescription));

		var addDescription = me.saveOV2AddDescription();
		record.set("addDescription", JSON.stringify(addDescription));

		var infrastructure = me.saveOV2Infrastructure();
		record.set("infrastructure", JSON.stringify(infrastructure));

		var valuationParts = me.saveBlank2ValuationParts();
		record.set("valuationParts", JSON.stringify(valuationParts));

		var analogue = me.saveOV2Analogue();
		record.set("analogue", JSON.stringify(analogue));

		var corrections = me.getCorrectionsJSON(button);
		if (corrections) {
			record.set("corrections", JSON.stringify(corrections));
		}

		record.set('isManual', me.getIsManual())

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
				if (me.getFinish() == 1) {
					me.sendOVToServer(result.recordID);
					button.up('panel').close();
					// Ext.getStore('InProcess').reload();
					// Ext.getStore('Finished').reload();
				}
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		store.sync(callbacks);
		return me.ovId
	},
	/**
	 * 
	 */
	getDataCorrections : function(button) {
		var form = button.up('form');
		var an1totalCorr = form.down('[itemId=an1totalCorr]').getValue(), an1costCorrected = form.down('[itemId=an1costCorrected]').getValue();
		var an2totalCorr = form.down('[itemId=an2totalCorr]').getValue(), an2costCorrected = form.down('[itemId=an2costCorrected]').getValue();
		var an3totalCorr = form.down('[itemId=an3totalCorr]').getValue(), an3costCorrected = form.down('[itemId=an3costCorrected]').getValue();
		var an4totalCorr = form.down('[itemId=an4totalCorr]').getValue(), an4costCorrected = form.down('[itemId=an4costCorrected]').getValue();

		if ((an1totalCorr == '') || (an1costCorrected == '') || (an2totalCorr == '') || (an2costCorrected == '') || (an3totalCorr == '') || (an3costCorrected == '') || (an4totalCorr == '') || (an4costCorrected == '')) {
			return false;
		}

		var corrections = [ {
			an1corrOnBargain : form.down('[itemId=an1corrOnBargain]').getValue(),
			an1corrOnArea : form.down('[itemId=an1corrOnArea]').getValue(),
			an1corrOnDate : form.down('[itemId=an1corrOnDate]').getValue(),
			an1corrOnFloor : form.down('[itemId=an1corrOnFloor]').getValue(),
			an1corrOnCondition : form.down('[itemId=an1corrOnCondition]').getValue(),
			an1corrOnLocation : form.down('[itemId=an1corrOnLocation]').getValue(),
			an1corrOnBuildingType : form.down('[itemId=an1corrOnBuildingType]').getValue(),
			an1corrOnWalls : form.down('[itemId=an1corrOnWalls]').getValue(),
			an1corrOnFurniture : form.down('[itemId=an1corrOnFurniture]').getValue(),
			an1corrOnCom : form.down('[itemId=an1corrOnCom]').getValue(),
			an1corrOther : form.down('[itemId=an1corrOther]').getValue(),
			an1totalCorr : form.down('[itemId=an1totalCorr]').getValue(),
			an1costCorrected : form.down('[itemId=an1costCorrected]').getValue()
		}, {
			an2corrOnBargain : form.down('[itemId=an2corrOnBargain]').getValue(),
			an2corrOnArea : form.down('[itemId=an2corrOnArea]').getValue(),
			an2corrOnDate : form.down('[itemId=an2corrOnDate]').getValue(),
			an2corrOnFloor : form.down('[itemId=an2corrOnFloor]').getValue(),
			an2corrOnCondition : form.down('[itemId=an2corrOnCondition]').getValue(),
			an2corrOnLocation : form.down('[itemId=an2corrOnLocation]').getValue(),
			an2corrOnBuildingType : form.down('[itemId=an2corrOnBuildingType]').getValue(),
			an2corrOnWalls : form.down('[itemId=an2corrOnWalls]').getValue(),
			an2corrOnFurniture : form.down('[itemId=an2corrOnFurniture]').getValue(),
			an2corrOnCom : form.down('[itemId=an2corrOnCom]').getValue(),
			an2corrOther : form.down('[itemId=an2corrOther]').getValue(),
			an2totalCorr : form.down('[itemId=an2totalCorr]').getValue(),
			an2costCorrected : form.down('[itemId=an2costCorrected]').getValue()
		}, {
			an3corrOnBargain : form.down('[itemId=an3corrOnBargain]').getValue(),
			an3corrOnArea : form.down('[itemId=an3corrOnArea]').getValue(),
			an3corrOnDate : form.down('[itemId=an3corrOnDate]').getValue(),
			an3corrOnFloor : form.down('[itemId=an3corrOnFloor]').getValue(),
			an3corrOnCondition : form.down('[itemId=an3corrOnCondition]').getValue(),
			an3corrOnLocation : form.down('[itemId=an3corrOnLocation]').getValue(),
			an3corrOnBuildingType : form.down('[itemId=an3corrOnBuildingType]').getValue(),
			an3corrOnWalls : form.down('[itemId=an3corrOnWalls]').getValue(),
			an3corrOnFurniture : form.down('[itemId=an3corrOnFurniture]').getValue(),
			an3corrOnCom : form.down('[itemId=an3corrOnCom]').getValue(),
			an3corrOther : form.down('[itemId=an3corrOther]').getValue(),
			an3totalCorr : form.down('[itemId=an3totalCorr]').getValue(),
			an3costCorrected : form.down('[itemId=an3costCorrected]').getValue()
		}, {
			an4corrOnBargain : form.down('[itemId=an4corrOnBargain]').getValue(),
			an4corrOnArea : form.down('[itemId=an4corrOnArea]').getValue(),
			an4corrOnDate : form.down('[itemId=an4corrOnDate]').getValue(),
			an4corrOnFloor : form.down('[itemId=an4corrOnFloor]').getValue(),
			an4corrOnCondition : form.down('[itemId=an4corrOnCondition]').getValue(),
			an4corrOnLocation : form.down('[itemId=an4corrOnLocation]').getValue(),
			an4corrOnBuildingType : form.down('[itemId=an4corrOnBuildingType]').getValue(),
			an4corrOnWalls : form.down('[itemId=an4corrOnWalls]').getValue(),
			an4corrOnFurniture : form.down('[itemId=an4corrOnFurniture]').getValue(),
			an4corrOnCom : form.down('[itemId=an4corrOnCom]').getValue(),
			an4corrOther : form.down('[itemId=an4corrOther]').getValue(),
			an4totalCorr : form.down('[itemId=an4totalCorr]').getValue(),
			an4costCorrected : form.down('[itemId=an4costCorrected]').getValue()
		} ]

		return corrections;
	}

});