import React from "react";
import { Dumbbell } from "lucide-react";



const GOALS = [
  {
    name: "Muscle Building",
    value: "muscle building"
  },
  {
    name: "Weight Loss",
    value: "weight loss"
  },
  {
    name: "General Fitness",
    value: "general fitness"
  }
];
const COMMON_CONDITIONS = [
  {
    name: "Asthma",
    value: "asthma"
  },
  {
    name: "Diabetes",
    value: "diabetes"
  },
  {
    name: "Heart Disease",
    value: "heart disease"
  },
  {
    name: "Hypertension",
    value: "hypertension"
  }
];


const HealthInfoSection = ({ register, errors, watch }) => {
  const hadCondition = watch("hadMedicalCondition");

  return (
    <div>
      <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
        <Dumbbell size={20} /> Health Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Height */}
        <div>
          <input
            type="number"
            placeholder="Height (cm)"
            {...register("height", { required: "Required", min: 50, max: 300 })}
            className="bg-slate-900 outline-none p-2 rounded w-full"
          />
          {errors.height && (
            <p className="text-red-400 text-xs mt-1">{errors.height.message}</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <input
            type="number"
            placeholder="Weight (kg)"
            {...register("weight", { required: "Required", min: 20, max: 500 })}
            className="bg-slate-900 outline-none p-2 rounded w-full"
          />
          {errors.weight && (
            <p className="text-red-400 text-xs mt-1">{errors.weight.message}</p>
          )}
        </div>

        {/* Goal */}
        <div>
          <select
            {...register("goal")}
            className="bg-slate-900 outline-none p-2 rounded w-full"
          >
            <option value="">Select your fitness goal</option>
            {GOALS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Had Medical Condition */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("hadMedicalCondition")}
            className="w-4 h-4 accent-green-500 mt-1"
          />
          <label className="text-gray-300">Any Medical Conditions? (To select multiple, use ctrl)</label>
        </div>

        {/* Conditional Fields */}
        {hadCondition && (
          <>
            <div className="sm:col-span-2">
              <select
                multiple
                {...register("conditions")}
                className="bg-slate-900 outline-none p-2 rounded w-full"
              >
                {COMMON_CONDITIONS.map((c) => (
                  <option key={c.name} value={c.value}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Other Conditions (if any)"
                {...register("otherConditions")}
                className="bg-slate-900 outline-none p-2 rounded w-full"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HealthInfoSection;
