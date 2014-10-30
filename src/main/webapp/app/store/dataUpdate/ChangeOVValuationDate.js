Ext.define('pf.store.dataUpdate.ChangeOVValuationDate', {
	extend : 'pf.store.dataUpdate.AbstractDataUpdateStore',
	storeId : 'storeChangeOVValuationDateId',
	model : 'pf.model.dataUpdate.ChangeOVValuationDate',
	sorters : [ {
		property : 'priority',
		direction : 'DESC'
	} ]
});
