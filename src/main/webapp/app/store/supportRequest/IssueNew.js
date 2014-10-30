Ext.define('pf.store.supportRequest.IssueNew', {
	extend : 'pf.store.supportRequest.AbstractIssue',
	storeId : 'storeIssueNewId',
	model : 'pf.model.supportRequest.IssueNew',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
