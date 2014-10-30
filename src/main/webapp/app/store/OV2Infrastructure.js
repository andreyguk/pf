/**
 * 
 */
Ext.define('pf.store.OV2Infrastructure', {
	extend : 'Ext.data.Store',
	storeId : 'storeOV2InfrastructureId',
	model : 'pf.model.OV2Infrastructure',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
