import { useEffect, useState, Component, ChangeEvent, ChangeEventHandler, MouseEventHandler } from 'react';
import styles from '../../styles/pages/Search_page/Search.module.scss';

// type wow = {
//     password: any,
//     clicked: any,
//     validated: any
// }
export default function Search() {
    const [no, setNo] = useState({
        password: '',
        clicked: false,
        validated: false
    });

    const { password, clicked, validated } = no;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNo({
            ...no,
            password: e.target.value
        });
    }

    const handleButtonClick = () => {
        setNo({
            ...no,
            clicked: true,
            validated: password === '0000'
        });
    }

    return (
        <div className={styles.wrap}>
            <input
                type="password"
                value={password}
                onChange={handleChange}
                className={clicked ? (validated ? styles.success : styles.failure) : ''}
            />
            <button onClick={handleButtonClick}>검증</button>
        </div>
    );
}


