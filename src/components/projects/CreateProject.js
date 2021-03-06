import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { createProject } from "../../actions/projectActions";
import { createDeflate } from 'zlib';
import { Redirect } from "react-router-dom";
import UpLoadFile from './UpLoadFile';
import Loader from '../head&foot/Loader';
import { device } from '../../media queries/deviceName'
let camera = require('../../public/camera.png')

const CreateProjectContent = styled.form`
    font-size: 18px;
    height: 100%;
    letter-spacing: 3px;
    width: 70vw;
    margin: 0 auto;
    padding-top: 50px;
    @media ${device.desktop} {
        width: 80vw;
    }
    @media ${device.laptopL} {
        width: 95vw;
    }
    @media ${device.tablet} {
        width: 100vw;
    }
    @media ${device.mobileL} {
        padding: 40px 25px 5px 25px;
    }
    input, 
    textarea {
        outline: none;
        padding: 8px;
        font-size: 18px;
        border-width: 0;
        border-radius: 2px;
        height: 45px;
        min-width: 200px;
        margin-top: 10px;
        :focus {
            background-color: rgb(202, 216, 218, 0.6);
        }
    }
    .input-field {
        color: rgba(160, 160, 160);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 0 15px;
        @media ${device.mobileL} {
            padding: 0;
        }
        .list {
            display: flex;
            flex-grow: 1;
            flex-wrap: wrap;
            height: 45px;
            background-color: #fff;
            border-radius: 2px;
            margin-top: 10px;
            .eachOption {
                border-radius: 2px;
                flex-grow: 1;
                text-align: center;
                margin: 6px;
                line-height: 33px;
                background-color: rgb(203, 203, 203, 0.3);
                cursor: pointer;
                color: #5B5566;
                transition: transform 0.3s ease-in;
                :active {
                    transform: translate(3px, 3px);
                }
            }
            [data-item="publicationCategory"] {
                :hover {
                    background-color: rgb(245, 147, 103, 0.5);
                }
                :active {
                    background-color: rgb(245, 147, 103);
                }
            }
            .hoveryellow {
                :hover {
                    background-color: rgb(252, 225, 150, 0.5);
                }
                :active {
                    background-color: rgb(252, 225, 150);
                }
            }
            .hovergreen {
                :hover {
                    background-color: rgb(185, 199, 148, 0.5);
                }
                :active {
                    background-color: rgb(185, 199, 148);
                }
            }
            .category_select {
                background-color: rgb(245, 147, 103);
                color: #fff;
            }
            .options_2_select,
            .options_3_select {
                background-color: rgb(252, 225, 150);
            }
            .options_6_select {
                background-color: rgb(185, 199, 148);
            }
        }
    } 
    .section_1_imgAndBasic {
        display: flex;
        margin-top: 30px;
        @media ${device.laptop} {
            flex-wrap: wrap;
        }
        .upLoadFileContainer {
            width: 400px;
            height: 400px;
            min-width: 350px;
            overflow: hidden;
            border: 10px solid #fff;
            border-radius: 10px;
            margin: 0 35px 30px 15px;
            -webkit-box-shadow: 2px 6px 19px -4px rgba(0,0,0,0.14);
            -moz-box-shadow: 2px 6px 19px -4px rgba(0,0,0,0.14);
            box-shadow: 2px 6px 19px -4px rgba(0,0,0,0.14);
            position: relative;
            background-color: rgb(203, 203, 203, 0.3);
            @media (max-width: 535px) {
                margin: 0 auto 30px auto;
            }
            @media (max-width: 770px) {
                width: 350px;
            }
            @media ${device.mobileL} {
                flex-grow: 1;
                min-width: 270px;
            }
            .projectPicture {
                width: 100%;
                height: 100%;
                min-width: 100%;
                min-height: 100%;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }
            .uploadFile_btn {
                position: absolute;
                right: 20px;
                bottom: 20px;
                cursor: pointer;
                :hover {
                    right: 25px;
                    bottom: 25px;
                }               
            }
        }
        .basicInformation {
            display: flex;
            flex-grow: 1;
            flex-wrap: wrap;
            @media ${device.laptop} {
                flex-direction: column;
            }
            .secondContainer {
                display: flex;
                flex-wrap: wrap;
                flex-grow: 1;
                @media ${device.laptop} {
                    flex-direction: column;
                }
                @media (max-width: 680px) {
                    flex-direction: row;
                }
                .input-field {
                    margin: 5px 0 30px 0;
                } 
            }
        }
        .basicAndSimpleOptions {
            flex-grow: 1;
            .simple_options_container {
                .simple_options {
                    display: flex;
                    flex-wrap: wrap;
                    .options_2 {
                        width: 50%;
                        min-width: 270px;
                        padding: 0 15px;
                        display: flex;
                        flex-direction: column;
                        margin: 5px 0 30px 0;
                        @media ${device.mobileL} {
                            padding: 0;
                        }
                    } 
                }
            }
        }
    }
    .section_2_options {
        .options_6 {
            margin: 5px 0 30px 0;
            .list {
                display: flex;
                flex-wrap: wrap;
                height: fit-content;
                .eachOption {
                    width: calc((100% - 72px) / 6);
                    min-width: 155px;
                    @media ${device.laptop} {
                        width: calc((100% - 36px) / 3);
                    }
                }
            }
        }
    }     
    .section_3_textArea {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .input-field {
            margin: 20px 0 30px 0;
            .multi-textarea {
                height: 100px;
                resize: none;
            }
        } 
        button {
            margin: 30px auto 0 auto;
            font-size: 18px;
            letter-spacing: 3px;
            width: 100%;
            max-width: 400px;
            height: 45px;
            border-radius: 22.5px;
            background-color: rgb(23, 156, 154);
            color: #fff;
            :hover {
                background-color: rgb(23, 156, 154, 0.85);
            }
            :active {
                transform: translate(2px, 3px);
            }
        }
    }
`;

