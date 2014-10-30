Ext.define('pf.view.form.card.ov.house.TabJuridicalInfo', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.ov.house.tabJuridicalInfo',
	itemId : 'juridicalInfoId',
	initComponent : function() {
		var me = this;
		var storeOV2ConstitutiveDocs = Ext.create('pf.store.OVHouse2ConstitutiveDocs');
		storeOV2ConstitutiveDocs.filter('objectValuation', me.ovID)
		Ext.applyIf(me, {
			items : [ {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '100%',
				title : 'Юридична інформація (наявність і дані правостановлюючих документів)',
				items : [ {
					xtype : 'grid',
					store : storeOV2ConstitutiveDocs,
					selType : 'rowmodel',
					anchor : '70%',
					columnLines : true,
					itemId : 'gridOVHouse2ConstitutiveDocs',
					tbar : [ {
						text : 'Додати',
						iconCls : 'add',
						itemId : 'addOVHouse2ConstitutiveDocs'
					} ],
					dockedItems : [ {
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						store : storeOV2ConstitutiveDocs,
						displayInfo : true
					} ],
					columns : me.buildColumns()

				}, {
				xtype : 'fieldset',
				layout : 'anchor',
				anchor : '100%',
				title : 'Кадастровий номер земельної(их) ділянки(ок)',
				items : [ {
					xtype : 'textareafield',
					labelAlign : 'top',
					name : 'cadastralNumber',
					cols : 105,
					rows : 1
				}]
			}]
			} ]
		});
		me.callParent(arguments);
	},
	buildColumns : function() {
		return [ {
			xtype : 'rownumberer'
		}, {
			header : 'id',
			dataIndex : 'id',
			hidden : true,
			hideable : false
		}, {
			text : 'Тип правовстанавлюючого документа',
			flex : 1,
			dataIndex : 'docTypeName'
		}, {
			text : 'Належність документу',
			flex : 1,
			dataIndex : 'docBelongingName'
		}, {
			text : 'Дані правовстановлюючого документа',
			dataIndex : 'docDescription',
			flex : 3
		}, {
			xtype : 'actioncolumn',
			items : [ {
				iconCls : 'delete',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex), store = grid.getStore();
					store.remove(rec);
				},
				scope : this
			} ],
			width : '10px',
			align : 'center'
		} ];
	}
})