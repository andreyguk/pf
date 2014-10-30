Ext.define('pf.store.Blank', {
	extend : 'Ext.data.Store',
	storeId : 'storeBlanklId',
	model : 'pf.model.Blank',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	autoSync : false
});
