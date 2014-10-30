/**
 * Первичні документи
 */
Ext.define('pf.store.Blank2PrimaryDocs', {
	extend : 'Ext.data.Store',
	storeId : 'storeBlank2PrimaryDocsId',
	model : 'pf.model.Blank2PrimaryDocs',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	autoLoad : false,
	autoSync : false
});
