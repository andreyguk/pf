/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.Blank2ValuationParts', {
	extend : 'Ext.data.Store',
	storeId : 'storeBlank2ValuationPartsId',
	model : 'pf.model.Blank2ValuationParts',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
