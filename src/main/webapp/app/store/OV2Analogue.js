/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.OV2Analogue', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2AnalogueId',
	model : 'pf.model.OV2Analogue',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
