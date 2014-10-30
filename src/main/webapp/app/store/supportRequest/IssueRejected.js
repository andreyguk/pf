Ext.define('pf.store.supportRequest.IssueRejected', {
	extend : 'pf.store.supportRequest.AbstractIssue',
	storeId : 'storeIssueRejectedId',
	model : 'pf.model.supportRequest.IssueRejected',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
