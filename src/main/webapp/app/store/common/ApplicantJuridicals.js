Ext.define('pf.store.common.ApplicantJuridicals', {
	extend : 'Ext.data.Store',
	storeId : 'storeApplicantJuridicalId',
	model : 'pf.model.common.ApplicantJuridical',
	autoLoad : {
		start : 0,
		limit : 50
	},
	remoteFilter : true,
	autoSync : false,
	pageSize : 50,
	listeners : {
		beforeload : function(store, operation, eOpts) {
			var applicantType = new Ext.util.Filter({
				property : 'applicantType',
				value : store.applicantType
			});
			store.filters.items.push(applicantType);
		}
	}
});
