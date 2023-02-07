import { useMemo, useState } from "react";

function App() {
  const [users, setusers] = useState([]);
  const [showbutton, setshowbutton] = useState(true);
  const [showdata, setshowdata] = useState(false);
  const [query, setquery] = useState("");

  const handleClick = () => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((json) => {
        setusers(json);
      })
      .catch((err) => console.error(err));
    setshowbutton(false);
    setshowdata(true);
  };

  const filteredUsers = useMemo(
    () =>
      // eslint-disable-next-line array-callback-return
      users.filter((user) => {
        if (query === "") {
          return user;
        } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
          return user;
        }
      }),
    [query, users]
  );

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <div className="navbar bg-base-300">
            <div className="flex-1">
              <h1 className="btn btn-ghost normal-case text-xl">Portal</h1>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search by Name"
                  className="input input-bordered"
                  onChange={(e) => {
                    fetch(`https://jsonplaceholder.typicode.com/users`)
                      .then((res) => res.json())
                      .then((json) => {
                        setusers(json);
                      })
                      .catch((err) => console.error(err));
                    setshowbutton(false);
                    setshowdata(true);
                    setquery(e.target.value);
                  }}
                />
              </div>
              <div className="dropdown dropdown-end">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-primary"
                >
                  Filter Panel
                </label>
              </div>
            </div>
          </div>

          <div
            className={
              showbutton
                ? "flex flex-col justify-center items-center min-h-screen"
                : "hidden"
            }
          >
            <div
              className={
                showbutton
                  ? "flex flex-col justify-center items-center"
                  : "hidden"
              }
              onClick={handleClick}
            >
              <button className="btn btn-outline">Fetch Data</button>
            </div>
            <h1>
              Click on the button to fetch data or{" "}
              <label
                htmlFor="my-drawer-4"
                className="underline cursor-pointer font-bold text-primary"
              >
                search for an item
              </label>
            </h1>
          </div>

          {/* Users */}
          <div
            className={showdata === false ? "hidden" : "overflow-x-auto mt-5"}
          >
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Catchphrase</th>
                  <th>City</th>
                  <th>E-mail</th>
                  <th>Website</th>
                </tr>
              </thead>
              {filteredUsers.map((user) => (
                <tbody key={crypto.randomUUID()}>
                  <tr>
                    <th>{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.company.catchPhrase}</td>
                    <td>{user.address.city}</td>
                    <td>{user.email}</td>
                    <td>{user.website}</td>
                  </tr>
                </tbody>
              ))}
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Catchphrase</th>
                  <th>City</th>
                  <th>E-mail</th>
                  <th>Website</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search User By Name</span>
              </label>
              <textarea
                type="text"
                placeholder="Patrick Swayze"
                className="textarea textarea-bordered h-24"
                onChange={(e) => {
                  fetch(`https://jsonplaceholder.typicode.com/users`)
                    .then((res) => res.json())
                    .then((json) => {
                      setusers(json);
                    })
                    .catch((err) => console.error(err));
                  setshowbutton(false);
                  setshowdata(true);
                  setquery(e.target.value);
                }}
              />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
