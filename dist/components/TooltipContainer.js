'use babel';
import TooltipPortal from './TooltipPortal';
import React from 'preact-compat';
import * as Analytics from '../stepsize/Analytics';
class TooltipContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    showTooltip() {
        Analytics.track('Tooltip shown');
        this.setState({ show: true });
    }
    hideTooltip() {
        Analytics.track('Tooltip hidden');
        this.setState({ show: false });
    }
    mouseEnterHandler() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.showTooltip();
        }, 500);
    }
    mouseLeaveHandler() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.hideTooltip();
        }, 500);
    }
    ;
    renderTooltip() {
        if (this.state.show) {
            return (<TooltipPortal parent={this.containerElement} mouseEnter={this.mouseEnterHandler.bind(this)} mouseLeave={this.mouseLeaveHandler.bind(this)}>
          {this.props.tooltipContent()}
        </TooltipPortal>);
        }
        return null;
    }
    render() {
        return (<div style={{
            width: '100%',
        }} onMouseEnter={this.mouseEnterHandler.bind(this)} onMouseLeave={this.mouseLeaveHandler.bind(this)} ref={(el) => this.containerElement = el}>
        {this.renderTooltip()}
        {this.props.children}
      </div>);
    }
}
export default TooltipContainer;
