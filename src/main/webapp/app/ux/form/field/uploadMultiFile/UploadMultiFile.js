Ext.define('pf.ux.form.field.uploadMultiFile.UploadMultiFile', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.uploadmultifile',
	requires : [ 'pf.ux.form.field.uploadMultiFile.MultiFileField' ],
	width : 400,
	initComponent : function() {
		var me = this;
		var win = me;
		Ext.apply(me, {
			items : [ {
				xtype : 'form',
				border : false,
				bodyStyle : {
					padding : '10px'
				},
				items : [ {
					xtype : 'multifilefield',
					buttonText : (me.buttonText) ? me.buttonText : 'Browse...',
					name : me.name,
					labelWidth : 80,
					fieldLabel : (me.fieldLabel) ? me.fieldLabel : '',
					anchor : '100%',
					margin : 0,
					listeners : {
						change : function(comp) {
							var files = comp.getValue().split(",");
							var storeFile = this.up('form').down('[itemId=storeFile]').getStore();
							storeFile.removeAll();
							for ( var i = 0; i < files.length; i++) {
								storeFile.add({
									image : files[i]
								})
							}
						}
					}
				}, {
					xtype : 'tbspacer',
					height : 10
				}, {
					xtype : 'grid',
					title : (me.gridName) ? me.gridName : '',
					itemId : 'storeFile',
					hideHeaders : true,
					store : {
						fields : [ 'image' ]
					},
					columns : [ {
						dataIndex : 'image',
						flex : 1,
						sortable : false
					} ]
				} ]
			} ]
		});
		me.callParent(arguments);
	}
});