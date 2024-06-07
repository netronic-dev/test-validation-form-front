import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import { ESelectedRadio, ErrorResponse, IFormInputs } from "../../models";
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
import { addLead, getServerError } from "../../services";

const Form = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<null | object>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [query, setQuery] = useState<{ [key: string]: string }>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });
  const [fromSite, setFromSite] = useState<string>("");
  const [fromPage, setFromPage] = useState<string>("");
  const [isServerError, setIsServerError] = useState<boolean>(false);
  const [cookiesAdded] = useState<boolean>(true);

  useEffect(() => {
    setFromSite(window.location.hostname);
    setFromPage(window.location.href);
  }, []);

  useEffect(() => {
    const storedQuery = sessionStorage.getItem("query");
    if (storedQuery) {
      setQuery(JSON.parse(storedQuery));
    }
  }, []);

  // const setCookie = (name, value, days) => {
  //   let expires = "";
  //   if (days) {
  //     const date = new Date();
  //     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     expires = "; expires=" + date.toUTCString();
  //   }
  //   document.cookie = name + "=" + (value || "") + expires + "; path=/";
  //   setCookiesAdded(true);
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
    setError,
  } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      privacyPolicy: true,
      nameOfForm: ESelectedRadio.GET_CATALOG,
    },
  });

  const handleServerErrors = (error: { [key: string]: string }) => {
    Object.entries(error).forEach(([key, message]) => {
      if (["name", "email", "phoneNumber"].includes(key)) {
        setError(key as "name" | "email" | "phoneNumber", {
          type: "server",
          message,
        });
        toast.error(message);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getServerError();
      } catch (error) {
        setIsServerError(true);
      }
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const countryCode = getCountryCode(data.phoneNumber);

    if (!countryCode) {
      return;
    }

    const formData = {
      ...data,
      countryCode,
      query: Object.keys(query).reduce(
        (acc: { [key: string]: string }, key) => {
          if (query[key]) {
            acc[key] = query[key];
          }
          return acc;
        },
        {}
      ),
      ipAddress,
      geoInfo,
      fromSite,
      fromPage,
      cookiesAdded
    };

    try {
      await addLead(formData);
      setIsSubmitSuccessful(true);

      setIsModalOpen(true);
      reset();
    } catch (error) {
      const serverError = error as ErrorResponse;

      if (serverError.data) {
        handleServerErrors(serverError.data);
      } else {
        setIsServerError(true);
      }

      setIsSubmitSuccessful(false);
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
              {errors.phoneNumber.message}
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
        {isServerError && (
          <InputErrorMessage className="font-konnect">
            Ooops...Something went wrong
          </InputErrorMessage>
        )}
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
