/**
 * Об'єкт оцінки - Опис приміщень
 */
Ext.define('pf.store.OV2RoomDescription', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2RoomDescriptionId',
	model : 'pf.model.OV2RoomDescription',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
