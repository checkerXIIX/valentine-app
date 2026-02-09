"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "@fireworks-js/react";
import Image from "next/image";

import { fireHeartConfetti } from "@/lib/heartConfetti";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Step =
  | "intro"
  | "question"
  | "planning-food"
  | "planning-dessert"
  | "planning-activity"
  | "summary"
  | "celebration";

type Option = {
  id: string;
  label: string;
  image: string;
};


type DatePlan = {
  food: string[];
  dessert: string[];
  activity: string[];
};

const memoryImages = [
  "/game-photos/1.avif",
  "/game-photos/2.avif",
  "/game-photos/3.avif",
  "/game-photos/4.avif",
  "/game-photos/5.avif",
  "/game-photos/6.avif",
  "/game-photos/7.avif",
  "/game-photos/8.avif",
  "/game-photos/9.avif",
  "/game-photos/10.avif",
  "/game-photos/11.avif",
  "/game-photos/12.avif",
];

export default function ValentinesProposal() {
  const [step, setStep] = useState<Step>("intro");
  const [plan, setPlan] = useState<DatePlan>({
    food: [],
    dessert: [],
    activity: [],
  });
  const [showFireworks, setShowFireworks] = useState(false);
  const [position, setPosition] = useState<{ top: string; left: string } | null>(null);

  const foodOptions: Option[] = [
    { id: "pizza", label: "Pizza", image: "/food/pizza.avif" },
    { id: "hotpot", label: "HotPot", image: "/food/hotpot.avif" },
    { id: "burger", label: "Burger", image: "/food/Burger.avif" },
    { id: "barbeque", label: "Korean BBQ", image: "/food/bbq.avif" },
    { id: "taco", label: "Taco", image: "/food/taco.avif" },
    { id: "thai", label: "Thai", image: "/food/thai.avif" },
  ];
  const dessertOptions: Option[] = [
    { id: "ice_cream", label: "Ice Cream", image: "/food/IceCream.avif" },
    { id: "cheesecake", label: "Cheesecake", image: "/food/cheesecake.webp" },
    { id: "bubble_tea", label: "Bubble Tea", image: "/food/BubbleTea.avif" },
    { id: "matcha_cake", label: "Matcha cake", image: "/food/MatchaCake.avif" },
    { id: "panna_cotta", label: "Panna Cotta", image: "/food/pannacotta.webp" },
    { id: "snacks", label: "Snacks", image: "/food/snacks.avif" },
  ];
  const activityOptions: Option[] = [
    { id: "movie_night", label: "Movie Night", image: "/food/movie.avif" },
    { id: "billard", label: "Billard", image: "/food/billard.avif" },
    { id: "cooking", label: "Cooking Together", image: "/food/cooking.avif" },
    { id: "cuddle", label: "Cuddle Party", image: "/food/cuddle.avif" },
    { id: "porn", label: "Making a Porn", image: "/food/kiss.avif" },
    { id: "club", label: "Night out", image: "/food/club.avif" },
  ];
  const ticketRef = useRef<HTMLDivElement>(null);

  const togglePlan = (key: keyof DatePlan, value: string) => {
    setPlan(prev => {
      const exists = prev[key].includes(value);

      return {
        ...prev,
        [key]: exists
          ? prev[key].filter(v => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const sendPlanToEmail = async () => {
    try {
      await fetch("/api/send-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      alert("Plan sent to your email! 💌");
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 2,
      backgroundColor: "#000000"
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("valentine-ticket.pdf");
  };

  const getRandomPosition = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
  });

  useEffect(() => {
    if (step === "intro") {
      const timer = setTimeout(() => setStep("question"), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === "summary") {
      fireHeartConfetti();
    }
  }, [step]);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (step === "summary" || step === "celebration") {
      audioRef.current?.play().catch(() => {});
    }
  }, [step]);

  useEffect(() => {
    if (step === "celebration") setShowFireworks(true);
  }, [step]);

  const nextPlanningStep = () => {
    if (step === "planning-food") setStep("planning-dessert");
    else if (step === "planning-dessert") setStep("planning-activity");
    else if (step === "planning-activity") setStep("summary");
  };

  const getSelectedOptions = (selectedIds: string[], options: Option[]) => {
    return options.filter(opt => selectedIds.includes(opt.id));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">

      <AnimatePresence mode="wait">

        {/* QUESTION */}
        {step === "question" && (
          <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <h2 className="text-5xl mb-8 text-center text-white drop-shadow-md">Will you be my Valentine?</h2>

            <Image src="/mad_jose.png" alt="Mad Jose" width={200} height={200} />

            <div className="relative flex justify-center gap-6 mt-8 w-[320px] h-[60px]">

              {/* YES BUTTON */}
              <button
                className="bg-pink-500 px-6 py-2 rounded-xl text-white z-10"
                onClick={() => setStep("planning-food")}
              >
                Yes 🥰
              </button>

              {/* NO BUTTON */}
              <button
                className="bg-gray-500 px-6 py-2 rounded-xl text-white absolute transition-all duration-300"
                style={{
                  top: position?.top ?? "0px",
                  left: position?.left ?? "160px",
                }}
                onMouseEnter={() => setPosition(getRandomPosition())}
                onClick={() => setPosition(getRandomPosition())}
              >
                No 😢
              </button>

            </div>
          </motion.div>
        )}

        {/* FOOD */}
        {step === "planning-food" && (
          <PlanningView
            title="Choose our dinner 🍝"
            options={foodOptions}
            selected={plan.food}
            onToggle={(id) => togglePlan("food", id)}
            onNext={nextPlanningStep}
          />
        )}

        {/* DESSERT */}
        {step === "planning-dessert" && (
          <PlanningView
            title="Choose dessert 🍰"
            options={dessertOptions}
            selected={plan.dessert}
            onToggle={(id) => togglePlan("dessert", id)}
            onNext={nextPlanningStep}
          />
        )}

        {/* ACTIVITY */}
        {step === "planning-activity" && (
          <PlanningView
            title="Choose our activity 🎡"
            options={activityOptions}
            selected={plan.activity}
            onToggle={(id) => togglePlan("activity", id)}
            onNext={nextPlanningStep}
          />
        )}

        {step === "summary" && (
          <motion.div 
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-4xl px-6"
          >
            <div
              ref={ticketRef}
              className="w-full bg-black rounded-2xl p-8 shadow-xl text-white"
            >

              <h2 className="text-4xl mb-8 text-center">
                Our Valentine Plan ❤️
              </h2>

              <SummarySection
                title="Dinner 🍝"
                items={getSelectedOptions(plan.food, foodOptions)}
              />

              <SummarySection
                title="Dessert 🍰"
                items={getSelectedOptions(plan.dessert, dessertOptions)}
              />

              <SummarySection
                title="Activity 🎡"
                items={getSelectedOptions(plan.activity, activityOptions)}
              />
              
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button
                onClick={downloadTicket}
                className="px-6 py-3 rounded-xl border border-pink-400 text-pink-300 hover:bg-pink-500 hover:text-white transition"
              >
                🎟️ Download Ticket
              </button>

              <button
                className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition"
                  onClick={() => {
                    sendPlanToEmail();
                    setStep("celebration");
                  }}
              >
                Perfect ❤️
              </button>
            </div>
          </motion.div>
        )}

        {/* CELEBRATION */}
        {step === "celebration" && (
          <div className="fixed inset-0 flex items-center justify-center overflow-hidden">

            {/* Memory Background */}
            <motion.div
              className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 opacity-30 z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
            >
              {memoryImages.map((src, i) => (
                <div key={i} className="relative w-full h-[33vh] md:h-[50vh]">
                  <Image
                    src={src}
                    alt="Memory"
                    fill
                    className="object-cover blur-sm"
                  />
                </div>
              ))}
            </motion.div>

            {/* Dark Overlay For Readability */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Celebration Content */}
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center z-20"
            >
              <h2 className="text-5xl mb-6 text-center text-white drop-shadow-lg">
                I can't wait for our valentines date 💕
              </h2>

              <Image
                src="/happy_jose.gif"
                alt="Happy"
                width={200}
                height={200}
                unoptimized
              />
            </motion.div>

          </div>
        )}

      </AnimatePresence>

      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-30">
          <Fireworks
            options={{ autoresize: true }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

function PlanningView({
  title,
  options,
  selected,
  onToggle,
  onNext,
}: {
  title: string;
  options: Option[];
  selected: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full max-w-5xl"
    >
      <h2 className="text-4xl mb-6 text-center text-white drop-shadow-md">
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {options.map(option => {
          const isSelected = selected.includes(option.id);

          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.05 }}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                isSelected
                  ? "border-pink-400 shadow-lg shadow-pink-400/40"
                  : "border-transparent"
              }`}
              onClick={() => onToggle(option.id)}
            >
              <div className="relative h-40">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className={`object-cover transition ${
                    isSelected ? "brightness-75" : ""
                  }`}
                  priority
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Checkbox */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-md">
                <input type="checkbox" checked={isSelected} readOnly />
              </div>

              {/* Label */}
              <div className="p-3 bg-gradient-to-t from-black/80 to-black/20 text-white text-center font-medium">
                {option.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      <button
        className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 rounded-xl text-white font-semibold shadow-lg hover:shadow-pink-500/40 disabled:opacity-40"
        disabled={selected.length === 0}
        onClick={onNext}
      >
        Continue ❤️
      </button>
    </motion.div>
  );
}

function SummarySection({
  title,
  items,
}: {
  title: string;
  items: Option[];
}) {
  if (!items.length) return null;

  return (
    <div className="mb-8">
      <h3 className="text-2xl text-pink-300 mb-4 font-semibold">
        {title}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {items.map(item => (
          <div
            key={item.id}
            className="relative rounded-xl overflow-hidden border border-pink-400/40 shadow-md"
          >
            <div className="relative h-28">
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-2 bg-black/70 text-white text-center text-sm">
              {item.label}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

function MemorySlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Memory"
            fill
            className="object-cover blur-md scale-105"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}