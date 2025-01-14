import React from 'react';
import SectionTitle, { IconType } from '../../SectionTitle';
import { TextInput } from '../../../../../atoms/input';
import { SelectInput } from '../../../../../atoms/select';

interface PaymentInfoProps {
  formik: any;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  formik
}) => {
  return (
    <div className="w-full flex flex-col mt-10">
      <SectionTitle 
        icon={IconType.PAYMENT}
        title="Payment Information"
        subtitle="Safe & Secure Checkout"
      />
      
      <div className="flex flex-col mt-6">
        <TextInput
          label="Card Number"
          placeholder="Credit Card Number"
          name="cardNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cardNumber}
          error={formik.errors.cardNumber}
          touched={formik.touched.cardNumber}
        />

        <div className="flex gap-4">
          <SelectInput
            label="Mês de Expiração"
            name="expiryMonth"
            options={Array.from({length: 12}, (_, i) => ({
              value: String(i + 1).padStart(2, '0'),
              label: String(i + 1).padStart(2, '0')
            }))}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiryMonth}
            touched={formik.touched.expiryMonth}
            error={formik.errors.expiryMonth}
          />

          <SelectInput
            label="Ano de Expiração"
            name="expiryYear"
            options={Array.from({length: 10}, (_, i) => {
              const year = new Date().getFullYear() + i;
              return {
                value: String(year),
                label: String(year)
              };
            })}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.expiryYear}
            touched={formik.touched.expiryYear}
            error={formik.errors.expiryYear}
          />
        </div>
        <div className="w-1/2">
          <TextInput
            label="CVV"
            name="cvv"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cvv}
            error={formik.errors.cvv}
            touched={formik.touched.cvv}
            placeholder="CVV"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
