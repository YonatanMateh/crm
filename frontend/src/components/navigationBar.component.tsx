import React, { useState, useEffect } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useStyles } from '../styles/style';

const NavigationBar: React.FC = () => {
    const tabsToLink = ['/clients', '/actions', '/analytics'];
    const location = useLocation()
    const history = useHistory();
    let index = tabsToLink.indexOf(location.pathname);
    index = index === -1 ? 0 : index;
    const [currentTab, setCurrentTab] = useState<number>(index);

    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    useEffect(() => {
        let linkTo: string;
        if (currentTab === 0) { // the clients tab
            linkTo = tabsToLink[currentTab] + location.search;
        } else {
            linkTo = tabsToLink[currentTab];
        }
        history.push(linkTo)        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTab]);

    return (
        <AppBar position="sticky" >
            <Tabs value={currentTab} onChange={handleChange} className={classes.navBar} classes={{ indicator: classes.indicator }}>
                <Tab label="Clients" classes={{ selected: classes.selectedTab }} />
                <Tab label="Actions" classes={{ selected: classes.selectedTab }} />
                <Tab label="Analytics" classes={{ selected: classes.selectedTab }} />
            </Tabs>
        </AppBar>
    )
}

export default NavigationBar;