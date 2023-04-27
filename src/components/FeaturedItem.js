import React from 'react'

const FeaturedItem = (item) => {

    console.log("item: ",item)
    return item.items.map((item) => (
        <img key={item.id} alt={item.name} src={item.images.smallIcon} />
    ))
}

export { FeaturedItem as default }