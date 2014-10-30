Ext.define('pf.controller.card.Common', {
	extend : 'pf.controller.Abstract',
	views : [ 'pf.view.form.common.organization.OrganizationCard', 'pf.view.form.common.organization.OrganizationList', 'pf.view.form.common.user.UserCard', 'pf.view.form.common.user.UserList', 'pf.view.form.card.profile.UsersProfile' ],
	refs : [ {
		ref : 'gridOrganization',
		selector : '[xtype=organizationList]'
	}, {
		ref : 'gridUser',
		selector : '[xtype=userList]'
	} ],
	init : function() {
		this.listen({
			component : {
				'[xtype=organizationCard] button#save' : {
					click : this.onSave
				},
				'[xtype=organizationList] button#createOrg' : {
					click : this.createOrg
				},
				'[xtype=organizationList]' : {
					itemdblclick : this.editOrg,
					editOrg : this.editOrg,
					deleteOrg : this.onDelete
				},
				'[xtype=userCard] button#save' : {
					click : this.onSave
				},
				'[xtype=userCard] button#setDefaultPass' : {
					click : this.onSave
				},
				'[xtype=userList] button#createUser' : {
					click : this.createUser
				},
				'[xtype=userList]' : {
					itemdblclick : this.editUser,
					editUser : this.editUser,
					deleteUser : this.onDelete
				},
				'[xtype=usersProfile] button#save' : {
					click : this.onSave
				}
			}
		});
	},
	onSave : function(button) {
		var me = this;
		if (button.action == 'userChangePass') {
			me.save(button, me, me.changeUsersPass);
		} else {
			me.save(button, me, me.saveObject);
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
				Ext.getStore('storeUserDeletedId').reload();
				Ext.getStore('storeOrganizationDeletedId').reload();
			},
			failure : function(records, operation) {
				store.rejectChanges();
			}
		};
		store.sync(callbacks);
	},

	/**
	 * сохраняем объект
	 */
	saveObject : function(button) {
		var me = this, form = button.up('form'), store = '', action = '', userRoles = '';

		var saveCnf = me.whatSave(button);
		store = saveCnf.store;
		action = saveCnf.action;
		userRoles = saveCnf.userRoles;

		if (form.isValid()) {
			form.submit({
				url : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Create.cls?action=' + action,
				params : {
					roles : userRoles
				},
				waitMsg : 'Збереження',
				success : function(request, options) {
					var result = Ext.decode(options.response.responseText);
					if (result.success) {
						me.showInfo(me.getMessage(result.code));
						button.up('form').up('window').close();
						store.reload();
					} else {
						me.showError(me.getMessage(result.code));
					}
				},
				failure : function(response, options) {
					var result = Ext.decode(options.response.responseText);
					me.showError(result.message + result.code);
				}
			});
		}
	},
	/**
	 * какой объект сохраняем?
	 */
	whatSave : function(button) {
		var me = this, store = '', action = '', userRoles = '';
		switch (button.action) {
		case 'saveOrganization':
			store = me.getGridOrganization().getStore();
			action = 'createOrg';
			break;
		case 'saveUser':
			store = me.getGridUser().getStore();
			action = 'createUser';
			userRoles = button.up('form').down('[itemId=userRoles]').getValue().toString();
			break;
		case 'setDefaultPass':
			store = me.getGridUser().getStore();
			action = 'setDefaultPass';
			break;
		}
		return {
			'store' : store,
			'action' : action,
			'userRoles' : userRoles
		};
	},
	/**
	 * новая организация
	 */
	createOrg : function(btn) {
		extraParams = {
			action : 'add'
		};
		var record = Ext.create('pf.model.common.Organization');
		var win = Ext.widget('organizationCard', extraParams);
		win.setTitle('Створення нової організації');
		record.set('orgTypeCode', (pf.LoggedInUser.inRole('ADMIN_HEAD')) ? '' : 'BRANCH');
		win.down('form').loadRecord(record);
		win.show();
	},
	/**
	 * редактирование организации
	 */
	editOrg : function(grid, record) {
		extraParams = {
			action : 'update',
			id : record.get('id'),
			organizationID : record.get('id')
		};
		var selection = grid.getSelectionModel().getSelection()[0];
		var win = Ext.widget('organizationCard', extraParams);
		win.setTitle('Редагування організації');
		win.down('form').loadRecord(record);
		win.show();
	},

	/**
	 * create user
	 */
	createUser : function(btn) {
		extraParams = {
			action : 'add'
		};
		var record = Ext.create('pf.model.common.User');
		var win = Ext.widget('userCard', extraParams);
		win.setTitle('Створення нового користувача');
		win.down('form').loadRecord(record);
		win.show();
	},
	// end
	/**
	 * редактирование пользователя
	 */
	editUser : function(grid, record) {
		var userRoles = record.get('userRoles').split(',');

		extraParams = {
			action : 'update',
			id : record.get('id'),
			userRoles : userRoles
		};

		var selection = grid.getSelectionModel().getSelection()[0];
		var win = Ext.widget('userCard', extraParams);
		win.setTitle('Редагування користувача');
		win.down('form').loadRecord(record);
		win.show();
	},
	/**
	 * change User's Password
	 */
	changeUsersPass : function(button) {
		var me = this, win = button.up('window'), form = win.down('form'), url = 'pf.proxy.common.Create.cls';
		var userName = form.down('[itemId=userName]').getValue(), oldPass = form.down('[itemId=oldPass]').getValue(), newPass = form.down('[itemId=newPass]').getValue(), confirmPass = form.down('[itemId=confirmPass]').getValue();
		if (newPass != confirmPass) {
			me.showError('Паролі не співпадають!');
			return;
		}
		params = {
			action : 'changeUsersPass',
			userName : userName,
			oldPass : pf.utils.Base64.encode(oldPass),
			newPass : pf.utils.Base64.encode(newPass)
		}
		me.ajaxRequest(button, form, params, url, me, me.afterChangeUsersPass);
	},
	afterChangeUsersPass : function(button) {
		button.up('window').close()
	}
// end
});