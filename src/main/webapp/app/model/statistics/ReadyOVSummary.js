Ext.define('pf.model.statistics.ReadyOVSummary', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'org',
		type : 'string'
	}, {
		name : 'qty',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			reportName : 'readyOVSummary'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.ReportManager.cls'
		}
	}

});