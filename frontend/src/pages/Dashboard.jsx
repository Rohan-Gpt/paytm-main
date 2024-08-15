import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import { Users } from "../components/Users";
import { YourBalance } from "../components/YourBalance";
import axios from "axios";
import { useState } from "react";

export function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.users);
      });
  }, [filter]);

  return (
    <div>
      <NavBar />
      <YourBalance />
      <SearchBar
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></SearchBar>
      <div>
        {users.map((user) => (
          <Users key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
