Ext.define('pf.store.supportRequest.IssueResolved', {
	extend : 'pf.store.supportRequest.AbstractIssue',
	storeId : 'storeIssueResolvedId',
	model : 'pf.model.supportRequest.IssueResolved',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
