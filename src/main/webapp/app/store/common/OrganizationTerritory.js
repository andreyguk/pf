/**
 * Довідник територій
 */
Ext.define('pf.store.common.OrganizationTerritory', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.Territory',
	autoLoad : {
		start : 0,
		limit : 10
	},
	organizationID : '',
	remoteFilter : true,
	autoSync : true,
	pageSize : 10,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var filter = new Ext.util.Filter({
				property : 'organizationID',
				value : store.organizationID
			});
			store.filters.items.push(filter);
		}
	}
});
