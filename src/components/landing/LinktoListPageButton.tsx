import styles from '../../styles/pages/landing_page/LandingPage.module.scss';
import { Link } from 'react-router-dom';

export default function LinktoListPageButton() {
    return (
        <div className={styles.LinkWrapper}>
            <Link to="/club" className={styles.Link}>
                클럽 모두 보러 가기
            </Link >
        </div>

    );
}