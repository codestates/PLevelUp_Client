import React from 'react';
import styles from '../../styles/pages/myPage/My_modify.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

const MyPage_Modify = () => {
    return (
        <div>
            <div className={cx("modify_form")}>내용입니다.</div>
        </div>
    );
}

export default MyPage_Modify;