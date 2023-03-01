import React, { useEffect, useState } from 'react'
import { Button } from 'semantic-ui-react'

import { useGetNewsListQuery } from 'app/observatoryApi'
import { TNews } from 'app/types'

import NewsList from 'components/news-list/NewsList'

const News: React.FC = () => {
    const [offset, setOffset] = useState<number>(0)
    const [news, addNews] = useState<TNews[]>([])
    const limit = 4

    const { data, isLoading, isFetching } = useGetNewsListQuery({
        limit,
        offset
    })

    useEffect(() => {
        document.title = 'Новости проекта - Обсерватория'
    })

    useEffect(() => {
        if (data?.payload.news) {
            addNews((news) => news.concat(data?.payload.news))
        }
    }, [data])

    return (
        <>
            <NewsList
                loader={isLoading}
                news={offset > 0 ? news : data?.payload.news}
            />
            <br />
            <Button
                fluid
                color='green'
                onClick={() => setOffset(offset + limit)}
                disabled={isFetching} // #TODO news.length >= data?.payload.count ||
                loading={isFetching}
            >
                Загрузить еще
            </Button>
        </>
    )
}

export default News
