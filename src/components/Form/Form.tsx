import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-phone-number-input/style.css";
import { ESelectedRadio, IFormInputs } from "../../models";
import { schema, validatePhoneNumber } from "../../constants";
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

const Form = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [geoInfo, setGeoInfo] = useState<null | object>(null);
  const [wasFormSent, setWasFormSent] = useState<boolean>(false);
  const [wasSentSuccessfully, setWasSentSuccessfully] =
    useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const getUTMParams = () => {
    const urlParams = new URLSearchParams();

    return {
      utm_source: urlParams.get("utm_source") || "google",
      utm_medium: urlParams.get("utm_medium") || "referral",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_content: urlParams.get("utm_content") || "",
      utm_term: urlParams.get("utm_term") || "",
    };
  };

    const [query, setQuery] = useState(() => {
      const storedQuery = localStorage.getItem("query");
      return storedQuery ? JSON.parse(storedQuery) : getUTMParams();
    });

    useEffect(() => {
      const handleHashChange = () => {
        const params = getUTMParams();
        setQuery(params);
        localStorage.setItem("query", JSON.stringify(params));
      };

      window.addEventListener("hashchange", handleHashChange);

      return () => {
        window.removeEventListener("hashchange", handleHashChange);
      };
    }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      privacyPolicy: true,
      nameOfForm: ESelectedRadio.GET_CATALOG,
    },
  });

  console.log(query, "query");

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const countryCode = getCountryCode(data.phoneNumber);

    const formData = {
      ...data,
      countryCode,
      query,
      ipAddress,
      geoInfo,
    };

    try {
      console.log(formData, "formData");
      setWasFormSent(true);
      setWasSentSuccessfully(true);
      setSubmitting(true);
      reset();
      //   await addClient(formData);
    } catch (error) {
      setWasFormSent(false);
      setWasSentSuccessfully(false);
      console.error("Error adding participant:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchIpAndGeoInfo = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
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
                <FormControlLabel
                  sx={{
                    color: "#ffffff",
                    "&.Mui-checked": {
                      color: "#64ffda",
                    },
                  }}
                  value={ESelectedRadio.GET_CATALOG}
                  control={
                    <Radio
                      sx={{
                        color: "#ffffff",
                        "&.Mui-checked": {
                          color: "#64ffda",
                        },
                      }}
                    />
                  }
                  label={
                    <span className="font-konnect">
                      {ESelectedRadio.GET_CATALOG.charAt(0).toUpperCase() +
                        ESelectedRadio.GET_CATALOG.slice(1)}
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    color: "#ffffff",
                    "&.Mui-checked": {
                      color: "#64ffda",
                    },
                  }}
                  value={ESelectedRadio.GET_PRICE}
                  control={
                    <Radio
                      sx={{
                        color: "#ffffff",
                        "&.Mui-checked": {
                          color: "#64ffda",
                        },
                      }}
                    />
                  }
                  label={
                    <span className="font-konnect">
                      {ESelectedRadio.GET_PRICE.charAt(0).toUpperCase() +
                        ESelectedRadio.GET_PRICE.slice(1)}
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    color: "#ffffff",
                    "&.Mui-checked": {
                      color: "#64ffda",
                    },
                  }}
                  value={ESelectedRadio.ORDER_DEMO}
                  control={
                    <Radio
                      sx={{
                        color: "#ffffff",
                        "&.Mui-checked": {
                          color: "#64ffda",
                        },
                      }}
                    />
                  }
                  label={
                    <span className="font-konnect">
                      {ESelectedRadio.ORDER_DEMO.charAt(0).toUpperCase() +
                        ESelectedRadio.ORDER_DEMO.slice(1)}
                    </span>
                  }
                />
                <FormControlLabel
                  sx={{
                    color: "#ffffff",
                    "&.Mui-checked": {
                      color: "#64ffda",
                    },
                  }}
                  value={ESelectedRadio.RECEIVE_CONSULTATION}
                  control={
                    <Radio
                      sx={{
                        color: "#ffffff",
                        "&.Mui-checked": {
                          color: "#64ffda",
                        },
                      }}
                    />
                  }
                  label={
                    <span className="font-konnect">
                      {ESelectedRadio.RECEIVE_CONSULTATION.charAt(
                        0
                      ).toUpperCase() +
                        ESelectedRadio.RECEIVE_CONSULTATION.slice(1)}
                    </span>
                  }
                />
              </RadioGroup>
            );
          }}
        />
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
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              validate: validatePhoneNumber,
            }}
            render={({ field: { onChange, value } }) => (
              <FormPhoneInput
                international
                defaultCountry="US"
                value={value}
                onChange={onChange}
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
          value={submitting ? "Submitting..." : "Submit"}
          disabled={!isValid || submitting}
        />
      </FormStyled>
      {wasFormSent && (
        <ModalResult
          isOpen={wasFormSent}
          setIsOpen={setWasFormSent}
          wasSentSuccessfully={wasSentSuccessfully}
        />
      )}
    </FormContainer>
  );
};

export default Form;
