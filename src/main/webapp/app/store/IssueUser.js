Ext.define('pf.store.IssueUser', {
	extend : 'Ext.data.Store',
	storeId : 'storeIssueUserId',
	model : 'pf.model.IssueUser',
	autoLoad : {
		start : 0,
		limit : 25
	},
	pageSize : 25,
	remoteFilter : true,
	remoteSort : true,
	autoSync : false,
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ],
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var items = store.filters.items;
			for ( var i = 0; i <= items.length - 1; i++) {
				if (items[i].property == "createDate") {
					items[i].value = items[i].value + '^' + items[i].operator;
				}
			}
		}
	}
});
