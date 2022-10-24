import React from "react";
import styles from "./Header.module.css";
import {Button, Dropdown, Input, Layout, Menu, Typography} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import logo from "../../logo.svg";
import {withRouter, RouteComponentProps} from "../../helpers/withRouter";
import store from "../../redux/store"
import {withTranslation, WithTranslation} from "react-i18next"
import {addLanguageActionCreator, changeLanguageActionCreator} from "../../redux/language/languageActions"
import {connect} from "react-redux"
import {Dispatch} from "redux";
import {RootState} from '../../redux/store'

const mapStateToProps = (state: RootState) => {
    return {
        language: state.language.language,
        languageList: state.language.languageList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (code: "zh" | "en") => {
            dispatch(changeLanguageActionCreator(code))
        },
        addLanguage: (name: string, code: string) => {
            dispatch(addLanguageActionCreator(name, code))
        }
    }
}

type PropsType =
    RouteComponentProps
    & WithTranslation
    & ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps>

class HeaderComponent extends React.Component<PropsType> {
    languageMenuChange = (e) => {
        console.log(e)
        // const action = {}
        if (e.key === "new") {
            // 处理新语言
            this.props.addLanguage('新语言', "new_lang")
        } else {
            this.props.changeLanguage(e.key)
        }
        // store.dispatch(action)
    }

    render() {
        const {navigate, t, language, languageList} = this.props
        return <>
            <div className={styles['app-header']}>
                {/* top-header */}
                <div className={styles['top-header']}>
                    <div className={styles.inner}>
                        <Typography.Text>让旅游更幸福</Typography.Text>
                        <Dropdown.Button
                            style={{marginLeft: 15}}
                            overlay={
                                <Menu onClick={this.languageMenuChange}
                                      items={[
                                          ...languageList.map(l => {
                                              return {key: l.code, label: l.name}
                                          }),
                                          {key: "new", label: '添加新语言'},
                                      ]}
                                />
                            }
                            icon={<GlobalOutlined/>}
                        >
                            {language === "zh" ? "中文" : "英文"}


                        </Dropdown.Button>
                        <Button.Group className={styles['button-group']}>
                            <Button onClick={() => navigate('/register')}>{t("header.register")}</Button>
                            <Button onClick={() => navigate('/signin')}>登陆</Button>
                        </Button.Group>
                    </div>
                </div>
                <Layout.Header className={styles['main-header']}>
                <img src={logo} alt='' className={styles['App-logo']}/>
                <Typography.Title level={3} className={styles['title']} onClick={() => navigate('/')}>旅游网</Typography.Title>
                <Input.Search
                    placeholder={'请输入旅游目的地、主题或关键字'}
                    className={styles['search-input']}
                    onSearch={(keyword) => navigate('/search/'+keyword)}
                />
                </Layout.Header>

                <Menu mode={'horizontal'} className={styles['main-menu']}
                      items={[
                          {key: 1, label: '旅游首页'},
                          {key: 2, label: '跟团游'},
                          {key: 3, label: '周末游'},
                          {key: 4, label: '自由行'},
                          {key: 5, label: '私家团'},
                          {key: 6, label: '邮轮'},
                          {key: 7, label: '当地玩乐'},
                          {key: 8, label: '签证'},
                          {key: 9, label: '游学'},
                      ]}>
                </Menu>
            </div>
        </>
    }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)))
