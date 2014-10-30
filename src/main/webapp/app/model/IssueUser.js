Ext.define('pf.model.IssueUser', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'state',
		type : 'string'
	}, {
		name : 'stateName',
		type : 'string'
	}, {
		name : 'requestType',
		type : 'string'
	}, {
		name : 'requestTypeName',
		type : 'string'
	}, {
		name : 'priority',
		type : 'string'
	}, {
		name : 'priorityName',
		type : 'string'
	}, {
		name : 'creator',
		type : 'string'
	}, {
		name : 'createDate',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'subject',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}, {
		name : 'executor',
		type : 'string'
	}, {
		name : 'executionDate',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'objectValuation',
		type : 'string'
	}, {
		name : 'executorDescription',
		type : 'string'
	}, {
		name : 'contractNum',
		type : 'string'
	}, {
		name : 'contractNum',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'issues'
		},
		api : {
			create : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Create.cls',
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls'
		}
	}
});
