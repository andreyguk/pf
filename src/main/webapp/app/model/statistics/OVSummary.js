Ext.define('pf.model.statistics.OVSummary', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'state',
		type : 'string'
	}, {
		name : 'qty',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			reportName : 'ovSummary'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.ReportManager.cls'
		}
	}

});