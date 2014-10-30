/**
 * Документи користувача
 */
Ext.define('pf.store.common.UserDocType', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.UserDocType',
	autoLoad : false,
	remoteFilter : true,
	autoLoad : {
		start : 0,
		limit : 25
	}
});