/**
 * Інструкція користувача
 */
Ext.define('pf.store.common.UserInstructions', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.UserInstructions',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false
});
