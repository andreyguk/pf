/**
 * Довідник територій
 */
Ext.define('pf.store.common.Territory', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.Territory',
	autoLoad : {
		start : 0,
		limit : 10
	},
	remoteFilter : true,
	autoSync : true,
	pageSize : 10,
	ovID : '',
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var filter = new Ext.util.Filter({
				property : 'ovID',
				value : store.ovID
			});
			store.filters.items.push(filter);
		}
	}
});
