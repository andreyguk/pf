Ext.define('pf.model.Blank', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'applicantTypeId',
		type : 'string'
	}, {
		name : 'applicant',
		type : 'string'
	}, {
		name : 'objectName',
		type : 'string'
	}, {
		name : 'objectTypeId',
		type : 'string'
	}, {
		name : 'objectType',
		type : 'string'
	}, {
		name : 'objectSubTypeId',
		type : 'string'
	}, {
		name : 'objectSubType',
		type : 'string'
	}, {
		name : 'paymentSum',
		type : 'string'
	}, {
		name : 'paymentDeliveryTypeId',
		type : 'string'
	}, {
		name : 'paymentDeliveryType',
		type : 'string'
	}, {
		name : 'reportDeliveryTypeId',
		type : 'string'
	}, {
		name : 'reportDeliveryType',
		type : 'string'
	}, {
		name : 'valuationPurposeId',
		type : 'string'
	}, {
		name : 'valuationPurpose',
		type : 'string'
	}, {
		name : 'costTypeId',
		type : 'string'
	}, {
		name : 'costType',
		type : 'string'
	}, {
		name : 'addInfo',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'preliminaryInfo'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls'
		}
	}
});
