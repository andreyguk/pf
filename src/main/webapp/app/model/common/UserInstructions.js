/**
 * Інструкція користувача
 */
Ext.define('pf.model.common.UserInstructions', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'attachmentDocs',
		type : 'string'
	}, {
		name : 'createDate',
		type : 'date',
		dateFormat : 'Y-m-d'
	}, {
		name : 'actualDate',
		type : 'date',
		dateFormat : 'Y-m-d'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'userInstructions'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});