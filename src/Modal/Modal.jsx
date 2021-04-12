import React from "react"
import './Modal.css'
import { Modal,  Button } from 'react-bootstrap';

const ModalWindow = props => {
    return(
        <div className="container">
            <div className={`modal__wrapper ${props.isOpened ? "open" : "close"}`} >
                <div className="modal__body">
                    <div className="modal__header">
                        <div className="modal__close" onClick={props.onModalClose}>×</div>
                      <h3>  {props.title}</h3> 
                        
                    </div>
                    <hr/>                
                    <div className="modal__info">
                        {props.info}
                        </div>             

                    <div className="modal__footer">
                    <div className="modal__btn">
                    <Modal.Footer className="btn">
                     <Button variant="primary" onClick={props.onModalDescription}>
                        Description
                        </Button>
                    <Button variant="danger" onClick={props.onModalDescriptionClose}>
                        Close Description
                        </Button>
                        </Modal.Footer>
                        <hr/>
                        </div>
                        <div className={`footer__description ${props.isDescription ? "open" : "close"}`} >{props.descriptionText}</div>
                        </div>
                        </div>                
                </div>
                </div>
            
    )}

export default ModalWindow
