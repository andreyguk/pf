Ext.define('pf.model.supportRequest.IssueRejected', {
	extend : 'pf.model.supportRequest.AbstractIssue',
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'issueRejected'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls'
		}
	}
});
