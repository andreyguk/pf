/**
 * Довідник організацій
 */
Ext.define('pf.model.common.Organization', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'orgCode',
		type : 'string'
	}, {
		name : 'orgTypeId',
		type : 'string'
	}, {
		name : 'orgTypeName',
		type : 'string'
	}, {
		name : 'orgTypeCode',
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
		name : 'bankReq',
		type : 'string'
	}, {
		name : 'phone',
		type : 'string'
	}, {
		name : 'email',
		type : 'string'
	}, {
		name : 'isDeleted',
		type : 'boolean'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'organization'
		},
		api : {
			read : 'pf/company/findAll'
			//destroy : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Delete.cls'
		}
	}
});
