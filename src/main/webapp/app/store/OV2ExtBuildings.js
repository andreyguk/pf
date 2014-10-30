/**
 * 
 */
Ext.define('pf.store.OV2ExtBuildings', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2ExtBuildingsId',
	model : 'pf.model.OV2ExtBuildings',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
