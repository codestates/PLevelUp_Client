import React from 'react';
import styles from '../styles/pages/myPage/My_modify.module.scss';
import ModifyPassword_Form from '../components/auth/ModifyPassword_Form';

//민정님이 담당하실 임시 비밀번호 변경페이지 입니다.


export default function Modify_userInfoPage() {

    return (
        <div>
            <body className="wrapper">
                <div className={styles.modifyInfo_flex}>
                    <div className={styles.modifyInfo_header} style={{ border: "1px solid #2A2A2A" }}>
                        <div className={styles.modifyInfo_header_text}>내 정보 수정</div>
                    </div>
                    <div className={styles.modifyInfo_body}>
                        <div className={styles.modifyInfo_body_header}>
                            <div className={styles.modifyInfo_body_header_profile}>프로필 정보</div>
                            <div className={styles.modifyInfo_body_header_account}>계정 정보</div>
                        </div>
                        <div className={styles.modifyInfo_body_body}>
                            <ModifyPassword_Form />
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

