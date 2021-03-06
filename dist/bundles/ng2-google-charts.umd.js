(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core"], factory);
	else if(typeof exports === 'object')
		exports["ng2-google-charts.umd"] = factory(require("@angular/core"));
	else
		root["ng2-google-charts.umd"] = factory(root["@angular/core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ChartHTMLTooltip = (function () {
    function ChartHTMLTooltip(el) {
        this.tooltipDOMElement = el;
    }
    ChartHTMLTooltip.prototype.setPosition = function (x, y) {
        this.tooltipDOMElement.nativeElement.style.left = x + ChartHTMLTooltip.PIXELS;
        this.tooltipDOMElement.nativeElement.style.top = y + ChartHTMLTooltip.PIXELS;
    };
    ChartHTMLTooltip.prototype.getDOMElement = function () {
        return this.tooltipDOMElement;
    };
    return ChartHTMLTooltip;
}());
ChartHTMLTooltip.PIXELS = 'px';
exports.ChartHTMLTooltip = ChartHTMLTooltip;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var google_charts_loader_service_1 = __webpack_require__(3);
var chart_html_tooltip_1 = __webpack_require__(1);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GoogleChartComponent.prototype, "data", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoogleChartComponent.prototype, "chartReady", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoogleChartComponent.prototype, "chartError", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoogleChartComponent.prototype, "chartSelect", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GoogleChartComponent.prototype, "mouseOver", void 0);
GoogleChartComponent = __decorate([
    core_1.Component({
        selector: 'google-chart',
        template: '<div></div>',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        google_charts_loader_service_1.GoogleChartsLoaderService])
], GoogleChartComponent);
exports.GoogleChartComponent = GoogleChartComponent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var GoogleChartsLoaderService = (function () {
    function GoogleChartsLoaderService() {
        this.chartPackage = {
            AnnotationChart: 'annotationchart',
            AreaChart: 'corechart',
            Bar: 'bar',
            BarChart: 'corechart',
            BubbleChart: 'corechart',
            Calendar: 'calendar',
            CandlestickChart: 'corechart',
            ColumnChart: 'corechart',
            ComboChart: 'corechart',
            PieChart: 'corechart',
            Gantt: 'gantt',
            Gauge: 'gauge',
            GeoChart: 'geochart',
            Histogram: 'corechart',
            Line: 'line',
            LineChart: 'corechart',
            Map: 'map',
            OrgChart: 'orgchart',
            Sankey: 'sankey',
            Scatter: 'scatter',
            ScatterChart: 'corechart',
            SteppedAreaChart: 'corechart',
            Table: 'table',
            Timeline: 'timeline',
            TreeMap: 'treemap',
            WordTree: 'wordtree'
        };
        this.googleScriptLoadingNotifier = new core_1.EventEmitter();
        this.googleScriptIsLoading = false;
    }
    GoogleChartsLoaderService.prototype.load = function (chartType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (resolve === void 0) { resolve = Function.prototype; }
            if (reject === void 0) { reject = Function.prototype; }
            _this.loadGoogleChartsScript().then(function () {
                google.charts.load('45', {
                    packages: [_this.chartPackage[chartType]],
                    callback: resolve
                });
            }).catch(function () {
                console.error('Google charts script could not be loaded');
            });
        });
    };
    GoogleChartsLoaderService.prototype.loadGoogleChartsScript = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (resolve === void 0) { resolve = Function.prototype; }
            if (reject === void 0) { reject = Function.prototype; }
            if (typeof google !== 'undefined' && google.charts) {
                resolve();
            }
            else if (!_this.googleScriptIsLoading) {
                _this.googleScriptIsLoading = true;
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://www.gstatic.com/charts/loader.js';
                script.async = true;
                script.defer = true;
                script.onload = function () {
                    _this.googleScriptIsLoading = false;
                    _this.googleScriptLoadingNotifier.emit(true);
                    resolve();
                };
                script.onerror = function () {
                    _this.googleScriptIsLoading = false;
                    _this.googleScriptLoadingNotifier.emit(false);
                    reject();
                };
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            else {
                _this.googleScriptLoadingNotifier.subscribe(function (loaded) {
                    if (loaded) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            }
        });
    };
    return GoogleChartsLoaderService;
}());
GoogleChartsLoaderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], GoogleChartsLoaderService);
exports.GoogleChartsLoaderService = GoogleChartsLoaderService;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var google_chart_component_1 = __webpack_require__(2);
var google_charts_loader_service_1 = __webpack_require__(3);
var Ng2GoogleChartsModule = (function () {
    function Ng2GoogleChartsModule() {
    }
    return Ng2GoogleChartsModule;
}());
Ng2GoogleChartsModule = __decorate([
    core_1.NgModule({
        declarations: [
            google_chart_component_1.GoogleChartComponent
        ],
        providers: [
            google_charts_loader_service_1.GoogleChartsLoaderService
        ],
        exports: [
            google_chart_component_1.GoogleChartComponent
        ]
    })
], Ng2GoogleChartsModule);
exports.Ng2GoogleChartsModule = Ng2GoogleChartsModule;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(2));
var chart_html_tooltip_1 = __webpack_require__(1);
exports.ChartHTMLTooltip = chart_html_tooltip_1.ChartHTMLTooltip;
var google_charts_module_1 = __webpack_require__(4);
exports.Ng2GoogleChartsModule = google_charts_module_1.Ng2GoogleChartsModule;


/***/ })
/******/ ]);
});
//# sourceMappingURL=ng2-google-charts.umd.js.map