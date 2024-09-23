import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import PopItems from '../Shared/PopItems';
import useMenu from '../../hooks/useMenu';

const PopularMenu = () => {

    const [menu] = useMenu();
    const popularItems = menu?.filter(item => item.category === 'popular');

    return (
        <div>
            <SectionTitle
                subHeading="Check it out"
                heading="from our menu"
            ></SectionTitle>
            <div className='grid grid-cols-2 gap-8 my-16'>
                {
                    popularItems?.map(item => <PopItems key={item._id} item={item}></PopItems>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;