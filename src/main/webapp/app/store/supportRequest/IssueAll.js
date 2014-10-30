Ext.define('pf.store.supportRequest.IssueAll', {
	extend : 'pf.store.supportRequest.AbstractIssue',
	storeId : 'storeIssueAllId',
	model : 'pf.model.supportRequest.IssueAll',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
