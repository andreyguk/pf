/**
 * Вид об'єкту оцінки
 */
Ext.define('pf.model.common.ObjectSubType', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'objectType',
		type : 'int'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'objectSubType'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});
