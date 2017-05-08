import { ElementRef, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { GoogleChartsLoaderService } from '../google-charts-loader.service';
import { ChartReadyEvent } from './chart-ready-event';
import { ChartErrorEvent } from './chart-error-event';
import { ChartSelectEvent } from './chart-select-event';
import { DataPointHoveredEvent } from './datapoint-hovered-event';
export declare class GoogleChartComponent implements OnChanges {
    data: any;
    chartReady: EventEmitter<ChartReadyEvent>;
    chartError: EventEmitter<ChartErrorEvent>;
    chartSelect: EventEmitter<ChartSelectEvent>;
    mouseOver: EventEmitter<DataPointHoveredEvent>;
    private wrapper;
    private cli;
    private options;
    private el;
    private loaderService;
    private eventsLoaded;
    constructor(el: ElementRef, loaderService: GoogleChartsLoaderService);
    ngOnChanges(changes: SimpleChanges): void;
    private getSelectorBySeriesType(seriesType);
    /**
     * Given a column number, counts how many
     * columns have rol=="data". Those are mapped
     * one-to-one to the series array. When rol is not defined
     * a column of type number means a series column.
     * @param column to inspect
     */
    private getSeriesByColumn(column);
    private getBoundingBoxForItem(item);
    private getValueAtPosition(position);
    private getColumnTypeAtPosition(position);
    private getColumnLabelAtPosition(position);
    private getHTMLTooltip();
    private parseDataPointHoveredEvent(item);
    private unregisterChartEvents();
    private registerChartEvents();
    private registerChartWrapperEvents();
}
