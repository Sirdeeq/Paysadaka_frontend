"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Target, Eye, ChevronRight, ChurchIcon as Mosque, Heart, BookOpen } from "lucide-react"

export const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"who" | "mission" | "vision">("who")

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="relative bg-gradient-to-b from-emerald-50 to-white py-20">
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1584286595398-a96c206e012d?q=80&w=2000&auto=format")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-emerald-600 opacity-10"></div>
      <div className="absolute top-8 left-0 w-full h-2 bg-amber-500 opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title with Islamic Decoration */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Mosque className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">About Our Mission</h1>
          <div className="flex items-center justify-center">
            <div className="h-0.5 w-12 bg-amber-500"></div>
            <div className="h-2 w-2 rounded-full bg-amber-500 mx-2"></div>
            <div className="h-0.5 w-12 bg-amber-500"></div>
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Dedicated to supporting mosques and Islamic charities through transparent, secure, and efficient donation
            channels.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("who")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === "who"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Who We Are
          </button>
          <button
            onClick={() => setActiveTab("mission")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === "mission"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Our Mission
          </button>
          <button
            onClick={() => setActiveTab("vision")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === "vision"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white text-emerald-600 hover:bg-emerald-50"
            }`}
          >
            Our Vision
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Who We Are */}
          <motion.div
            initial="hidden"
            animate={activeTab === "who" ? "visible" : "hidden"}
            variants={fadeIn}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
              activeTab === "who" ? "md:col-span-3 md:flex" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div className={`${activeTab === "who" ? "md:w-1/3" : "h-48"} bg-emerald-600 relative overflow-hidden`}>
              <img
                src="/images/masjid interior.png"
                alt="Mosque interior"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-6">
                  <Users className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className={`p-8 ${activeTab === "who" ? "md:w-2/3" : ""}`}>
              <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
                Who We Are
                <ChevronRight className="ml-2 h-5 w-5 text-amber-500" />
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We are a platform dedicated to simplifying donations for Masjids worldwide. Our goal is to bridge the
                gap between donors and Masjids, making it easier for individuals to support causes that matter most to
                them.
              </p>
              {activeTab === "who" && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Heart className="h-5 w-5 text-emerald-600 mr-2" />
                      <h3 className="font-medium text-emerald-700">Community Focused</h3>
                    </div>
                    <p className="text-sm text-gray-600">Building stronger connections between donors and mosques</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-5 w-5 text-emerald-600 mr-2" />
                      <h3 className="font-medium text-emerald-700">Islamic Values</h3>
                    </div>
                    <p className="text-sm text-gray-600">Operating with integrity, transparency and compassion</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Mosque className="h-5 w-5 text-emerald-600 mr-2" />
                      <h3 className="font-medium text-emerald-700">Global Reach</h3>
                    </div>
                    <p className="text-sm text-gray-600">Supporting masjids and charities around the world</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            initial="hidden"
            animate={activeTab === "mission" ? "visible" : "hidden"}
            variants={fadeIn}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
              activeTab === "mission" ? "md:col-span-3 md:flex" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div className={`${activeTab === "mission" ? "md:w-1/3" : "h-48"} bg-emerald-600 relative overflow-hidden`}>
              <img
                src="/images/Masjid.png"
                alt="Mosque exterior"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-6">
                  <Target className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className={`p-8 ${activeTab === "mission" ? "md:w-2/3" : ""}`}>
              <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
                Our Mission
                <ChevronRight className="ml-2 h-5 w-5 text-amber-500" />
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide a secure, transparent, and efficient way for people to donate to their chosen Masjids,
                empowering communities to thrive and grow together.
              </p>
              {activeTab === "mission" && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-4">
                      <ChevronRight className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-emerald-700 mb-1">Secure Donation Channels</h3>
                      <p className="text-sm text-gray-600">
                        Implementing top-tier security protocols to protect every transaction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-4">
                      <ChevronRight className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-emerald-700 mb-1">Complete Transparency</h3>
                      <p className="text-sm text-gray-600">
                        Providing clear tracking and reporting of all donation activities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-4">
                      <ChevronRight className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-emerald-700 mb-1">Community Empowerment</h3>
                      <p className="text-sm text-gray-600">
                        Enabling mosques to focus on their core mission by simplifying financial support
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Our Vision */}
          <motion.div
            initial="hidden"
            animate={activeTab === "vision" ? "visible" : "hidden"}
            variants={fadeIn}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
              activeTab === "vision" ? "md:col-span-3 md:flex" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div className={`${activeTab === "vision" ? "md:w-1/3" : "h-48"} bg-emerald-600 relative overflow-hidden`}>
              <img
                src="/images/Masjid.png"
                alt="Mosque dome"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-6">
                  <Eye className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className={`p-8 ${activeTab === "vision" ? "md:w-2/3" : ""}`}>
              <h2 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center">
                Our Vision
                <ChevronRight className="ml-2 h-5 w-5 text-amber-500" />
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To become the leading platform for charitable donations, fostering global connections and strengthening
                communities through shared generosity.
              </p>
              {activeTab === "vision" && (
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-100 rounded-full"></div>
                    <div className="space-y-8 pl-8">
                      <div>
                        <div className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-full"></div>
                        <h3 className="font-medium text-emerald-700 mb-2">Global Impact</h3>
                        <p className="text-sm text-gray-600">
                          Expanding our reach to support mosques and Islamic charities worldwide
                        </p>
                      </div>
                      <div>
                        <div className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-full"></div>
                        <h3 className="font-medium text-emerald-700 mb-2">Technological Innovation</h3>
                        <p className="text-sm text-gray-600">
                          Continuously improving our platform with cutting-edge technology
                        </p>
                      </div>
                      <div>
                        <div className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-full"></div>
                        <h3 className="font-medium text-emerald-700 mb-2">Community Building</h3>
                        <p className="text-sm text-gray-600">
                          Creating a global network of donors and organizations united in purpose
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Islamic Quote */}
        <div className="mt-16 text-center max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-600">
          <div className="text-amber-500 text-4xl font-arabic mb-4">"صدقة"</div>
          <p className="text-gray-700 italic">
            "The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in
            each spike is a hundred grains. And Allah multiplies for whom He wills."
          </p>
          <p className="text-emerald-600 mt-2 font-medium">— Quran 2:261</p>
        </div>

        {/* Decorative Footer */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="h-1 w-16 bg-emerald-200 rounded-full"></div>
            <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
            <div className="h-1 w-16 bg-emerald-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
