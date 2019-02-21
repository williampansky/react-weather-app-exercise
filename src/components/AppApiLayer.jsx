import React from 'react';
import Api from '../api';
import { observer } from 'mobx-react';
import store from '../store';

class ApiLayer extends React.Component {
    state = {
        data: []
    };

    componentDidMount() {
        Api.get().then(res => {
            const data = res.data;
            this.setState({ data });
            store.setDefaultState({ data });
        });
    }

    render() {
        return null;
    }
}

export default observer(ApiLayer);
