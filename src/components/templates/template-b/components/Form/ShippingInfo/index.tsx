import React from 'react';
import SectionTitle, { IconType } from '../../SectionTitle';
import { TextInput } from '../../../../../atoms/input';
import { SelectInput } from '../../../../../atoms/select';

interface ShippingInfoProps {
  formik: any;
}

const ShippingInfo: React.FC<ShippingInfoProps> = ({
  formik
}) => {
  return (
    <div className="w-full flex flex-col mt-10">
      <SectionTitle 
        icon={IconType.SHIP}
        title="Shipping Information"
        subtitle="Where do we send your Hearing aid?"
      />
      
      <div className="flex flex-col mt-6">
        <SelectInput
          label="Country"
          name="shippingCountry"
          options={[
            { value: 'BR', label: 'Brasil' },
            { value: 'US', label: 'Estados Unidos' },
            { value: 'CA', label: 'Canadá' },
          ]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shippingCountry}
          touched={formik.touched.shippingCountry}
          error={formik.errors.shippingCountry}
        />

        <TextInput
          label="Delivery Address"
          name="shippingAddress"
          placeholder="Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shippingAddress}
          error={formik.errors.shippingAddress}
          touched={formik.touched.shippingAddress}
        />

        <TextInput
          placeholder="Apartment, suit, etc.(optional)"
          name="shippingComplement"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shippingComplement}
          error={formik.errors.shippingComplement}
          touched={formik.touched.shippingComplement}
        />

        <TextInput
          label="City"
          placeholder="City"
          name="shippingCity"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shippingCity}
          error={formik.errors.shippingCity}
          touched={formik.touched.shippingCity}
        />

        <div className="flex w-full gap-10">
          <SelectInput
            label="State"
            name="shippingState"
            options={[
              { value: '-', label: 'Select State' },
              { value: 'SP', label: 'São Paulo' },
              { value: 'RJ', label: 'Rio de Janeiro' },
              { value: 'MG', label: 'Minas Gerais' },
              { value: 'ES', label: 'Espírito Santo' },
            ]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shippingState}
            touched={formik.touched.shippingState}
            error={formik.errors.shippingState}
          />

          <TextInput
            label="Zip Code"
            placeholder="Zip Code"
            name="shippingZipCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shippingZipCode}
            error={formik.errors.shippingZipCode}
            touched={formik.touched.shippingZipCode}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
