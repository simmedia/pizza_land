import { firestoreAction } from 'vuexfire'
import { dbMenuRef } from '../../firebase'

const state = {
    menuItems: [],
    basket: []
}

const getters = {
    getMenuItems: state => state.menuItems,
    getBasketItems: state => state.basket
}

const mutations = {
    addToBasket(state,payload) {
        state.basket = payload
    },
    clearBasket(state) {
        state.basket = []
    },

}

const actions = {
    setMenuRef: firestoreAction(context => {
        return context.bindFirestoreRef('menuItems', dbMenuRef)
    }),
    removeMenuItem: async(context, id) => {
        try{
            const item = await dbMenuRef.doc(id)
            item.delete()
        }
        catch(error) {
            alert(`Error removing menu item, ${error}`)
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}