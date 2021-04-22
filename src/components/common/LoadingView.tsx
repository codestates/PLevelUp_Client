import loadingGif from '../../asset/loading.gif';

export default function LoadingView() {
  return (
    <div>
      <img src={loadingGif} alt="loading..." />
    </div>
  );
}
