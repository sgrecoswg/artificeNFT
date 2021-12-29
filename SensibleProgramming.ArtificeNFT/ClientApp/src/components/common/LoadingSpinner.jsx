import React from 'react';
import { Spinner } from 'react-bootstrap';


export default LoadingSpinner = ({ message}) => {

    return (
        <div className="overlay">
            <div className="d-flex justify-content-center spinner">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading { message || ''}</span>
                </Spinner>
            </div>
        </div>
        );
}