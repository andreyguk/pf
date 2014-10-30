Ext.define('pf.ux.form.field.uploadMultiFile.UploadMultiFileWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.uploadmultifilewin',
	requires : [ 'pf.ux.form.field.uploadMultiFile.MultiFileField' ],
	width : 400,
	autoShow : true,
	modal : true,
	initComponent : function() {
		var me = this;
		var win = me;
		Ext.apply(me, {
			items : {
				xtype : 'form',
				border : false,
				bodyStyle : {
					padding : '10px'
				},
				items : {
					xtype : 'multifilefield',
					buttonText : (me.buttonText) ? me.buttonText : 'Browse...',
					name : (me.name) ? me.name : 'file',
					labelWidth : 80,
					fieldLabel : (me.fieldLabel) ? me.fieldLabel : 'Choose file(s)',
					anchor : '100%',
					allowBlank : false,
					margin : 0
				},
				buttons : [ {
					text : (me.btnUpload) ? me.btnUpload : 'Upload',
					handler : function() {
						var form = win.down('form').getForm();
						if (!form.isValid())
							return;
						if (!me.submitParams) {
							console.log('undefined submitParams');
							return;
						} else {
							if (!me.submitParams.url) {
								console.log('undefined url for submit');
								return;
							}
							if (!me.submitParams.params) {
								console.log('undefined params for submit');
								return;
							}
						}
						form.submit({
							url : me.submitParams.url,
							params : me.submitParams.params,
							waitMsg : (me.submitParams.waitMsg) ? me.submitParams.waitMsg : 'Uploading your file(s)...',
							success : function(request, options) {
								var result = Ext.decode(options.response.responseText);
								if (result.success) {
									var callbackFnParams = me.callbackFnParams;
									if (callbackFnParams) {
										var callbackFn = callbackFnParams.callbackFn;
										if (callbackFn) {
											callbackFn.call(callbackFnParams.scope, options);
										}
									}
									win.close();
								} else {
									Ext.MessageBox.show({
										msg : result.message + '_' + result.code + '<br/>' + result.data,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							},
							failure : function(request, options) {
								var result = Ext.decode(options.response.responseText);
								Ext.MessageBox.show({
									msg : result.message + '_' + result.code + '<br/>' + result.data,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						});
					}
				}, {
					text : (me.btnCancel) ? me.btnCancel : 'Cancel',
					handler : function() {
						win.close();
					}
				} ]
			}
		});
		me.callParent(arguments);
	}
});