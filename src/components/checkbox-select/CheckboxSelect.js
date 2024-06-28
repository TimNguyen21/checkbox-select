import { useState, useRef } from "react";
import CheckboxSelectOption from "./components/checkbox-select-option/CheckboxSelectOption";
import './CheckboxSelect.scss'

import searchIcon from '../../images/search-icon.png'

function CheckboxSelect(props) {
    const { label, placeholder, optionsData } = props;
    const searchInput = useRef(null);

    const [currentOptionsData, setCurrentOptionsData] = useState(formatOptionsData(optionsData));

    function formatOptionsData(optionsData) {
        return optionsData.map(option => ({ ...option, isChecked: false, isHidden: false }));
    }

    function updateOptionCheckedStatus(optionId, checkedStatus) {
        setCurrentOptionsData(currentOptionsData.map(option => (
            option.id === optionId ? { ...option, isChecked: checkedStatus } : option
        )));
    }

    function updateOptionsDataWithTextSearch(searchText) {
        const searchTextLowercase = searchText.toLowerCase();

        const updatedData = currentOptionsData.map(option => ({
            ...option,
            isHidden: !(option.name.toLowerCase().includes(searchTextLowercase) || option.isChecked)
        }));

        setCurrentOptionsData(updatedData);
    }

    function renderCheckboxSelectOptions() {

        return currentOptionsData.map(option => {
            return <CheckboxSelectOption key={option.id}
                                         id={option.id}
                                         name={option.name}
                                         updateOptionCheckedStatus={updateOptionCheckedStatus}
                                         isHidden={option.isHidden}
                                         isChecked={option.isChecked} />
        })
    }

    function resetToDefaultOptions() {
        let defaultOptionsData = formatOptionsData(currentOptionsData);
        searchInput.current.value = '';

        setCurrentOptionsData(defaultOptionsData);
    }

    function updateFilterSelections(e) {
        updateOptionsDataWithTextSearch(e.target.value);
    }

    return (
        <section className={'checkbox-select'}>
            <label className={'checkbox-select__label'}>{label}</label>
            <section className={'checkbox-select__input-container'}>
                <img className={'checkbox-select__input-search-icon'} src={searchIcon} alt={'search icon'}/>
                <input className={'checkbox-select__input'}
                       type={'text'}
                       placeholder={placeholder}
                       ref={searchInput}
                       onChange={(e) => {updateFilterSelections(e)}}
                />
            </section>
            <section className={'checkbox-select__options'}>
                {renderCheckboxSelectOptions()}
            </section>
            <section className={'checkbox-select__buttons'}>
                <input className={'checkbox-select__button-reset'} type='button' value={'Reset'} onClick={() => {resetToDefaultOptions()}}/>
            </section>
        </section>
    );
}

export default CheckboxSelect;
