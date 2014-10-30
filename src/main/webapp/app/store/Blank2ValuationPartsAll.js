/**
 * 
 */
Ext.define('pf.store.Blank2ValuationPartsAll', {
	extend : 'Ext.data.Store',
	storeId : 'storeBlank2ValuationPartsAllId',
	model : 'pf.model.Blank2ValuationPartsAll',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
