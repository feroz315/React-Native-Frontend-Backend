import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import StackNavigation from '../Screens/AppNavigator';
import { addMyProducts } from './HomeSlics';


const categories = [
    
  {
   id: '1', 
   name: 'Rolls', 
   price:250,
   description: "Classic delight with 100% real mozzarella cheese",
   rating: 4.7,
   qty: 0,
   duration:"30-35 min",
   pic: require('../assets/icons/ch-roll.png')

  },
  {
    id: 2,
    name: "Burger",
    price:200,
    description: "Classic delight with 100% real Burger",
    rating: 4.2,
    duration:"20-25 min",
    icon: require('../assets/icons/burgers.png')
},
{
    id: 3,
    name: "Bar B Q",
    price:450,
    description: "Classic delight with 100% real Bar BQ",
    rating: 4.2,
    duration:"35-45 min",   
    icon: require('../assets/icons/barbq.png')
},
{
    id: 4,
    name: "Handi",
    price:650,
    description: "Classic delight with 100% real mozzarella cheese",
    rating: 4.1,
    duration:"45-60 min",
    icon: require('../assets/icons/handi.png')
},
{
    id: 5,
    name: "Karhai",
    price:900,
    description: "Classic delight with 100% real mozzarella cheese",
    rating: 4.8,
    duration:"50-55 min",
    icon: require('../assets/icons/chicken-karahi.png')
},

{
    id: 6,
    name: "Fish",
    price:1250,
    description: "Classic delight with 100% real mozzarella cheese",
    rating: 4.9,
    duration:"30-35 min",
    icon: require('../assets/icons/fish.png')
},
{
    id: 7,
    name: "Dal\nSabzi",
    price:250,
    description: "Classic delight with 100% real mozzarella cheese",
    rating: 4.7,
    duration:"15-20 min",
    icon: require('../assets/icons/dal.png')
},
{
    id: 8,
    name: "Paratha",
    price:100,
    description: "Classic delight with 100% real Paratha",
    rating: 3.8,
    duration:"10-15 min",
    icon: require('../assets/icons/paratha.png')
},
{
    id: 9,
    name: "Sand\nWiches",
    price:150,
    description: "Classic delight with 100% real mozzarella cheese",
    rating: 4.7,
    duration:"10-15 min",
    icon: require('../assets/icons/sandwich.png')
},
{
    id: 10,
    name: "French\nFries",
    price:100,
    description: "Classic delight with 100% real mozzarella cheese",
    rating: 3.6,
    duration:"8-12 min",
    icon: require('../assets/icons/french-fries.png')
},
{
    id: 11,
    name: "Drinks",
    price:150,
    description: "Drinks with 100% real ",
    rating: 4.7,
    icon: require('../assets/icons/cold-drinks.png')
},

];


const Main = () => {
const dispatch = useDispatch();

useEffect(() => {
    categories.map(item => {
        dispatch(addMyProducts(item))
      });
  
  },[]);

    return <StackNavigation />;     
  };




export default Main;
