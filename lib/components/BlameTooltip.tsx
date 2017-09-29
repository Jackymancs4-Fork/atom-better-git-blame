'use babel';

import React from 'preact-compat';
import moment from 'moment';
import BuildStatus from './BuildStatus';
import SearchInLayer from './SearchInLayer';
import * as Analytics from '../stepsize/Analytics';

interface IBlameTooltipProps {
  emitter: any
  commit: any
  pullRequests: any
  githubIssues: any
  jiraIssues: any
  metadata: any
}

class BlameTooltip extends React.PureComponent<IBlameTooltipProps, object> {

  clickLayerSearch(){
    this.props.emitter.emit('clickedSearch');
  }

  mouseEnterLayerSearch(){
    this.props.emitter.emit('mouseEnterLayerSearch');
  }

  mouseLeaveLayerSearch(){
    this.props.emitter.emit('mouseLeaveLayerSearch');
  }

  clickHandler(label){
    return () => {
      Analytics.track(`Clicked link`, {label});
    };
  }

  render() {
    const commitedDate = moment(this.props.commit.commitedAt).format('D MMM');
    return (
      <div className="layer-tooltip">
        <div className="section">
          <div className="section-icon">
            <div className="icon icon-git-commit" />
          </div>
          <div className="section-content">
            <h1 className="section-title">
              <a onClick={this.clickHandler('Commit title')} href={`${this.props.metadata.repoCommitUrl}/${this.props.commit.commitHash}`}>
                {this.props.commit.subject}
              </a>
            </h1>
            <BuildStatus status={this.props.commit.status}/>
            <p className="section-body">
              <code>
                <a onClick={this.clickHandler('Commit hash')} href={`${this.props.metadata.repoCommitUrl}/${this.props.commit.commitHash}`}>
                  {this.props.commit.commitHash.substr(0,6)}
                </a>
              </code> by {this.props.commit.author} committed on {commitedDate}
            </p>
            <span className="section-status">
                <span title="Insertions" className="green">+{this.props.commit.insertions}&nbsp;</span>
                <span title="Deletions" className="red">-{this.props.commit.deletions}&nbsp;</span>
                <span title="Files Changed"><i className="icon icon-diff" />{this.props.commit.filesChanged}</span>
              </span>
          </div>
        </div>
        {this.props.pullRequests.map((pullRequest) => {
          const verb = pullRequest.state.toLowerCase();
          return (
            <div className="section">
              <div className="section-icon">
                <div className="icon icon-git-pull-request" />
              </div>
              <div className="section-content">
                <h1 className="section-title">
                  <a onClick={this.clickHandler('Pull Request title')} href={pullRequest.url}>
                    {pullRequest.title}
                  </a>
                </h1>
                <BuildStatus status={pullRequest.status}/>
                <p className="section-body">
                  <code>
                    <a onClick={this.clickHandler('Pull Request number')} href={pullRequest.url}>
                      #{pullRequest.number}
                    </a>
                  </code> by {pullRequest.author.login} {verb} on {moment(pullRequest.createdAt).format('D MMM')}
                </p>
                <span className="section-status">
                    <span title="Total Commits"><i className="icon icon-git-commit" />{pullRequest.commitCount}</span>
                  </span>
              </div>
            </div>
          )
        })}
        {this.props.githubIssues.map((issue) => {
          let issueIcon = 'icon icon-issue-opened green';
          if(issue.state === 'CLOSED'){
            issueIcon = 'icon icon-issue-closed red'
          }
          return (
            <div className="section">
              <div className="section-icon">
                <div className="icon icon-issue-opened" />
              </div>
              <div className="section-content">
                <h1 className="section-title">
                  <a onClick={this.clickHandler('Issue title')} href={issue.url}>{issue.title}</a>
                </h1>
                <p className="section-body">
                  <i className={`icon ${issueIcon}`} />
                  <code>
                    <a onClick={this.clickHandler('Issue number')} href={issue.url}>#{issue.number}</a>
                  </code> by {issue.author.login}
                </p>
                <span className="section-status">{issue.state.toLowerCase()}</span>
              </div>
            </div>
          )
        })}
        {this.props.jiraIssues.map((issue) => {
          return (
            <div className="section">
              <div className="section-icon">
                <div className="icon stepsize-icon-jira" />
              </div>
              <div className="section-content">
                <h1 className="section-title">
                  <a onClick={this.clickHandler('Jira ticket title')} href={issue.url}>{issue.summary}</a>
                </h1>
                <p className="section-body">
                  <img className="icon" src={issue.issueType.iconUrl} alt={issue.issueType.name}/>
                  <code>
                    <a onClick={this.clickHandler('Jira ticket key')} href={issue.url}>{issue.key}</a>
                  </code> created by {issue.creator.displayName} & assigned to {issue.assignee.displayName || 'Nobody'}
                  <span className="section-status" style={{
                    color: `${issue.status.statusCategory.colorName}`
                  }}>{issue.status.name.toLowerCase()}</span>
                </p>
              </div>
            </div>
          )
        })}
        <SearchInLayer
          onClick={this.clickLayerSearch.bind(this)}
          onMouseEnter={this.mouseEnterLayerSearch.bind(this)}
          onMouseLeave={this.mouseLeaveLayerSearch.bind(this)}
        />
      </div>
    );
  }
}

export default BlameTooltip