import { firestoreAction } from 'vuexfire'
import { dbOrdersRef } from '../../firebase'

const state = {
    orders: [],
    checkoutItem: null
}

const mutations = {
    
    checkoutItem(state, payload) {
        state.checkoutItem = payload
    }
}

const getters = {
    getOrders: state => state.orders,
    numberOfOrders: state => state.orders.length,
    checkoutItem: state => state.checkoutItem
}

const actions = {
    setOrdersRef: firestoreAction(context => {
        return context.bindFirestoreRef('orders', dbOrdersRef.orderBy('createdAt'))
    }),
    addNewOrder: async (context, order) => {
        try {
            dbOrdersRef.add(order)
        }
        catch (error) {
            alert('im sorry, there was a problem placing your orders, try again!')
        }
    },
    removeOrder: async(context, id) => {
        try {
            const order = await dbOrdersRef.doc(id)
            order.delete()
        }
        catch (error) {
            alert(`There was an error deleting order, ${error}`)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}