import React from "react";

function CheckboxSelectOption(props) {
    const { id, name, isChecked, isHidden, updateOptionCheckedStatus, updateFilterSelectionChangeCount } = props;

    function updateFilterSelections(e) {
        updateOptionCheckedStatus(id, e.target.checked);
        // updateFilterSelectionChangeCount(prevFilterSelectionChangeCount => prevFilterSelectionChangeCount +1);
    }

    return (
        <section className={'checkbox-select-option'} hidden={isHidden}>
            <input id={id}
                   className={'checkbox-select-option__checkbox'}
                   type={'checkbox'}
                   onChange={(e) => {updateFilterSelections(e)}}
                   checked={isChecked}
            />
            <label htmlFor={id}>{name}</label>
        </section>
    );
}

export default CheckboxSelectOption;