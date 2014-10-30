/**
 * // * Об'єкт оцінки -фото об'єкта оцінки
 */
Ext.define('pf.store.OV2Pictures', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2PicturesId',
	model : 'pf.model.OV2Pictures',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
