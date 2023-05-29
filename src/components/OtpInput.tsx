import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
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
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={{ width: "1em" }}
          />
          {index < otp.length - 1 && <span className="hyphen">-</span>}
        </div>
      ))}
    </div>
  );
};

export default OtpInputField;
