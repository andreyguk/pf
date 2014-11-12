/**
* Довідник територій
*/
Ext.define('pf.model.common.Territory', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'fullName',
		type : 'string'
	}],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'Territory'
		},
		api : {
			read: 'pf/company/findAll'
		}
	}

});