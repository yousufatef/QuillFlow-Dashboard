import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import GuestRoute from '@/components/routes/GuestRoute';
import { WithPermissions } from '@/components/shared/permissions/WithPermissions';
import { UnderDevelopment } from '@/components/shared/empty-states';

// Eagerly loaded (part of the initial bundle — small and always needed)
import ErrorPage from '@/pages/error/ErrorPage';
import AccessDeniedPage from '@/pages/error/AccessDeniedPage';

// Lazily loaded pages — each becomes its own async chunk
const LoginPage = lazy(() => import('../pages/auth/pages/login/LoginPage'));
const GlobalFormPage = lazy(() => import('../pages/forms/GlobalFormPage'));
const HomePage = lazy(() => import('../pages/home/HomePage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/pages/resetPassword/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/pages/verifyEmail/VerifyEmailPage'));
const ForgetPasswordPage = lazy(() => import('@/pages/auth/pages/forgetPassword/ForgetPasswordPage'));
const ExpiredPage = lazy(() => import('@/pages/auth/pages/errorPage/Expired'));
const Admins = lazy(() => import('@/pages/admins/Admins'));
const NewAdmin = lazy(() => import('@/pages/admins/pages/NewAdmin'));
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
                  <WithPermissions
                    permissions={['blogs.read']}
                    fallback={<AccessDeniedPage />}
                  >
                    <BlogsPage />
                  </WithPermissions>
                ),
              },
              {
                path: 'cms/blogs/create',
                element: (
                  <WithPermissions
                    permissions={['blogs.create']}
                    fallback={<AccessDeniedPage />}
                  >
                    <CreateBlogPage />
                  </WithPermissions>
                ),

              },
              {
                path: 'cms/blogs/edit/:blogId',
                element: (
                  <WithPermissions
                    permissions={['blogs.update']}
                    fallback={<AccessDeniedPage />}
                  >
                    <EditBlogPage />
                  </WithPermissions>
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
                  <WithPermissions
                    permissions={['admins.read']}
                    fallback={<AccessDeniedPage />}
                  >
                    <Admins />
                  </WithPermissions>
                ),
              },
              {
                path: 'settings/admins/add',
                element: (
                  <WithPermissions
                    permissions={['admins.create']}
                    fallback={<AccessDeniedPage />}
                  >
                    <NewAdmin mode='add' />
                  </WithPermissions>
                ),
              },
              {
                path: 'settings/admins/edit/:adminId',
                element: <WithPermissions permissions={["admins.update"]} fallback={<AccessDeniedPage />}> <NewAdmin mode='edit' /> </WithPermissions>,
              },
              {
                path: 'settings/roles',
                element: (
                  <WithPermissions
                    permissions={['roles.read']}
                    fallback={<AccessDeniedPage />}
                  >
                    <Roles />
                  </WithPermissions>
                ),
              },
              {
                path: 'settings/roles/add',
                element: (
                  <WithPermissions
                    permissions={['roles.create']}
                    fallback={<AccessDeniedPage />}
                  >
                    <AddRole />
                  </WithPermissions>
                ),
              },
              {
                path: 'settings/roles/edit/:roleId',
                element: (
                  <WithPermissions
                    permissions={['roles.update']}
                    fallback={<AccessDeniedPage />}
                  >
                    <EditRole />
                  </WithPermissions>
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
