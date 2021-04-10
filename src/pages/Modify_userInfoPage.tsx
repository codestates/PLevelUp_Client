import React from 'react';
import styles from '../styles/pages/myPage/My_modify.module.scss';
import ModifyUserInfoContainer from '../components/auth/ModifyUserInfo_Form';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

//작업중인 마이페이지 > 프로필 편집 페이지 입니다. 

export default function MyPage_Modify() {

    return (
        <div>
            <body className="wrapper">
                <div className={cx("modifyInfo_flex")}>
                    <div className={cx("modifyInfo_header")} style={{ border: "1px solid #2A2A2A" }}>
                        <div className={cx("modifyInfo_header_text")}>내 정보 수정</div>
                    </div>
                    <div className={cx("modifyInfo_body")}>
                        <div className={cx("modifyInfo_body_header")}>
                            <div className={cx("modifyInfo_body_header_profile")}>프로필 정보</div>
                            <div className={cx("modifyInfo_body_header_account")}>계정 정보</div>
                        </div>
                        <div className={cx("modifyInfo_body_body")}>
                            <ModifyUserInfoContainer />
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

