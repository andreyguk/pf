Ext.define('pf.view.form.list.PaidList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.paidList',
	itemId : 'gridPaidList',
	// store : 'Paid',
	layout : 'fit',
	columnLines : true,
	plugins : [ {
		ptype : 'filterbar',
		renderHidden : false,
		showShowHideButton : false,
		showClearAllButton : false
	} ],
	initComponent : function() {
		this.store = Ext.create('pf.store.Paid');
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
				header : "№ договору  </br> &nbsp",
				dataIndex : 'contractNum',
				flex : 2,
				filter : true
			}, {
				header : 'Замовник </br> &nbsp',
				dataIndex : 'applicant',
				flex : 2,
				filter : true
			}, {
				header : "Назва </br> об'єкта оцінки",
				dataIndex : 'objectName',
				flex : 4,
				filter : true
			}, {
				header : "Тип </br> об'єкту",
				dataIndex : 'objectType',
				flex : 2,
				filter : true
			}, {
				header : "Вид  </br> об'єкту",
				dataIndex : 'objectSubType',
				flex : 4,
				filter : true
			}, {
				header : 'Сума до</br>сплати',
				dataIndex : 'paymentSum',
				flex : 1.2,
				filter : true
			}, {
				header : 'Дата </br> створення',
				dataIndex : 'createDate',
				flex : 2,
				renderer : Ext.util.Format.dateRenderer('d.m.Y H:i:s'),
				filter : true
			}, {
				header : 'Створив </br> ПІБ',
				dataIndex : 'creator',
				hidden : true,
				flex : 2,
				filter : true
			}, {
				header : 'Створено у </br> організації',
				dataIndex : 'creatorOrg',
				flex : 2,
				filter : true
			}, {
				header : 'Заведено </br> у 1С',
				dataIndex : 'isAppIn1S',
				flex : 1,
				filter : true,
				renderer : function(value, metaData, record, row, col, store, gridView) {
					var value = (value) ? 'Так' : 'Ні';
					return value
				}
			}, {
				header : 'Спосіб доставки </br> рахунку',
				dataIndex : 'paymentDeliveryType',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : 'Спосіб доставки</br> звіту',
				dataIndex : 'reportDeliveryType',
				flex : 1,
				hidden : true,
				filter : true
			}, {
				header : 'Заявник є</br>власником',
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