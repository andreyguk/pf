/**
 * Довідник організацій
 */
Ext.define('pf.store.common.OrganizationDeleted', {
	extend : 'Ext.data.Store',
	storeId : 'storeOrganizationDeletedId',
	model : 'pf.model.common.OrganizationDeleted',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	remoteSort : true,
	autoSync : false,
	autoLoad : true
});
