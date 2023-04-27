import React, { useContext } from 'react'
import FortniteContext from '../context/fortnite-context'
// import FeaturedItem from './FeaturedItem'

const FeaturedItems = () => {
    const { featured } = useContext(FortniteContext)
    console.log("FeaturedItems: ", featured)

    return featured.map((entry) => (
        <p key={entry.id}>{entry.price}</p>
    ))
}

export {FeaturedItems as default}