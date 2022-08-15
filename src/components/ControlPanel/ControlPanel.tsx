import React, { FC, useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { countChange, filterByPrice, insertMoney, resetState, selectProduct } from '../../redux/productsReducer';
import { Change } from '../Change/Change';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../Vending/Vending';
import styles from './ControlPanel.module.scss';

interface ControlPanelProps {
  products: Product[];
}

export const ControlPanel: FC<ControlPanelProps> = ({ products }) => {
  const money = useAppSelector((state) => state.products.money);
  const selectedProduct = useAppSelector((state) => state.products.selectedProduct);
  const change = useAppSelector((state) => state.products.change);

  const dispatch = useAppDispatch();
  const [insert, setInsert] = useState<number>(0);
  const [select, setSelect] = useState<string>('');
  const [insertMessage, setInsertMessage] = useState<string>('insert money');
  const [selectionMessage, setSelectionMessage] = useState<string>('/')
  const [availablePositions, setAvailablePositions] = useState<boolean>(false);
  const acceptedValues = useMemo(() => [50, 100, 200, 500], []);

  useEffect(() => {
    if (money) {
      setInsertMessage(() => `Inserted money: ${money}₽`);
      dispatch(filterByPrice(money));
      //min insert is 50, min price is 40, so it always be true with any success insert
      setAvailablePositions(() => true);
    } else {
      //drop to initial state
      //most probably can be improved
      setInsert(0);
      setSelect('');
      setInsertMessage('insert money');
      setSelectionMessage('/');
    }
  }, [money, dispatch])

  const handleInsertCheck = (event: React.KeyboardEvent<HTMLInputElement>, value: number, arr: number[]): void => {
    event.preventDefault();
    if (arr.includes(value)) {
      dispatch(insertMoney(value));
    } else {
      setInsertMessage(() => 'Money is not accepted');
    }
  }

  const handleSelectCheck = (event: React.KeyboardEvent<HTMLInputElement>, select: string): void => {
    event.preventDefault();
    const availableProductsIds = products.map(i => i.available && i.id);
    if (availableProductsIds.includes(select)) {
      const selectedProduct = products.find(i => i.id === select);
      selectedProduct && dispatch(selectProduct(selectedProduct));
      setSelect(() => '');
      setAvailablePositions(() => false);
      dispatch(countChange())
      setSelectionMessage('success');
    } else {
      setSelectionMessage('choose another one')
    }
  }

  return (
    <div className={styles.controlPanel}>
      <form className={styles.controlPanel__insertDialog}>
        <label>{insertMessage}</label>
        <input value={insert}
          disabled={!!selectedProduct?.name}
          placeholder='...'
          onChange={(event) => setInsert(Number(event.target.value))}
          onKeyDown={(event) => event.key === 'Enter' && handleInsertCheck(event, insert, acceptedValues)} />
        <p>Available banknotes: 50, 100, 200 or 500 ₽. The machine gives change in 1, 2, 5 and 10 ₽ coins.</p>
      </form>

      <form className={styles.controlPanel__chooseDialog}>
        <label>{selectionMessage}</label>
        <input disabled={!availablePositions}
          placeholder='...'
          value={select}
          onChange={(event) => setSelect((event.target.value))}
          onKeyDown={(event) => event.key === 'Enter' && handleSelectCheck(event, select)} />
      </form>

      <div className={styles.controlPanel__output}>
        <div className={styles.controlPanel__output__change}>
          {change && <Change change={change}/>}
        </div>
        <div className={styles.controlPanel__output__product}>
          {selectedProduct &&
            <div onClick={() => dispatch(resetState())}>
              <ProductCard item={selectedProduct} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}