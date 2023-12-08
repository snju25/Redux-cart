import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { closeModal } from '../features/modal/modalSLice'

const Modal = () => {
    const dispatch = useDispatch()
    const {isOpen} = useSelector(store=> store.modal)
  return (
    isOpen && (
    <aside className='modal-container'>
        <div className='modal'>
            <h4> REMOVE ALL ITEMS FROM YOUR SHOPPING CART</h4>
            <div className='btn-container'>
                <button type='button' className='btn confirm-btn'
                onClick={()=> {
                    dispatch(clearCart())
                    dispatch(closeModal())
                }}
                >
                    Confirm
                </button>
                <button type='button' className='btn clear-btn'
                onClick={()=> dispatch(closeModal())}>
                    Cancel
                </button>
            </div>
        </div>

    </aside>)
  )
}

export default Modal