class CreateProject extends Component {
    state = {
        ligation: '',
        publicationCategory: '',
        nickName: '',
        size: '',
        species: '',
        age: '',
        gender: '',
        weight: '',
        variety: '',
        physicalCondition: '',
        currentLocation: '',
        character: '',
        reason: '',
        requirement: '',
        connectMethods: '',
        file: '',
        fileName: '',
        adoptionStage: 0,
        adopterID: '',
        coatColor: '',
        feature: '',
        preImg: '',
        isLoading: false,
        windowWidth: ''
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
    }
    setSelectedData = (event, el) => {
        this.setState({
            [event.target.dataset.item]: el
        })
        return el
    }
    // 貓狗體重區間不同，為避免使用者選擇體重後才重選動物種類，另外增加判定是否須清除體重資訊，並提示重新選擇
    // 1.初始狀態
    // 2.尚未選擇體重，在種類間切換
    // 3.已選擇體重後切換種類
    // 4.重複點選同一種類
    setSelectedSpecies = (event, el) => {
        if (this.state.species === '') {
            this.setState({
                species: el,
            })
        } else if (this.state.species != el && this.state.weight === '') {
            this.setState({
                species: el,
            })
        } else if (this.state.species != el && this.state.weight !== '') {
            this.setState({
                species: el,
                weight: ''
            })
            return alert('請重新選擇體重')
        } else if (this.state.species == el) {
            console.log('使用者重複點選一樣的種類，不更新資料')
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log("00000", this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let fileName = !this.state.fileName
        let connectMethods = !this.state.connectMethods
        let publicationCategory = !this.state.publicationCategory
        let reason = !this.state.reason
        if (fileName || connectMethods || publicationCategory || reason) {
            return alert('刊登種類、送養原因、及聯絡方式為必填，並須上傳一張照片')
        } else {
            this.setState({
                isLoading: true
            }, () => this.props.dispatch(createProject(this.state)))
        }
    }
    handleFileSelect = (e) => {
        this.setState({ file: e.target.files[0] }, () => this.setFileName())
    }
    setFileName = () => {
        this.setState({ fileName: this.state.file.name + new Date().getTime() }, () => this.previewFile())
    }
    previewFile = () => {
        let reader = new FileReader();
        reader.readAsDataURL(this.state.file);
        reader.onload = (readerEvent) => {
            this.setState({ preImg: readerEvent.target.result })
        }
    }

    render() {
        const { auth } = this.props;
        const options = {
            size: ['大型', '中等', '小型'],
            publicationCategory: ['私人送養', '中途送養'],
            species: ['狗', '貓'],
            age: ['< 6 個月', '6 個月 - 2 歲', '3 歲 - 6 歲', '7 歲 - 10 歲', '11 歲 - 14 歲', '> 15 歲'],
            gender: ['女生', '男生'],
            catWeight: ['< 1 kg', '1-2 kg', '3-4 kg', '5-6 kg', '7-8 kg', '> 8 kg'],
            dogWeight: ['< 4 kg', '4-10 kg', '11-20 kg', '21-30 kg', '31-40 kg', '> 40 kg'],
            ligation: ['已結紮', '未結紮'],
        };
        if (!auth.uid) return <Redirect to='/authentication/signin' />
        if (auth.uid && !this.state.isLoading) {
            return (
                <CreateProjectContent onSubmit={this.handleSubmit}>
                    <div className="input-field">
                        <label className='title' htmlFor="publicationCategory">請選擇刊登類別</label>
                        <div className='list'>
                            {
                                options.publicationCategory.map((el, index) => {
                                    return (
                                        <div
                                            className={`eachOption ${this.state.publicationCategory === el ? 'category_select' : null}`}
                                            data-item='publicationCategory'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <section className='section_1_imgAndBasic'>
                        <div className='upLoadFileContainer'>
                            <div className='projectPicture' style={{ backgroundImage: `url('${this.state.preImg}')` }}></div>
                            <label className='uploadFile_btn' htmlFor="uploadFileInput">
                                <UpLoadFile fileSelect={this.handleFileSelect} />
                                <img src={camera} />
                            </label>
                        </div>
                        {this.state.windowWidth <= 1024 && <BasicInformation handleChange={this.handleChange} />}
                        <div className='basicAndSimpleOptions'>
                            {this.state.windowWidth > 1024 && <BasicInformation handleChange={this.handleChange} />}
                            <div className='simple_options_container'>
                                <div className='simple_options'>
                                    <div className="input-field  options_2" id="species">
                                        <label className='title' htmlFor="species">種類</label>
                                        <div className='list'>
                                            {
                                                options.species.map((el, index) => {
                                                    return (
                                                        <div
                                                            className={`eachOption hoveryellow ${this.state.species === el ? 'options_2_select' : null}`}
                                                            data-item='species'
                                                            key={index}
                                                            onClick={(event) => this.setSelectedSpecies(event, el)}
                                                        >
                                                            {el}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="input-field options_2">
                                        <label className='title' htmlFor="ligation">結紮狀況</label>
                                        <div className='list'>
                                            {
                                                options.ligation.map((el, index) => {
                                                    return (
                                                        <div
                                                            className={`eachOption hoveryellow ${this.state.ligation === el ? 'options_2_select' : null}`}
                                                            data-item='ligation'
                                                            key={index}
                                                            onClick={(event) => this.setSelectedData(event, el)}
                                                        >
                                                            {el}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='simple_options'>
                                    <div className="input-field options_2">
                                        <label className='title' htmlFor="gender">性別</label>
                                        <div className='list'>
                                            {
                                                options.gender.map((el, index) => {
                                                    return (
                                                        <div
                                                            className={`eachOption hoveryellow ${this.state.gender === el ? 'options_2_select' : null}`}
                                                            data-item='gender'
                                                            key={index}
                                                            onClick={(event) => this.setSelectedData(event, el)}
                                                        >
                                                            {el}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="input-field options_2">
                                        <label className='title' htmlFor="size">體型</label>
                                        <div className='list'>
                                            {
                                                options.size.map((el, index) => {
                                                    return (
                                                        <div
                                                            className={`eachOption hoveryellow ${this.state.size === el ? 'options_3_select' : null}`}
                                                            data-item='size'
                                                            key={index}
                                                            onClick={(event) => this.setSelectedData(event, el)}
                                                        >
                                                            {el}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='section_2_options'>
                        <div className="input-field options_6">
                            <label className='title' htmlFor="age">年齡</label>
                            <div className='list'>
                                {
                                    options.age.map((el, index) => {
                                        return (
                                            <div
                                                className={`eachOption hovergreen ${this.state.age === el ? 'options_6_select' : null}`}
                                                data-item='age'
                                                key={index}
                                                onClick={(event) => this.setSelectedData(event, el)}
                                            >
                                                {el}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="input-field options_6">
                            <label className='title' htmlFor="weight">體重</label>
                            {this.state.species === '' &&
                                <div className='hint'>
                                    <p>請先選擇動物種類</p>
                                </div>
                            }
                            {this.state.species == '貓' &&
                                <div className='list'>
                                    {this.state.species == '貓' &&
                                        options.catWeight.map((el, index) => {
                                            return (
                                                <div
                                                    className={`eachOption hovergreen ${this.state.weight === el ? 'options_6_select' : null}`}
                                                    data-item='weight'
                                                    key={index}
                                                    onClick={(event) => this.setSelectedData(event, el)}
                                                >
                                                    {el}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {this.state.species == '狗' &&
                                <div className='list'>
                                    {this.state.species == '狗' &&
                                        options.dogWeight.map((el, index) => {
                                            return (
                                                <div
                                                    className={`eachOption hovergreen ${this.state.weight === el ? 'options_6_select' : null}`}
                                                    data-item='weight'
                                                    key={index}
                                                    onClick={(event) => this.setSelectedData(event, el)}
                                                >
                                                    {el}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </section>

                    <section className='section_3_textArea'>
                        <div className="input-field">
                            <label className='title' htmlFor="currentLocation">目前所在地</label>
                            <input type="text" id="currentLocation" className="simple_input" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className='title' htmlFor="feature">特徵</label>
                            <input type="text" id="feature" className="simple_input" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className='title' htmlFor="physicalCondition">健康狀況</label>
                            <input type="text" id="physicalCondition" className="simple_input" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className='title' htmlFor="character">個性</label>
                            <input type="text" id="character" className="simple_input" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className='title' htmlFor="reason">送養原因</label>
                            <textarea id="reason" className="multi-textarea" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className='title' htmlFor="requirement">認養條件</label>
                            <textarea id="requirement" className="multi-textarea" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label className='title' htmlFor="connectMethods">聯絡方式</label>
                            <textarea id="connectMethods" className="multi-textarea" onChange={this.handleChange} />
                        </div>
                        <button>送出</button>
                    </section>
                </CreateProjectContent >
            )
        } else {
            return <Loader />
        }
    }
}
class BasicInformation extends Component {
    render() {
        return (
            <div className='basicInformation' >
                <div className='secondContainer'>
                    <div className="input-field">
                        <label className='title' htmlFor="nickName">小名</label>
                        <input type="text" id="nickName" className="simple_input" onChange={(e) => this.props.handleChange(e)} />
                    </div>
                    <div className="input-field">
                        <label className='title' htmlFor="microchipsNumber">晶片</label>
                        <input type="text" id="microchipsNumber" className="simple_input" onChange={(e) => this.props.handleChange(e)} />
                    </div>
                </div>
                <div className='secondContainer'>
                    <div className="input-field">
                        <label className='title' htmlFor="coatColor">毛色</label>
                        <input type="text" id="coatColor" className="simple_input" onChange={(e) => this.props.handleChange(e)} />
                    </div>
                    <div className="input-field">
                        <label className='title' htmlFor="variety">品種</label>
                        <input type="text" id="variety" className="simple_input" onChange={(e) => this.props.handleChange(e)} />
                    </div>
                </div>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps, null)(CreateProject);