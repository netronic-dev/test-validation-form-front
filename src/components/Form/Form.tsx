import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormInputs } from "../../models";
import { schema } from "../../constants";
import {
  FormBtn,
  FormCheckboxInput,
  FormContainer,
  FormInput,
  FormLabel,
  FormLabelCheckbox,
  FormLabelCheckboxContainer,
  FormLabelCheckboxSpan,
  FormStyled,
  FormTitle,
  InputErrorMessage,
} from "./form.styles";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      privacyPolicy: true,
    },
  });
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    try {
      console.log(data, "data");
      //   await addParticipant(data);
      //   navigate("/");
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  return (
    <FormContainer>
      <FormTitle className="font-gravity">Form</FormTitle>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <FormLabel className="font-konnect">
          Name*
          <FormInput
            $error={errors.name ? "true" : "false"}
            className="transition-all font-gravity"
            {...register("name", { maxLength: 20 })}
          />
          <InputErrorMessage className="font-konnect">
            {errors.name?.message}
          </InputErrorMessage>
        </FormLabel>
        <FormLabel className="font-konnect">
          Email*
          <FormInput
            $error={errors.email ? "true" : "false"}
            className="transition-all font-gravity"
            {...register("email")}
          />
          <InputErrorMessage className="font-konnect">
            {errors.email?.message}
          </InputErrorMessage>
        </FormLabel>
        <FormLabel className="font-konnect">
          Phone number *
          <FormInput
            $error={errors.phoneNumber ? "true" : "false"}
            className="transition-all font-gravity"
            {...register("phoneNumber")}
          />
          <InputErrorMessage className="font-konnect">
            {errors.phoneNumber?.message}
          </InputErrorMessage>
        </FormLabel>
        <FormLabelCheckboxContainer>
          <FormCheckboxInput
            type="checkbox"
            {...register("privacyPolicy")}
            // className="mx-3"
          />
          <FormLabelCheckbox htmlFor="privacyPolicy">
            I confirm that I have read and agree to the terms of the
            <FormLabelCheckboxSpan>
              <a> privacy policy</a>
            </FormLabelCheckboxSpan>
          </FormLabelCheckbox>
        </FormLabelCheckboxContainer>

        <FormBtn
          className="font-gravity transition-all"
          type="submit"
          value={"Submit"}
        />
      </FormStyled>
    </FormContainer>
  );
};

export default Form;
