/**
 * Користувачі системи
 */
Ext.define('pf.model.common.UserDeleted', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'userPass',
		type : 'string'
	}, {
		name : 'lastName',
		type : 'string'
	}, {
		name : 'firstName',
		type : 'string'
	}, {
		name : 'middleName',
		type : 'string'
	}, {
		name : 'roleName',
		type : 'string'
	}, {
		name : 'userRoles',
		type : 'string'
	}, {
		name : 'orgName',
		type : 'string'
	}, {
		name : 'address',
		type : 'string'
	}, {
		name : 'certNumber',
		type : 'string'
	}, {
		name : 'certDate',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'userDeleted'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls',
			destroy : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Delete.cls'
		}
	}
});
