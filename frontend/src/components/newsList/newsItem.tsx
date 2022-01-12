import React from 'react'
import moment from 'moment'
import { TNews } from '../../app/types'
import { Image, Icon } from 'semantic-ui-react'

import avatar from './images/avatar.jpg'
import NewsPhotos from './newsPhotos'

type TNewsItemProps = {
    news: TNews
}

const NewsItem: React.FC<TNewsItemProps> = (props) => {
    const { news } = props

    // #TODO Use this
    // const urlify = (text: string) =>
    //     text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>')

    return (
        <div className='box item'>
            <div className='header'>
                <Image src={avatar} avatar />
                <div>
                    <a href={`//vk.com/${news.link}`} title='Обсерватория' rel='noopener noreferrer' target='_blank'>Обсерватория</a>
                    <div className='info'>
                        {moment.unix(news.date).format('DD MMMM Y в H:mm')}
                        <span className='divider'></span>
                        <Icon name='eye' /> {news.views}
                        <span className='divider'></span>
                        <Icon name='like' /> {news.likes}
                        <span className='divider'></span>
                        <Icon name='reply' /> {news.reposts}
                        <span className='divider'></span>
                        <Icon name='comment' /> {news.comments}
                    </div>
                </div>
            </div>
            <p className='text'>{news.text}</p>
            {news.photos && <NewsPhotos photos={news.photos} />}
        </div>
    )
}

export default NewsItem