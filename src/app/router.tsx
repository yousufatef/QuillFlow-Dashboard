import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LoginPage from '../pages/auth/pages/login/LoginPage';
import GlobalFormPage from '../pages/forms/GlobalFormPage';
import HomePage from '../pages/home/HomePage';

import ErrorPage from '@/pages/error/ErrorPage';
import ResetPasswordPage from '@/pages/auth/pages/resetPassword/ResetPasswordPage';
import VerifyEmailPage from '@/pages/auth/pages/verifyEmail/VerifyEmailPage';
import ForgetPasswordPage from '@/pages/auth/pages/forgetPassword/ForgetPasswordPage';
import ExpiredPage from '@/pages/auth/pages/errorPage/Expired';
import Admins from '@/pages/admins/Admins';
import NewAdmin from '@/pages/admins/pages/NewAdmin';
import Roles from '@/pages/roles/rolesPage';
import EditBlogPage from '@/pages/cms/(blogs)/edit-blog/EditBlogPage';
import AddRole from '@/pages/roles/AddRole';
import EditRole from '@/pages/roles/EditRole';
import { UnderDevelopment } from '@/components/shared/empty-states';
import BlogsPage from '@/pages/cms/(blogs)/blogs/BlogsPage';
import CreateBlogPage from '@/pages/cms/(blogs)/create-blog/CreateBlogPage';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import GuestRoute from '@/components/routes/GuestRoute';
import Users from '@/pages/user-mangement/Users';

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
                <AppLayout />
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
                element: <BlogsPage />,
              },
              {
                path: 'cms/blogs/create',
                element: <CreateBlogPage />,
              },
              {
                path: 'cms/blogs/edit/:blogId',
                element: <EditBlogPage />,
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
                element: <Admins />,
              },
              {
                path: 'settings/admins/add',
                element: <NewAdmin mode='add' />,
              },
              // {
              //   path: 'settings/admins/edit/:adminId',
              //   element: <NewAdmin mode='edit' />,
              // },
              {
                path: 'settings/roles',
                element: <Roles />,
              },
              {
                path: 'settings/roles/add',
                element: <AddRole />,
              },
              {
                path: 'settings/roles/edit/:roleId',
                element: <EditRole />,
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
        <AuthLayout />
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
