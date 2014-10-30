Ext.define('pf.model.AllBlanks', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'contractNum',
		type : 'string'
	}, {
		name : 'applicantId',
		type : 'string'
	}, {
		name : 'applicant',
		type : 'string'
	}, {
		name : 'applicantTypeId',
		type : 'string'
	}, {
		name : 'applicantType',
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
		name : 'createDate',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'creator',
		type : 'string'
	}, {
		name : 'creatorOrg',
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
		name : 'isAppOwner',
		type : 'boolean'
	}, {
		name : 'isAppIn1S',
		type : 'boolean'
	}, {
		name : 'attachmentDocs',
		type : 'string'
	}, {
		name : 'state',
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
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'getAllBlanks'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Create.cls',
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
