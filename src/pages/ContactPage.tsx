import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import { site, whatsappUrl } from "../config/site";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Alamat",
    value: "Jl. Teknologi No. 123, Jakarta Selatan, DKI Jakarta 12345",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Telepon",
    value: "(021) 234-5678",
    href: "tel:+6221234567",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "info@iware.id",
    href: "mailto:info@iware.id",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: site.phone,
    href: whatsappUrl(),
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo iware,\nNama: ${form.name}\nEmail: ${form.email}\nTelepon: ${form.phone}\nSubjek: ${form.subject}\nPesan: ${form.message}`;
    window.open(whatsappUrl(text), "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass = (name: string) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-sm text-slate-700 placeholder-slate-400 transition-all duration-200 focus:outline-none ${
      focused === name
        ? "border-blue-400 ring-2 ring-red-500/20"
        : "border-slate-200 hover:border-slate-300"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHero
        label="Hubungi Kami"
        title={<>Kami siap membantu</>}
        description="Punya pertanyaan atau butuh konsultasi? Tim kami siap membantu Anda menemukan solusi terbaik."
        breadcrumbs={[
          { label: "Beranda", to: "/" },
          { label: "Kontak" },
        ]}
      />

      {/* Contact section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Informasi Kontak</h2>
                <p className="text-slate-500 text-sm">
                  Hubungi kami melalui berbagai saluran komunikasi yang tersedia.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-red-200 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-slate-700 hover:text-red-600 transition-colors font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700 font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Office hours */}
              <div className="p-5 bg-red-600 rounded-2xl text-white">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Jam Operasional
                </h3>
                <div className="space-y-1.5 text-sm text-blue-100">
                  <div className="flex justify-between">
                    <span>Senin – Jumat</span>
                    <span className="font-medium text-white">08:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span className="font-medium text-white">08:00 – 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span className="font-medium text-white">Tutup</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Kirim Pesan</h2>
                <p className="text-slate-500 text-sm mb-8">
                  Isi formulir di bawah dan kami akan menghubungi Anda segera.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Pesan Terkirim!</h3>
                    <p className="text-slate-500 text-sm">
                      Kami akan segera menghubungi Anda melalui WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          placeholder="Nama Anda"
                          className={inputClass("name")}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          placeholder="email@perusahaan.com"
                          className={inputClass("email")}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocused("phone")}
                          onBlur={() => setFocused(null)}
                          placeholder="+62 812-xxxx-xxxx"
                          className={inputClass("phone")}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Subjek *
                        </label>
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          onFocus={() => setFocused("subject")}
                          onBlur={() => setFocused(null)}
                          className={inputClass("subject")}
                        >
                          <option value="">Pilih subjek...</option>
                          <option value="Konsultasi Produk">Konsultasi Produk</option>
                          <option value="Permintaan Penawaran">Permintaan Penawaran</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Kerjasama">Kerjasama</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Pesan *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        placeholder="Ceritakan kebutuhan Anda..."
                        className={`${inputClass("message")} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-red-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Kirim via WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-slate-500 font-medium">Jl. Teknologi No. 123, Jakarta Selatan</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors"
            >
              Buka di Google Maps
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
