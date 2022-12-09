

const Loader = ({ height }) => {
  return (
    <div
      
      style={{ height: height ? height : "100vh" }}
    >
      <div >
        <img src="/loader.svg" alt="" />
      </div>
    </div>
  );
};

export default Loader;
