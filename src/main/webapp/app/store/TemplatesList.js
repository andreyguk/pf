Ext.define('pf.store.TemplatesList', {
	extend : 'Ext.data.Store',
	storeId : 'storeTemplatesListId',
	model : 'pf.model.TemplatesList',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : true,
	autoSync : false
});
