import { useState, useEffect, useRef } from "react";
import CheckboxSelectOption from "./components/checkbox-select-option/CheckboxSelectOption";
import './CheckboxSelect.scss'

function CheckboxSelect(props) {
    const { name, label, placeholder, optionsData, setSelectedOptionsData, resetToDefault, syncFilterSelection, currentFilterSelection, updateFilterSelectionChangeCount } = props;

    // const inputSearchNameElement = useRef(null);

    const [currentOptionsData, setCurrentOptionsData] = useState(formatOptionsData(optionsData));
    const [expandCheckboxSelect, setExpandCheckboxSelect] = useState(false);

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

    // function getCheckedOptionsData() {
    //     const checkedOptionsId = currentOptionsData.filter(option => option.isChecked).map(option => option.id);

    //     return {[name]: checkedOptionsId};
    // }

    // function getOptionSelectionSummary() {
    //     const checkedOptions = currentOptionsData.filter(option => option.isChecked);

    //     if (checkedOptions.length === 0) {
    //         return `Select ${label}`;
    //     } else if (checkedOptions.length === 1) {
    //         return `${checkedOptions[0].name}`;
    //     } else if (checkedOptions.length === 2) {
    //         return `${checkedOptions[0].name}, ${checkedOptions[1].name}`;
    //     } else {
    //         return `${checkedOptions[0].name}, ${checkedOptions[1].name} +${checkedOptions.length - 2}`;
    //     }
    // }

    function renderCheckboxSelectOptions() {

        return currentOptionsData.map(option => {
            return <CheckboxSelectOption key={option.id}
                                         id={option.id}
                                         name={option.name}
                                         updateOptionCheckedStatus={updateOptionCheckedStatus}
                                         isHidden={option.isHidden}
                                         isChecked={option.isChecked}
                                        //  updateFilterSelectionChangeCount={updateFilterSelectionChangeCount}
            />
        })
    }

    // function resetToDefaultOptions() {
    //     let defaultOptionsData = formatOptionsData(currentOptionsData);
    //     inputSearchNameElement.current.value = '';

    //     setCurrentOptionsData(defaultOptionsData);
    // }

    function updateFilterSelections(e) {
        updateOptionsDataWithTextSearch(e.target.value);
        // updateFilterSelectionChangeCount(prevFilterSelectionChangeCount => prevFilterSelectionChangeCount +1);
    }

    // // useEffect(() => {
    // //     setSelectedOptionsData(getCheckedOptionsData());
    // // },[currentOptionsData]);

    // useEffect(() => {
    //     resetToDefaultOptions();
    // },[resetToDefault]);

    // useEffect(() => {
    //     const updatedOptionsData = currentOptionsData.map(optionData => ({
    //         ...optionData,
    //         isChecked: currentFilterSelection[name].includes(optionData.id),
    //     }));

    //     setCurrentOptionsData(updatedOptionsData);
    // },[syncFilterSelection]);

    return (
        <section className={'checkbox-select'}>
            {/* <label className={'checkbox-select__label'} onClick={() =>{getOptionSelectionSummary()}}>{label}</label> */}
            <section className={expandCheckboxSelect ? 'checkbox-select__input-container' : 'checkbox-select__element-hidden'}>
                <span className={'checkbox-select__input-search-icon'}>searchIcon</span>
                <input className={'checkbox-select__input'}
                       type={'text'}
                    //    ref={inputSearchNameElement}
                       placeholder={placeholder}
                       onChange={(e) => {updateFilterSelections(e)}}
                />
            </section>
            {/* <section className={!expandCheckboxSelect ? 'checkbox-select__selection-summary' : 'checkbox-select__element-hidden'}
                     onClick={() => {setExpandCheckboxSelect(true)}}>
                <label className={'checkbox-select__selection-summary-label'}>{getOptionSelectionSummary()}</label>
            </section> */}
            {/* <span className={'checkbox-select__show-form-toggle'}
                  onClick={() => {setExpandCheckboxSelect(prevActiveStatus => !prevActiveStatus)}}>
                {expandCheckboxSelect ? '^' : 'v'}
            </span> */}
            <section className={'checkbox-select__options'} 
            // hidden={!expandCheckboxSelect}
            >
                {renderCheckboxSelectOptions()}
            </section>
        </section>
    );
}

export default CheckboxSelect;