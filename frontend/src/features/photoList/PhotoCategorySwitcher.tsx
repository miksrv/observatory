import React from 'react'
import { Button } from 'semantic-ui-react'

import './styles.sass'

type TToolbarProps = {
    active: string
    categories?: string[]
    selectCategory: any
}

const PhotoCategorySwitcher: React.FC<TToolbarProps> = (props) => {
    const { active, categories, selectCategory } = props

    const CategoryButton = (category: string) => <Button
        color={active === category ? 'olive' : 'green'}
        size='mini'
        key={category}
        onClick={() => selectCategory(category)}
    >
        {category === '' ? 'Все объекты' : category}
    </Button>

    return <div className='category-toolbar'>
        {CategoryButton('')}
        {categories && categories.map((item: string) => CategoryButton(item))}
    </div>
}

export default PhotoCategorySwitcher
