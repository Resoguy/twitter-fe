import React from 'react';
import {connect} from 'react-redux'
import {FaTimes} from 'react-icons/fa';
import {Card, Button} from '../index';
import {closeModal} from '../../../store/actionCreators/ui';
import s from './Modal.module.scss';


const Modal = ({closeModal, ChildComponent}) => {

    return (
        <div className={s.overlay}>
            <Button className={s.closeBtn} icon={FaTimes} onClick={closeModal} />
            <div className={s.modalWrapper}>
                <Card>
                    <ChildComponent />
                </Card>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    ChildComponent: state.ui.modalComponent
})

const mapDispatchToProps = {
    closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
