import React, { useMemo } from 'react'
import { Input, Dropdown } from 'semantic-ui-react'

import './styles.sass'

type TToolbarProps = {
    search: string
    categories: string[]
    onChangeSearch: (search: string) => void
    onChangeCategories: (categories: any) => void
}

const ObjectsTableToolbar: React.FC<TToolbarProps> = (props) => {
    const { search, categories, onChangeSearch, onChangeCategories } = props

    const handleChange = ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) =>
        onChangeSearch(value)

    const listCategoriesOptions = useMemo(() =>
        categories.map((item) => (
            { value: item, text: item }
        ))
        , [categories])

    return (
        <div className='objects-toolbar'>
            <Input
                value={search}
                onChange={handleChange}
                icon='search'
                className='search'
                placeholder='Поиск...'
            />
            <Dropdown
                placeholder='Категории объектов'
                multiple
                search
                selection
                clearable
                fluid
                className='category-dropdown'
                options={listCategoriesOptions}
                onChange={(target, el) => {
                    if (el.value) {
                        onChangeCategories(el.value)
                    }
                }}
            />
        </div>
    )
}

export default ObjectsTableToolbar
