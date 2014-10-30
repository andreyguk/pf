Ext.define('pf.store.statistics.SyncSummary', {
	extend : 'Ext.data.Store',
	model : 'pf.model.statistics.SyncSummary',
	remoteFilter : true,
	//autoSync : true,
	autoLoad : false

});
