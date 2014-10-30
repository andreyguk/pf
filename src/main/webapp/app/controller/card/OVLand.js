Ext.define('pf.controller.card.OVLand', {
	extend : 'pf.controller.card.ObjectValuation',
	views : [ 'pf.view.form.list.InProcessList', 'pf.view.form.card.ov.OVTemplate', 'pf.view.form.card.ov.OVTemplatesList', 'pf.view.form.card.ov.flat.OVFlatCard', 'pf.view.form.card.ov.land.OVLandCard', 'pf.view.form.card.ov.simple.OVSimpleCard', 'pf.view.form.card.ov.OVAbstract', 'pf.view.form.card.ov.OVToAddNum', 'pf.view.form.card.ov.OVToAddNumSimple', 'pf.view.form.card.ov.OVToAddCert', 'pf.view.form.card.ov.IssueToApplicant', 'pf.view.form.card.ov.OVHanded', 'pf.view.form.list.ToSyncList', 'pf.view.form.list.NewList', 'pf.view.form.list.FinishedList', 'pf.view.form.list.AllReportsList', 'pf.view.form.card.ov.land.TabInfrastructure' ],
	refs : [ {
		ref : 'ovLandCard',
		selector : '[xtype=ovLandCard]'
	}, {
		ref : 'gridOV2ConstitutiveDocs',
		selector : '[xtype=ovLandCard] grid#gridOV2ConstitutiveDocs'
	}, {
		ref : 'gridOV2AddDescription',
		selector : '[xtype=ovLandCard] grid#gridOV2AddDescription'
	}, {
		ref : 'gridOV2Infrastructure',
		selector : '[xtype=ovLandCard] grid#gridOV2Infrastructure'
	}, {
		ref : 'gridBlank2ValParts',
		selector : '[xtype=ovLandCard] grid#gridBlank2ValParts'
	}, {
		ref : 'gridOV2Analogue',
		selector : '[xtype=ovLandCard] grid#gridOV2Analogue'
	}, {
		ref : 'buttonSave',
		selector : '[xtype=ovLandCard] button#saveToInProcess'
	}, {
		ref : 'buttonFinish',
		selector : '[xtype=ovLandCard] button#save'
	}, {
		ref : 'InProcessList',
		selector : '[xtype=inProcessList]'
	}, {
		ref : 'AllReportsList',
		selector : '[xtype=allReportsList]'
	} ],
	init : function() {
		this.listen({
			component : {
				/*
				 * 'viewport content inProcessList' : { itemdblclick :
				 * this.editOV }, 'viewport content allReportsList' : {
				 * itemdblclick : this.editOV },
				 */
				'[xtype=ovLandCard] button#saveToInProcess' : {
					click : this.saveObject
				},
				'[xtype=ovLandCard] button#saveToInProcessAll' : {
					click : this.saveObjectValuation
				},
				'[xtype=ovLandCard] button#save' : {
					click : this.saveObject
				},
				'[xtype=ovLandCard] button#saveAsTemplate' : {
					click : this.showTemplateToAdd
				},
				'[xtype=ovLandCard] button#fillFromTemplate' : {
					click : this.showTemplatesList
				},
				'[xtype=ovLandCard] radiogroup#radiogroupApplicant' : {
					change : this.onChangeAppOwner
				},
				'[xtype=ovLandCard] radiogroup#radiogroupJointOwnership' : {
					change : this.onChangeJointOwnership
				},
				'[xtype=inProcessList]' : {
					editOVLand : this.editOV
				},
				'[xtype=allReportsList]' : {
					editOVLand : this.editOV
				},
				'[xtype=ov.land.tabInfrastructure]' : {
					deleteOVPictures : this.onDelete
				},
				'[xtype=ov.land.tabInfrastructure] grid#gridOV2PicturesId' : {
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

		var addDescription = me.saveOV2AddDescription();
		record.set("addDescription", JSON.stringify(addDescription));

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
			an1corrOnLandImprovements : form.down('[itemId=an1corrOnLandImprovements]').getValue(),
			an1corrOnLandRights : form.down('[itemId=an1corrOnLandRights]').getValue(),
			an1corrOnLandPurpose : form.down('[itemId=an1corrOnLandPurpose]').getValue(),
			an1corrOnLocation : form.down('[itemId=an1corrOnLocation]').getValue(),
			an1corrOnLandDescr : form.down('[itemId=an1corrOnLandDescr]').getValue(),
			an1corrOnCom : form.down('[itemId=an1corrOnCom]').getValue(),
			an1corrOnLandTransport : form.down('[itemId=an1corrOnLandTransport]').getValue(),
			an1corrOnLandEnvironment : form.down('[itemId=an1corrOnLandEnvironment]').getValue(),
			an1totalCorr : form.down('[itemId=an1totalCorr]').getValue(),
			an1costCorrected : form.down('[itemId=an1costCorrected]').getValue()
		}, {
			an2corrOnBargain : form.down('[itemId=an2corrOnBargain]').getValue(),
			an2corrOnArea : form.down('[itemId=an2corrOnArea]').getValue(),
			an2corrOnLandImprovements : form.down('[itemId=an2corrOnLandImprovements]').getValue(),
			an2corrOnLandRights : form.down('[itemId=an2corrOnLandRights]').getValue(),
			an2corrOnLandPurpose : form.down('[itemId=an2corrOnLandPurpose]').getValue(),
			an2corrOnLocation : form.down('[itemId=an2corrOnLocation]').getValue(),
			an2corrOnLandDescr : form.down('[itemId=an2corrOnLandDescr]').getValue(),
			an2corrOnCom : form.down('[itemId=an2corrOnCom]').getValue(),
			an2corrOnLandTransport : form.down('[itemId=an2corrOnLandTransport]').getValue(),
			an2corrOnLandEnvironment : form.down('[itemId=an2corrOnLandEnvironment]').getValue(),
			an2totalCorr : form.down('[itemId=an2totalCorr]').getValue(),
			an2costCorrected : form.down('[itemId=an2costCorrected]').getValue()
		}, {
			an3corrOnBargain : form.down('[itemId=an3corrOnBargain]').getValue(),
			an3corrOnArea : form.down('[itemId=an3corrOnArea]').getValue(),
			an3corrOnLandImprovements : form.down('[itemId=an3corrOnLandImprovements]').getValue(),
			an3corrOnLandRights : form.down('[itemId=an3corrOnLandRights]').getValue(),
			an3corrOnLandPurpose : form.down('[itemId=an3corrOnLandPurpose]').getValue(),
			an3corrOnLocation : form.down('[itemId=an3corrOnLocation]').getValue(),
			an3corrOnLandDescr : form.down('[itemId=an3corrOnLandDescr]').getValue(),
			an3corrOnCom : form.down('[itemId=an3corrOnCom]').getValue(),
			an3corrOnLandTransport : form.down('[itemId=an3corrOnLandTransport]').getValue(),
			an3corrOnLandEnvironment : form.down('[itemId=an3corrOnLandEnvironment]').getValue(),
			an3totalCorr : form.down('[itemId=an3totalCorr]').getValue(),
			an3costCorrected : form.down('[itemId=an3costCorrected]').getValue()
		}, {
			an4corrOnBargain : form.down('[itemId=an4corrOnBargain]').getValue(),
			an4corrOnArea : form.down('[itemId=an4corrOnArea]').getValue(),
			an4corrOnLandImprovements : form.down('[itemId=an4corrOnLandImprovements]').getValue(),
			an4corrOnLandRights : form.down('[itemId=an4corrOnLandRights]').getValue(),
			an4corrOnLandPurpose : form.down('[itemId=an4corrOnLandPurpose]').getValue(),
			an4corrOnLocation : form.down('[itemId=an4corrOnLocation]').getValue(),
			an4corrOnLandDescr : form.down('[itemId=an4corrOnLandDescr]').getValue(),
			an4corrOnCom : form.down('[itemId=an4corrOnCom]').getValue(),
			an4corrOnLandTransport : form.down('[itemId=an4corrOnLandTransport]').getValue(),
			an4corrOnLandEnvironment : form.down('[itemId=an4corrOnLandEnvironment]').getValue(),
			an4totalCorr : form.down('[itemId=an4totalCorr]').getValue(),
			an4costCorrected : form.down('[itemId=an4costCorrected]').getValue()
		} ]

		return corrections;
	}
});