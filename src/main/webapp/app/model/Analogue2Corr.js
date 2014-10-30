/**
 * Аналоги об'єктів - Коригування
 */
Ext.define('pf.model.Analogue2Corr', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'analogue',
		type : 'int'
	}, {
		name : 'correctionType',
		type : 'int'
	}, {
		name : 'correctionTypeName',
		type : 'string'
	}, {
		name : 'correctionValue',
		type : 'string'
	}, {
		name : 'correctionDescr',
		type : 'string'
	} ],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'Analogue2Corr'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns
					+ 'pf.proxy.manager.Read.cls'
		}
	}
});
