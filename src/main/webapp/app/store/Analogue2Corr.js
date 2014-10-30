/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.Analogue2Corr', {
	extend : 'Ext.data.Store',
	storeId : 'storeAnalogue2CorrId',
	model : 'pf.model.Analogue2Corr',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
