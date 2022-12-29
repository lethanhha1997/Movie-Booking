import React from 'react';
import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Footer from '../../components/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import HeaderDetail from '../../pages/DetailMovie/Header';


export default function UserTemplate(props) {

    return <Route exact path={props.path} render={(propsRoute) => {
        return <Fragment >
            <HeaderDetail />
            <props.component {...propsRoute} />
            <ScrollToTop />
            <Footer />
        </Fragment>;
    }
    } />;
}
