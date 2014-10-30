Ext.define('pf.model.statistics.SyncSummary', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'fio',
		type : 'string'
	}, {
		name : 'qty',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			reportName : 'syncSummary'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.ReportManager.cls'
		}
	}

});