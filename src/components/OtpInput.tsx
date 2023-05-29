import React, { useState, useRef } from "react";
import "./OtpInput.css";
const OtpInputField: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 6) {
      const updatedOtp = [...otp];
      updatedOtp[Number(e.target.name)] = value;
      setOtp(updatedOtp);
      console.log("otp", otp);
      if (value.length === 1 && Number(e.target.name) < 5) {
        inputRefs.current[Number(e.target.name) + 1]?.focus();
        console.log(inputRefs.current[Number(e.target.name) + 1])
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      const currentIndex = Number(e.currentTarget.name);
      if (currentIndex > 0) {
        inputRefs.current[currentIndex - 1]?.focus();
      }
    }
  }
  return (
    <div>
      {otp.map((value, index) => (
        <>
          <input
            key={index}
            type="text"
            className="otp_input"
            maxLength={1}
            name={index.toString()}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={{ width: "1em" }}
          />
          {index < otp.length - 1 && <span className="hyphen">-</span>}
        </>
      ))}
    </div>
  );
};

export default OtpInputField;
