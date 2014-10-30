Ext.define('pf.model.Blank2ValuationParts', {
	extend : 'pf.model.Abstract',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'blank',
		type : 'int'
	}, {
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
			classname : 'Blank2ValuationParts'
		},
		api : {
			read : pf.system.Settings.protocol + pf.system.Settings.port + pf.system.Settings.ns + 'pf.proxy.manager.Read.cls'
		}
	}
});
