import React from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { MapPin, Calendar, Baby, Sun, Tent, Snowflake, Flame, Sparkles } from 'lucide-react';
import { TripConditions } from '../types';

interface TripParamsSectionProps {
  collapsed: boolean;
  toggleCollapse: () => void;
  destination: string;
  setDestination: (value: string) => void;
  days: number;
  setDays: (value: number | ((prev: number) => number)) => void;
  conditions: TripConditions;
  setConditions: React.Dispatch<React.SetStateAction<TripConditions>>;
  handleGenerateWithAI: () => void;
  isGenerating: boolean;
  dragControls: any;
}

export const TripParamsSection: React.FC<TripParamsSectionProps> = ({
  collapsed,
  toggleCollapse,
  destination,
  setDestination,
  days,
  setDays,
  conditions,
  setConditions,
  handleGenerateWithAI,
  isGenerating,
  dragControls
}) => {
  return (
    <motion.section 
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      className={`bg-white/80 backdrop-blur-xl rounded-3xl p-5 border border-white/60 shadow-lg shadow-orange-950/5 relative select-none flex flex-col ${collapsed ? 'pb-3.5 gap-0' : 'gap-4'}`}
    >
        {/* ... content of TripParamsSection ... */}
    </motion.section>
  );
};
