"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const formSteps = [
  {
    key: "name",
    label: "Nama lengkap",
    placeholder: "Masukkan nama Anda",
    required: true,
    type: "text",
  },
  {
    key: "phone",
    label: "Nomor WhatsApp",
    placeholder: "Masukkan nomor WhatsApp",
    required: true,
    type: "tel",
  },
  {
    key: "email",
    label: "Email",
    placeholder: "Masukkan email (opsional)",
    required: false,
    type: "email",
  },
  {
    key: "message",
    label: "Pesan",
    placeholder: "Ceritakan kebutuhan Anda",
    required: true,
    type: "text",
  },
] as const;

const targetWhatsappNumber = "6281804823455";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [activeStep, setActiveStep] = useState(0);
  const [formError, setFormError] = useState("");

  const currentStep = formSteps[activeStep];
  const isLastStep = activeStep === formSteps.length - 1;

  const handleNext = () => {
    if (currentStep.required && !formData[currentStep.key].trim()) {
      setFormError(`${currentStep.label} wajib diisi.`);
      return;
    }

    if (
      currentStep.key === "email" &&
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setFormError("Format email belum valid.");
      return;
    }

    setFormError("");
    setActiveStep((step) => Math.min(step + 1, formSteps.length - 1));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLastStep) {
      handleNext();
      return;
    }

    const missingStep = formSteps.find(
      (step) => step.required && !formData[step.key].trim(),
    );

    if (missingStep) {
      setActiveStep(formSteps.findIndex((step) => step.key === missingStep.key));
      setFormError(`${missingStep.label} wajib diisi.`);
      return;
    }

    const messageTemplate = `Halo *Agung Sukses Farm Fresh*, saya ingin mengirimkan pertanyaan/pesan:

----------------------------------
*DETAIL PESAN / PERTANYAAN:*
• Nama Lengkap: ${formData.name}
• Email: ${formData.email || "-"}
• No. WhatsApp: ${formData.phone}

*Pesan:*
"${formData.message}"
----------------------------------
Mohon tanggapannya. Terima kasih!`;

    const waUrl = `https://wa.me/${targetWhatsappNumber}?text=${encodeURIComponent(messageTemplate)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#242426] px-4 pb-20 pt-24 font-sans text-white sm:px-8 lg:pt-28">
      <div className="mx-auto max-w-full">
        <div className="mb-7 flex items-center justify-between px-1 text-[11px] font-medium tracking-wide text-white/65 sm:mb-9">
          <span>Contacts</span>
          <span className="flex items-baseline gap-2 text-white/40">
            <span className="text-lg font-semibold text-white"></span>
            <span></span>
          </span>
        </div>

        <section className="relative isolate min-h-175 overflow-hidden border border-white/10 bg-[#111113] shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block">
            <iframe
              title="Peta lokasi Agung Sukses Farm Fresh"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3453525356113!2d109.2887025!3d-7.426980400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65595b020641c7%3A0xd47c2394eb6ad9d4!2sMega%20Cemerlang%20Purwokerto!5e0!3m2!1sid!2sid!4v1792583304463!5m2!1sid!2sid"
              className="absolute inset-0 h-full w-full border-0 opacity-30 grayscale invert brightness-[0.35] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#111113] via-[#111113]/75 to-[#111113]/45" />
            <div className="absolute inset-0 bg-linear-to-b from-[#111113]/35 via-transparent to-[#111113]/55" />
            <div
              aria-hidden="true"
              className="absolute left-[63%] top-[48%] -translate-x-1/2 -translate-y-1/2"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#e83d52]/35 motion-reduce:animate-none" />
              <MapPin
                size={17}
                fill="#e83d52"
                className="relative text-white drop-shadow-lg"
              />
            </div>
          </div>

          <div className="relative z-10 flex min-h-175 flex-col px-6 py-7 sm:px-10 sm:py-9 lg:px-14 lg:py-10 lg:pr-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <p className="text-sm font-bold tracking-tight text-white">
                AGUNG SUKSES <span className="text-[#e83d52]">FARM FRESH</span>
              </p>
              <a
                href="tel:+6281804823455"
                className="hidden items-center gap-2 text-[11px] text-white/55 transition-colors hover:text-white sm:flex"
              >
                <Phone size={13} />
                +62 818-0482-3455
              </a>
            </div>

            <div className="mt-12 max-w-2xl sm:mt-16">
              <p className="mb-3 text-xs font-medium text-white/60">
                Kami siap membantu kebutuhan Anda
              </p>
              <div className="flex items-center gap-4">
                <span className="h-14 w-0.75 shrink-0 bg-[#e83d52]" />
                <h1 className="text-5xl font-medium tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Hubungi Kami
                </h1>
              </div>
            </div>

            <div className="mt-11 grid gap-6 border-b border-white/10 pb-8 sm:grid-cols-3 sm:gap-8 lg:max-w-190">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-white/80" />
                <div>
                  <p className="text-xs font-medium text-white/85">Alamat</p>
                  <p className="mt-2 max-w-55 text-[11px] leading-relaxed text-white/45">
                    Dusun IV, Pliken, Kec. Kembaran, Kabupaten Banyumas, Jawa
                    Tengah 53182
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={13} className="mt-0.5 shrink-0 text-white/80" />
                <div>
                  <p className="text-xs font-medium text-white/85">Telepon</p>
                  <a
                    href="tel:+6281804823455"
                    className="mt-2 block text-[11px] text-white/45 transition-colors hover:text-white"
                  >
                    +62 818-0482-3455
                  </a>
                  <p className="mt-1 text-[10px] text-white/35">
                    Senin–Sabtu, 08.00–17.00 WIB
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={13} className="mt-0.5 shrink-0 text-white/80" />
                <div>
                  <p className="text-xs font-medium text-white/85">E-mail</p>
                  <a
                    href="mailto:agungsuksesfarm@gmail.com"
                    className="mt-2 block break-all text-[11px] text-white/45 transition-colors hover:text-white"
                  >
                    agungsuksesfarm@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-auto grid gap-10 pt-9 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.72fr)] lg:gap-16 lg:pt-12">
              <div className="max-w-150">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-4 w-0.5 bg-[#e83d52]" />
                  <h2 className="text-xs font-medium text-white/80">Get in touch</h2>
                </div>

                <form onSubmit={handleSubmit} className="max-w-135">
                  <div
                    key={currentStep.key}
                    aria-live="polite"
                    className="animate-[contact-step-in_420ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none"
                  >
                    <label
                      htmlFor="contact-field"
                      className="mb-3 block text-[10px] uppercase tracking-[0.18em] text-white/40"
                    >
                      {currentStep.label} <span>({activeStep + 1}/4)</span>
                    </label>
                    {currentStep.key === "message" ? (
                      <textarea
                        id="contact-field"
                        name={currentStep.key}
                        required
                        rows={2}
                        placeholder={currentStep.placeholder}
                        value={formData[currentStep.key]}
                        onChange={(event) => {
                          setFormData((data) => ({
                            ...data,
                            [currentStep.key]: event.target.value,
                          }));
                          setFormError("");
                        }}
                        aria-describedby={formError ? "contact-error" : undefined}
                        className="w-full resize-none border-0 border-b border-white/20 bg-transparent px-0 py-2 text-xl font-medium tracking-tight text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#e83d52] sm:text-2xl"
                      />
                    ) : (
                      <input
                        id="contact-field"
                        name={currentStep.key}
                        type={currentStep.type}
                        required={currentStep.required}
                        autoComplete={
                          currentStep.key === "name"
                            ? "name"
                            : currentStep.key === "phone"
                              ? "tel"
                              : "email"
                        }
                        placeholder={currentStep.placeholder}
                        value={formData[currentStep.key]}
                        onChange={(event) => {
                          setFormData((data) => ({
                            ...data,
                            [currentStep.key]: event.target.value,
                          }));
                          setFormError("");
                        }}
                        aria-describedby={formError ? "contact-error" : undefined}
                        className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-2 text-xl font-medium tracking-tight text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#e83d52] sm:text-2xl"
                      />
                    )}

                    <div className="mt-3 flex items-start justify-between gap-4">
                      <div className="min-h-8">
                        {formError ? (
                          <p
                            id="contact-error"
                            role="alert"
                            className="text-xs text-[#ff8290]"
                          >
                            {formError}
                          </p>
                        ) : (
                          <p className="text-[10px] text-white/30">
                            {currentStep.key === "email"
                              ? "Email bersifat opsional."
                              : currentStep.key === "message"
                                ? "Pesan Anda akan dikirim melalui WhatsApp."
                                : "Informasi ini membantu kami menghubungi Anda."}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        {activeStep > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormError("");
                              setActiveStep((step) => step - 1);
                            }}
                            aria-label="Kembali ke langkah sebelumnya"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:border-white/50 hover:text-white"
                          >
                            <ArrowLeft size={14} />
                          </button>
                        )}
                        {isLastStep ? (
                          <button
                            type="submit"
                            aria-label="Kirim pesan melalui WhatsApp"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-[#e83d52] hover:bg-[#e83d52]"
                          >
                            <ArrowRight size={15} />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="flex items-center gap-3 text-[10px] font-medium text-white/80 transition-colors hover:text-white"
                          >
                            Lanjut
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-[#e83d52] hover:bg-[#e83d52]">
                              <ArrowRight size={15} />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div
                      className="mt-1 flex max-w-82.5 items-center gap-1"
                      aria-label={`Langkah ${activeStep + 1} dari ${formSteps.length}`}
                    >
                      {formSteps.map((step, index) => (
                        <button
                          key={step.key}
                          type="button"
                          aria-label={`Ke langkah ${index + 1}: ${step.label}`}
                          aria-current={index === activeStep ? "step" : undefined}
                          disabled={index > activeStep}
                          onClick={() => {
                            setFormError("");
                            setActiveStep(index);
                          }}
                          className={`h-0.5 flex-1 transition-all duration-500 ${
                            index <= activeStep
                              ? "bg-[#e83d52]"
                              : "bg-white/15"
                          } disabled:cursor-default`}
                        />
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <aside className="self-end border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <div className="flex items-center gap-2 text-xs font-medium text-white/75">
                  <MapPin size={13} className="text-[#e83d52]" />
                  Lokasi kami
                </div>
                <p className="mt-3 max-w-xs text-[11px] leading-relaxed text-white/45">
                  Kunjungi kantor dan gudang kami di Pliken, Banyumas.
                </p>
                <p className="mt-4 flex items-center gap-2 text-[10px] text-white/35">
                  <Clock size={12} />
                  Buka Senin–Sabtu, 08.00–17.00 WIB
                </p>
                <a
                  href="https://maps.google.com/?q=Dusun+IV,+Pliken,+Kembaran,+Banyumas"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-[10px] text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                >
                  Buka di Google Maps
                </a>
              </aside>
            </div>

            <nav
              aria-label="Navigasi halaman"
              className="absolute right-7 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 border-r border-white/10 pr-5 text-[10px] text-white/35 lg:flex"
            >
              {[
                ["About us", "/about"],
                ["Our products", "/products"],
                ["Logistics", "/logistics"],
                ["Gallery", "/gallery"],
                ["Licenses", "/about"],
                ["Contacts", "/contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  aria-current={label === "Contacts" ? "page" : undefined}
                  className={`relative transition-colors hover:text-white ${
                    label === "Contacts" ? "text-white" : ""
                  } after:absolute after:-right-6.25 after:top-1/2 after:h-1 after:w-1 after:-translate-y-1/2 after:rounded-full ${
                    label === "Contacts" ? "after:bg-[#e83d52]" : "after:bg-white/20"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </section>
      </div>
      <style>{`
        @keyframes contact-step-in {
          from {
            opacity: 0;
            transform: translateX(14px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
