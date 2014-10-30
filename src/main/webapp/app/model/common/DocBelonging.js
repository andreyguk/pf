/**
* Тип правовстановлюючого документа
*/
Ext.define('pf.model.common.DocBelonging', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'int'
	}, {
		name : 'name',
		type : 'string'
	} ],
	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'docBelonging'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.common.Common.cls'
		}
	}

});
