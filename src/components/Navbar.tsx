
const Navbar = () => {
  return (
    <img
      src="/music-master-logo-small.svg"
      alt="logo"
      style={{ cursor: 'pointer', height: '80px', placeSelf: 'center' }}
      onClick={() => {
        window.location.href = '/';
      }}
    />
  );
};

export default Navbar;
