Ext.define('pf.controller.card.Applicant', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.card.applicant.ApplicantPhysicalCard', 'pf.view.form.card.applicant.ApplicantJuridicalCard', 'pf.view.form.card.ViewBlank', 'pf.view.form.card.ViewBlankPaid', 'pf.view.form.card.CreateBlank', 'pf.view.form.card.applicant.ApplicantList' ],
	refs : [ {
		ref : 'applicantVB',
		selector : '[xtype=viewBlank] [name=applicant]'
	}, {
		ref : 'applicantVBP',
		selector : '[xtype=viewBlankPaid] textfield#applicant'
	}, {
		ref : 'createBlank',
		selector : '[xtype=createBlank]'
	}, {
		ref : 'applicantList',
		selector : '[xtype=applicantList]'
	} ],
	init : function() {
		this.listen({
			component : {
				'[xtype=applicantPhysicalCard] button#save' : {
					click : this.saveApplicantPhysicalCard
				},
				'[xtype=applicantJuridicalCard] button#save' : {
					click : this.saveApplicantJuridicalCard
				}
			},
			store : {}
		});
	},

	saveApplicantPhysicalCard : function(button, e, eOpts) {
		var me = this, store = Ext.getStore('storeApplicantPhysicalId'), win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues(), callbacks;
		record.set(values);

		if (!record.dirty) {
			win.close();
			store.reload();
			return;
		}
		callbacks = {
			success : function(records, operation) {
				me.closeApplicantCard(button, records)
				store.reload();
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		Ext.getBody().mask('Збереження...');
		if (record.phantom) {
			store.rejectChanges();
			store.add(record);
		}
		store.sync(callbacks);
	},

	saveApplicantJuridicalCard : function(button, e, eOpts) {
		var me = this, store = Ext.getStore('storeApplicantJuridicalId'), win = button.up('window'), form = win.down('form'), record = form.getRecord(), values = form.getValues(), callbacks;
		record.set(values);

		if (!record.dirty) {
			win.close();
			store.reload();
			return;
		}
		callbacks = {
			success : function(records, operation) {
				me.closeApplicantCard(button, records)
				store.reload();
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		Ext.getBody().mask('Збереження...');
		if (record.phantom) {
			store.rejectChanges();
			store.add(record);
		}
		store.sync(callbacks);
	},
	onSave : function(button) {
		var me = this;
		me.save(button, me, me.saveObject);
	},
	/**
	 * close card
	 */
	closeApplicantCard : function(button, records) {
		var win = button.up('window'), form = win.down('form'), values = form.getValues(), createBlank = this.getCreateBlank(), applicantName;
		var result = Ext.decode(records.operations[0].response.responseText), newApplicantId = result.recordID;
		createBlank.down('form').down('[itemId=applicantId]').setValue(newApplicantId);
		applicantName = (values.applicantType == 4) ? values.appCompanyName : values.appPersonLastName + ' ' + values.appPersonFirstName + ' ' + values.appPersonMiddleName;
		createBlank.down('form').down('[itemId=applicantNameId]').setValue(applicantName);
		win.close();
		this.getApplicantList().close();

	},
	/**
	 * какой объект сохраняем?
	 */
	whatSave : function(form) {
		var me = this, store = '', action = '', applicantName = '', userRoles = '', panel = form.up('panel'), values = form.getValues();
		switch (panel.itemId) {
		case 'applicantPhysicalCardId':
			action = 'updateApplicantPhysical';
			applicantName = values.appPersonLastName + ' ' + values.appPersonFirstName.charAt(0) + '.' + values.appPersonMiddleName.charAt(0) + '.'
			break;
		case 'applicantJuridicalCardId':
			action = 'updateApplicantJuridical';
			applicantName = values.appCompanyName;
			break;
		}
		return {
			action : action,
			applicantName : applicantName
		};
	},
	saveObject : function(button) {
		var me = this, form = button.up('form'), store = '', action = '', userRoles = '';
		var saveCnf = me.whatSave(form);
		action = saveCnf.action;
		applicantName = saveCnf.applicantName;

		if (form.isValid()) {
			form.submit({
				url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Create.cls',
				params : {
					action : action
				},
				waitMsg : 'Збереження',
				success : function(request, options) {
					var result = Ext.decode(options.response.responseText);
					if (result.success) {
						me.showInfo(me.getMessage(result.code));
						button.up('form').up('window').close();
						if (me.getApplicantVB()) {
							me.getApplicantVB().setValue(applicantName);
						}
						if (me.getApplicantVBP()) {
							me.getApplicantVBP().setValue(applicantName);
						}
						if (Ext.getStore('storeUnpaidlId')) {
							Ext.getStore('storeUnpaidlId').reload();
						}
						if (Ext.getStore('storePaidId')) {
							Ext.getStore('storePaidId').reload();
						}
						if (Ext.getStore('storeAccountedId')) {
							Ext.getStore('storeAccountedId').reload();
						}
					} else {
						me.showError(me.getMessage(result.code));
					}
				},
				failure : function(response, options) {
					var result = Ext.decode(options.response.responseText);
					me.showError(me.getMessage(result.code));
				}
			});
		}
	}

});