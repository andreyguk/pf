Ext.define('pf.model.supportRequest.IssueAll', {
	extend : 'pf.model.supportRequest.AbstractIssue',
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'issueAll'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls'
		}
	}
});
