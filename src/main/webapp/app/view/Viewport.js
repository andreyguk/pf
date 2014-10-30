Ext.define('pf.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    layout: 'border',
    requires: ['pf.view.main.container.MainToolBar', 'pf.view.main.container.Content', 'pf.view.main.container.Menu'],
    initComponent: function () {
        Ext.applyIf(this, {
            items: [{
                    xtype: 'mainToolBarContainer',
                    split: false
                }, {
                    xtype: 'menuContainer',
                    split: false
                }, {
                    xtype: 'content',
                    split: false
                }]
        });
        this.callParent(arguments);
    }
});
