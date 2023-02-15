import { useContext } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { AuthContext } from "../../context/auth";

export function Dashboard() {
  const { existingUser, signOut } = useContext(AuthContext);

  return (
    <div>
      <Header />
      {existingUser.email}
      <button className="bg-white text-gray-900">
        <Link to="/" onClick={signOut}>
          Sair
        </Link>
      </button>
    </div>
  );
}
