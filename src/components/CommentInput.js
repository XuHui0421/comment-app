import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
    static propTypes = {
        userName: PropTypes.any,
        onSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }

    static defaultProps = {
        userName: ''
    }

    constructor (props) {
        super(props)
        this.state = {
            userName: props.userName,
            content: ''
        }

    }

    componentDidMount () {
        this.textarea.focus();
    }

    handleUsernameBlur (event) {
        if (this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(event.target.value);
        }
    }

    handleChangeUserName (event) {
        this.setState({
            userName: event.target.value 
        })
    }

    handleChangeContent (event) {
        this.setState({
            content: event.target.value 
        })
    }

    handleSubmit () {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                userName: this.state.userName,
                content: this.state.content, 
                creatTime: +new Date()
            })
        }
        this.setState({ content: '' })
    }
    
    
    render () {
        return (
            <div className="comment-input-wrap">
                <div>
                    <div className="comment-input">
                        <label className="comment-label">用户名</label>
                        <input className="form-input" value={this.state.userName} onChange={this.handleChangeUserName.bind(this)} onBlur={this.handleUsernameBlur.bind(this)}/>
                    </div>
                    <div className="comment-input">
                        <label className="comment-label">评论内容</label>
                        <textarea className="form-textarea" value={this.state.content} onChange={this.handleChangeContent.bind(this)} ref={textarea => this.textarea = textarea}></textarea>
                    </div>
                </div>
                <div>
                    <button className="btn" onClick={() => { this.handleSubmit() }}>发布</button>
                </div>
                
            </div>
        )
    }
}
export default CommentInput