import React from 'react';
import SectionTitle, { IconType } from '../../SectionTitle';
import { TextInput } from '../../../../../atoms/input';

interface CustomerInfoProps {
  formik: any;
  country: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  formik,
  country
}) => {
  return (
    <div className="w-full flex flex-col mt-10">
      <SectionTitle 
        icon={IconType.USER}
        title="Customer Information"
        subtitle="Order Confirmation Details Will Be Sent Here"
      />
      
      <div className="flex flex-col mt-6">
        <div className="flex gap-10 w-full">
          <TextInput
            label="First Name"
            placeholder="First Name"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
          <TextInput
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
        </div>

        <TextInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <TextInput
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
