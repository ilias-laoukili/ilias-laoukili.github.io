"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { PROJECTS } from "@/constants/data";
import GameOfLife from "./GameOfLife";

type TerminalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type HistoryEntry = {
  type: "input" | "output";
  content: string;
};

const ASCII_BANNER = `
 ██╗██╗      ██╗ █████╗ ███████╗
 ██║██║      ██║██╔══██╗██╔════╝
 ██║██║█████╗██║███████║███████╗
 ██║██║╚════╝██║██╔══██║╚════██║
 ██║███████╗ ██║██║  ██║███████║
 ╚═╝╚══════╝ ╚═╝╚═╝  ╚═╝╚══════╝
                                
  Welcome to ILIAS Terminal v1.0
  Type 'help' for available commands
`;

const COMMANDS: Record<string, string> = {
  help: "Show available commands",
  ls: "List all projects",
  "cat [slug]": "Show project details",
  whoami: "Display current user",
  clear: "Clear terminal history",
  sudo: "Execute as superuser",
  life: "Run Conway's Game of Life",
  exit: "Close the terminal",
};

// Commands available for autocomplete (without arguments)
const AUTOCOMPLETE_COMMANDS = [
  "help",
  "ls",
  "cat",
  "whoami",
  "clear",
  "sudo",
  "life",
  "exit",
  "rm",
  "cd",
  "hack",
  "coffee",
  "matrix",
];

const SECRET_PASSWORD = "konami";

