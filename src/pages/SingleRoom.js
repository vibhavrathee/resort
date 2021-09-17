import React, { Component } from 'react'
import {useParams} from 'react-router-dom'
import Hero from '../components/Hero'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import { RoomContext } from '../context'
import useGlobalContext from '../context'
import StyledHero from '../components/StyledHero'
export default function SingleRoom (){
    const {slug} = useParams();
    const {getRoom} = useGlobalContext();
    const room = getRoom(slug);
    if(!room) {
        return <div className="error">
            <h3>No such room found</h3>
            <Link to ="/rooms" className="btn-primary">
                Back To Rooms
            </Link>
        </div>
    }
    const {name, description, capacity, size, price,
    extras, breakfast, pets, images} = room;
    const [mainImg, ...defaultImg] = images; 
    return <>
        <StyledHero img={mainImg}>
            <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
            </Banner>
        </StyledHero>
        <section className="single-room">
            <div className="single-room-images">
                {defaultImg.map((image, index) => {
                    return <img key={index} src={image} alt="image" />
                })}
            </div>
            <div className="single-room-info">
                <article className="desc">
                    <h3>Details</h3>
                    <p>{description}</p>
                </article>
                <article className="info">
                    <h3>Info</h3>
                    <h6>Price : ${price}</h6>
                    <h6>Max Capacity : { capacity > 1 ? `${capacity} people` : `${capacity} person` }</h6>
                    <h6>{pets ? "Pets allowed" : "No pets allowed"}</h6>
                    <h6>{breakfast && "Free breakfast included"}</h6>
                </article>
            </div>
        </section>
        <section className="room-extras">
            <h6>Extras</h6>
            <ul className="extras">
                {extras.map((item, index) => {
                    return <li key = {index}>-{item}</li>
                })}
            </ul>
        </section>
    </>
}
