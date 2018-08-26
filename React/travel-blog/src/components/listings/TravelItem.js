import React, { Component } from 'react';

export default class TravelItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <dir className="row">
                <div className="col-sm-8">
                    <div className="description-wrapper">
                        <h4 className="title">
                            <a href="">Неделна разходка до Лакатнишките скали</a></h4>
                        <div className="short-description">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab alias cupiditate ipsum porro quisquam quam rerum modi ullam amet quaerat facere accusamus maxime, quia non eos doloribus. Alias, sit labore.</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 info">
                    <p className="author"><a href="">Pesho</a></p>
                </div>
                <div className="col-sm-2 info">
                    <p className="date-added">17:40 25.08.2018</p>
                </div>
            </dir>
        )
    }
}