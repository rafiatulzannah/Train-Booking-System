import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import AddTrains from "./pages/AddTrains";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Trains from "./pages/admin/Trains";
import TrainProfile from "./pages/train/TrainProfile";
import BookingPage from "./pages/BookingPage";
import Tickets from "./pages/Tickets";
import TrainTickets from "./pages/train/TrainTickets";
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Homepage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/add-trains"
              element={
                <ProtectedRoutes>
                  <AddTrains />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/trains"
              element={
                <ProtectedRoutes>
                  <Trains />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/train/train-profile/:id"
              element={
                <ProtectedRoutes>
                  <TrainProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/train/book-ticket/:trainId"
              element={
                <ProtectedRoutes>
                  <BookingPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoutes>
                  <Signup />
                </PublicRoutes>
              }
            />
            <Route
              path="/tickets"
              element={
                <ProtectedRoutes>
                  <Tickets />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/train-tickets"
              element={
                <ProtectedRoutes>
                  <TrainTickets />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
