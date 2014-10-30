Ext.define('pf.view.form.list.AccountedList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.accountedList',
	itemId : 'gridAccountedList',
	// store : 'Accounted',
	layout : 'fit',
	columnLines : true,
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		this.store = Ext.create('pf.store.Accounted');
		Ext.apply(this, {
			dockedItems : [ {
				xtype : 'pagingtoolbar',
				store : this.store,
				dock : 'bottom',
				displayInfo : true,
				plugins : [ {
					ptype : 'pageSize'
				} ]
			} ],
			columns : [ {
				xtype : 'rownumberer'
			}, {
				header : 'id',
				dataIndex : 'id',
				flex : 1,
				hidden : true,
				hideable : false
			}, {
				header : "№ договору  </br> &nbsp</br> &nbsp",
				dataIndex : 'contractNum',
				flex : 2,
				filter : true
			}, {
				header : 'Замовник </br> &nbsp</br> &nbsp',
				dataIndex : 'applicant',
				flex : 2,
				filter : true
			}, {
				header : "Назва </br> об'єкта оцінки<br/> &nbsp",
				dataIndex : 'objectName',
				flex : 4,
				filter : true
			}, {
				header : "Тип </br> об'єкту<br/> &nbsp",
				dataIndex : 'objectType',
				flex : 2,
				filter : true
			}, {
				header : "Вид  </br> об'єкту <br/> &nbsp",
				dataIndex : 'objectSubType',
				flex : 4,
				filter : true
			}, {
				header : 'Сума </br> до сплати<br/> &nbsp',
				dataIndex : 'paymentSum',
				flex : 1.2,
				filter : true
			}, {
				header : 'Дата </br> створення <br/> &nbsp',
				dataIndex : 'createDate',
				flex : 2,
				renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
				filter : true
			}, {
				header : 'Створив </br> ПІБ <br/> &nbsp ',
				dataIndex : 'creator',
				hidden : true,
				flex : 2,
				filter : true
			}, {
				header : 'Створено у </br> організації <br/> &nbsp',
				dataIndex : 'creatorOrg',
				flex : 2,
				filter : true
			}, {
				header : 'Дата </br>надходження  грошей',
				dataIndex : 'paymentDate',
				flex : 2,
				renderer : Ext.util.Format.dateRenderer('d.m.Y'),
				filter : true
			}, {
				header : 'Заведено </br> у 1С <br/> &nbsp',
				dataIndex : 'isAppIn1S',
				flex : 1,
				filter : true,
				renderer : function(value, metaData, record, row, col, store, gridView) {
					var value = (value) ? 'Так' : 'Ні';
					return value
				}
			}, {
				header : 'Спосіб доставки </br> рахунку <br/> &nbsp',
				dataIndex : 'paymentDeliveryType',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : 'Спосіб доставки</br> звіту <br/> &nbsp',
				dataIndex : 'reportDeliveryType',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : 'Заявник є</br>власником <br/> &nbsp',
				dataIndex : 'isAppOwner',
				flex : 1,
				hidden : true,
				filter : true,
				renderer : function(value, metaData, record, row, col, store, gridView) {
					var value = (value) ? 'Так' : 'Ні';
					return value
				}
			} ]
		}),

		this.callParent(arguments);

	}
});