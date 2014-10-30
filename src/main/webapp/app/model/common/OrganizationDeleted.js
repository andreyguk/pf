/**
 * Довідник організацій
 */
Ext.define('pf.model.common.OrganizationDeleted', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'orgTypeId',
		type : 'string'
	}, {
		name : 'orgTypeName',
		type : 'string'
	}, {
		name : 'organHead',
		type : 'string'
	}, {
		name : 'location',
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
	}, {
		name : 'isDeleted',
		type : 'boolean'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'organizationDeleted'
		},
		api : {
			read : 'pf/company/findAll'
			//destroy : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Delete.cls'
		}
	}
});
