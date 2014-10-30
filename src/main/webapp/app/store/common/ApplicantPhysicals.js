Ext.define('pf.store.common.ApplicantPhysicals', {
	extend : 'Ext.data.Store',
	storeId : 'storeApplicantPhysicalId',
	model : 'pf.model.common.ApplicantPhysical',
	autoLoad : {
		start : 0,
		limit : 50
	},
	remoteFilter : true,
	autoSync : false,
	pageSize : 50,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var ageFilter = new Ext.util.Filter({
				property : 'applicantType',
				value : store.applicantType
			});
			store.filters.items.push(ageFilter);
		}
	}
});