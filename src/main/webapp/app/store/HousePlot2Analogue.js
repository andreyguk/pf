/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.HousePlot2Analogue', {
	extend : 'Ext.data.Store',
	storeId : 'storeHousePlot2AnalogueId',
	model : 'pf.model.HousePlot2Analogue',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
