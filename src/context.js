import React, {useContext, useState} from 'react'
import { useEffect } from 'react';
import items from './data'
const RoomContext = React.createContext();
let temp = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };
const RoomProvider = ({children}) => {
    //useSetState
    const [state, setState] = useState(temp);
    const formatData = (items) => {
        let tempItems = items.map((item) => {
            let id = item.sys.id;
            let images = item.fields.images.map((image) => image.fields.file.url)
            let room = {...item.fields, images, id};
            return room;
        })
        return tempItems;
    }
    const componentDidMount = (items) => {
        let rooms = formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        setState({...state, rooms, featuredRooms, sortedRooms: rooms, loading: false, 
            price: maxPrice,
            maxPrice,
            maxSize
        });
    }
    useEffect(() => {
        console.log("YO I'm called")
        componentDidMount(items);
    }, []);
    const getRoom = (slug) => {
        let tempRoom = [...state.rooms];
        const room = tempRoom.find((room)=> room.slug === slug);
        return room;
    }
    const handleChange = (e) => {
        const type = e.target.type;
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        // console.log(state);
        let tempState = state;
        tempState[name] = value;
        setState(tempState);
        // console.log(tempState);
        console.log(state);
        filterRooms();
    }
    const filterRooms = () => {
        let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = state;
        //capacity from form is in string
        capacity = parseInt(capacity);
        price = parseInt(price);
        let tempRooms = [...rooms];
        //type filter
        if(type !== 'all') {
            tempRooms = tempRooms.filter((room) => room.type === type);
        }
        //capacity filter
        tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
        //price filter
        tempRooms = tempRooms.filter((room) => room.price <= price);
        tempRooms = tempRooms.filter((room) => 
            room.size >= minSize && room.size <= maxSize);
        //breakfast filter
        if(breakfast) {
            tempRooms = tempRooms.filter((room) => room.breakfast === true);
        }
        // pets filter 
        if(pets) {
            tempRooms = tempRooms.filter((room) => room.pets === true);
        }
        setState({...state, sortedRooms: tempRooms});
    }
    return <RoomContext.Provider
                value = {{...state, getRoom, handleChange}}
            >
            {children}
        </RoomContext.Provider>
} 
export default function useGlobalContext() {
    return useContext(RoomContext);
}
export {RoomProvider, RoomContext};
