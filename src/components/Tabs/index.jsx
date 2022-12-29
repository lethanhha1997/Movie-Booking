import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './index.css'
import TabsOne from './TabsOne';
import TabsTwo from './TabsTwo';


export default function TabsMovie() {
    return (
        <div className='container-tabs pt-5' id='movie' >
            <div className="container">
                <Tabs
                    defaultActiveKey="dangChieu"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="dangChieu" title="Phim Đang Chiếu">
                        <TabsOne  />
                    </Tab>
                    <Tab eventKey="sapChieu" title="Phim Sắp Chiếu">
                        <TabsTwo/>
                    </Tab>
                </Tabs>
            </div>

        </div>
    )
}
