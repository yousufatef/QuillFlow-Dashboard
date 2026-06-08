import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import LoginPage from '../pages/auth/login/LoginPage';
import GlobalFormPage from '../pages/forms/GlobalFormPage';
import HomePage from '../pages/home/HomePage';
import NotFoundPage from '../pages/not-found/NotFoundPage';
import PlaceholderPage from '../pages/placeholder/PlaceholderPage';
import BlogsPage from '@/pages/cms/blogs/BlogsPage';
import CreateBlogPage from '../pages/cms/create-blog/CreateBlogPage';
import EditBlogPage from '@/pages/cms/edit-blog/EditBlogPage';
import ErrorPage from '@/pages/error/ErrorPage';
import ResetPasswordPage from '@/pages/auth/resetPassword/ResetPasswordPage';
import VerifyEmailPage from '@/pages/auth/verifyEmail/VerifyEmailPage';
import ForgetPasswordPage from '@/pages/auth/forgetPassword/ForgetPasswordPage';
import ExpiredPage from '@/pages/auth/errorPage/Expired';
import Admins from '@/pages/admins/Admins';
import AddEditAdmin from '@/pages/admins/components/NewAdmin';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppLayout />,
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
            element: <PlaceholderPage title='Users' />,
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
            element: <PlaceholderPage title='FAQs' />,
          },
          {
            path: 'cms/onboarding',
            element: <PlaceholderPage title='Onboarding' />,
          },
          {
            path: 'cms/about',
            element: <PlaceholderPage title='About QuillFlow' />,
          },
          {
            path: 'settings',
            element: <PlaceholderPage title='Settings' />,
          },
          {
            path: 'settings/admins',
            element: <Admins />,
          },
          {
            path: 'settings/admins/add',
            element: <AddEditAdmin mode='add' />,
          },
          {
            path: 'settings/admins/edit/:adminId',
            element: <AddEditAdmin mode='edit' />,
          },
          {
            path: 'activity-log',
            element: <PlaceholderPage title='Activity log' />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgetPasswordPage />,
      },
      {
        path: '/expiredPage',
        element: <ExpiredPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
