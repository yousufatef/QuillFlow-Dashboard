import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import GuestRoute from '@/components/routes/GuestRoute';
import { UnderDevelopment } from '@/components/shared/empty-states';

// Eagerly loaded (part of the initial bundle — small and always needed)
import ErrorPage from '@/pages/error/ErrorPage';

// Lazily loaded pages — each becomes its own async chunk
const LoginPage = lazy(() => import('../pages/auth/pages/login/LoginPage'));
const GlobalFormPage = lazy(() => import('../pages/forms/GlobalFormPage'));
const HomePage = lazy(() => import('../pages/home/HomePage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/pages/resetPassword/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/pages/verifyEmail/VerifyEmailPage'));
const ForgetPasswordPage = lazy(() => import('@/pages/auth/pages/forgetPassword/ForgetPasswordPage'));
const ExpiredPage = lazy(() => import('@/pages/auth/pages/errorPage/Expired'));
const Admins = lazy(() => import('@/pages/admins/Admins'));
const NewAdmin = lazy(() => import('@/pages/admins/pages/AdminForm'));
const Roles = lazy(() => import('@/pages/roles/rolesPage'));
const EditBlogPage = lazy(() => import('@/pages/cms/blogs/pages/EditBlogPage'));
const AddRole = lazy(() => import('@/pages/roles/AddRole'));
const EditRole = lazy(() => import('@/pages/roles/EditRole'));
const BlogsPage = lazy(() => import('@/pages/cms/blogs/BlogsPage'));
const CreateBlogPage = lazy(() => import('@/pages/cms/blogs/pages/CreateBlogPage'));
const Users = lazy(() => import('@/pages/user-mangement/Users'));

// Thin Suspense fallback shown while a lazy chunk is downloading.
// Replace null with a spinner/skeleton component if desired.
const PageLoader = () => null;

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        children: [
          {
            element: (
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AppLayout />
                </Suspense>
              </ProtectedRoute>
            ),
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: 'global-form',
                element: <GlobalFormPage />,
              },
              {
                path: 'users',
                element: <Users />,
              },
              {
                path: 'transactions',
                element: <UnderDevelopment title='Transactions' />,
              },
              {
                path: 'cms/blogs',
                element: (

                  <BlogsPage />
                ),
              },
              {
                path: 'cms/blogs/create',
                element: (

                  <CreateBlogPage />
                ),

              },
              {
                path: 'cms/blogs/edit/:blogId',
                element: (

                  <EditBlogPage />
                ),
              },
              {
                path: 'cms/faqs',
                element: <UnderDevelopment title='FAQs' />,
              },
              {
                path: 'cms/onboarding',
                element: <UnderDevelopment title='Onboarding' />,
              },
              {
                path: 'cms/about',
                element: <UnderDevelopment title='About Karat' />,
              },
              {
                path: 'settings',
                element: <UnderDevelopment title='Settings' />,
              },
              {
                path: 'settings/admins',
                element: (
                  <Admins />
                ),
              },
              {
                path: 'settings/admins/add',
                element: (

                  <NewAdmin mode='add' />
                ),
              },
              {
                path: 'settings/admins/edit/:adminId',
                element: <NewAdmin mode='edit' />,
              },
              {
                path: 'settings/roles',
                element: (

                  <Roles />
                ),
              },
              {
                path: 'settings/roles/add',
                element: (

                  <AddRole />
                ),
              },
              {
                path: 'settings/roles/edit/:roleId',
                element: (

                  <EditRole />
                ),
              },
              {
                path: 'activity-log',
                element: <UnderDevelopment title='Activity log' />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: (
      <GuestRoute>
        <Suspense fallback={<PageLoader />}>
          <AuthLayout />
        </Suspense>
      </GuestRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forget-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/new-password',
        element: <ForgetPasswordPage />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: '/reset-password',
        element: <ForgetPasswordPage />,
      },
      {
        path: '/expired-page',
        element: <ExpiredPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
