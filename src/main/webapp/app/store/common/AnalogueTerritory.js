/**
 * Довідник територій
 */
Ext.define('pf.store.common.AnalogueTerritory', {
	extend : 'Ext.data.Store',
	model : 'pf.model.common.Territory',
	autoLoad : {
		start : 0,
		limit : 10
	},
	analogueId : '',
	locationTerritory : '',
	remoteFilter : true,
	autoSync : true,
	pageSize : 10,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			if (store.analogueId) {
				var filter = new Ext.util.Filter({
					property : 'analogueId',
					value : store.analogueId
				});
				store.filters.items.push(filter);
			}
			if (store.locationTerritory) {
				var locationTerritory = new Ext.util.Filter({
					property : 'location',
					value : store.locationTerritory
				});
				store.filters.items.push(locationTerritory);
			}

		}
	}
});
