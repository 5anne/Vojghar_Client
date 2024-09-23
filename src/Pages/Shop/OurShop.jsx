import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover';
import shopImg from '../../assets/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import FoodCard from '../../Components/FoodCard/FoodCard';
import useMenu from '../../hooks/useMenu';
import { useParams } from 'react-router-dom';
import OrderTab from './OrderTab';

const OurShop = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    const pizza = menu?.filter(item => item.category === 'pizza');
    const salad = menu?.filter(item => item.category === 'salad');
    const soup = menu?.filter(item => item.category === 'soup');
    const dessert = menu?.filter(item => item.category === 'dessert');
    const drinks = menu?.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>Vojghar || Our Shop</title>
            </Helmet>
            <Cover img={shopImg} title="Our Shop"></Cover>
            <Tabs className="my-8" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel><OrderTab items={pizza}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={salad}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={soup}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={dessert}></OrderTab></TabPanel>
                <TabPanel><OrderTab items={drinks}></OrderTab></TabPanel>
            </Tabs>
        </div>
    );
};

export default OurShop;