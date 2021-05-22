import React from 'react';
import {withRouter} from 'react-router-dom';
import {fetchTweetById, fetchCommentsByTweet} from '../../api';
import TweetCard from '../../components/TweetCard';
import MainLayout from '../../layouts/MainLayout';


class TweetDetailPage extends React.Component {
    state = {
        tweet: null,
        comments: null
    }

    componentDidMount() {
        this.fetchTweet();
        this.fetchComments();
    }

    fetchTweet = async () => {
        const {id} = this.props.match.params;

        const {data} = await fetchTweetById(id);

        this.setState({tweet: data});
    }

    fetchComments = async () => {
        const {id} = this.props.match.params;

        const {data} = await fetchCommentsByTweet(id);

        this.setState({comments: data});
    }

    render() {
        const {tweet, comments} = this.state;

        return (
            <MainLayout>
                {
                    tweet && 
                    <TweetCard 
                        tweet={tweet} 
                        onLike={this.fetchTweet} 
                        onComment={() => {
                            this.fetchTweet();
                            this.fetchComments();
                        }} />
                }

                <hr/>

                {
                    comments &&
                    comments.map(comment => <TweetCard key={comment.id} tweet={comment} type='reply' />)
                }
            </MainLayout>
        )
    }

}

export default withRouter(TweetDetailPage);
