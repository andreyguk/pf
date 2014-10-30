Ext.define('pf.model.common.ApplicantJuridical', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'appCompanyName',
		type : 'string'
	}, {
		name : 'appCompanyOKPO',
		type : 'string'
	}, {
		name : 'applicantType',
		type : 'string'
	}, {
		name : 'appCompanyAddress',
		type : 'string'
	}, {
		name : 'appCompanyHeadPosition',
		type : 'string'
	}, {
		name : 'appCompanyHeadName',
		type : 'string'
	}, {
		name : 'appCompanyHeadReason',
		type : 'string'
	}, {
		name : 'appINN',
		type : 'string'
	}, {
		name : 'appVATNum',
		type : 'string'
	}, {
		name : 'appContactPhone',
		type : 'string'
	}, {
		name : 'appAddPhone',
		type : 'string'
	}, {
		name : 'appCompanyEmail',
		type : 'string'
	}, {
		name : 'taxSystemType',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'applicantJuridical'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls',
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls'
		}
	}

});
