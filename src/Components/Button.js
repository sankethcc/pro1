import searchlogo from '../assets/search.png'
export default function Button() {
  return (
    <>
      <button type="submit" className="search-button">
        <img src={searchlogo} alt="Search" />
      </button>
    </>
  );
}
