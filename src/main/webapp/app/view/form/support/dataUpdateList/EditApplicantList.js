Ext.define('pf.view.form.support.dataUpdateList.EditApplicantList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.editApplicantList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.EditApplicant');
	}
});