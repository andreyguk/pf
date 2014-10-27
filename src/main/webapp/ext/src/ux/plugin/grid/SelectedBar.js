/**date 27-03-2014
 *plugin for correct work multiselect
 *additionally: can view/delete selected rows
 *
 *  
 *  ## how to use
 *  Ext.create('Ext.grid.Panel', {
 *         store: myStore,
 *         columns: {
 *             plugins: [
 *              Ext.create('Ext.ux.plugin.grid.FilterBar')
 *             ],
 *             items: [ // define columns 
 *             ]
 *         },
 *         height: 200,
 *         width: 400,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.ux.plugin.grid.SelectedBar', {
	extend : 'Ext.AbstractPlugin',
	alias : 'plugin.selectedBar',
	pluginId : 'selectedBar',
	selections : {},
	selected : {},
	noSelectionMsg : '',
	pageSize:10,
	requires : [ 'Ext.ux.data.PagingMemoryProxy' ],
	init : function(grid) {
		this.grid = grid;
		grid.on('render', function() {
			this.grid.view.un('refresh', this.grid.selModel.refresh, this.grid.selModel);
			this.grid.view.on('refresh', this.onViewRefresh, this);
			this.grid.view.headerCt.on('headerclick', function(headerCt, header, e) {
				if (header.isCheckerHd) {
					e.stopEvent();
					var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
					if (!isChecked) {
						this.clearSelections();
					} else {
						this.selectAll();
					}
				}
			}, this);

			this.grid.selModel.on('select', this.onRowSelect, this);
			this.grid.selModel.on('deselect', this.onRowDeselect, this);

			var scope = this;
			this.selModelClearSelections = this.grid.selModel.deselectAll;
			this.grid.selModel.deselectAll = function(fast) {
				scope.selModelClearSelections.call(this, fast);
				scope.onSelectionClear();
			};

			if (this.grid.selModel.mode == 'SINGLE') {
				this.grid.selModel.mode = 'SIMPLE';
			}

		}, this), this.overridePagingToolbar(grid);
	},
	
	/**
	 * add new button on pagingtoolbar for view selected rows
	 */
	overridePagingToolbar : function(grid) {
		var me = this;
		var toolbar = grid.down('pagingtoolbar');
		var items = [ {
			xtype : 'tbseparator'
		}, {
			tooltip : text.btnSelectedRow,
			iconCls : 'selectRow-pagintoolbar',
			handler : this.showSelections
		} ];
		if (toolbar == null) {
			grid.addDocked({
				xtype : 'toolbar',
				dock : 'bottom',
				items : items
			});
		} else
			toolbar.insert(11, items);
	},

	/**
	 *called when grid is rendered
	 */
	onViewRefresh : function() {
		this.ignoreSelectionChanges = true;
		// explicitly refresh the selection model
		this.grid.selModel.refresh();
		// selection changed from view updates, restore full selection
		var ds = this.grid.getStore();
		var newSel = [];
		for ( var i = ds.getCount() - 1; i >= 0; i--) {
			if ((this.isSelectAll() && this.selected[ds.getAt(i).id] !== false) || this.selected[ds.getAt(i).id]) {
				newSel.push(ds.getAt(i));
			}
		}
		this.grid.selModel.select(newSel, false);
		this.ignoreSelectionChanges = false;
	},
	
	onSelectionClear : function() {
		if (!this.ignoreSelectionChanges) {
			// selection cleared by user
			// also called internally when the selection replaces the old selection
			this.selections = [];
			this.selected = {};
		}
	}, 

	/**
	 * called when user selected row
	 */
	onRowSelect : function(sm, rec, i, eOpts) {
		this.setSelection(sm, rec);
		if (!this.ignoreSelectionChanges) {
			if (!this.selected[rec.id]) {
				this.selected[rec.id] = true;
			}
		}
	},
	
	/**
	 * record selected row in object
	 */
	setSelection : function(sm, rec) {
		var me = this;
		var store = Ext.ClassManager.getName(sm.getStore());
		var selections = me.selections[store];
		if (!selections) {
			me.selections[store] = [ rec ];
		} else {
			if (!this.find(selections, rec)) {
				selections.push(rec);
			}
		}
	},
	
	/**
	 * find record in selection
	 */
	find : function(selections, rec) {
		var status = false;
		for ( var i = selections.length - 1; i >= 0; i--) {
			if (selections[i].id === rec.id) {
				status = true;
			}
		}
		return status;
	},
	
	onRowDeselect : function(sm, rec, i, eOpts) {
		if (!this.ignoreSelectionChanges) {
			this.selected[rec.id] = false;
			var store = Ext.ClassManager.getName(sm.getStore());
			var selections = this.selections[store];
			for ( var i = selections.length - 1; i >= 0; i--) {
				if (selections[i].id === rec.id) {
					selections.splice(i, 1);
				}
			}
		}
	},
	
	/**
	 * remove deselected record from selections
	 */
	deselectRow : function(selectedStore, rec, rowIndex,selGrid) {
		var me = this;
		var grid = this.grid;
		var store = Ext.ClassManager.getName(grid.getStore());
		var selected = this.selected;
		var selections = this.selections[store];
		for ( var i = selections.length - 1; i >= 0; i--) {
			if (selections[i].get('id') === rec.get('id')) {
				selected[selections[i].id] = false;
				selections.splice(i, 1);
				selectedStore.remove(rec);
				selectedStore.getProxy().data=me.getData(selectedStore.getProxy().getModel());				
				selectedStore.reload();
			}
		}
		this.onViewRefresh();
	},

	/**
	 * Clears selections across all pages
	 */
	clearSelections : function() {
		this.selections = [];
		this.selected = {};
		this.onViewRefresh();
	},
	
	isSelectAll : function() {
		return this.selected["ALL"] === true;
	},
	
	/**
	 * Returns amount of selected rows
	 * @return int
	 */
	getSelectionCount : function() {
		if (this.isSelectAll()) {
			var ds = this.grid.getStore();
			var notSelCnt = 0;
			for (prop in this.selected) {
				if (this.selected[prop] === false) {
					notSelCnt++;
				}
			}
			return ds.getTotalCount() - notSelCnt;
		} else {
			var selCnt = 0;
			for (prop in this.selected) {
				if (this.selected[prop] === true) {
					selCnt++;
				}
			}
			return selCnt;
		}
	},
	
	/**
	 * selected all records
	 */
	selectAll : function() {
		this.selected = {};
		this.selected["ALL"] = true;
		this.onViewRefresh();
		return;
	},
	
	/**
	 * Returns the selected records for all pages
	 * @return {Array} Array of selected records
	 */
	getSelections : function() {
		var me = this;
		var grid = me.grid;
		var sm = grid.getSelectionModel();
		var store = Ext.ClassManager.getName(sm.getStore());
		var data = [];
		var selections = me.selections[store];
		if (selections) {
			data = selections;
		}
		return data;
	},
	
	/**
	* Returns the selected  records for all pages
	* @return {Array} Array of id selected records
	*/
	getSelectionsId : function() {
		var me = this;
		var data = [];
		var selections=me.getSelections();
		for(var i=0;i<=selections.length-1;i++){
			data.push(selections[i].get('id'));
		}		
		return data;
	},
	
	/**
	 * @return {Array} Array of columns
	 */
	getColumns : function(grid1) {
		var me = this;
		var grid = me.grid;		
		var columns = [ {
			xtype : 'rownumberer'
		} ];
		var gridCols = grid.columnManager.getColumns();
		// array grid columns
		for (i = 0; i <= gridCols.length - 1; i++) {
			var column = gridCols[i];
			if (column.dataIndex) {
				// overide column
				var col = {
					dataIndex : column.dataIndex,
					text : column.text,
					flex : column.flex,
					filter : false
				};
				columns.push(col);
			}
		}
		var actionCol = {
			xtype : 'actioncolumn',
			width : 20,
			align : 'center',
			items : [ {
				iconCls : 'trash-icon',
				handler : function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					this.deselectRow(grid.getStore(), rec, rowIndex,grid);					
				},
				scope : this
			} ]
		};
		columns.push(actionCol);
		return columns;
	},
	
	/**
	 * show grid with selected row
	 */
	showSelections : function() {
		var grid = this.up('grid');
		var me = grid.getPlugin('selectedBar');
		var gridCols = grid.columnManager.getColumns();
		var columns = me.getColumns(grid);
		var selections = me.getSelections();
		if (selections.length == 0) {
			me.showMsg('NOSELECTIONS');
			return false;
		};
		var model = grid.getStore().getProxy().getModel();
		var store = me.getStore(model);
		var storePaging=store;		
		var win = new Ext.Window({
			title : this.tooltip,
			width : 700,
			height : 400,
			plain : true,
			modal : true,
			layout : 'fit',
			closable : false,
			bodyCls : 'cmp-body-style',
			buttonAlign : 'center',
			border : false,
			items : [ {
				xtype : 'grid',
				bodyCls : 'cmp-body-style',
				store : store,
				columns : columns,
				layout : 'fit',
				columnLines : true,
				border : false,
				dockedItems : [ {
					xtype : 'pagingtoolbar',
					store : storePaging,
					dock : 'bottom',
					displayInfo : true
				} ]
			} ],
			buttons : [ {
				text : text.btnOK,
				handler : function() {
					this.up('.window').close();
				}
			} ]
		});
		win.show();
	},
	
	/**
	 * @return store object
	 */
	getStore : function(model) {
		var me = this, grid = this.grid, store;
		var data=me.getData(model);		
		store = Ext.create('Ext.data.ArrayStore', {
			autoLoad : true,
			model : model,
			data : data,
			pageSize:me.pageSize,
			proxy : {
				type : 'pagingmemory'
			},			
		});		
		return store;
	},
	
	/**
	 *Returns data of selected rows
	 * @return {Array[{Object1},{Object2},...,{ObjectN}]}
	 */
	getData:function(model){
		var me = this;
		var selections = me.getSelections();
		var fields = model.getFields();
		var data = [];// hash mapping selected record
		for (k = 0; k <= selections.length - 1; k++) {
			var rows = {};
			for (i = 0; i <= fields.length - 1; i++) {
				var fieldName = fields[i].name;
				var row = selections[k].get(fieldName);
				// rows.push(row);
				rows[fieldName] = row;
			}
			data.push(rows);
		}
		return data;
	},
	
	/**
	 * show alert when selections is empty
	 */
	showMsg : function(type) {
		var me = this;
		var msg = '';
		switch (type) {
		case 'NOSELECTIONS':
			msg = me.noSelectionMsg;
			break;
		}
		Ext.MessageBox.show({
			msg : msg,
			buttons : Ext.MessageBox.OK,
			icon : Ext.Msg.INFO
		});
	},
	
	
})