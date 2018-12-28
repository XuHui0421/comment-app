import React, {Component} from 'react'
import Comment from './Comment'
class CommentList extends Component {
    static defaultProps = {
        comments: []
    }
    handerDeleteComment (index) {
        this.props.onDeleteComments(index);
    }
    render () {
        return (
            <div>
                {this.props.comments.map((item, i) => {
                    return (<Comment commentObj={item} key={i} index={i}   OnDeleteComment={(i) => {this.handerDeleteComment(i)}}/>)
                })}
            </div>
        )
    }
}

export default CommentList