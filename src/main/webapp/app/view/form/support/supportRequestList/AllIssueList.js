Ext.define('pf.view.form.support.supportRequestList.AllIssueList', {
	extend : 'pf.view.form.support.supportRequestList.AbstractIssueGrid',
	alias : 'widget.allIssueList',
	getStore : function() {
		return Ext.create('pf.store.supportRequest.IssueAll');
	}
});