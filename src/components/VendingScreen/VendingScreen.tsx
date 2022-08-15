import React, { FC } from 'react'
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../Vending/Vending'
import styles from './VendingScreen.module.scss'

interface VendingScreenProps {
    products: Product[];
}

export const VendingScreen: FC<VendingScreenProps> = ({products}) => {
    return (
        <div className={styles.screen}>
        {products.length && products.map(i => <ProductCard item={i} key={i.id}/>)}
        </div>
    )
}