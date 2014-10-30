/**
 * Користувачі системи
 */
Ext.define('pf.store.common.UserDeleted', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.UserDeleted',
	storeId : 'storeUserDeletedId',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false
});
