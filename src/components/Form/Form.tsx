import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import { ESelectedRadio, IFormInputs } from "../../models";
import { radioOptions, schema } from "../../constants";
import {
  FormBtn,
  FormContainer,
  FormInput,
  FormLabel,
  FormLabelCheckbox,
  FormLabelCheckboxContainer,
  FormLabelCheckboxSpan,
  FormPhoneInput,
  FormStyled,
  FormTitle,
  InputErrorMessage,
} from "./form.styles";
import { useEffect, useState } from "react";
import { getCountryCode } from "../../utils";
import { ModalResult } from "../ModalResult";
import { isValidPhoneNumber } from "react-phone-number-input";
import { addLead } from "../../services";

const Form = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<null | object>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [serverNameError, setServerNameError] = useState<string>("");
  const [serverPhoneError, setServerPhoneError] = useState<string>("");
  const [serverEmailError, setServerEmailError] = useState<string>("");

  const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);

    return {
      utm_source: urlParams.get("utm_source") || "google",
      utm_medium: urlParams.get("utm_medium") || "referral",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_term: urlParams.get("utm_term") || "",
    };
  };

useEffect(() => {
  const handleURLChange = () => {
    const params = getUTMParams();
    setQuery(params);
    localStorage.setItem("query", JSON.stringify(params));
  };
  
  handleURLChange();

  window.addEventListener("load", handleURLChange);
  window.addEventListener("hashchange", handleURLChange);
  window.addEventListener("popstate", handleURLChange);

  return () => {
    window.removeEventListener("load", handleURLChange);
    window.removeEventListener("hashchange", handleURLChange);
    window.removeEventListener("popstate", handleURLChange);
  };
}, []);

const [query, setQuery] = useState(() => {
  const storedQuery = localStorage.getItem("query");
  console.log(storedQuery, "storedQuery");
  return storedQuery ? JSON.parse(storedQuery) : getUTMParams();
});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      privacyPolicy: true,
      nameOfForm: ESelectedRadio.GET_CATALOG,
    },
  });

  const handleServerErrors = (errors: { [key: string]: string }) => {
    const { name, email, phone } = errors;

    if (name) {
      setServerNameError(name);
      toast.error(name);
    } else {
      setServerNameError("");
    }

    if (email) {
      setServerEmailError(email);
      toast.error(email);
    } else {
      setServerEmailError("");
    }

    if (phone) {
      setServerPhoneError(phone);
      toast.error(phone);
    } else {
      setServerPhoneError("");
    }
  };

  const clearServerErrors = () => {
    setServerNameError("");
    setServerEmailError("");
    setServerPhoneError("");
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const countryCode = getCountryCode(data.phoneNumber);

    if (!countryCode) {
      return;
    }

    const formData = {
      ...data,
      countryCode,
      query,
      ipAddress,
      geoInfo,
    };

    try {
      const { response } = await addLead(formData, (success: boolean) => {
        setIsSubmitSuccessful(success);

        if (success) {
          setIsModalOpen(true);
          reset();
        }
      });

      if (response && response.data) {
        handleServerErrors(response.data);
      } else {
        clearServerErrors();
      }
    } catch (error) {
      setIsSubmitSuccessful(false);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchIpAndGeoInfo = async () => {
      try {
        const ipResponse = await fetch("http://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        setIpAddress(ipData.ip);

        const geoResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        const geoData = await geoResponse.json();
        setGeoInfo(geoData);
      } catch (error) {
        console.error("Error fetching IP address or geo info:", error);
      }
    };

    fetchIpAndGeoInfo();
  }, []);

  return (
    <FormContainer>
      <FormTitle className="font-gravity">Form</FormTitle>
      <FormStyled onSubmit={handleSubmit(onSubmit)}>
        <FormLabel className="font-konnect">Name of form</FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          name="nameOfForm"
          render={({ field }) => {
            return (
              <RadioGroup
                {...field}
                name="radio-buttons-group"
                aria-labelledby="demo-radio-buttons-group-label"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                {radioOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    sx={{
                      color: "#ffffff",
                      "& .MuiRadio-root": {
                        color: "#ffffff",
                        "&.Mui-checked": {
                          color: "#64ffda",
                        },
                      },
                    }}
                    value={option.value}
                    control={<Radio />}
                    label={<span className="font-konnect">{option.label}</span>}
                  />
                ))}
              </RadioGroup>
            );
          }}
        />
        <FormLabel className="font-konnect">
          Name*
          <FormInput
            $error={errors.name ? "true" : "false"}
            className="transition-all font-gravity"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <InputErrorMessage className="font-konnect">
            {errors.name?.message || serverNameError}
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
            {errors.email?.message || serverEmailError}
          </InputErrorMessage>
        </FormLabel>
        <FormLabel className="font-konnect">
          Phone number *
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormPhoneInput
                international
                defaultCountry="US"
                value={value}
                onChange={onChange}
                error={
                  value
                    ? isValidPhoneNumber(value)
                      ? undefined
                      : "Invalid phone number"
                    : "Phone number is required"
                }
              />
            )}
          />
          {errors.phoneNumber && (
            <InputErrorMessage className="font-konnect">
              {errors.phoneNumber.message || serverPhoneError}
            </InputErrorMessage>
          )}
        </FormLabel>
        <div>
          <FormLabelCheckboxContainer>
            <Checkbox
              {...register("privacyPolicy")}
              defaultChecked
              sx={{
                color: "#64ffda",
                "&.Mui-checked": {
                  color: "#64ffda",
                },
              }}
            />
            <FormLabelCheckbox htmlFor="privacyPolicy">
              I confirm that I have read and agree to the terms of the
              <FormLabelCheckboxSpan>
                <a href="/privacy-policy"> privacy policy</a>
              </FormLabelCheckboxSpan>
            </FormLabelCheckbox>
          </FormLabelCheckboxContainer>
          <InputErrorMessage className="font-konnect">
            {errors.privacyPolicy?.message}
          </InputErrorMessage>
        </div>
        <FormBtn
          className="font-gravity transition-all"
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          disabled={!isValid || isSubmitting}
        />
      </FormStyled>
      {isSubmitSuccessful && isModalOpen && (
        <ModalResult
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      )}
    </FormContainer>
  );
};

export default Form;
