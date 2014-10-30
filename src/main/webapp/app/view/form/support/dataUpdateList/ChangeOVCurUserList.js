Ext.define('pf.view.form.support.dataUpdateList.ChangeOVCurUserList', {
	extend : 'pf.view.form.support.dataUpdateList.AbstractDataChangeList',
	alias : 'widget.changeOVCurUserList',
	getStore : function() {
		return Ext.create('pf.store.dataUpdate.ChangeOVCurUser');
	}
});