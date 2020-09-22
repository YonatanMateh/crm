import React from 'react';
import { Button } from '@material-ui/core';
import { useActionsStyle } from '../../styles/style';

interface ActionButtonType {
    text: string,
    onClick?: (t: any) => void
}
const ActionButton: React.FC<ActionButtonType> = ({ text, onClick }) => {
    const styles = useActionsStyle();
    return (
        <Button className={styles.actionButton} onClick={onClick}>{text}</Button>
    )
}

export default ActionButton;