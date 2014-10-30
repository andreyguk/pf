Ext.define('pf.view.form.support.dataUpdateList.ChangeOVValuationDateList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.changeOVValuationDateList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.ChangeOVValuationDate');
	}
});