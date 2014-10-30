Ext.define('pf.model.statistics.BranchBlanksReport', {
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
		name : 'unpaid',
		type : 'string'
	}, {
		name : 'paid',
		type : 'string'
	}, {
		name : 'accounted',
		type : 'string'
	}, {
		name : 'deleted',
		type : 'string'

	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			reportName : 'branchBlanksReport'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.ReportManager.cls'
		}
	}

});