const Terminal = ({ isOpen, onClose }: TerminalProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", content: ASCII_BANNER },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isRoot, setIsRoot] = useState(false);
  const [awaitingPassword, setAwaitingPassword] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Reset state when terminal closes
  useEffect(() => {
    if (!isOpen) {
      setHistory([{ type: "output", content: ASCII_BANNER }]);
      setCurrentInput("");
      setIsRoot(false);
      setAwaitingPassword(false);
      setSimulationMode(false);
      setCommandHistory([]);
      setHistoryIndex(-1);
    }
  }, [isOpen]);

  // Auto-focus input when terminal opens or exits simulation
  useEffect(() => {
    if (isOpen && !simulationMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, simulationMode]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const addToHistory = (entry: HistoryEntry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const processCommand = (input: string) => {
    const trimmedInput = input.trim();
    
    // Handle password input
    if (awaitingPassword) {
      setAwaitingPassword(false);
      if (trimmedInput === SECRET_PASSWORD) {
        setIsRoot(true);
        addToHistory({ type: "input", content: "Password: ********" });
        addToHistory({
          type: "output",
          content: "Access granted. Welcome, root.",
        });
      } else {
        addToHistory({ type: "input", content: "Password: ********" });
        addToHistory({
          type: "output",
          content: "sudo: incorrect password. Access denied.",
        });
      }
      return;
    }

    addToHistory({ type: "input", content: `${isRoot ? "root" : "guest"}@ilias:~$ ${trimmedInput}` });

    if (!trimmedInput) return;

    const [command, ...args] = trimmedInput.toLowerCase().split(" ");

    switch (command) {
      case "help": {
        const helpText = Object.entries(COMMANDS)
          .map(([cmd, desc]) => `  ${cmd.padEnd(14)} - ${desc}`)
          .join("\n");
        addToHistory({
          type: "output",
          content: `Available commands:\n${helpText}`,
        });
        break;
      }

      case "ls": {
        const projectList = PROJECTS.map(
          (p) => `  📁 ${p.slug.padEnd(30)} [${p.category}]`
        ).join("\n");
        addToHistory({
          type: "output",
          content: `Projects:\n${projectList}`,
        });
        break;
      }

      case "cat":
        if (args.length === 0) {
          addToHistory({
            type: "output",
            content: "Usage: cat [slug]\nExample: cat graph-sparsification",
          });
        } else {
          const slug = args.join("-");
          const project = PROJECTS.find(
            (p) => p.slug.toLowerCase() === slug.toLowerCase()
          );
          if (project) {
            // Helper to truncate and pad strings to fixed width
            const fitText = (text: string, width: number) =>
              text.length > width ? text.slice(0, width - 3) + "..." : text.padEnd(width);

            const boxWidth = 48;
            const tagsText = project.tags.slice(0, 3).join(", ");

            // Word-wrap excerpt into lines
            const words = project.excerpt.split(" ");
            const excerptLines: string[] = [];
            let currentLine = "";
            for (const word of words) {
              if ((currentLine + " " + word).trim().length <= boxWidth) {
                currentLine = (currentLine + " " + word).trim();
              } else {
                if (currentLine) excerptLines.push(currentLine);
                currentLine = word.length > boxWidth ? word.slice(0, boxWidth - 3) + "..." : word;
              }
            }
            if (currentLine) excerptLines.push(currentLine);

            const details = [
              `+${"-".repeat(boxWidth + 2)}+`,
              `| ${fitText(project.title, boxWidth)} |`,
              `+${"-".repeat(boxWidth + 2)}+`,
              `| Category: ${fitText(project.category, boxWidth - 10)} |`,
              `| Date: ${fitText(project.date, boxWidth - 6)} |`,
              `| Tags: ${fitText(tagsText, boxWidth - 6)} |`,
              `+${"-".repeat(boxWidth + 2)}+`,
              ...excerptLines.map(line => `| ${line.padEnd(boxWidth)} |`),
              `+${"-".repeat(boxWidth + 2)}+`,
            ].join("\n");
            addToHistory({ type: "output", content: details });
          } else {
            addToHistory({
              type: "output",
              content: `cat: ${slug}: No such file or directory`,
            });
          }
        }
        break;

      case "whoami":
        addToHistory({
          type: "output",
          content: isRoot ? "root" : "guest",
        });
        break;

      case "sudo":
        if (isRoot) {
          addToHistory({
            type: "output",
            content: "You are already root!",
          });
        } else {
          addToHistory({
            type: "output",
            content: "[sudo] password for guest:",
          });
          setAwaitingPassword(true);
        }
        break;

      case "clear":
        setHistory([{ type: "output", content: ASCII_BANNER }]);
        break;

      case "life":
        addToHistory({
          type: "output",
          content: "Starting Conway's Game of Life...\nEntering simulation mode...",
        });
        setTimeout(() => {
          setSimulationMode(true);
        }, 500);
        break;

      case "exit":
        onClose();
        break;

      case "rm":
        if (args.includes("-rf") && args.includes("/")) {
          addToHistory({
            type: "output",
            content: isRoot
              ? "Nice try! But I like my portfolio too much to delete it 😄"
              : "Permission denied. Try 'sudo' first... if you dare.",
          });
        } else {
          addToHistory({
            type: "output",
            content: `rm: cannot remove '${args.join(" ")}': Operation not permitted`,
          });
        }
        break;

      case "cd":
        addToHistory({
          type: "output",
          content: "Why would you want to leave? Everything you need is here!",
        });
        break;

      case "hack":
        addToHistory({
          type: "output",
          content: "Accessing mainframe...\n[████████████████████] 100%\n\nJust kidding. This is a portfolio, not a Hollywood movie 🎬",
        });
        break;

      case "coffee":
        addToHistory({
          type: "output",
          content: "☕ Brewing coffee...\nError: Coffee machine not found.\nTry: Go to kitchen && make coffee",
        });
        break;

      case "matrix":
        addToHistory({
          type: "output",
          content: "Wake up, Neo...\nThe Matrix has you...\nFollow the white rabbit 🐰",
        });
        break;

      default:
        addToHistory({
          type: "output",
          content: `Command not found: ${command}\nType 'help' for available commands.`,
        });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = currentInput.trim();
      if (trimmed && !awaitingPassword) {
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
      }
      processCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (awaitingPassword) return;
      
      const input = currentInput.toLowerCase().trim();
      if (!input) return;
      
      // Find matching commands
      const matches = AUTOCOMPLETE_COMMANDS.filter((cmd) =>
        cmd.startsWith(input)
      );
      
      if (matches.length === 1) {
        // Single match - complete it
        setCurrentInput(matches[0] + " ");
      } else if (matches.length > 1) {
        // Multiple matches - show options
        addToHistory({
          type: "input",
          content: `${isRoot ? "root" : "guest"}@ilias:~$ ${currentInput}`,
        });
        addToHistory({
          type: "output",
          content: matches.join("  "),
        });
        
        // Find common prefix
        const commonPrefix = matches.reduce((prefix, cmd) => {
          while (!cmd.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
          }
          return prefix;
        }, matches[0]);
        
        if (commonPrefix.length > input.length) {
          setCurrentInput(commonPrefix);
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newIndex = historyIndex === -1 
        ? commandHistory.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setHistoryIndex(newIndex);
      setCurrentInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setCurrentInput("");
      } else {
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    }
  };

  const handleExitSimulation = () => {
    setSimulationMode(false);
    setHistory([
      { type: "output", content: ASCII_BANNER },
      { type: "output", content: "Game of Life terminated.\nReturned to command prompt." },
    ]);
    // Re-focus input after exiting simulation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[10000] flex flex-col bg-black"
          onClick={handleTerminalClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-green-500/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  onClick={simulationMode ? handleExitSimulation : onClose}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="ml-4 text-green-400 font-mono text-sm">
                {simulationMode ? "life@simulation:~" : "ilias@portfolio:~"}
              </span>
            </div>
            <button
              onClick={simulationMode ? handleExitSimulation : onClose}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Terminal Content - Conditional Rendering */}
          {simulationMode ? (
            <div className="flex-1 overflow-hidden">
              <GameOfLife onExit={handleExitSimulation} />
            </div>
          ) : (
            <>
              <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
                onClick={handleTerminalClick}
              >
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className={`whitespace-pre-wrap ${
                      entry.type === "input"
                        ? "text-green-400"
                        : "text-green-300/80"
                    }`}
                  >
                    {entry.content}
                  </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center text-green-400 mt-1">
                  <span>
                    {awaitingPassword
                      ? "Password: "
                      : `${isRoot ? "root" : "guest"}@ilias:~$ `}
                  </span>
                  <input
                    ref={inputRef}
                    type={awaitingPassword ? "password" : "text"}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-green-400 font-mono caret-green-400 focus:outline-none focus:ring-0 focus:border-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ border: 'none', boxShadow: 'none' }}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                  <span className="animate-pulse">▌</span>
                </div>
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 text-green-500/50 text-xs font-mono border-t border-green-500/20">
                Press ESC or type &apos;exit&apos; to close | Try &apos;life&apos; for a surprise
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
