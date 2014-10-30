Ext.define('pf.view.form.support.supportRequestList.ResolvedIssueList', {
	extend : 'pf.view.form.support.supportRequestList.AbstractIssueGrid',
	alias : 'widget.resolvedIssueList',
	getStore : function() {
		return Ext.create('pf.store.supportRequest.IssueResolved');
	}
});