/**
 * Користувачі системи
 */
Ext.define('pf.store.common.Synchronizer', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.Synchronizer',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false
});
