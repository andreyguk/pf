Ext.define('pf.model.supportRequest.IssueResolved', {
	extend : 'pf.model.supportRequest.AbstractIssue',
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'issueResolved'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls'
		}
	}
});
