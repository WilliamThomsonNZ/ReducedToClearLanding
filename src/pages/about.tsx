import { useState } from "react";

function TermsPage() {
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState("12");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  async function handleAddressSubmission(): Promise<void> {
    const pattern = /^0x[a-fA-F0-9]{40}$/;
    if (!pattern.test(address)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 6000);
      return;
    }
    const response = await fetch("/api/address-collect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, orderId }),
    });
    const json = await response.json();
    if (json.code != 200) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 6000);
  }
  return (
    <div className="max-w-xl mx-auto prose prose-blue">
      {showError && <span>Address not valid!</span>}
      {showSuccess && <span>Address Added. Keep an eye on your wallet!</span>}
      <input
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="0xABC..123"
        value={address}
      />
      <button onClick={() => handleAddressSubmission()}>Submit</button>
    </div>
  );
}

export default TermsPage;
