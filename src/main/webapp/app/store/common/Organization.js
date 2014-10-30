/**
 * Довідник організацій
 */
Ext.define('pf.store.common.Organization', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.Organization',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoSync : false,
	autoLoad : true
});
