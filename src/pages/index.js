import React from 'react';

import {Switch, Route} from 'react-router-dom';
import HomePage from './home';

const MainRouter = () => {
    return (
        <Switch>
            <Route path="/" component={HomePage} />
        </Switch>
    )
}

export default MainRouter;
