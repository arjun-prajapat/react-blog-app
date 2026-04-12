import { Header, Footer } from "./components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite-backend/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <h1>Hello</h1>
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <h1>Loading...</h1>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
