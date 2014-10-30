Ext.define('pf.model.supportRequest.AbstractIssue', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
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
		name : 'objectValuation',
		type : 'string'
	}, {
		name : 'executor',
		type : 'string'
	}, {
		name : 'executionDate',
		type : 'date',
		dateFormat : 'Y-m-d H:i:s'
	}, {
		name : 'contractNum',
		type : 'string'
	}, {
		name : 'executorDescription',
		type : 'string'
	}, {
		name : 'valuationdate',
		type : 'date',
		dateFormat : 'Y-m-d'
	}, {
		name : 'ovState',
		type : 'string'		
	}, {
		name : 'fdmuNum',
		type : 'string'
	} ]

});
