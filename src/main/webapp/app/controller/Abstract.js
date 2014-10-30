/**
 * abstract controller
 */
Ext.define('pf.controller.Abstract', {
	extend : 'Ext.app.Controller',

	mixins : {
		util : 'pf.utils.Utils',
		systemMsg : 'pf.system.SystemMessage'
	},
	showAttention : function(msg) {
		Ext.MessageBox.show({
			title : errorType.warning,
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});

	},
	showInfo : function(msg) {
		Ext.MessageBox.show({
			title : errorType.info,
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
		});
	},
	showError : function(msg) {
		Ext.MessageBox.show({
			title : errorType.error,
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	},
	acceptSave : function(button, scope, callbackFn) {
		Ext.Msg.confirm(loc.msgConfirnmActionTitle, loc.msgConfirnmActionText, function(btn) {
			if (btn == 'yes') {
				callbackFn.call(scope, button);
			}
		});
	},
	acceptDelete : function(grid, record, scope, callbackFn) {
		Ext.Msg.confirm(loc.msgConfirnmActionTitle, loc.msgConfirnmActionDelText, function(btn) {
			if (btn == 'yes') {
				Ext.getBody().mask('Видалення запису...');
				callbackFn.call(scope, grid, record);
			} else {
				Ext.getBody().unmask();
			}

		});
	},
	save : function(button, scope, callbackFn) {
		var me = this;
		me.acceptSave(button, scope, callbackFn);
	},
	destroy : function(grid, record, scope, callbackFn) {
		var me = this;
		me.acceptDelete(grid, record, scope, callbackFn);
	},

	/**
	 * Common way to retrieve full data record from the server before performing
	 * another action
	 * 
	 * @param {Ext.data.Record} record
	 * @param {String} scope
	 * @param {Function} callbackFn
	 * @param {Object} extraData
	 */

	loadDetail : function(record, scope, callbackFn, extraData) {
		var me = this;
		var classname = 'objectValuation';
		if (record.$className == "pf.model.AllReports") {
			classname = 'getAllReports';
		}
		var params = {
			classname : classname,
			ovID : record.get('id')
		}
		Ext.Ajax.request({
			url : record.store.getProxy().api.read,
			params : params,
			callback : function(options, success, response) {
				var result = Ext.decode(response.responseText);
				if (result.success) {
					data = Ext.decode(response.responseText, true);
					record.set(result.data[0]);
					callbackFn.call(scope, record, extraData);
				} else {
					me.showError(result.message + '_' + result.code + '<br/>' + result.data);
					stores = [ Ext.getStore('InProcess'), Ext.getStore('New'), Ext.getStore('Finished'), Ext.getStore('ToSync'), Ext.getStore('Ready'), Ext.getStore('Handed'), Ext.getStore('AllReports'), Ext.getStore('Synched') ];
					me.reloadStores(stores)
					var viewreport = Ext.ComponentQuery.query('viewport')[0]
					viewreport.getComponent('contentId').setLoading(false);
				}

			}
		});
	},
	loadOVSync : function(record, scope, callbackFn, extraData) {
		var me = this;
		Ext.Ajax.request({
			url : record.store.getProxy().api.read,
			params : {
				classname : 'getOVToSyncFullObject',
				ovID : record.get('id')
			},
			callback : function(options, success, response) {
				var result = Ext.decode(response.responseText);
				if (result.success) {
					data = Ext.decode(response.responseText, true);
					record.set(result.data[0]);
					callbackFn.call(scope, record, extraData);
				} else {
					me.showError(result.message + '_' + result.code + '<br/>' + result.data);
					stores = [ Ext.getStore('InProcess'), Ext.getStore('New'), Ext.getStore('Finished'), Ext.getStore('ToSync'), Ext.getStore('Ready'), Ext.getStore('Handed'), Ext.getStore('AllReports'), Ext.getStore('Synched') ];
					me.reloadStores(stores)
					Ext.getBody().unmask();
				}
			}
		});
	},

	formSubmit : function(button, form, scope, shortUrl, params, callBackFn) {
		var me = this;
		if (form.isValid()) {
			form.submit({
				url : shortUrl,
				params : params,
				waitMsg : 'Збереження',
				success : function(request, options) {
					var result = Ext.decode(options.response.responseText);
					if (result.success) {
						me.showInfo(me.getMessage(result.code));
						if (callBackFn) {
							callBackFn.call(scope, button, options);
						}
					} else {
						me.showError(result.message + '_' + result.code + '<br/>' + result.data);
						if (callbackFn) {
							callbackFn.call(scope, button)
						}
					}
				},
				failure : function(response, options) {
					var result = Ext.decode(options.response.responseText);
					me.showError(result.message + '_' + result.code + '<br/>' + result.data);
				}
			});
		}
	},
	reloadStores : function(stores) {
		for ( var i = 0; i < stores.length; i++) {
			stores[i].reload();
		}

	},
	handleAJAXResponse : function(request, success) {
		var me = this, rawData = request.proxy.reader.rawData;
		Ext.getBody().unmask();
		if (success) {
			if (request.operation.wasSuccessful()) {
			} else {
				me.showError(rawData.message + '_' + rawData.code + '<br/>' + rawData.data);
				switch (rawData.type) {
				case 'validation':

					break;
				}
			}
		} else {

		}
	},
	ajaxRequest : function(button, form, params, shortUrl, scope, callbackFn) {
		var me = this
		Ext.Ajax.request({
			url : shortUrl,
			params : params,
			success : function(response, options) {
				Ext.getBody().unmask();
				var result = Ext.decode(response.responseText);
				if (result.success) {
					me.showInfo(me.getMessage(result.code));
					if (callbackFn) {
						callbackFn.call(scope, button)
					}
				} else {
					me.showError(result.message + '' + result.code + '<br/>' + result.data);
					if (callbackFn) {
						callbackFn.call(scope, button)
					}
				}
			},
			failure : function(response, options) {
				var result = Ext.decode(response.responseText);
				me.showError(result.message + '_' + result.code + '<br/>' + result.data);
			}
		});

	},
	ajaxResponse : function(button, params, shortUrl, scope, callbackFn) {
		var me = this
		Ext.Ajax.request({
			url : shortUrl,
			params : params,
			success : function(response, options) {
				var result = Ext.decode(response.responseText);
				if (result.success) {
					if (callbackFn) {
						callbackFn.call(scope, button, result);
					}
				} else {
					if (callbackFn) {
						callbackFn.call(scope, button)
					}
				}
			},
			failure : function(response, options) {
				var result = Ext.decode(response.responseText);
			}
		});
	},
	/**
	 * disabled fields on card
	 * 
	 * @view{object}
	 * @roleName{string}
	 */
	disabledFld : function(view, roleName) {
		if (roleName) {
			if (pf.LoggedInUser.inRole(roleName)) {
				return;
			}
		}
		var form = view.down('form'), items = form.items.items;
		for ( var i = 0; i < items.length; i++) {
			items[i].fieldCls = 'body-style-readOnly';
			items[i].readOnly = true;
			items[i].allowBlank = true;
		}
	}
})