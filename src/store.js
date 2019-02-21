/**
 * @namespace store
 * @see [Reference]{@link https://hackernoon.com/mobx-react-for-vue-vuex-users-213875717f33}
 * @version 0.1.0
 */

import { observable, computed } from 'mobx';

const store = observable({
    state: observable.map(),

    setDefaultState({ data }) {
        this.state.set({ data });
    },

    getDefaultState(state) {
        this.state.get({ state });
    }
});

export default store;
