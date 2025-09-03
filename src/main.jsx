import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  Home,
  NotFound,
  LoginPage,
  GymGallery,
  GymPlans,
  Profile,
  DayPass,
  ForgetPasswordPage,
  AdmissionFormPage,
  PaymentPage,
  MembershipDetails,
  DayPassForm,
  AllDayPasses,
  PaymentHistory

} from './pages/index.js'
import AuthContextProvider from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/index.js'




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/forget-password",
        element: <ForgetPasswordPage />
      },
      {
        path: '/plans',
        element: <GymPlans />
      },
      {
        path: "/gallery",
        element: <GymGallery />
      },
      {
        path: "/profile",
        element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      {
        path: "/admission-form",
        element: <ProtectedRoute>
          <AdmissionFormPage />
        </ProtectedRoute>
      },
      {
        path: "/day-pass",
        element: <ProtectedRoute>
          <DayPass />
        </ProtectedRoute>
      },
      {
        path: "/day-pass/buy-pass",
        element: <ProtectedRoute>
          <DayPassForm />
        </ProtectedRoute>
      },
      {
        path: "/day-pass/all-passes",
        element: <ProtectedRoute>
          <AllDayPasses />
        </ProtectedRoute>
      },
      {
        path: "/payment-page",
        element: <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      },
      {
        path: "/payment-history",
        element: <ProtectedRoute>
          <PaymentHistory />
        </ProtectedRoute>
      },
      {
        path: "/membership-details",
        element: <ProtectedRoute>
          <MembershipDetails />
        </ProtectedRoute>
      },
      {
        path: "*",
        element: <NotFound />
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider >
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
