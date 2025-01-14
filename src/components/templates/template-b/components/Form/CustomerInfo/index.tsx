import React from 'react';
import SectionTitle, { IconType } from '../../SectionTitle';
import { TextInput } from '../../../../../atoms/input';
import { SelectInput } from '../../../../../atoms/select'; // Certifique-se de importar o SelectInput

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
        title="Informações do Cliente"
        subtitle="Por favor, preencha seus dados pessoais"
      />
      
      <div className="flex flex-col mt-6">
        <TextInput
          label="Nome Completo"
          name="fullName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          error={formik.errors.fullName}
          touched={formik.touched.fullName}
        />

        <TextInput
          label="Email"
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <TextInput
          label="Telefone"
          type="tel"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        <TextInput
          label="CPF"
          name="cpf"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cpf}
          error={formik.errors.cpf}
          touched={formik.touched.cpf}
        />

        <SelectInput
          label="País"
          name="country"
          options={[
            { value: 'BR', label: 'Brasil' },
            { value: 'US', label: 'Estados Unidos' },
            { value: 'CA', label: 'Canadá' },
          ]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          touched={formik.touched.country}
          error={formik.errors.country}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
