import React from 'react';
import { Spinner } from 'react-bootstrap';


const LoadingSpinner = ({ message }) => {

    return (
        <div className="overlay d-flex justify-content-center">
            <div className="spinner">
                <Spinner animation="border" role="status"></Spinner>
            </div>
            <span > {message || "Loading..."}</span>
        </div>
        );
}

export default LoadingSpinner;