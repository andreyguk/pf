Ext.define('pf.model.common.ApplicantPhysical', {
	extend : 'pf.model.Abstract',
	idProperty : 'id',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'appPersonLastName',
		type : 'string'
	}, {
		name : 'appPersonFirstName',
		type : 'string'
	}, {
		name : 'appPersonMiddleName',
		type : 'string'
	}, {
		name : 'appPersonPassport',
		type : 'string'
	}, {
		name : 'appPersonPassportSeries',
		type : 'string'
	}, {
		name : 'appPersonPassportNumber',
		type : 'string'
	}, {
		name : 'appContactPhone',
		type : 'string'
	}, {
		name : 'appINN',
		type : 'string'
	}, {
		name : 'appCitizenship',
		type : 'string'
	}, {
		name : 'applicantType',
		type : 'stirng'
	}, {
		name : 'appPersonPassportIssueOrgan',
		type : 'string'
	}, {
		name : 'appPersonPassportIssueDate',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'applicantPhysical'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls',
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls'
		}
	}

});
