import loadingGif from '../../asset/loading.gif';
import styles from '../../styles/common/Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <img className={styles.loadingImg} src={loadingGif} alt="loading..." />
    </div>
  );
}
