Ext.define('pf.Application', {
    extend: 'Ext.app.Application',
    name: 'pf',
    appFolder: 'app',
    requires: ['Ext.util.History', 'pf.utils.Validation', 'pf.domain.Proxy', 'pf.ux.grid.FilterBar', 'pf.ux.grid.AutoResizer', 'pf.ux.grid.column.ActionPro', 'pf.ux.grid.SelectedBar', 'pf.ux.grid.ExportToExcel', 'pf.ux.grid.PageSize', 'pf.ux.form.field.ClearTrigger', 'pf.ux.form.field.uploadMultiFile.UploadMultiFile', 'pf.ux.form.field.uploadMultiFile.UploadMultiFileWindow'],
    controllers: ['App', 'Security', 'card.Form', 'card.Applicant', 'card.ObjectValuation', 'card.Association', 'card.Filter', 'card.Common', 'card.Statistics', 'IssueUser', 'card.OVLand', 'card.OVFlat', 'support.Issue', 'card.OVHouse'],
    //extend: 'pf.Application'
    init: function () {
        splashscreen = Ext.getBody().mask('Завантаження', 'splashscreen');
    },
    launch: function () {
        var task = new Ext.util.DelayedTask(function () {
            splashscreen.fadeOut({
                duration: 500,
                remove: true
            });
            splashscreen.next().fadeOut({
                duration: 500,
                remove: true
            });
        });
        task.delay(500);
        Ext.globalEvents.fireEvent('beforeviewportrender');
    }
});
