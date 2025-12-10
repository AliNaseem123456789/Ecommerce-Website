import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { supabase } from "../../pages/SupabaseClient";

export default function AddressesTab() {
  const { user } = useContext(AuthContext);

  const [billing, setBilling] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formType, setFormType] = useState(null); // "billing" or "shipping"
  const [formData, setFormData] = useState({});

  // ---------------------------
  // Load Addresses
  // ---------------------------
  const loadAddresses = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("user_addresses")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      setBilling(data.find((a) => a.type === "billing") || null);
      setShipping(data.find((a) => a.type === "shipping") || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAddresses();
  }, [user]);

  // ---------------------------
  // Start Editing
  // ---------------------------
  const startEditing = (type) => {
    setFormType(type);

    const existing = type === "billing" ? billing : shipping;

    setFormData(
      existing || {
        first_name: "",
        last_name: "",
        company: "",
        country: "",
        street: "",
        apartment: "",
        city: "",
        state: "",
        postal_code: "",
        phone: "",
        email: user?.email || "",
      }
    );
  };

  // ---------------------------
  // Save Address
  // ---------------------------
  const saveAddress = async () => {
    if (!user?.id) return;

    const isUpdate =
      (formType === "billing" && billing) ||
      (formType === "shipping" && shipping);

    let result;

    if (isUpdate) {
      result = await supabase
        .from("user_addresses")
        .update({ ...formData })
        .eq("user_id", user.id)
        .eq("type", formType);
    } else {
      result = await supabase.from("user_addresses").insert([
        {
          user_id: user.id,
          type: formType,
          ...formData,
        },
      ]);
    }

    if (!result.error) {
      setFormType(null);
      loadAddresses();
    }
  };

  // ---------------------------
  // Address Card UI
  // ---------------------------
  const AddressCard = ({ title, data, type }) => {
    const isEditing = formType === type;

    return (
      <div
        style={{
          flex: 1,
          background: "#ffffff",   // WHITE CARD
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #eee",
        }}
      >
        {/* Header */}
        {!isEditing && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>
              {title}
            </h2>

            <button
              onClick={() => startEditing(type)}
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✏️
            </button>
          </div>
        )}

        {/* VIEW MODE */}
        {!isEditing && (
          <div style={{ marginTop: "20px", color: "#555", lineHeight: "1.7" }}>
            {data ? (
              <>
                <div>{data.first_name} {data.last_name}</div>
                <div>{data.company}</div>
                <div>{data.street}</div>
                <div>{data.apartment}</div>
                <div>{data.city}</div>
                <div>{data.state}</div>
                <div>{data.postal_code}</div>
                <div>{data.country}</div>
                <div>{data.phone}</div>
                <div>{data.email}</div>
              </>
            ) : (
              <div>You have not set up this type of address yet.</div>
            )}
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <div style={{ marginTop: "10px" }}>
            <h2 style={{ marginBottom: "20px" }}>
              Edit {type === "billing" ? "Billing" : "Shipping"} Address
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              {[ 
                "first_name",
                "last_name",
                "company",
                "country",
                "street",
                "apartment",
                "city",
                "state",
                "postal_code",
                "phone",
                "email",
              ].map((field) => (
                <div key={field} style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: "14px", marginBottom: "5px" }}>
                    {field.replace("_", " ").toUpperCase()}
                  </label>

                  <input
                    value={formData[field] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => setFormType(null)}
                style={{
                  padding: "10px 20px",
                  background: "#ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveAddress}
                style={{
                  padding: "10px 20px",
                  background: "black",
                  color: "white",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ---------------------------
  // MAIN UI
  // ---------------------------
  return (
    <div style={{ padding: "0 10px" }}>
      <p style={{ marginBottom: "20px" }}>
        The following addresses will be used on the checkout page by default.
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* If editing billing → ONLY billing shows */}
        {formType === "billing" && (
          <AddressCard title="Billing address" data={billing} type="billing" />
        )}

        {/* If editing shipping → ONLY shipping shows */}
        {formType === "shipping" && (
          <AddressCard title="Shipping address" data={shipping} type="shipping" />
        )}

        {/* Default view: show both */}
        {!formType && (
          <>
            <AddressCard title="Billing address" data={billing} type="billing" />
            <AddressCard title="Shipping address" data={shipping} type="shipping" />
          </>
        )}
      </div>
    </div>
  );
}
