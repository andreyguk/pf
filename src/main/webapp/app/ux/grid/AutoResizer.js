Ext.define('pf.ux.grid.AutoResizer', {
	alias : 'plugin.gridautoresizer',

	requires : [ 'Ext.grid.plugin.HeaderResizer' ],

	init : function(headerCt) {
		this.headerCt = headerCt;
		this.resizer = headerCt.resizer;
		if (this.resizer) {
			headerCt.on('render', this.afterHeaderRender, this, {
				single : true
			});
		}
	},

	afterHeaderRender : function() {
		var me = this, headerCt = me.headerCt, el = headerCt.el;

		// we only listen to dblclick since mousemove is handled by
		// HeaderResizer
		headerCt.mon(el, 'dblclick', me.onHeaderCtDblClick, me);

		// implement a fake tracker since we need the getOffset method in
		// "doResize"
		me.tracker = {
			getOffset : function() {
				return [ me.newWidth - me.origWidth ];
			}
		};
	},

	onHeaderCtDblClick : function() {
		// HeaderResizer has to be enabled to use the auto resizing
		// functionality
		if (this.resizer && !this.resizer.disabled && !!this.resizer.activeHd) {
			// use the activeHeader from HeaderResizer (there the
			// onLeftEdge/onRightEdge checks are already done)
			var hd = this.resizer.activeHd, view = this.headerCt.view,
			// get all headers of the active column, they may be nested if we
			// use grouping etc.
			columns = Ext.select('.' + Ext.baseCSSPrefix + 'grid-col-resizer-' + hd.id, false, view.el.dom),
			// get all table elements, they may also be nested
			tables = Ext.select('.' + Ext.baseCSSPrefix + 'grid-table-resizer', false, view.el.dom), width = 0;

			// these vars are needed within "doResize"
			this.origWidth = hd.getWidth();
			this.dragHd = hd;

			// set all column headers and tables to auto width -> fits to
			// content
			columns.setWidth('auto');
			tables.setWidth('auto');
			// get the maximum absolute width of all headers (max content width)
			columns.each(function(c) {
				width = Math.max(width, c.getWidth());
			});
			// 2012-04-26 By Ing. Leonardo D'Onofrio (leonardo_donofrio at
			// hotmail.com)
			if (width == 0) {
				// Chrome fix
				var rows = Ext.select('.' + Ext.baseCSSPrefix + 'grid-cell-' + hd.id, false, view.el.dom);
				rows.each(function(cell) {
					width = Math.max(width, cell.first().getTextWidth());
				});
				width += 20;
			}
			// end fix
			this.newWidth = width = Ext.Number.constrain(width, this.resizer.minColWidth, this.resizer.maxColWidth);

			// header.setWidth only works if the new width differs from the old
			// width
			// see Ext.grid.column.Column#setSize
			// so we simply have to set the old width back
			if (width - this.origWidth === 0) {
				columns.setWidth(width);
				tables.setWidth(this.headerCt.getFullWidth());
				// otherwise resize the column to the new width
			} else {
				this.doResize();
			}
		}
	}
}, function() {
	// use the doResize method of HeaderResizer since it handles
	// all the special cases (flex, forceFit, ...)
	this.borrow(Ext.grid.plugin.HeaderResizer, 'doResize');
});