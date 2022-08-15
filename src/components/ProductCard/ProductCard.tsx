import React, { FC } from 'react';
import { Product } from '../Vending/Vending';
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  item: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <div className={item.available ? styles.card__available : styles.card}>
      <h3>{item.name}</h3>
      <p>{item.price}₽</p>
      <div className={styles.card__price}>
        <span>{item.title}</span>
        <span>{item.id}</span>
      </div>
    </div>
  )
}