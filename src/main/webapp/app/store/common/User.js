/**
 * Користувачі системи
 */
Ext.define('pf.store.common.User', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.User',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false
});
