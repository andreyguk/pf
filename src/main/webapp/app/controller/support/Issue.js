Ext.define('pf.controller.support.Issue', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.support.InProcessIssueCard', 'pf.view.form.support.supportRequestList.NewIssueList', 'pf.view.form.support.supportRequestList.InProcessIssueList', 'pf.view.form.support.dataUpdateList.ChangeOVStateList', 'pf.view.form.support.dataUpdateList.ChangeIsManualList', 'pf.view.form.support.dataUpdateList.EditBlankList', 'pf.view.form.support.dataUpdateList.EditApplicantList', 'pf.view.form.support.dataUpdateList.DeleteOVList', 'pf.view.form.support.ChangeOVStateCard', 'pf.view.form.support.ChangeIsManualCard', 'pf.view.form.card.EditBlank', 'pf.view.form.card.applicant.Applicant', 'pf.view.form.support.dataUpdateList.ChangeOVCurUserList', 'pf.view.form.support.ChangeOVCurUserCard', 'pf.view.form.support.supportRequestList.RejectedIssueList', 'pf.view.form.support.supportRequestList.ResolvedIssueList', 'pf.view.form.support.supportRequestList.AllIssueList',
			'pf.view.form.support.ChangeOVValuationDateCard', 'pf.view.form.support.dataUpdateList.ChangeOVValuationDateList','pf.view.form.card.applicant.ApplicantPhysicalCard', 'pf.view.form.card.applicant.ApplicantJuridicalCard' ],
	init : function() {
		this.listen({
			component : {
				'[xtype=newIssueList]' : {
					takeIssue : this.takeIssueToInProcess,
					itemdblclick : this.openIssueCard
				},
				'[xtype=deleteOVList]' : {
					deleteOV : this.deleteOV
				},
				'[xtype=inProcessIssueCard] button#resolveIssue' : {
					click : this.saveObject
				},
				'[xtype=inProcessIssueCard] button#rejectIssue' : {
					click : this.saveObject
				},
				'[xtype=changeOVStateCard] button#changeState' : {
					click : this.saveObject
				},
				'[xtype=changeIsManualCard] button#changeIsManual' : {
					click : this.saveObject
				},
				'[xtype=changeOVCurUserCard] button#changeUser' : {
					click : this.saveObject
				},
				'[xtype=editBlank] button#updateBlank' : {
					click : this.saveObject
				},
				'[xtype=applicantPhysicalCard] button#update' : {
					click : this.saveObject
				},
				'[xtype=applicantJuridicalCard] button#update' : {
					click : this.saveObject
				},
				'[xtype=changeOVValuationDateCard] button#changeValuationDate' : {
					click : this.saveObject
				},
				'[xtype=inProcessIssueList]' : {
					itemdblclick : this.openIssueCard
				},
				'[xtype=allIssueList]' : {
					itemdblclick : this.openIssueCard
				},
				'[xtype=rejectedIssueList]' : {
					itemdblclick : this.openIssueCard
				},
				'[xtype=resolvedIssueList]' : {
					itemdblclick : this.openIssueCard
				},
				'[xtype=changeOVStateList]' : {
					itemdblclick : this.openChangeOVStateCard
				},
				'[xtype=changeIsManualList]' : {
					itemdblclick : this.openChangeIsManualCard
				},
				'[xtype=changeOVCurUserList]' : {
					itemdblclick : this.openChangeOVCurUserCard
				},
				'[xtype=changeOVValuationDateList]' : {
					itemdblclick : this.openChangeOVValuationDateCard
				},
				'[xtype=editBlankList]' : {
					itemdblclick : this.openEditBlankCard
				},
				'[xtype=editApplicantList]' : {
					itemdblclick : this.openEditApplicantCard
				}
			}
		});
	},
	saveObject : function(button) {
		var me = this;
		switch (button.itemId) {
		case 'resolveIssue':
			me.save(button, me, me.resolveIssue);
			break;
		case 'rejectIssue':
			me.save(button, me, me.rejectIssue);
			break;
		case 'changeState':
			me.save(button, me, me.changeOVState);
			break;
		case 'changeIsManual':
			me.save(button, me, me.changeIsManual);
			break;
		case 'changeUser':
			me.save(button, me, me.changeOVCurUser);
			break;
		case 'changeValuationDate':
			me.save(button, me, me.changeOVValuatinDate);
			break;
		case 'updateBlank':
			me.save(button, me, me.editBlank);
			break;
		case 'update':
			me.save(button, me, me.editApplicant);
			break;
		}
	},

	takeIssueToInProcess : function(action, grid, record) {
		var me = this;
		Ext.Msg.confirm(loc.msgConfirnmActionTitle, loc.msgConfirnmActionText, function(btn) {
			if (btn == 'yes') {
				issueId = record.get('id');
				var url = 'pf.proxy.manager.support.Create.cls';
				var params = {
					action : action,
					issueId : issueId
				}
				me.ajaxRequest(grid, '', params, url, me, me.afterTakeOV);
			}
		});
	},
	afterTakeOV : function(grid) {
		var stores = [ Ext.getStore('storeIssueInProcessId'), Ext.getStore('storeIssueNewId') ];
		this.reloadStores(stores);

	},

	deleteOV : function(action, grid, record) {
		var me = this;
		Ext.Msg.confirm(loc.msgConfirnmActionTitle, 'Ви дійсно бажаєте видалити звіт ' + record.get('contractNum') + ' ?', function(btn) {
			if (btn == 'yes') {
				issueId = record.get('id');
				var url = 'pf.proxy.manager.support.Create.cls';
				var params = {
					action : action,
					issueId : issueId
				}
				me.ajaxRequest(grid, '', params, url, me, me.afterDeleteOV);
			}
		});
	},
	afterDeleteOV : function(grid) {
		var stores = [ Ext.getStore('storeDeleteOVId') ];
		this.reloadStores(stores);

	},

	resolveIssue : function(button, e, eOpts) {
		var me = this, form = button.up('form'), values = form.getValues(), url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : values.id,
			action : 'resolveIssue',
			executorDescription : form.getValues().executorDescription
		}
		me.ajaxRequest(button, form, params, url, me, me.afterResolveIssue);
	},
	afterResolveIssue : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('storeIssueInProcessId'), Ext.getStore('storeIssueResolvedId'), Ext.getStore('storeIssueAllId') ];
		this.reloadStores(stores);
	},

	rejectIssue : function(button, e, eOpts) {
		var me = this, form = button.up('form'), issueId = form.getValues().id, url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : issueId,
			action : 'rejectIssue',
			executorDescription : form.getValues().executorDescription
		}
		me.ajaxRequest(button, form, params, url, me, me.afterRejectIssue);
	},
	afterRejectIssue : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('storeIssueInProcessId'), Ext.getStore('storeIssueRejectedId'), Ext.getStore('storeIssueAllId') ];
		this.reloadStores(stores);
	},

	changeOVState : function(button, e, eOpts) {
		var me = this, form = button.up('form'), issueId = form.getValues().id, state = form.getValues().newState, url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : issueId,
			action : 'changeOVState',
			newState : state
		}
		me.ajaxRequest(button, form, params, url, me, me.afterChangeOVState);
	},
	afterChangeOVState : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('changeOVStateId') ];
		this.reloadStores(stores);
	},

	changeIsManual : function(button, e, eOpts) {
		var me = this, form = button.up('form'), issueId = form.getValues().id, state = form.getValues().newState, url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : issueId,
			action : 'changeIsManual',
			newState : state
		}
		me.ajaxRequest(button, form, params, url, me, me.afterChangeIsManual);
	},
	afterChangeIsManual : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('changeIsManualId') ];
		this.reloadStores(stores);
	},

	changeOVCurUser : function(button, e, eOpts) {
		var me = this, form = button.up('form'), issueId = form.getValues().id, user = form.getValues().newUser, url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : issueId,
			action : 'changeOVCurUser',
			newUser : user
		}
		me.ajaxRequest(button, form, params, url, me, me.afterChangeOVCurUser);
	},
	afterChangeOVCurUser : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('changeOVCurUserId') ];
		this.reloadStores(stores);
	},
	
	editBlank : function(button, e, eOpts) {
		var me = this, form = button.up('form'), values = form.getValues(), url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : form.up().issueId,
			action : 'editBlank',
			data : JSON.stringify(values)
		}
		me.ajaxRequest(button, form, params, url, me, me.afterEditBlank);
	},
	afterEditBlank : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('editBlankId') ];
		this.reloadStores(stores);
	},
	
	editApplicant : function(button, e, eOpts) {
		var me = this, form = button.up('form'), values = form.getValues(), url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : form.up().issueId,
			action : 'editApplicant',
			data : JSON.stringify(values)
		}
		me.ajaxRequest(button, form, params, url, me, me.afterEditApplicant);
	},
	afterEditApplicant : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('editApplicantId') ];
		this.reloadStores(stores);
	},

	openIssueCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');

		var extraParams = {
			action : 'read',
			state : record.get('stateName'),
			isInProcess : (grid.panel.xtype == 'inProcessIssueList')
		};
		var issueCard = Ext.widget('inProcessIssueCard', extraParams), form = issueCard.down('form');
		form.loadRecord(record);
		issueCard.title = title;
		issueCard.show();
	},

	openChangeOVStateCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');
		var extraParams = {
			action : 'read',
			state : record.get('stateName')
		};
		var issueCard = Ext.widget('changeOVStateCard', extraParams), form = issueCard.down('form');
		form.loadRecord(record);
		issueCard.title = title;
		issueCard.show();
	},

	openChangeIsManualCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');
		var extraParams = {
			action : 'read',
			isManual : record.get('isManual')
		};
		var issueCard = Ext.widget('changeIsManualCard', extraParams), form = issueCard.down('form');
		form.loadRecord(record);
		issueCard.title = title;
		issueCard.show();
	},

	openChangeOVCurUserCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');
		var extraParams = {
			action : 'read'
		};
		var issueCard = Ext.widget('changeOVCurUserCard', extraParams), form = issueCard.down('form');
		form.loadRecord(record);
		issueCard.title = title;
		issueCard.show();
	},
	openChangeOVValuationDateCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');
		var extraParams = {
			action : 'read',
			state : record.get('stateName')
		};
		var issueCard = Ext.widget('changeOVValuationDateCard', extraParams), form = issueCard.down('form');
		form.loadRecord(record);
		issueCard.title = title;
		issueCard.show();
	},

	openEditBlankCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');

		Ext.Ajax.request({
			url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls',
			params : {
				action : 'getBlank',
				ovId : record.get('objectValuation')
			},
			success : function(response, options) {
				var result = Ext.decode(response.responseText);
				if (result.success) {

					var blankRecord = Ext.create('pf.model.Blank', result.data[0]);
					var extraParams = {
							issueId : record.get('id')
					}
					var card = Ext.widget('editBlank',extraParams), form = card.down('form');
					form.loadRecord(blankRecord);
					card.title = title;
					card.show();
				} else {
				}
			},
			failure : function(response, options) {
				me.showError('');
			}
		})

	},
	
	openEditApplicantCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');

		Ext.Ajax.request({
			url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls',
			params : {
				action : 'getApplicant',
				ovId : record.get('objectValuation')
			},
			success : function(response, options) {
				var result = Ext.decode(response.responseText);
				if (result.success) {
					var appType = result.data[0].appTypeId
					extraParams = {
						applicantType : appType,
						issueId : record.get('id'),
						action : 'edit'
					};
					if (appType == '4') {
						var applicantRecord = Ext.create('pf.model.common.ApplicantJuridical', result.data[0]);
						var card = Ext.widget('applicantJuridicalCard',extraParams);
					}
					else {
						var applicantRecord = Ext.create('pf.model.common.ApplicantPhysical', result.data[0]);
						var card = Ext.widget('applicantPhysicalCard',extraParams);
					}
					var form = card.down('form')
					form.loadRecord(applicantRecord);
					card.title = title;
					card.show();
				} else {
				}
			},
			failure : function(response, options) {
				me.showError('');
			}
		})

	},

	changeOVValuatinDate : function(button, e, eOpts) {
		var me = this, form = button.up('form'), issueId = form.getValues().id, valuationDateNew = form.getValues().valuationdateNew, url = 'pf.proxy.manager.support.Create.cls';
		var params = {
			issueId : issueId,
			action : 'changeOVValuatinDate',
			valuationDateNew : valuationDateNew
		}
		me.ajaxRequest(button, form, params, url, me, me.afterChangeOVValuatinDate);
	},
	afterChangeOVValuatinDate : function(button) {
		button.up('form').up('window').close();
		var stores = [ Ext.getStore('storeChangeOVValuationDateId') ];
		this.reloadStores(stores);
	}
});