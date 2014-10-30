Ext.define('pf.model.dataUpdate.ChangeIsManual', {
	extend : 'pf.model.dataUpdate.AbstractDataUpdateModel',
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'issueInProcess',
			issueType : '6'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.support.Read.cls'
		}
	}
});
