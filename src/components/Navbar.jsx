const Navbar = () => {
  return (
    <nav className="bg-white w-full h-16 flex flex-row justify-between items-center px-7">
      <h1>STAFF</h1>
        <ul className="flex flex-row gap-5">
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 1</a>
          </li>
          <li>
            <a href="#">Item 1</a>
          </li>
        </ul>
      <div>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
