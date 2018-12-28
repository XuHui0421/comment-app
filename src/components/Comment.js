import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
    static propTypes = {
        commentObj: PropTypes.object.isRequired
    }
    constructor () {
        super();
        this.state = { timeString: ''}
    }
    componentWillMount () {
        this._updateTimeString();
        this._timer = setInterval(this._updateTimeString.bind(this), 5000);
    }
    componentWillUnmount () {
        clearInterval(this._timer);
    }
    _updateTimeString () {
        const commentObj = this.props.commentObj
        const duration = (+Date.now() - commentObj.creatTime) / 100
        this.setState({
            timeString: duration > 60 
                        ? `${Math.round(duration / 60)} 分钟前`
                        : `${Math.round(Math.max(duration, 1))} 秒前`
        })
    }
    _getProcessedContent (content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    handerDeleComment (index) {
        this.props.OnDeleteComment(index);
    }
    render () {
        let {commentObj} = this.props;
        return (
            <li className="comment-content-wrap">
                <div>
                    <span className="user">{commentObj.userName}</span>：
                </div>
                <div dangerouslySetInnerHTML={{__html: this._getProcessedContent(commentObj.content)}}></div>
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span className='comment-delete' onClick={() => {this.handerDeleComment(this.props.index)}}>
                    删除
                </span>
            </li>
        )
    }
}

export default Comment