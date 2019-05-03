import React, { Component } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import firebase from "../../config/fbConfig"
import { asyncGetSpecificProjectAll } from '../../actions/getData/asyncGetSpecificProject';
import { approveAffidavit } from '../../actions/adoptionAction';


const ProjectInformation = styled.div`
    border: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
    p {
        border: 1px solid #000;
        padding: 8px;
    }
    .table1 {
        width: 10%;
        text-align: center;
    }
    .table_a {
        width: 25%;
    }
    .table_b {
        width: 55%;
    }
`;

class Affidavit_approve extends Component {
    state = {
        fosterSignature: '',
        fosterPhone: '',
        fosterEmail: '',
        fosterAddress: '',
        id: '',
        item: '',
        closeCaseAt: new Date()
    }
    componentDidMount() {
        const projectID = location.hash.split("?")[1].split("&")[0].split("=")[1];
        this.props.dispatch(asyncGetSpecificProjectAll(projectID));
        this.asyncGetReturnedAffidavit(projectID);
    }
    asyncGetReturnedAffidavit = (projectID) => {
        const db = firebase.firestore();
        db.collection('affidavit').where('projectID', '==', projectID).get()
            .then(q => {
                q.forEach(doc => {
                    this.setState({
                        id: doc.id,
                        item: doc.data()
                    })
                })
            })
            .catch(err => console.log("errorrrrrr", err))
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    checkCompleted = () => {
        const { fosterSignature, fosterPhone, fosterEmail, fosterAddress } = this.state;
        if (fosterSignature === '' || fosterPhone === '' || fosterEmail === '' || fosterAddress === '') {
            return alert('請填寫完整資訊')
        } else {
            this.approveAndCloseCase();
        }
    }
    approveAndCloseCase = () => {
        const projectID = location.hash.split("?")[1].split("&")[0].split("=")[1];
        this.props.dispatch(approveAffidavit(this.state, projectID))
    }

    render() {
        const { specificProject } = this.props;
        const { id, item } = this.state;
        console.log("this.state", specificProject)
        if (specificProject) {
            //時間
            const detailtime = new Date().toString().split(" ")
            let time = "";
            for (let i = 0; i < 5; i++) {
                time = time + detailtime[i] + " "
            }
            let year = parseInt(detailtime[3]) - 1911;
            let m = detailtime[1];
            let month = m === "Jan" ? 1 : (m === "Feb" ? 2 : (m === "Mar" ? 3 : (m === "Apr" ? 4 : (m === "May" ? 5 : (m === "Jun" ? 6 : (m === "Jul" ? 7 : (m === "Aug" ? 8 : (m === "Sep" ? 9 : (m === "Oct" ? 10 : (m === "Nov" ? 11 : 12))))))))));
            let date = detailtime[2];
            return (
                <div>
                    <article className="card z-depth-0 project-summary" style={{ margin: '20px' }} >
                        <div>
                            <h3>愛心認養切結書</h3>
                            <div>認養編號：{item.affidavitNumber}</div>
                        </div>
                        <p>茲向 {specificProject.authorLastName}{specificProject.authorFirstName} 認養動物乙隻，詳細資料如下：</p>
                        <ProjectInformation>
                            <p className="card-nickName table1">動物名</p><p className="table_a">{specificProject.nickName}</p>
                            <p className="card-species table1">品種</p><p className="table_b">{specificProject.species}／{specificProject.variety}</p>
                            <p className="card-gender table1">性別</p><p className="table_a">{specificProject.gender}</p>
                            <p className="card-coatColor table1">毛色</p><p className="table_b">{specificProject.coatColor}</p>
                            <p className="card-size table1">體型</p><p className="table_a">{specificProject.size}</p>
                            <p className="card-feature table1">特徵</p><p className="table_b">{specificProject.feature}</p>
                            <p className="card-age table1">年齡</p><p className="table_a">{specificProject.age}</p>
                            <p className="card-affidavitRemarks table1">備註</p><p className="table_b">{item.remark}</p>
                        </ProjectInformation>
                        <p>本人願遵守以下約定：</p>
                        <ul>
                            <li>1. 認養人需年滿20歲，未滿20歲者需經法定代理人同意並出示同意書。</li>
                            <li>2. 依法辦理犬隻寵物登記、晶片植入及絕育等事項（貓咪無強制需入晶片，但需於母貓6個月公貓8個月大時施予結紮手術）。</li>
                            <li>3. 無論何時都以人道方式對待認養之動物，並提供認養動物適當之食物、乾淨之飲水、適當之運動空間、不可長期將動物關在籠中或栓綁在狹小之空間飼養，否則視為虐待動物。</li>
                            <li>4. 定期幫牠進行預防注射、狂犬病疫苗、驅蟲及健康檢查。</li>
                            <li>5. 當牠受傷或罹病時，必請獸醫師給予醫療。</li>
                            <li>6. 妥善照管牠，防止其無故侵害他人之生命、身體、自由、財產或安寧。</li>
                            <li>7. 不隨便放縱牠於戶外，出入公共場所或公眾得出入之場所時必由14歲以上之人伴同，並採取適當之防衛措施，如繫鍊、提籃等，始得攜出戶外。</li>
                            <li>8. 若因任何原因無法續養，本人需立即通知送養人知悉，並與送養人共同為牠找到新的認養家庭，絕不棄養認養的動物。</li>
                            <li>9. 當牠轉讓、遺失或死亡時，本人需立即通知送養人知悉，並依法辦理。</li>
                            <li>10. 認養之動物於二星期內確認是否適合飼養，如有任何請在此期限內與送養人聯絡處理。本人亦願意接受送養人日後之追蹤訪視及飼養輔導。</li>
                            <li>11. 本人遵守動物保護法及有關單位對家畜衛生管理之相關規定。</li>
                            <li>12. 認養人如有違反以上認養規定者，送養人有權收回該動物，如有訴訟問題時可以此切結書以適當的法律途徑解決,。</li>
                            <li>13. 本愛心認養切結書一式二份，分別執於認養人及送養人處。</li>
                        </ul>
                        <hr />
                        <section>
                            <div className="adopterSignature">認養人（簽名）：{item.adopterSignature}</div>
                            <div className="adopterIDcard">身分證字號：{item.adopterIDcard}</div>
                            <div className="adopterPhone">聯絡電話：{item.adopterPhone}</div>
                            <div className="adopterEmail">E-Mail：{item.adopterEmail}</div>
                            <div className="adopterAddress">居住地：{item.adopterAddress}</div>
                            <div className="adopterCensusAddress">戶籍地：{item.adopterCensusAddress}</div>
                        </section>
                        <br />
                        <div>認養人簽署日期 中 華 民 國 {year} 年 {month} 月 {date} 日</div>
                        <hr />
                        <section>
                            <div>
                                <label htmlFor="fosterSignature">送養人（簽名）：</label>
                                <input type="text" id="fosterSignature" onChange={this.handleChange} />
                            </div>
                            <div>
                                <label htmlFor="fosterAddress">居住地：</label>
                                <input type="text" id="fosterAddress" onChange={this.handleChange} />
                            </div>
                            <div>
                                <label htmlFor="fosterPhone">聯絡電話：</label>
                                <input type="text" id="fosterPhone" onChange={this.handleChange} />
                            </div>
                            <div>
                                <label htmlFor="fosterEmail">E-Mail：</label>
                                <input type="text" id="fosterEmail" onChange={this.handleChange} />
                            </div>
                        </section>
                        <br />
                        <div>請自認養人簽署日起算七日內結案，若逾期此份切結書視同失效</div>
                        <div>送養人簽署日期 中 華 民 國 {year} 年 {month} 月 {date} 日</div>
                    </article>
                    <p>務必仔細閱讀切結書內容，簽署後點擊下方按鈕，就完成送養／領養手續摟！</p>
                    <button onClick={this.checkCompleted}>確認送出</button>
                </div>
            )
        }
        else {
            return <p>loading..</p>
        }

    }
}

const mapStateToProps = (state) => {
    let specificProject = state.GetProjectStage.specificProject
    specificProject = JSON.stringify(specificProject) !== "{}" ? specificProject : null;
    console.log(state)
    return {
        specificProject,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(Affidavit_approve);