Ext.define('pf.model.statistics.BranchOVsReport', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'org',
		type : 'string'
	}, {
		name : 'allqty',
		type : 'string'
	}, {
		name : 'news',
		type : 'string'
	}, {
		name : 'inproc',
		type : 'string'
	}, {
		name : 'finish',
		type : 'string'
	}, {
		name : 'addnum',
		type : 'string'
	}, {
		name : 'numadded',
		type : 'string'
	}, {
		name : 'ready',
		type : 'string'
	}, {
		name : 'handed',
		type : 'string'
	}, {
		name : 'deleted',
		type : 'string'

	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			reportName : 'branchOVsReport'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.ReportManager.cls'
		}
	}

});