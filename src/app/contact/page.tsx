"use client";

import { useState } from "react";
import { MapPin, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      // Mengirim data ke db.json via json-server (berjalan di port 3001)
      const response = await fetch("http://localhost:3001/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("Request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
      } else {
        setStatus("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting to db.json:", error);
      setStatus("Error: Make sure json-server is running.");
    }
  };

  return (
    <main className="w-full relative bg-brand-dark min-h-screen">

      {/* 1. HERO SECTION[cite: 7] */}
      <section className="relative pt-32 pb-24 px-10 md:px-20 overflow-hidden bg-brand-dark border-b-8 border-brand-red">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/dark-texture.png')] bg-cover mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 animate-fade-in-up">
            <h1 className="text-white text-6xl md:text-7xl font-script leading-tight mb-2 drop-shadow-md">
              Let's Connect
            </h1>
            <h2 className="text-white text-3xl md:text-4xl font-script leading-tight opacity-90 drop-shadow-md mb-6">
              We're just a message away
            </h2>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
              PT. Agung Sukses Farm Fresh adalah pemimpin dalam yang
              berkualitas... kami memastikan modernisasi, kebersihan mewujudkan
              mutu dari hulu ke hilir untuk pemenuhan dan umum.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-end mt-10 md:mt-0 animate-float">
            <img
              src="/images/raw-chicken-board.png"
              alt="Raw Chicken"
              className="w-full max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* 2. CONTACT FORM SECTION[cite: 7] */}
      <section className="bg-white py-24 px-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-brand-dark text-5xl md:text-6xl font-script text-center mb-16">
            Contact Form
          </h2>

          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Maskot Kiri[cite: 7] */}
            <div className="md:w-2/5 flex justify-center">
              <img
                src="/images/chicken-mascot.png"
                alt="Mascot pointing"
                className="w-80 drop-shadow-xl"
              />
            </div>

            {/* Form Kanan[cite: 7] */}
            <div className="md:w-3/5 w-full">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex gap-6">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-dark">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-red bg-gray-50"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-dark">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-red bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-dark">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-red bg-gray-50"
                    />
                  </div>
                  <div className="w-1/2 flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-dark">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-red bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-brand-dark">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="border-2 border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-red bg-gray-50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-brand-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-colors shadow-lg mt-2"
                >
                  Submit Request
                </button>
                {status && (
                  <p className="text-center text-sm font-semibold text-brand-red mt-2">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HEADQUARTERS SECTION[cite: 7] */}
      <section className="bg-brand-dark py-24 px-10 relative">
        <div className="max-w-5xl mx-auto bg-[#23242A] rounded-3xl p-10 flex flex-col md:flex-row gap-10 items-center shadow-2xl border border-gray-800">
          {/* Map Image Kiri[cite: 7] */}
          <div className="md:w-1/2 w-full relative bg-white p-4 rounded-2xl shadow-inner">
            <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-lg font-script text-2xl text-brand-dark shadow-md z-10">
              Headquarters
            </div>
            <img
              src="/images/map-placeholder.jpg"
              alt="Map Location"
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>

          {/* Info Kontak Kanan[cite: 7] */}
          <div className="md:w-1/2 w-full flex flex-col gap-8 pl-4">
            <div className="flex items-start gap-4">
              <MapPin className="text-brand-red mt-1" size={24} />
              <div>
                <h4 className="text-white font-bold mb-1">Office Address</h4>
                <p className="text-gray-400 text-sm">
                  123 Jalan Ampang,
                  <br />
                  Kuala Lumpur 50450
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-brand-red mt-1" size={24} />
              <div>
                <h4 className="text-white font-bold mb-1">Email</h4>
                <p className="text-gray-400 text-sm">
                  contact@poultrywholesaler.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-brand-red mt-1" size={24} />
              <div>
                <h4 className="text-white font-bold mb-1">Business Hours</h4>
                <p className="text-gray-400 text-sm">Mon-Fri: 9am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}