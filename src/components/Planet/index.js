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

        this.setState({ planets: response.data, isLoaded: !!response });
    }

    setLoading = isLoaded => this.setState({ isLoaded: isLoaded });

    getRandomPlanetId = () => Math.floor(Math.random() * 61 + 1);

    render() {
        let { isLoaded } = this.state;
        
        return (
            !isLoaded ? <Loader/> :
                
                <section className="card">
                    <h3 className="title">{ this.state.planets.name }</h3>
                
                    <div className="content">
                        <p className="category">
                            <span className="label">Population:&nbsp;</span> { this.state.planets.population }
                        </p>
                        <p className="category">
                            <span className="label">Climate:&nbsp;</span> { this.state.planets.climate }
                        </p>
                        <p className="category">
                            <span className="label">Terrain:&nbsp;</span> { this.state.planets.terrain }
                        </p>
                        <p className="category-films">
                            <span>Featured in { this.state.planets.films?.length } film(s).</span>
                        </p>
                    </div>
                    <div className="btn-next">
                        <button className="button" onClick={ this.loadPlanet.bind() }>Next</button>
                    </div>
                </section>
        );
    }
}