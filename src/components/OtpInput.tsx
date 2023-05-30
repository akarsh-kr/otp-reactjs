import React, { useState, useRef } from "react";
import "./OtpInput.css";
const OtpInputField: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length <= 6) {
        const updatedOtp = [...otp];
        updatedOtp[Number(e.target.name)] = value;
        setOtp(updatedOtp);
        setError("");
        if (value.length === 1 && Number(e.target.name) < 5) {
          inputRefs.current[Number(e.target.name) + 1]?.focus();
        }
      }
    } else {
      setError("Please enter only numeric values.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      const currentIndex = Number(e.currentTarget.name);
      if (currentIndex > 0) {
        inputRefs.current[currentIndex - 1]?.focus();
      }
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text");
    const otpArray = pastedData.split("").slice(0, 6);
    const isValidOtp = otpArray.every((value) => /^\d*$/.test(value));

    if (isValidOtp) {
      const updatedOtp = [...otp];
      otpArray.forEach((value, index) => {
        updatedOtp[index] = value;
      });
      setOtp(updatedOtp);
      inputRefs.current[pastedData.length - 1]?.focus();
      setError("");
    } else {
      setError("Please enter only numeric values.");
    }
  };
  return (
    <div>
      {error && <div className="error_message">{error}</div>}
      <div className="input_container">
        {otp.map((value, index) => (
          <div key={index}>
            <input
              type="text"
              className="otp_input"
              maxLength={1}
              name={index.toString()}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{ width: "1em" }}
            />
            {index < otp.length - 1 && <span className="hyphen">-</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtpInputField;
