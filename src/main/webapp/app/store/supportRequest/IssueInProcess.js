Ext.define('pf.store.supportRequest.IssueInProcess', {
	extend : 'pf.store.supportRequest.AbstractIssue',
	storeId : 'storeIssueInProcessId',
	model : 'pf.model.supportRequest.IssueInProcess',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
