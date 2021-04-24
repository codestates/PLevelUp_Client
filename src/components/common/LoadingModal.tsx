import styles from '../../styles/common/Modal.module.scss';
import loadingGif from '../../asset/loading.gif';

export default function LoadingModal({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.fullscreen}>
        <div className={styles.loadingContainer}>
          <img
            className={styles.loadingImg}
            src={loadingGif}
            alt="loading..."
          />
        </div>
      </div>
    </div>
  );
}
