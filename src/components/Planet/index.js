import React, { Component } from 'react';
import { getPlanetById } from '../../services/api';
import './styles.css';

import Loader from '../Loader'

export default class Planet extends Component {

    state = {
        planets: [],
        isLoaded: false
    }

    componentDidMount() {
        this.loadPlanet();
    }

    loadPlanet = async () => {
        let randomPlanetId = this.getRandomPlanetId();

        this.setLoading(true);

        const response = await getPlanetById(randomPlanetId)
            .then(this.setLoading(false));

        this.setState({ planets: response.data, isLoaded: true });
    }

    setLoading = isLoaded => this.setState({ isLoaded });

    getRandomPlanetId = () => Math.floor(Math.random() * 61 + 1);

    render() {
        const { isLoaded, planets } = this.state;
        
        return (
            !isLoaded ? <Loader/> :
                
                <section className="card">
                    <h3 className="title">{ planets.name }</h3>
                
                    <div className="content">
                        <p className="category">
                            <span className="label">Population:&nbsp;</span> { planets.population }
                        </p>
                        <p className="category">
                            <span className="label">Climate:&nbsp;</span> { planets.climate }
                        </p>
                        <p className="category">
                            <span className="label">Terrain:&nbsp;</span> { planets.terrain }
                        </p>
                        <p className="category-films">
                            <span>Featured in { planets.films?.length } film(s).</span>
                        </p>
                    </div>
                    <div className="btn-next">
                        <button className="button" onClick={ this.loadPlanet.bind() }>Next</button>
                    </div>
                </section>
        );
    }
}