'use babel';

import React from 'preact-compat';
import * as Analytics from '../stepsize/Analytics';

interface IBuildStatusProps {
  status: {
    state: string;
    contexts?: Array<any>
  }
}

class BuildStatus extends React.PureComponent<IBuildStatusProps, object> {

  private getStatus() : string | null {
    if (this.props.status) {
      return this.props.status.state;
    }
    return null;
  }

  private static renderIcon(state: string) : JSX.Element | null {
    switch (state) {
      case 'SUCCESS':
        return <i className="icon icon-check" style={{ color: '#2cbe4e' }} />;
      case 'FAILURE':
        return <i className="icon icon-x" style={{ color: '#cb2431' }} />;
      default:
        return null;
    }
  }

  clickHandler(label: string){
    return () => {
      Analytics.track(`Clicked link`, {label});
    };
  }


  render() {
    if(this.props.status){
      return (
        <a
          onClick={this.clickHandler('Build status')}
          href={this.props.status.contexts[0].targetUrl}
          className="build-status"
          title={this.props.status.contexts[0].description}
        >
          {BuildStatus.renderIcon(this.getStatus())}
        </a>
      );
    }
    return null;
  }
}

export default BuildStatus
