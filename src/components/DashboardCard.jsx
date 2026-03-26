import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardCard({ title, desc, icon, route }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate(route)}
      className="cursor-pointer rounded-2xl p-6 border transition
      bg-white text-black border-gray-200
      dark:bg-gray-900/70 dark:text-white dark:border-white/10"
    >
      {/* Icon */}
      <div className="text-3xl mb-4 text-blue-500">
        <FontAwesomeIcon icon={icon} />
      </div>

      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{desc}</p>

      <div className="mt-4 h-[2px] w-12 bg-blue-500 rounded-full"></div>
    </motion.div>
  );
}

export default DashboardCard;
