import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react';
import { NamesType } from '../../interfaces/client';
import ActionButton from './ActionButton';
import { IUpdateRow } from '../../interfaces/action';
import { useUpdateAutocomplete, useOptionStyle } from '../../styles/style';
import { IDS } from '../../config/actions';

const UpdateForm: React.FC<IUpdateRow> = observer((props) => {
    const { data, handleChange, rowClicked, title, name, actionBtnText, placeholder, update } = props;
    const [searchText, setSearchText] = useState('');
    const autocompleteStyle = useUpdateAutocomplete();
    const optionStyle = useOptionStyle();
    useEffect(() => {
        handleChange(searchText, name);
    }, [searchText])

    const inputChanged = (event: object, value: string, reason: string) => {
        setSearchText(value)
    }

    const optionClicked = (option: NamesType) => {
        rowClicked(option.id, IDS[name]);
    }

    return (
        <Grid item xs={12} justify="flex-start" container alignItems="center">
            <Grid item xs={4}>
                <Typography component="div">{title}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    classes={autocompleteStyle}
                    freeSolo
                    onInputChange={inputChanged}
                    options={data}
                    getOptionLabel={(option: NamesType) => option.name}
                    style={{ width: 200 }}
                    renderOption={(option) => (
                        <Typography
                            className={optionStyle.option}
                            onClick={() => optionClicked(option)}>
                            {option.name}
                        </Typography>
                    )}
                    renderInput={(params: any) => <TextField name={name}
                        {...params} placeholder={placeholder} />}
                />
            </Grid>
            {actionBtnText ?
                    <Grid item xs={2}>
                        <ActionButton text={actionBtnText} onClick={async () => await update(IDS[name])} />
                    </Grid>
                    : null}

        </Grid>
    );

})

export default UpdateForm;