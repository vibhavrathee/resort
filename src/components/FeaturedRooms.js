import React from 'react'
import useGlobalContext from '../context'
import Loading from './Loading';
import Room from './Room';
import Title from './Title';
export default function FeaturedRooms() {
    let {loading, featuredRooms : rooms} = useGlobalContext();
    const Rooms =  rooms.map((room) => {
        return <Room key = {room.id} room = {room}/>
    })
    return (
        <section className="featured-rooms">
            <Title title="Featured Rooms"/>
            <div className="featured-rooms-center">
                {loading ? <Loading/> : Rooms}
            </div>
        </section>
    )
}
