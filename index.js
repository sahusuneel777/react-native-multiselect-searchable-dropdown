import React, { useEffect, useState, useMemo, useRef, useCallback, useReducer } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, Button, TextInput, Modal, ScrollView, StyleSheet, Animated, Platform, KeyboardAvoidingView, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


function SearchableDropDown(props) {
    const [options, setOptions] = useState([])
    const [filteredOptions, setFilteredOptions] = useState(options)
    const [placeHolder, setPlaceHolder] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [searchedText, setSearchedText] = useState(null)
    const [text, setText] = useState(null)
    const [selectedOption, setSelectedOption] = useState([])
    const [valuetoDisplay, setValueToDisplay] = useState(null)
    const [selectedOptionIdList, setselectedOptionIdList] = useState([])
    const [showConfirmButton, setShowConfirmButton] = useState(false)


    useEffect(() => {
        let value = ''
        if (props) {
            setPlaceHolder(props.placeHolder)
            setOptions(props.options)
            setFilteredOptions(props.options)

            if (props.value == '' || props.value == []) {
                setSelectedOption([])
            }
            else {
                props['options'].map(each => {
                    if (each.id == props.value) {
                        setSelectedOption([each])
                    }
                })
            }

            if (props.multiSelect && props.multiSelect == true) {
                console.log("multi", props.value);
                props['options'].map(each => {
                    let v = props.value.length > 1 ? props.value : [props.value]
                    v.map(eachValue => {
                        if (each.id == eachValue) {
                            value += each.name + ", "

                        }
                    })

                })
                value = value.slice(0, -2)
            } else {
                props['options'].map(each => {
                    if (each.id == props.value) {
                        value = each.name
                    }
                })
            }

            if (value) {
                setValueToDisplay(value)
            } else {
                setValueToDisplay(null)
            }
        }

    }, [openModal, props.value])

    const onSelectOption = (option) => {
        setShowConfirmButton(true)
        let tempIdList = []
        function callForIds(tempOptions) {
            tempOptions.map((each, key) => {
                tempIdList.push(each.id)
            })
            setselectedOptionIdList((prevState) => [...tempIdList])
        }

        if (props.multiSelect && props.multiSelect == true) {
            if (selectedOption.includes(option)) {
                let tempOptions = selectedOption
                selectedOption.map((each, key) => {
                    if (each.id == option.id) {

                        tempOptions.splice(key, 1)
                        setSelectedOption((prevState) => [...tempOptions])
                        callForIds(tempOptions)

                    }
                })


            }
            else {
                setSelectedOption((prevState) => [...selectedOption, option])
                setselectedOptionIdList((prevState) => [...selectedOptionIdList, option.id])
            }
        } else {
            setSelectedOption([option])
            setselectedOptionIdList([option.id])
        }
    }

    const filterResults = (searchedText) => {
        let filteredResults = []
        options.map((eachOption) => {
            if (eachOption['name'].toLowerCase().includes(searchedText.toLowerCase())) {
                filteredResults.push(eachOption)
            }
        })
        setFilteredOptions(filteredResults)
    }

    const onChangeText = (value) => {
        setText(value)
    }

    const onChangeSearch = (searchedText) => {
        filterResults(searchedText)
    }

    const closeDropDown = () => {
        props.onChange(selectedOptionIdList.length == 1 ? selectedOptionIdList[0] : selectedOptionIdList)
        setselectedOptionIdList([])
        setShowConfirmButton(false)
        setOpenModal(false)
    }

    return (
        <>
            <Text style={{ padding: 4, color: "#7681A2", fontFamily: "DMSans-Regular" }}>{props.label || 'label'}</Text>

            <TouchableOpacity onPress={() => { if (props.disable != undefined) { if (props.disable == false) { setOpenModal(true) } } else { setOpenModal(true) } }} style={{ width: props.width ? props.width : wp('97%'), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: wp('6%') }} >
                <TextInput style={{ color: "#000", width: '90%', padding: 0, paddingLeft: 5, margin: 0, fontSize: wp('4.2%') }} placeholderTextColor='#7681A2' placeholder={placeHolder} value={valuetoDisplay} editable={false} />
                <Image source={require('../assets/dropdown.png')} style={{ width: 10, height: 6, marginRight: wp('2%'), backgroundColor: props.disable ? '#e4e4e4' : '#f4f4f4' }} />
            </TouchableOpacity>

            <Modal
                visible={openModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setOpenModal(false)
                }}
                onBackdropPress={() => setOpenModal(false)}
            >
                <SafeAreaView style={{ width: wp('90%'), borderWidth: 0.4, borderRadius: 10, borderColor: '#7681A2', paddingTop: hp('4%'), paddingBottom: hp('3%'), backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: Platform.OS !== 'ios' ? hp('80%') : hp('79%'), flex: 1 }}>

                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', marginBottom: hp('2%'), marginRight: 'auto', justifyContent: 'flex-start', alignItems: 'flex-start' }} onPress={() => setOpenModal(false)}><Image style={{ width: 30, height: 30, margin: 10 }} source={require("../assets/close_black.png")} resizeMode="contain" /></TouchableOpacity>

                    <View style={{ width: '95%', height: '100%', }}>

                        {(props.isSearchNeeded && props.isSearchNeeded == true) && <View style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', height: hp('100%'), justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', height: hp('10%'), width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                <TextInput style={{
                                    color: '#000', borderWidth: 0.5, fontSize: wp('4.2%'), borderRadius: wp('3%'), width: '100%', borderColor: 'gray'
                                }} placeholder={placeHolder} placeholderTextColor="#7681A2" value={searchedText} onChangeText={onChangeSearch} />

                            </View>
                        </View>}
                        <ScrollView style={{ width: '100%', paddingTop: hp('2%'), height: hp('60%'), paddingHorizontal: 10 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true}>
                            {filteredOptions.map((option, option_key) => {
                                let isoptionPresent = selectedOption.includes(option)
                                return <TouchableOpacity onPress={() => { onSelectOption(option) }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingHorizontal: 10, paddingVertical: 10, borderColor: '#e3e3e3', borderWidth: 0 }}>
                                        <Text style={{ color: '#000000', fontSize: wp('4.2%'), fontFamily: "NunitoSans-Bold", textTransform: 'capitalize', fontWeight: isoptionPresent == true ? 'bold' : '100', color: (selectedOption && selectedOption.name == option.name) ? '#000' : '#7681A2' }}>{`${option.name}`}</Text>
                                        {isoptionPresent == true && <Image style={{ height: hp('2.5%'), width: wp('6%'), marginTop: 0 }} resizeMode='contain' source={require("../assets/modaltick.png")} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            })}
                        </ScrollView>
                        {showConfirmButton && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: hp('10%'), width: '100%', paddingHorizontal: 10 }}>
                            <Button  title="Confirm" color="#f194ff" style={{ width: '100%', }} onPress={() => closeDropDown()}>Confirm</Button>
                        </View>}
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    )
}


export default SearchableDropDown