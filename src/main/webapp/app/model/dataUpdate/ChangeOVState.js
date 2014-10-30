Ext.define('pf.model.dataUpdate.ChangeOVState', {
	extend : 'pf.model.dataUpdate.AbstractDataUpdateModel',
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'issueInProcess',
			issueType : '1'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls'
		}
	}
});
