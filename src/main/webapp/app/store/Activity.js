/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.Activity', {
	extend : 'Ext.data.Store',
	storeId : 'storeActivityId',
	model : 'pf.model.Activity',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
