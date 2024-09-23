import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover';
import menuImg from '../../assets/banner3.jpg';
import pizzaImg from '../../assets/pizza-bg.jpg';
import saladImg from '../../assets/salad-bg.jpg';
import soupImg from '../../assets/soup-bg.jpg';
import dessertImg from '../../assets/dessert-bg.jpeg';
import useMenu from '../../hooks/useMenu';
import MenuCategory from './MenuCategory';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';

const Menu = () => {

    const [menu] = useMenu();
    const offered = menu?.filter(item => item.category === 'offered');
    const pizza = menu?.filter(item => item.category === 'pizza');
    const salad = menu?.filter(item => item.category === 'salad');
    const soup = menu?.filter(item => item.category === 'soup');
    const dessert = menu?.filter(item => item.category === 'dessert');

    return (
        <div>
            <Helmet>
                <title>Vojghar || Our Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our Menu"></Cover>
            <SectionTitle subHeading="Don't Miss it" heading="Today's Offer"></SectionTitle>
            <MenuCategory items={offered} title="salad"></MenuCategory>

            <Cover img={pizzaImg} title="Pizza"></Cover>
            <MenuCategory items={pizza} title="pizza"></MenuCategory>

            <Cover img={saladImg} title="Salad"></Cover>
            <MenuCategory items={salad} title="salad"></MenuCategory>

            <Cover img={soupImg} title="Soup"></Cover>
            <MenuCategory items={soup} title="soup"></MenuCategory>

            <Cover img={dessertImg} title="Dessert"></Cover>
            <MenuCategory items={dessert} title="dessert"></MenuCategory>
        </div>
    );
};

export default Menu;