import React from "react";
import { FaClock, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiGeeksforgeeks, SiLeetcode } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2 text-white">
          <FaClock className="text-blue-400 text-xl" />
          <span className="text-lg font-semibold tracking-wide">
            ChronoFlow
          </span>
        </div>

        {/* Bottom Credits */}
        <div className="text-center text-sm border-t border-white/10 py-4">
          <p>© {new Date().getFullYear()} ChronoFlow. All rights reserved.</p>
          <p className="mt-1">
            Built with ❤️ by{" "}
            <span className="text-white font-semibold">Tabish Firoz</span>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 text-lg items-center">
          <a
            href="https://github.com/firozmdtabish04"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaGithub />
          </a>

          <a
            href="https://in.linkedin.com/in/tabish-firoz"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition transform hover:scale-110"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com/firozmdtabish/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-400 transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.geeksforgeeks.org/user/firozmdtabish04"
            target="_blank"
            rel="noreferrer"
            className="hover:text-green-400 transition transform hover:scale-110"
          >
            <SiGeeksforgeeks />
          </a>

          <a
            href="https://leetcode.com/u/Tabish_Firoz04/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400 transition transform hover:scale-110"
          >
            <SiLeetcode />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
