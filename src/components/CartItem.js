import React from 'react'
import {ChevronUp, ChevronDown } from "../icons"
import { removeItem, decrease, increase } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'

const CartItem = ({amount,id,img,price,title}) => {
    const dispatch = useDispatch()
    
  return (
    <article className='cart-item'>
        <img src={img} alt={title}/>
        <div>
            <h4>{title}</h4>
            <h4 className='item-price'>${price}</h4>
            <button className='remove-btn' onClick={()=> dispatch(removeItem(id))}>Remove</button>
        </div>
        <div>
            <button className='amount-btn' onClick={()=> dispatch(increase({id: id}))}>
                <ChevronUp />
            </button>
            <p className='amount'>{amount}</p>
            <button disabled={amount === 0? true : false} className='amount-btn' 
            onClick={()=>{
                if(amount === 1){
                    dispatch(removeItem(id))
                    return
                }
                dispatch(decrease({id:id}))
            }}
            >
                <ChevronDown /> 
            </button>
        </div>
    </article>
  )
}

export default CartItem