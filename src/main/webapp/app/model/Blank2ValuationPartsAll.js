Ext.define('pf.model.Blank2ValuationPartsAll', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'ownerFio',
		type : 'string'
	}, {
		name : 'valuationPartNumer',
		type : 'string'
	}, {
		name : 'valuationPartDenom',
		type : 'string'
	}],

	proxy : {
		type : 'baseAjax',
		extraParams : {
			classname : 'Blank2ValuationPartsAll'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
