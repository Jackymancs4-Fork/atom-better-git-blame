'use babel';
import TooltipPortal from './TooltipPortal';
import React from 'preact-compat';
class TooltipContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    showTooltip() {
        this.setState({ show: true });
    }
    hideTooltip() {
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
            return (React.createElement(TooltipPortal, { parent: this.containerElement, mouseEnter: this.mouseEnterHandler.bind(this), mouseLeave: this.mouseLeaveHandler.bind(this) }, this.props.tooltipContent()));
        }
        return null;
    }
    render() {
        return (React.createElement("div", { style: {
                width: '100%',
            }, onMouseEnter: this.mouseEnterHandler.bind(this), onMouseLeave: this.mouseLeaveHandler.bind(this), ref: (el) => this.containerElement = el },
            this.renderTooltip(),
            this.props.children));
    }
}
export default TooltipContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcENvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL1Rvb2x0aXBDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQztBQUVaLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sS0FBdUMsTUFBTSxlQUFlLENBQUM7QUFXcEUsc0JBQXVCLFNBQVEsS0FBSyxDQUFDLFNBQXlEO0lBTTVGLFlBQVksS0FBNkI7UUFDdkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpQkFBaUI7UUFDZixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNwQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFBQSxDQUFDO0lBRUYsYUFBYTtRQUNYLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNsQixNQUFNLENBQUMsQ0FDTCxvQkFBQyxhQUFhLElBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFDN0IsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUNkLENBQ2pCLENBQUM7UUFDSixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxDQUFDLENBQ0wsNkJBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxNQUFNO2FBQ2QsRUFDRCxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDL0MsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQy9DLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRTtZQUV0QyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNoQixDQUNQLENBQUM7SUFDSixDQUFDO0NBRUY7QUFFRCxlQUFlLGdCQUFnQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBUb29sdGlwUG9ydGFsIGZyb20gJy4vVG9vbHRpcFBvcnRhbCc7XG5pbXBvcnQgUmVhY3QsIHsgRXZlbnRIYW5kbGVyLCBTeW50aGV0aWNFdmVudCB9IGZyb20gJ3ByZWFjdC1jb21wYXQnO1xuaW1wb3J0IFRpbWVyID0gTm9kZUpTLlRpbWVyO1xuXG5pbnRlcmZhY2UgSVRvb2x0aXBDb250YWluZXJQcm9wcyB7XG4gIHRvb2x0aXBDb250ZW50OiBKU1guRWxlbWVudDtcbn1cblxuaW50ZXJmYWNlIElUb29sdGlwQ29udGFpbmVyU3RhdGUge1xuICBzaG93OiBib29sZWFuO1xufVxuXG5jbGFzcyBUb29sdGlwQ29udGFpbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElUb29sdGlwQ29udGFpbmVyUHJvcHMsIElUb29sdGlwQ29udGFpbmVyU3RhdGU+IHtcblxuICBzdGF0ZTogSVRvb2x0aXBDb250YWluZXJTdGF0ZTtcbiAgdGltZW91dDogVGltZXI7XG4gIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBJVG9vbHRpcENvbnRhaW5lclByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICB9O1xuICB9XG5cbiAgc2hvd1Rvb2x0aXAoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3c6IHRydWUgfSk7XG4gIH1cblxuICBoaWRlVG9vbHRpcCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2hvdzogZmFsc2UgfSk7XG4gIH1cblxuICBtb3VzZUVudGVySGFuZGxlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKVxuICAgIH0sIDUwMCk7XG4gIH1cblxuICBtb3VzZUxlYXZlSGFuZGxlcigpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhpZGVUb29sdGlwKCk7XG4gICAgfSwgNTAwKTtcbiAgfTtcblxuICByZW5kZXJUb29sdGlwKCkge1xuICAgIGlmKHRoaXMuc3RhdGUuc2hvdyl7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VG9vbHRpcFBvcnRhbFxuICAgICAgICAgIHBhcmVudD17dGhpcy5jb250YWluZXJFbGVtZW50fVxuICAgICAgICAgIG1vdXNlRW50ZXI9e3RoaXMubW91c2VFbnRlckhhbmRsZXIuYmluZCh0aGlzKX1cbiAgICAgICAgICBtb3VzZUxlYXZlPXt0aGlzLm1vdXNlTGVhdmVIYW5kbGVyLmJpbmQodGhpcyl9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLnRvb2x0aXBDb250ZW50KCl9XG4gICAgICAgIDwvVG9vbHRpcFBvcnRhbD5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgfX1cbiAgICAgICAgb25Nb3VzZUVudGVyPXt0aGlzLm1vdXNlRW50ZXJIYW5kbGVyLmJpbmQodGhpcyl9XG4gICAgICAgIG9uTW91c2VMZWF2ZT17dGhpcy5tb3VzZUxlYXZlSGFuZGxlci5iaW5kKHRoaXMpfVxuICAgICAgICByZWY9eyhlbCkgPT4gdGhpcy5jb250YWluZXJFbGVtZW50ID0gZWx9XG4gICAgICA+XG4gICAgICAgIHt0aGlzLnJlbmRlclRvb2x0aXAoKX1cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcENvbnRhaW5lcjtcbiJdfQ==