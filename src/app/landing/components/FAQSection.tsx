"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQSectionProps {
  className?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ className = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do you verify NGOs on NearbyCare?",
      answer:
        "We have a thorough verification process that includes checking registration documents, validating physical addresses, verifying contact information, and reviewing their track record. Only NGOs that pass all checks receive the verified badge.",
    },
    {
      question: "Is NearbyCare free to use?",
      answer:
        "Yes! NearbyCare is completely free for everyone. Users can search for NGOs, submit recommendations, and connect with organizations at no cost. We believe in making social good accessible to all.",
    },
    {
      question: "Can I suggest an NGO that's not listed?",
      answer:
        "Absolutely! We encourage you to submit NGOs you know and trust. Click the 'Suggest NGO' button, fill out the form with their details, and our team will review and verify the organization.",
    },
    {
      question: "How can NGOs get listed on NearbyCare?",
      answer:
        "NGOs can be added in two ways: through user submissions or by contacting us directly. Once submitted, our verification team reviews the organization and adds them to the platform after successful verification.",
    },
    {
      question: "What types of NGOs are featured?",
      answer:
        "We feature a diverse range of verified NGOs working in areas like education, healthcare, environment, animal welfare, women empowerment, child development, disaster relief, and more.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 px-4 md:py-24 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] rounded-full text-sm font-medium mb-4">
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-dark)]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about NearbyCare and how we connect
            communities with NGOs
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[var(--primary-color)]/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-base md:text-lg font-semibold text-[var(--text-dark)] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-[var(--primary-color)] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  size={24}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="px-6 py-3 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
