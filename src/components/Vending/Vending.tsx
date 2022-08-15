import React, { FC } from 'react'
import { ControlPanel } from '../ControlPanel/ControlPanel'
import { VendingScreen } from '../VendingScreen/VendingScreen'
import { useAppSelector } from '../../redux/hooks'
import styles from './Vending.module.scss'

export interface Product {
  name: string,
  price: number,
  title: string,
  id: string,
  available: boolean
}

export const Vending: FC = () => {
  const products = useAppSelector((state) => state.products.products);

  return (
    <div className={styles.vending}>
      <div className={styles.vending__screen}>
        <VendingScreen products={products} />
      </div>
      <div className={styles.vending__panel}>
        <ControlPanel products={products} />
      </div>
    </div>
  )
}