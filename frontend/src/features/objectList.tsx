import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { useGetObjectListQuery, useGetPhotoListQuery } from '../app/observatoryApi'
import ObjectTable from '../components/objectTable'

const TableLoader: React.FC = () => <div className='box loader'>
    <Dimmer active>
        <Loader />
    </Dimmer>
</div>

const TableError: React.FC = () => <div>ОШИБКА!</div>

const ObjectList: React.FC = () => {
    const { data, isSuccess, isLoading, isError } = useGetObjectListQuery();
    const { data: photoData } = useGetPhotoListQuery();

    document.title = `Список астрономических объектов - Обсерватория`

    return (
        <div className='box table'>
            {isError && <TableError />}
            {isLoading && <TableLoader />}
            {(isSuccess && data?.payload) && <ObjectTable objects={data.payload} photos={photoData?.payload} />}
        </div>
    )
}

export default ObjectList
