Ext.define('pf.view.form.support.supportRequestList.RejectedIssueList', {
	extend : 'pf.view.form.support.supportRequestList.AbstractIssueGrid',
	alias : 'widget.rejectedIssueList',
	getStore : function() {
		return Ext.create('pf.store.supportRequest.IssueRejected');
	}
});