Ext.define('pf.controller.IssueUser', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.card.issue.IssuesList', 'pf.view.form.card.issue.IssueCard' ],
	init : function() {
		this.listen({
			component : {
				'[xtype=issuesList]' : {
					takeIssue : this.takeIssueToInProcess
				},
				'[xtype=issueCard] button#saveIssue' : {
					click : this.saveObject
				},
				'[xtype=issuesList]' : {
					itemdblclick : this.openIssueCard
				}
			}
		});
	},
	saveObject : function(button) {
		var me = this;
		switch (button.action) {
		case 'saveIssue':
			me.save(button, me, me.saveIssue);
			break;
		}
	},
	saveIssue : function(button) {
		var me = this, form = button.up('form'), values = form.getValues();
		var objectValuation = form.down('[name=objectValuation]');
		if (objectValuation.getValue() == objectValuation.getRawValue()) {
			me.showError('Не коректий номер звіту!\nВиберіть номер звіту зі списку!')
			return false;
		}

		if (Ext.isEmpty(values.description)) {
			me.showError('Заповніть поле "Опис"!');
			return false;
		}
		var store = Ext.create('pf.store.IssueUser');
		callbacks = {
			success : function(records, operation) {
				var result = Ext.decode(records.operations[0].response.responseText);
				me.showInfo(me.getMessage(result.code));
				button.up('panel').close();
				me.getController('App').onMenuClick({
					itemId : 'listIssues'
				});
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		store.add(values);
		store.sync(callbacks);

	},
	openIssueCard : function(grid, record) {
		var me = this, title = 'Заявка №' + record.get('id');
		var extraParams = {
			action : 'read',
			state : record.get('stateName')
		};
		var issueCard = Ext.widget('issueCard', extraParams), form = issueCard.down('form');
		me.disabledFld(issueCard)
		form.loadRecord(record);
		var tabs = grid.up('viewport').getComponent('contentId').getComponent('issuesTabId');
		var newTab = tabs.items.findBy(function(tab) {
			if (tab.title === title) {
				return tab.title === title;
			}
		});
		issueCard.title = title;
		issueCard.active = true;
		issueCard.autoShow = true;
		issueCard.closable = true;

		if (!newTab) {
			newTab = tabs.add({
				xtype : issueCard
			})
		}
		tabs.setActiveTab(newTab);

	}
});