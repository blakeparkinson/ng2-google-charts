"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var google_charts_loader_service_1 = require("../google-charts-loader.service");
var chart_html_tooltip_1 = require("./chart-html-tooltip");
var GoogleChartComponent = (function () {
    function GoogleChartComponent(el, loaderService) {
        this.el = el;
        this.loaderService = loaderService;
        this.chartSelect = new core_1.EventEmitter();
        this.chartReady = new core_1.EventEmitter();
        this.chartError = new core_1.EventEmitter();
        this.mouseOver = new core_1.EventEmitter();
        this.eventsLoaded = false;
    }
    GoogleChartComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var key = 'data';
        if (changes[key]) {
            if (!this.data) {
                //kill the wrapper if there's no data
                this.wrapper = undefined;
                return;
            }
            if (this.data.destroy) {
                //reset the wrapper for next time
                this.wrapper = undefined;
            }
            this.options = this.data.options;
            this.loaderService.load(this.data.chartType).then(function () {
                if (_this.wrapper === undefined) {
                    _this.wrapper = new google.visualization.ChartWrapper(_this.data);
                }
                else {
                    _this.unregisterChartEvents();
                    _this.wrapper.setDataTable(_this.data.dataTable);
                    _this.wrapper.setOptions(_this.options);
                }
                if (!_this.eventsLoaded) {
                    _this.registerChartWrapperEvents();
                    _this.eventsLoaded = true;
                }
                _this.wrapper.draw(_this.el.nativeElement.querySelector('div'));
            });
        }
    };
    GoogleChartComponent.prototype.getSelectorBySeriesType = function (seriesType) {
        var selectors = {
            bars: 'bar#%s#%r',
            haxis: 'hAxis#0#label',
            line: 'point#%s#%r',
            legend: 'legendentry#%s'
        };
        var selector = selectors[seriesType];
        return selector;
    };
    /**
     * Given a column number, counts how many
     * columns have rol=="data". Those are mapped
     * one-to-one to the series array. When rol is not defined
     * a column of type number means a series column.
     * @param column to inspect
     */
    GoogleChartComponent.prototype.getSeriesByColumn = function (column) {
        var series = 0;
        var dataTable = this.wrapper.getDataTable();
        for (var i = column - 1; i >= 0; i--) {
            var role = dataTable.getColumnRole(i);
            var type = dataTable.getColumnType(i);
            if (role === 'data' || type === 'number') {
                series++;
            }
        }
        return series;
    };
    GoogleChartComponent.prototype.getBoundingBoxForItem = function (item) {
        var boundingBox = { top: 0, left: 0, width: 0, height: 0 };
        if (this.cli) {
            var column = item.column;
            var series = this.getSeriesByColumn(column);
            var bar = item.row;
            var row = item.row;
            var seriesType = this.options.seriesType;
            if (this.options.series && this.options.series[series] && this.options.series[series].type) {
                seriesType = this.options.series[series].type;
            }
            if (seriesType) {
                var selector = this.getSelectorBySeriesType(seriesType);
                if (selector) {
                    selector = selector.replace('%s', series + '').replace('%c', column + '').replace('%r', row + '');
                    var box = this.cli.getBoundingBox(selector);
                    if (box) {
                        boundingBox = box;
                    }
                }
            }
        }
        return boundingBox;
    };
    GoogleChartComponent.prototype.getValueAtPosition = function (position) {
        var dataTable = this.wrapper.getDataTable();
        var value = dataTable.getValue(position.row, position.column);
        return value;
    };
    GoogleChartComponent.prototype.getColumnTypeAtPosition = function (position) {
        var dataTable = this.wrapper.getDataTable();
        var type = dataTable.getColumnType(position.column) || '';
        return type;
    };
    GoogleChartComponent.prototype.getColumnLabelAtPosition = function (position) {
        var dataTable = this.wrapper.getDataTable();
        var type = dataTable.getColumnLabel(position.column) || '';
        return type;
    };
    GoogleChartComponent.prototype.getHTMLTooltip = function () {
        var tooltipER = new core_1.ElementRef(this.el.nativeElement.querySelector('.google-visualization-tooltip'));
        return new chart_html_tooltip_1.ChartHTMLTooltip(tooltipER);
    };
    GoogleChartComponent.prototype.parseDataPointHoveredEvent = function (item) {
        var event = {
            position: item,
            boundingBox: this.getBoundingBoxForItem(item),
            value: this.getValueAtPosition(item),
            tooltip: this.getHTMLTooltip(),
            columnType: this.getColumnTypeAtPosition(item),
            columnLabel: this.getColumnLabelAtPosition(item)
        };
        return event;
    };
    GoogleChartComponent.prototype.unregisterChartEvents = function () {
        var chart = this.wrapper.getChart();
        google.visualization.events.removeAllListeners(chart);
    };
    GoogleChartComponent.prototype.registerChartEvents = function () {
        var _this = this;
        if (this.mouseOver.observers.length > 0) {
            var chart = this.wrapper.getChart();
            this.cli = chart.getChartLayoutInterface();
            google.visualization.events.addListener(chart, 'onmouseover', function (item) {
                var event = _this.parseDataPointHoveredEvent(item);
                _this.mouseOver.emit(event);
            });
        }
    };
    GoogleChartComponent.prototype.registerChartWrapperEvents = function () {
        var _this = this;
        google.visualization.events.addListener(this.wrapper, 'ready', function () {
            _this.chartReady.emit({ message: 'Chart ready', chart: _this.wrapper });
            _this.registerChartEvents();
        });
        google.visualization.events.addListener(this.wrapper, 'error', function (error) {
            _this.chartError.emit(error);
        });
        google.visualization.events.addListener(this.wrapper, 'select', function () {
            var event;
            var selection = _this.wrapper.visualization.getSelection()[0];
            if (selection !== undefined) {
                var selectedRowValues = [];
                if (selection.row !== null) {
                    var dataTable = _this.wrapper.getDataTable();
                    var numberOfColumns = dataTable.getNumberOfColumns();
                    for (var i = 0; i < numberOfColumns; i++) {
                        selectedRowValues.push(dataTable.getValue(selection.row, i));
                    }
                }
                event = (_a = {
                        message: 'select',
                        row: selection.row,
                        column: selection.column
                    },
                    _a['selectedRowValues'] = selectedRowValues,
                    _a);
            }
            else {
                event = {
                    message: 'deselect',
                    row: null,
                    column: null,
                    selectedRowValues: []
                };
            }
            _this.chartSelect.emit(event);
            var _a;
        });
    };
    return GoogleChartComponent;
}());
GoogleChartComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'google-chart',
                template: '<div></div>',
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
GoogleChartComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: google_charts_loader_service_1.GoogleChartsLoaderService, },
]; };
GoogleChartComponent.propDecorators = {
    'data': [{ type: core_1.Input },],
    'chartReady': [{ type: core_1.Output },],
    'chartError': [{ type: core_1.Output },],
    'chartSelect': [{ type: core_1.Output },],
    'mouseOver': [{ type: core_1.Output },],
};
exports.GoogleChartComponent = GoogleChartComponent;
