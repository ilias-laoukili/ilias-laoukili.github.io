"use client";

import { useEffect, useRef, useCallback } from "react";

type GameOfLifeProps = {
  onExit: () => void;
};

const CELL_SIZE = 8;
const UPDATE_INTERVAL = 100;

const GameOfLife = ({ onExit }: GameOfLifeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<boolean[][]>([]);
  const animationRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  // Initialize grid with random seed
  const initializeGrid = useCallback((cols: number, rows: number) => {
    const grid: boolean[][] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        // ~30% chance of being alive for good initial density
        grid[i][j] = Math.random() < 0.3;
      }
    }
    return grid;
  }, []);

  // Count live neighbors
  const countNeighbors = useCallback(
    (grid: boolean[][], x: number, y: number, rows: number, cols: number) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newX = (x + i + rows) % rows;
          const newY = (y + j + cols) % cols;
          if (grid[newX][newY]) count++;
        }
      }
      return count;
    },
    []
  );

  // Compute next generation
  const nextGeneration = useCallback(
    (grid: boolean[][], rows: number, cols: number) => {
      const newGrid: boolean[][] = [];
      for (let i = 0; i < rows; i++) {
        newGrid[i] = [];
        for (let j = 0; j < cols; j++) {
          const neighbors = countNeighbors(grid, i, j, rows, cols);
          const alive = grid[i][j];

          // Conway's Rules:
          // 1. Any live cell with 2 or 3 neighbors survives
          // 2. Any dead cell with exactly 3 neighbors becomes alive
          // 3. All other cells die or stay dead
          if (alive && (neighbors === 2 || neighbors === 3)) {
            newGrid[i][j] = true;
          } else if (!alive && neighbors === 3) {
            newGrid[i][j] = true;
          } else {
            newGrid[i][j] = false;
          }
        }
      }
      return newGrid;
    },
    [countNeighbors]
  );

  // Draw the grid on canvas
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, grid: boolean[][], rows: number, cols: number) => {
      const canvasWidth = cols * CELL_SIZE;
      const canvasHeight = rows * CELL_SIZE;
      
      // Clear canvas with slight fade for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw live cells with green glow effect
      ctx.fillStyle = "#22c55e";
      ctx.shadowColor = "#22c55e";
      ctx.shadowBlur = 4;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j]) {
            ctx.fillRect(
              j * CELL_SIZE + 1,
              i * CELL_SIZE + 1,
              CELL_SIZE - 2,
              CELL_SIZE - 2
            );
          }
        }
      }

      // Reset shadow for performance
      ctx.shadowBlur = 0;
    },
    []
  );

  // Main game loop
  const gameLoop = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx) {
        animationRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const cols = Math.floor(canvas.width / CELL_SIZE);
      const rows = Math.floor(canvas.height / CELL_SIZE);

      // Initialize grid if needed (check both dimensions)
      if (
        gridRef.current.length === 0 || 
        gridRef.current.length !== rows ||
        (gridRef.current[0] && gridRef.current[0].length !== cols)
      ) {
        gridRef.current = initializeGrid(cols, rows);
        // Initial full clear
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update at specified interval
      if (timestamp - lastUpdateRef.current >= UPDATE_INTERVAL) {
        gridRef.current = nextGeneration(gridRef.current, rows, cols);
        draw(ctx, gridRef.current, rows, cols);
        lastUpdateRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(gameLoop);
    },
    [initializeGrid, nextGeneration, draw]
  );

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      // Reset grid on resize
      gridRef.current = [];
    }
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
        onExit();
      }
      // Reset simulation with 'r'
      if (e.key === "r" || e.key === "R") {
        gridRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  // Setup canvas and start game loop
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Start game loop
    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, gameLoop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col"
    >
      {/* Info bar */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10 pointer-events-none">
        <div className="text-green-400 font-mono text-xs bg-black/70 px-2 py-1 rounded">
          Conway&apos;s Game of Life
        </div>
        <div className="text-green-400/70 font-mono text-xs bg-black/70 px-2 py-1 rounded">
          [R] Reset | [ESC/Q] Exit
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="flex-1 bg-black"
      />

      {/* Exit button */}
      <button
        onClick={onExit}
        className="absolute bottom-4 right-4 px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 font-mono text-xs rounded hover:bg-red-500/30 hover:border-red-500 transition-all"
      >
        Stop Process (^C)
      </button>

      {/* Scanline effect overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)",
        }}
      />
    </div>
  );
};

export default GameOfLife;
