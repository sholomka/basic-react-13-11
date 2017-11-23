import React, {Component, PureComponent} from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'
import PropTypes from 'prop-types'

class Article extends PureComponent {
    static propTypes = {
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string,
            comments: PropTypes.array
        }).isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func
    }

    constructor(props) {
        super(props)

        this.state = {
            error: null,
            counter: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultOpen !== this.props.defaultOpen) this.setState({
            isOpen: nextProps.defaultOpen
        })
    }

    componentDidCatch(err) {
        this.setState({
            error: 'can`t display an article'
        })
    }

    increment = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }
/*

    shouldComponentUpdate(nextProps, nextState) {
        return !Object.keys(nextProps).every(prop => this.props[prop] === nextProps[prop])
    }
*/

    render() {
        console.log('---', 'rendering article')
        if (this.state.error) return <h1>{this.state.error}</h1>

        const {article, isOpen, toggleOpen} = this.props
        const body = isOpen && (
            <div ref = {this.setBodyRef}>
                <button onClick = {this.increment}>increment</button>
                <section>{article.text}</section>
                <CommentList comments = {article.comments}
                             key = {this.state.counter}
                             ref = {this.setCommentsRef}
                />
            </div>
        )
        return (
            <div ref = {container => console.log('---', 333, container)}>
                <h2>
                    {article.title}
                    <button onClick={toggleOpen}>
                        {isOpen ? 'close' : 'open'}
                    </button>
                </h2>
                {body}
                <h3>creation date: {(new Date(article.date)).toDateString()}</h3>
            </div>
        )
    }

    setBodyRef = body => {
        this.container = body
        console.log('---', 111, body)
    }

    setCommentsRef = comments => {
        this.comments = comments
        console.log('---', 222, findDOMNode(comments))

/*
        setInterval(() => {
            comments.setState({
                isOpen: !comments.state.isOpen
            })
        }, 500)
*/
    }
}


export default Article