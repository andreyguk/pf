Ext.define('pf.model.TemplatesList', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'templateName',
		type : 'string'
	}, {
		name : 'createDate',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'TemplatesList'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls',
			destroy : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Delete.cls'
		}
	}
});
