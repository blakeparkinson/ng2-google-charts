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
