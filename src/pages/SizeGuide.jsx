import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Ruler,
  User,
  ShoppingBag,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const SizeGuide = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("cm"); // cm or inches
  const [expandedSection, setExpandedSection] = useState("measurements");

  const sizeData = {
    cm: [
      {
        size: "XS",
        chest: "86-91",
        length: "68",
        shoulder: "42",
        sleeve: "19",
      },
      {
        size: "S",
        chest: "91-96",
        length: "70",
        shoulder: "44",
        sleeve: "20",
      },
      {
        size: "M",
        chest: "96-101",
        length: "72",
        shoulder: "46",
        sleeve: "21",
      },
      {
        size: "L",
        chest: "101-106",
        length: "74",
        shoulder: "48",
        sleeve: "22",
      },
      {
        size: "XL",
        chest: "106-111",
        length: "76",
        shoulder: "50",
        sleeve: "23",
      },
      {
        size: "2XL",
        chest: "111-117",
        length: "78",
        shoulder: "52",
        sleeve: "24",
      },
      {
        size: "3XL",
        chest: "117-122",
        length: "80",
        shoulder: "54",
        sleeve: "25",
      },
    ],
    inches: [
      {
        size: "XS",
        chest: "34-36",
        length: "26.8",
        shoulder: "16.5",
        sleeve: "7.5",
      },
      {
        size: "S",
        chest: "36-38",
        length: "27.6",
        shoulder: "17.3",
        sleeve: "7.9",
      },
      {
        size: "M",
        chest: "38-40",
        length: "28.3",
        shoulder: "18.1",
        sleeve: "8.3",
      },
      {
        size: "L",
        chest: "40-42",
        length: "29.1",
        shoulder: "18.9",
        sleeve: "8.7",
      },
      {
        size: "XL",
        chest: "42-44",
        length: "29.9",
        shoulder: "19.7",
        sleeve: "9.1",
      },
      {
        size: "2XL",
        chest: "44-46",
        length: "30.7",
        shoulder: "20.5",
        sleeve: "9.4",
      },
      {
        size: "3XL",
        chest: "46-48",
        length: "31.5",
        shoulder: "21.3",
        sleeve: "9.8",
      },
    ],
  };

  const measurementGuides = [
    {
      title: "Chest",
      description:
        "Measure around the fullest part of your chest, keeping the tape horizontal.",
      icon: "📏",
    },
    {
      title: "Length",
      description:
        "Measure from the highest point of the shoulder to the bottom hem.",
      icon: "📐",
    },
    {
      title: "Shoulder",
      description:
        "Measure from one shoulder seam to the other across the back.",
      icon: "👔",
    },
    {
      title: "Sleeve",
      description:
        "Measure from the shoulder seam to the end of the sleeve opening.",
      icon: "✋",
    },
  ];

  const fitTypes = [
    {
      name: "Regular Fit",
      description: "Classic, comfortable fit with room to move",
      recommendation: "True to size",
      color: "primary",
    },
    {
      name: "Slim Fit",
      description: "Closer to the body for a modern, tailored look",
      recommendation: "Consider sizing up if between sizes",
      color: "secondary",
    },
    {
      name: "Oversized",
      description: "Relaxed, roomy fit for a street-style look",
      recommendation: "Size down for a less oversized fit",
      color: "accent",
    },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen transition-colors bg-background text-text">
      <Header cartItemCount={0} />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Back</span>
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-primary/10 border-primary/20 text-primary">
              <Ruler className="w-4 h-4" />
              <span className="text-sm font-medium">Size Guide</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Find Your <span className="text-primary">Perfect Fit</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-text-muted">
              Use our comprehensive size guide to find the perfect fit for your
              body type and preferred style.
            </p>
          </motion.div>

          {/* Unit Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex p-1 border rounded-lg bg-surface border-primary/20">
              <button
                onClick={() => setSelectedUnit("cm")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  selectedUnit === "cm"
                    ? "bg-primary text-background shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Centimeters
              </button>
              <button
                onClick={() => setSelectedUnit("inches")}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  selectedUnit === "inches"
                    ? "bg-primary text-background shadow-sm"
                    : "text-text-muted hover:text-text"
                }`}
              >
                Inches
              </button>
            </div>
          </motion.div>

          {/* Size Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 mb-12 border rounded-2xl bg-surface/50 backdrop-blur-sm border-primary/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Size Chart</h2>
              <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-primary/10 text-primary">
                <Info className="w-4 h-4" />
                <span>All measurements are approximate</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="px-4 py-4 text-left font-semibold text-text">
                      Size
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-text">
                      Chest ({selectedUnit})
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-text">
                      Length ({selectedUnit})
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-text">
                      Shoulder ({selectedUnit})
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-text">
                      Sleeve ({selectedUnit})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData[selectedUnit].map((row, index) => (
                    <motion.tr
                      key={row.size}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="border-b border-primary/5 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center justify-center w-12 h-12 font-bold rounded-lg bg-primary/10 text-primary">
                          {row.size}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-text-muted">
                        {row.chest}
                      </td>
                      <td className="px-4 py-4 text-center text-text-muted">
                        {row.length}
                      </td>
                      <td className="px-4 py-4 text-center text-text-muted">
                        {row.shoulder}
                      </td>
                      <td className="px-4 py-4 text-center text-text-muted">
                        {row.sleeve}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* How to Measure Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <button
              onClick={() => toggleSection("measurements")}
              className="flex items-center justify-between w-full p-6 mb-4 border rounded-2xl bg-surface/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Ruler className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">How to Measure</h2>
              </div>
              {expandedSection === "measurements" ? (
                <ChevronUp className="w-6 h-6 text-primary" />
              ) : (
                <ChevronDown className="w-6 h-6 text-text-muted" />
              )}
            </button>

            {expandedSection === "measurements" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {measurementGuides.map((guide, index) => (
                  <motion.div
                    key={guide.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border rounded-xl bg-white dark:bg-gray-800 border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{guide.icon}</div>
                      <div>
                        <h3 className="mb-2 text-lg font-bold text-text">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-text-muted">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Fit Types Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <button
              onClick={() => toggleSection("fittypes")}
              className="flex items-center justify-between w-full p-6 mb-4 border rounded-2xl bg-surface/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Fit Types</h2>
              </div>
              {expandedSection === "fittypes" ? (
                <ChevronUp className="w-6 h-6 text-primary" />
              ) : (
                <ChevronDown className="w-6 h-6 text-text-muted" />
              )}
            </button>

            {expandedSection === "fittypes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                {fitTypes.map((fit, index) => (
                  <motion.div
                    key={fit.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 border rounded-xl bg-white dark:bg-gray-800 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all group"
                  >
                    <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                      {fit.name}
                    </div>
                    <p className="mb-4 text-text-muted">{fit.description}</p>
                    <div className="pt-4 border-t border-primary/10">
                      <p className="text-sm font-medium text-text">
                        💡 {fit.recommendation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-8 border rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">Pro Tips</h3>
                <ul className="space-y-2 text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Measure yourself in your underwear for the most accurate
                      results
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Use a soft measuring tape and keep it parallel to the
                      floor
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      If you're between sizes, consider your preferred fit style
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Our gym t-shirts are pre-shrunk but may shrink slightly
                      after washing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Still unsure? Contact our customer support for
                      personalized sizing advice
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold transition-all rounded-lg group bg-primary text-background hover:shadow-neon-green hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SizeGuide;
