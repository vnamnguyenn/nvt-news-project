const Seach = () => {
  return (
    <div className="search-form-container container" id="search-form-container">
      <div className="form-container-inner">
        <form action="" className="form">
          <input className="form-input" type="text" placeholder="What are you looking for?"/>
          <button className="btn form-btn" type="submit">
            <i className="ri-search-line"></i>
          </button>
        </form>
        <span className="form-note">Or press ESC to close.</span>
      </div>
      <button className="btn form-close-btn place-items-center" id="form-close-btn">
        <i className="ri-close-line"></i>
      </button>
    </div>
  );
};

export default Seach;
