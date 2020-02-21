import { firestoreAction } from 'vuexfire'
import { dbOrdersRef } from '../../firebase'

const state = {
    orders: []
}

const mutations = {
    // addOrder: (state, orders) => state.orders.push(orders)
}

const getters = {
    getOrders: state => state.orders,
    numberOfOrders: state => state.orders.length
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}