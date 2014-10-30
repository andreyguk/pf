/**
 * Довідник територій
 */
Ext.define('pf.store.common.ApplicantTerritory', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.Territory',
	autoLoad : {
		start : 0,
		limit : 10
	},
	blankID : '',
	remoteFilter : true,
	autoSync : true,
	pageSize : 10,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var filter = new Ext.util.Filter({
				property : 'blankID',
				value : store.blankID
			});
			store.filters.items.push(filter);
		}
	}
});
