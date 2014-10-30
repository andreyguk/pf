Ext.define('pf.utils.Utils', {
    /**
     * count row in store
     */
    inProssec: 0,
    Unpaid: 0,
    // end

    /**
     * Returns instance store by name
     * 
     * @param {String} store
     * @return Object
     */
    getStoreObj: function (store) {
        return Ext.create(store);
    },
    /**
     * @param {int} format format=1
     * @return '2014-01-01' format=2
     * @return '01.01.2014
     */
    getNowDate: function (format) {
        var date = new Date();
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        if (curr_month < 10)
            curr_month = '0' + curr_month;
        var curr_year = date.getFullYear();
        switch (format) {
            case 1:
                return curr_year + "-" + curr_month + '-' + curr_date
            case 2:
                return curr_date + "." + curr_month + '.' + curr_year;
        }

    },
    /**
     * Build grid with itemId by store
     * 
     * @param {String} storeName
     * @param {String} itemId
     * @param array[{header :'text',dataIndex :'modelField',flex : size }] -
     *            columns
     * @return Object
     */
    buildGrid: function (storeName, itemId, columns) {
        store = storeName;
        if (!Ext.getStore(storeName))
            var store = this.getStoreObj('erdr.store.' + storeName);

        var grid = [{
                xtype: 'grid',
                selModel: Ext.create('Ext.selection.CheckboxModel'),
                plugins: this.createPlugin(),
                columnLines: true,
                itemId: itemId,
                store: store,
                dockedItems: [{
                        xtype: 'pagingtoolbar',
                        store: store,
                        dock: 'bottom',
                        displayInfo: true
                    }],
                columns: this.buildColumns(columns)
            }];
        return grid;

    },
    /**
     * Need for buildGrid function
     * 
     * @param array[{header : 'text',dataIndex : 'modelField',flex : size }] -
     *            columns
     */
    buildColumns: function (columns) {

        var cols = [{
                xtype: 'rownumberer',
                width: 40
            }, {
                header: 'id',
                dataIndex: 'id',
                hidden: true,
                hideable: false
            }];
        for (i = 0; i <= columns.length - 1; i++) {
            var column = columns[i];
            cols.push(column);
        }
        return cols;
    },
    /**
     * Need for buildColumns function
     */

    createPlugin: function () {

        var filterbar = {
            ptype: 'filterbar',
            renderHidden: false,
            showShowHideButton: false,
            showClearAllButton: false
        };
        var selectedBar = {
            ptype: 'selectedBar',
            noSelectionMsg: 'empty',
            pageSize: 10
        };

        var plugin = [filterbar, selectedBar];

        return plugin;
    }
})