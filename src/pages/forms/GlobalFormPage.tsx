import { FormProvider, useForm } from 'react-hook-form';
import { toast } from '@/lib/toast';
import {
  CustomCalendar,
  CustomCheckbox,
  CustomEmailInput,
  CustomFileUploader,
  CustomInput,
  CustomMultiSelect,
  CustomNumberInput,
  CustomPasswordInput,
  CustomPhoneInput,
  CustomRadioGroup,
  CustomSelect,
  CustomSwitch,
  CustomTextarea,
  SubmitButton,
} from '@/components/forms';

type GlobalFormValues = {
  fullName: string;
  email: string;
  password: string;
  age: string;
  phone: string;
  department: string;
  skills: string[];
  role: string;
  startDate: Date | undefined;
  bio: string;
  attachments: File[];
  acceptTerms: boolean;
  isActive: boolean;
};

const departmentOptions = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Sales', value: 'sales' },
  { label: 'Operations', value: 'operations' },
  { label: 'Support', value: 'support' },
];

const skillOptions = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Product design', value: 'product-design' },
  { label: 'Data analysis', value: 'data-analysis' },
  { label: 'Customer success', value: 'customer-success' },
];

const roleOptions = [
  {
    label: 'Admin',
    value: 'admin',
    description: 'Full access to workspace settings and team management.',
  },
  {
    label: 'Manager',
    value: 'manager',
    description: 'Can review data and manage assigned workflows.',
  },
  {
    label: 'Member',
    value: 'member',
    description: 'Standard access for daily workspace tasks.',
  },
];

const defaultValues: GlobalFormValues = {
  fullName: '',
  email: '',
  password: '',
  age: '',
  phone: '',
  department: '',
  skills: [],
  role: 'member',
  startDate: undefined,
  bio: '',
  attachments: [],
  acceptTerms: false,
  isActive: true,
};

function GlobalFormPage() {
  const form = useForm<GlobalFormValues>({
    defaultValues,
  });

  const handleSubmit = (values: GlobalFormValues) => {
    console.log('Global form values', values);
    toast({
      description: 'Open the console to inspect the submitted values.',
      title: 'Form submitted successfully',
    });
  };

  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-6'>
      <div>
        <h1 className='type-body-xs-semibold'>Global Form</h1>
        <p className='text-muted-foreground text-sm'>
          A shared form surface using every custom field component.
        </p>
      </div>

      <FormProvider {...form}>
        <form
          className='bg-card grid gap-6 rounded-lg border p-4 shadow-xs md:grid-cols-2 md:p-6'
          noValidate
          onSubmit={(event) => {
            void form.handleSubmit(handleSubmit)(event);
          }}
        >
          <CustomInput
            control={form.control}
            label='Full name'
            name='fullName'
            placeholder='Peter Awad'
            required
          />

          <CustomEmailInput
            control={form.control}
            label='Email'
            name='email'
            placeholder='admin@karat.app'
            required
          />

          <CustomPasswordInput
            control={form.control}
            label='Password'
            name='password'
            placeholder='Enter password'
            required
          />

          <CustomNumberInput
            control={form.control}
            label='Age'
            name='age'
            placeholder='30'
          />

          <CustomPhoneInput
            control={form.control}
            label='Phone'
            name='phone'
            placeholder='+20 100 000 0000'
          />

          <CustomSelect
            control={form.control}
            label='Department'
            name='department'
            options={departmentOptions}
            placeholder='Select department'
            required
          />

          <CustomMultiSelect
            control={form.control}
            label='Skills'
            name='skills'
            options={skillOptions}
            placeholder='Select skills'
          />

          <CustomCalendar
            control={form.control}
            label='Start date'
            name='startDate'
            placeholder='Pick start date'
          />

          <CustomRadioGroup
            control={form.control}
            label='Role'
            name='role'
            options={roleOptions}
            wrapperClassName='md:col-span-2'
          />

          <CustomTextarea
            control={form.control}
            label='Bio'
            name='bio'
            placeholder='Write a short profile note...'
            wrapperClassName='md:col-span-2'
          />

          <CustomFileUploader
            control={form.control}
            helperText='Supports images, videos, PDF, and DOCX files.'
            label='Attachments'
            multiple
            name='attachments'
            wrapperClassName='md:col-span-2'
          />

          <CustomCheckbox
            control={form.control}
            description='I agree to receive account updates and accept the workspace policy.'
            label='Accept terms'
            name='acceptTerms'
            required
          />

          <CustomSwitch
            control={form.control}
            description='Enable this user account after saving the form.'
            label='Active account'
            name='isActive'
          />

          <div className='flex flex-col gap-3 sm:flex-row sm:justify-end md:col-span-2'>
            <button
              className='text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors'
              onClick={() => form.reset(defaultValues)}
              type='button'
            >
              Reset
            </button>
            <SubmitButton
              className='w-full sm:w-auto'
              label='Save form'
            />
          </div>
        </form>
      </FormProvider>
    </section>
  );
}

export default GlobalFormPage;
