Ext.define('pf.view.form.support.supportRequestList.InProcessIssueList', {
	extend : 'pf.view.form.support.supportRequestList.AbstractIssueGrid',
	alias : 'widget.inProcessIssueList',
	getStore : function() {
		return Ext.create('pf.store.supportRequest.IssueInProcess');
	}
});