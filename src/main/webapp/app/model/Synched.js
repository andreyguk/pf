Ext.define('pf.model.Synched', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'contractNum',
		type : 'string'
	}, {
		name : 'valuationDate',
		type : 'date',
		dateFormat : 'd.m.Y'
	}, {
		name : 'fdmuNum',
		type : 'string'
	}, {
		name : 'applicant',
		type : 'string'
	}, {
		name : 'objectName',
		type : 'string'
	}, {
		name : 'objectType',
		type : 'string'
	}, {
		name : 'objectSubType',
		type : 'string'
	}, {
		name : 'creatorOrg',
		type : 'string'
	}, {
		name : 'objRegion',
		type : 'string'
	}, {
		name : 'objRayon',
		type : 'string'
	}, {
		name : 'objCity',
		type : 'string'
	}, {
		name : 'applicantType',
		type : 'string'
	}, {
		name : 'fdmuNum',
		type : 'string'
	}, {
		name : 'createDateBlank',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'objFuncType',
		type : 'string'
	}, {
		name : 'isManual',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'getOVSynched'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
